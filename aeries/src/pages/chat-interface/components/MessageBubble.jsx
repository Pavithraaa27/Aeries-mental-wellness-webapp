import React from 'react';
import Icon from '../../../components/AppIcon';

const MessageBubble = ({ message, isUser, timestamp, sentiment, isTyping }) => {
  const getSentimentIcon = (sentiment) => {
    const sentimentIcons = {
      positive: 'Smile',
      negative: 'Frown',
      neutral: 'Minus',
      anxious: 'AlertCircle',
      sad: 'CloudRain',
      happy: 'Sun',
      stressed: 'Zap'
    };
    return sentimentIcons?.[sentiment] || 'Circle';
  };

  const getSentimentColor = (sentiment) => {
    const sentimentColors = {
      positive: 'text-success',
      negative: 'text-error',
      neutral: 'text-muted-foreground',
      anxious: 'text-warning',
      sad: 'text-secondary',
      happy: 'text-success',
      stressed: 'text-error'
    };
    return sentimentColors?.[sentiment] || 'text-muted-foreground';
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
        <div className="bg-card border rounded-lg px-4 py-3 max-w-xs therapeutic-shadow">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 mb-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${isUser ? 'ml-auto' : ''}`}>
        <div className={`rounded-lg px-4 py-3 therapeutic-shadow ${
          isUser 
            ? 'bg-primary text-primary-foreground ml-auto' 
            : 'bg-card border'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
          
          {!isUser && sentiment && (
            <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-border/50">
              <Icon 
                name={getSentimentIcon(sentiment)} 
                size={12} 
                className={getSentimentColor(sentiment)}
              />
              <span className="text-xs text-muted-foreground capitalize">
                {sentiment} detected
              </span>
            </div>
          )}
        </div>
        
        <div className={`flex items-center space-x-2 mt-1 text-xs text-muted-foreground ${
          isUser ? 'justify-end' : 'justify-start'
        }`}>
          <span>{timestamp}</span>
          {isUser && (
            <Icon name="Check" size={12} className="text-success" />
          )}
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="User" size={16} color="white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;