import React from 'react';
import Icon from '../../../components/AppIcon';

const MoodIndicator = ({ currentMood, confidence, isVisible }) => {
  if (!isVisible || !currentMood) return null;

  const getMoodConfig = (mood) => {
    const moodConfigs = {
      happy: {
        icon: 'Smile',
        color: 'text-success',
        bgColor: 'bg-success/10',
        borderColor: 'border-success/20',
        label: 'Happy'
      },
      sad: {
        icon: 'CloudRain',
        color: 'text-secondary',
        bgColor: 'bg-secondary/10',
        borderColor: 'border-secondary/20',
        label: 'Sad'
      },
      anxious: {
        icon: 'AlertCircle',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/20',
        label: 'Anxious'
      },
      stressed: {
        icon: 'Zap',
        color: 'text-error',
        bgColor: 'bg-error/10',
        borderColor: 'border-error/20',
        label: 'Stressed'
      },
      calm: {
        icon: 'Waves',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        borderColor: 'border-primary/20',
        label: 'Calm'
      },
      neutral: {
        icon: 'Minus',
        color: 'text-muted-foreground',
        bgColor: 'bg-muted',
        borderColor: 'border-border',
        label: 'Neutral'
      }
    };
    return moodConfigs?.[mood] || moodConfigs?.neutral;
  };

  const config = getMoodConfig(currentMood);
  const confidencePercentage = Math.round((confidence || 0.7) * 100);

  return (
    <div className="fixed top-20 right-4 z-30">
      <div className={`${config?.bgColor} ${config?.borderColor} border rounded-lg p-3 therapeutic-shadow backdrop-blur-sm`}>
        <div className="flex items-center space-x-2 mb-2">
          <Icon name={config?.icon} size={16} className={config?.color} />
          <span className="text-sm font-medium text-foreground">Mood Detected</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Current:</span>
            <span className={`text-xs font-medium ${config?.color}`}>{config?.label}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Confidence:</span>
            <span className="text-xs font-medium text-foreground">{confidencePercentage}%</span>
          </div>
          
          <div className="w-full bg-border rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full transition-all duration-500 ${config?.color?.replace('text-', 'bg-')}`}
              style={{ width: `${confidencePercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-2 pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            AI is adapting responses to your emotional state
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoodIndicator;