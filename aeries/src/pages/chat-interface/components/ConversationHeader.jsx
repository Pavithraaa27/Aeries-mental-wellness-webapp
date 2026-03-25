import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationHeader = ({ onClearChat, onExportChat, messageCount, sessionDuration }) => {
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="border-b bg-background/95 backdrop-blur px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Bot" size={20} color="white" />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-foreground">MindCare Assistant</h1>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-gentle-pulse"></div>
                  <span>Online & Ready to Help</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MessageSquare" size={12} />
              <span>{messageCount} messages</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{formatDuration(sessionDuration)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onExportChat}
              iconName="Download"
              iconPosition="left"
              className="hidden sm:flex"
            >
              Export
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearChat}
              iconName="Trash2"
              iconPosition="left"
              className="text-error hover:text-error"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;