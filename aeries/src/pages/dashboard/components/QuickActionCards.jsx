import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCards = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'chat',
      title: 'Start Chat Session',
      description: 'Talk with your AI companion for emotional support',
      icon: 'MessageCircle',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      action: () => navigate('/chat-interface'),
      badge: 'Available 24/7'
    },
    {
      id: 'journal',
      title: 'Mood Journal',
      description: 'Record your thoughts and feelings',
      icon: 'BookOpen',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      action: () => navigate('/mood-journal'),
      badge: 'Daily Practice'
    },
    {
      id: 'resources',
      title: 'Wellness Resources',
      description: 'Explore guided exercises and educational content',
      icon: 'Heart',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20',
      action: () => navigate('/wellness-resources'),
      badge: 'New Content'
    },
    {
      id: 'crisis',
      title: 'Crisis Support',
      description: 'Immediate help and emergency resources',
      icon: 'Phone',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20',
      action: () => navigate('/chat-interface?crisis=true'),
      badge: 'Emergency'
    }
  ];

  const handleEmergencyCall = () => {
    window.open('tel:988', '_self');
  };

  return (
    <div className="bg-card rounded-lg p-6 therapeutic-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleEmergencyCall}
          className="text-error hover:bg-error/10"
          iconName="Phone"
          iconPosition="left"
        >
          Crisis: 988
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            className={`relative p-4 rounded-lg border-2 ${action?.borderColor} ${action?.bgColor} hover:shadow-md transition-all duration-200 cursor-pointer group`}
            onClick={action?.action}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${action?.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action?.icon} size={20} className={action?.color} />
              </div>
              {action?.badge && (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${action?.color} ${action?.bgColor} border ${action?.borderColor}`}>
                  {action?.badge}
                </span>
              )}
            </div>
            
            <h4 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
              {action?.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {action?.description}
            </p>

            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
            <Icon name="Shield" size={16} className="text-success" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Safe & Confidential</p>
            <p className="text-xs text-muted-foreground">Your conversations are private and secure</p>
          </div>
          <div className="w-2 h-2 bg-success rounded-full animate-gentle-pulse" />
        </div>
      </div>
    </div>
  );
};

export default QuickActionCards;