import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ onSendMessage, isTyping, disabled }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef?.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea?.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const quickSuggestions = [
    "I\'m feeling anxious today",
    "I need help managing stress",
    "I\'m having trouble sleeping",
    "I feel overwhelmed"
  ];

  return (
    <div className="border-t bg-background/95 backdrop-blur p-4">
      <div className="max-w-4xl mx-auto">
        {message === '' && (
          <div className="mb-3">
            <p className="text-xs text-muted-foreground mb-2">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions?.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="xs"
                  onClick={() => setMessage(suggestion)}
                  className="text-xs"
                  disabled={disabled}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder={disabled ? "AI is thinking..." : "Share what's on your mind..."}
              disabled={disabled}
              className="w-full resize-none rounded-lg border border-border bg-input px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            
            {message?.length > 0 && (
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                {message?.length}/500
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsRecording(!isRecording)}
              disabled={disabled}
              className={isRecording ? 'text-error' : ''}
            >
              <Icon name={isRecording ? "MicOff" : "Mic"} size={18} />
            </Button>

            <Button
              type="submit"
              variant="default"
              size="icon"
              disabled={!message?.trim() || disabled}
              className="micro-feedback"
            >
              {isTyping ? (
                <Icon name="Loader2" size={18} className="animate-spin" />
              ) : (
                <Icon name="Send" size={18} />
              )}
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Press Enter to send, Shift+Enter for new line</span>
            {isRecording && (
              <div className="flex items-center space-x-1 text-error">
                <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
                <span>Recording...</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} className="text-success" />
            <span>End-to-end encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;