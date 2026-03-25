import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WellnessQuickActions = ({ onActionSelect, isVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      id: 'breathing',
      name: 'Breathing Exercise',
      icon: 'Wind',
      color: 'text-primary',
      description: '4-7-8 breathing technique'
    },
    {
      id: 'grounding',
      name: '5-4-3-2-1 Grounding',
      icon: 'Anchor',
      color: 'text-secondary',
      description: 'Sensory grounding exercise'
    },
    {
      id: 'affirmation',
      name: 'Positive Affirmation',
      icon: 'Heart',
      color: 'text-success',
      description: 'Uplifting self-talk'
    },
    {
      id: 'journal',
      name: 'Quick Journal',
      icon: 'PenTool',
      color: 'text-accent',
      description: 'Express your thoughts'
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 right-4 z-40">
      <div className={`transition-all duration-300 ${isExpanded ? 'mb-4' : ''}`}>
        {isExpanded && (
          <div className="bg-card border rounded-lg p-4 therapeutic-shadow mb-4 w-64">
            <h3 className="font-medium text-sm text-foreground mb-3">Quick Wellness Tools</h3>
            <div className="space-y-2">
              {quickActions?.map((action) => (
                <Button
                  key={action?.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onActionSelect(action);
                    setIsExpanded(false);
                  }}
                  className="w-full justify-start micro-feedback"
                >
                  <Icon name={action?.icon} size={16} className={`mr-3 ${action?.color}`} />
                  <div className="text-left">
                    <div className="font-medium text-xs">{action?.name}</div>
                    <div className="text-xs text-muted-foreground">{action?.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      <Button
        variant={isExpanded ? "secondary" : "default"}
        size="icon"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 rounded-full therapeutic-shadow breathing-animation"
      >
        <Icon name={isExpanded ? "X" : "Sparkles"} size={20} />
      </Button>
    </div>
  );
};

export default WellnessQuickActions;