import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WellnessInsights = () => {
  const [insights, setInsights] = useState([]);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [dailyAffirmation, setDailyAffirmation] = useState('');

  useEffect(() => {
    // Mock personalized insights based on user activity
    const mockInsights = [
      {
        id: 1,
        type: 'progress',
        title: 'Mood Improvement Detected',
        message: `Your mood scores have improved by 15% over the past week. Your consistent journaling and chat sessions are making a positive impact on your emotional well-being.`,
        icon: 'TrendingUp',
        color: 'text-success',
        bgColor: 'bg-success/10',
        actionText: 'View Detailed Analysis',
        priority: 'high'
      },
      {
        id: 2,
        type: 'recommendation',
        title: 'Stress Management Suggestion',
        message: `Based on your recent conversations, you might benefit from our guided breathing exercises. Studies show 5-minute daily breathing can reduce anxiety by 23%.`,
        icon: 'Wind',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        actionText: 'Try Breathing Exercise',
        priority: 'medium'
      },
      {
        id: 3,
        type: 'milestone',
        title: 'Weekly Goal Achievement',
        message: `Congratulations! You've completed 5 out of 5 planned wellness activities this week. Your dedication to self-care is inspiring.`,icon: 'Award',color: 'text-warning',bgColor: 'bg-warning/10',actionText: 'Set Next Week Goals',priority: 'high'
      },
      {
        id: 4,
        type: 'pattern',title: 'Sleep & Mood Connection',message: `We noticed your mood tends to be more positive on days when you journal in the evening. Consider making this a regular practice.`,icon: 'Moon',color: 'text-secondary',bgColor: 'bg-secondary/10',actionText: 'Learn More',priority: 'low'
      }
    ];

    setInsights(mockInsights);

    // Daily affirmations
    const affirmations = [
      "You are stronger than you think and more capable than you imagine.",
      "Every small step you take towards wellness matters and makes a difference.",
      "Your feelings are valid, and it's okay to take time to process them.",
      "You have the power to create positive change in your life, one day at a time.",
      "Self-compassion is not selfish - it\'s necessary for your well-being.",
      "You are worthy of love, care, and all the good things life has to offer.",
      "Progress isn't always linear, and that's perfectly okay."
    ];

    const today = new Date()?.getDate();
    setDailyAffirmation(affirmations?.[today % affirmations?.length]);
  }, []);

  const nextInsight = () => {
    setCurrentInsightIndex((prev) => (prev + 1) % insights?.length);
  };

  const prevInsight = () => {
    setCurrentInsightIndex((prev) => (prev - 1 + insights?.length) % insights?.length);
  };

  const currentInsight = insights?.[currentInsightIndex];

  return (
    <div className="space-y-6">
      {/* Daily Affirmation */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 therapeutic-shadow">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
            <Icon name="Sun" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Daily Affirmation</h3>
            <p className="text-sm text-muted-foreground">September 30, 2025</p>
          </div>
        </div>
        <blockquote className="text-foreground leading-relaxed italic">
          "{dailyAffirmation}"
        </blockquote>
      </div>
      {/* Personalized Insights */}
      <div className="bg-card rounded-lg p-6 therapeutic-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Wellness Insights</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevInsight}
              disabled={insights?.length <= 1}
              className="w-8 h-8 p-0"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <span className="text-sm text-muted-foreground">
              {insights?.length > 0 ? `${currentInsightIndex + 1} of ${insights?.length}` : '0 of 0'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextInsight}
              disabled={insights?.length <= 1}
              className="w-8 h-8 p-0"
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>

        {currentInsight ? (
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-full ${currentInsight?.bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon name={currentInsight?.icon} size={20} className={currentInsight?.color} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-foreground">{currentInsight?.title}</h4>
                  {currentInsight?.priority === 'high' && (
                    <span className="px-2 py-1 text-xs font-medium bg-error/10 text-error rounded-full">
                      Important
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {currentInsight?.message}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="micro-feedback"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  {currentInsight?.actionText}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Lightbulb" size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-2">No insights available</p>
            <p className="text-sm text-muted-foreground">Continue using MindCare to receive personalized wellness insights</p>
          </div>
        )}
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 therapeutic-shadow text-center">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="MessageCircle" size={16} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">23</div>
          <div className="text-xs text-muted-foreground">Chat Sessions</div>
        </div>
        
        <div className="bg-card rounded-lg p-4 therapeutic-shadow text-center">
          <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="BookOpen" size={16} className="text-secondary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">15</div>
          <div className="text-xs text-muted-foreground">Journal Entries</div>
        </div>
        
        <div className="bg-card rounded-lg p-4 therapeutic-shadow text-center">
          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Heart" size={16} className="text-accent" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">8</div>
          <div className="text-xs text-muted-foreground">Resources Used</div>
        </div>
        
        <div className="bg-card rounded-lg p-4 therapeutic-shadow text-center">
          <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Calendar" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">7</div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </div>
      </div>
    </div>
  );
};

export default WellnessInsights;