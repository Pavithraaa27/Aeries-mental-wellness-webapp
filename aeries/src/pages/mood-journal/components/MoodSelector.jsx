import React from 'react';
import Icon from '../../../components/AppIcon';

const MoodSelector = ({ selectedMood, onMoodSelect, disabled = false }) => {
  const moods = [
    {
      id: 'happy',
      label: 'Happy',
      icon: 'Smile',
      color: 'text-success',
      bgColor: 'bg-success/10 hover:bg-success/20',
      description: 'Feeling joyful and content'
    },
    {
      id: 'calm',
      label: 'Calm',
      icon: 'Waves',
      color: 'text-primary',
      bgColor: 'bg-primary/10 hover:bg-primary/20',
      description: 'Peaceful and relaxed'
    },
    {
      id: 'anxious',
      label: 'Anxious',
      icon: 'AlertCircle',
      color: 'text-warning',
      bgColor: 'bg-warning/10 hover:bg-warning/20',
      description: 'Worried or nervous'
    },
    {
      id: 'sad',
      label: 'Sad',
      icon: 'CloudRain',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10 hover:bg-secondary/20',
      description: 'Feeling down or melancholy'
    },
    {
      id: 'stressed',
      label: 'Stressed',
      icon: 'Zap',
      color: 'text-error',
      bgColor: 'bg-error/10 hover:bg-error/20',
      description: 'Overwhelmed or pressured'
    },
    {
      id: 'excited',
      label: 'Excited',
      icon: 'Star',
      color: 'text-accent',
      bgColor: 'bg-accent/10 hover:bg-accent/20',
      description: 'Energetic and enthusiastic'
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">How are you feeling today?</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {moods?.map((mood) => (
          <button
            key={mood?.id}
            onClick={() => onMoodSelect(mood)}
            disabled={disabled}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200 micro-feedback
              ${selectedMood?.id === mood?.id 
                ? `border-current ${mood?.color} ${mood?.bgColor?.replace('hover:', '')}` 
                : `border-border hover:border-muted-foreground ${mood?.bgColor}`
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="flex flex-col items-center space-y-2">
              <Icon 
                name={mood?.icon} 
                size={24} 
                className={selectedMood?.id === mood?.id ? mood?.color : 'text-muted-foreground'} 
              />
              <span className={`text-sm font-medium ${
                selectedMood?.id === mood?.id ? mood?.color : 'text-muted-foreground'
              }`}>
                {mood?.label}
              </span>
              <span className="text-xs text-muted-foreground text-center">
                {mood?.description}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;