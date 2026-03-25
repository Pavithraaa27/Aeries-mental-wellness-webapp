import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Mock recent activities data
    const mockActivities = [
      {
        id: 1,
        type: 'chat',
        title: 'Completed chat session',
        description: 'Discussed stress management techniques and received personalized coping strategies',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        icon: 'MessageCircle',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        progress: 100
      },
      {
        id: 2,
        type: 'journal',
        title: 'Mood journal entry',
        description: 'Recorded feeling calm and optimistic about upcoming challenges',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        icon: 'BookOpen',
        color: 'text-secondary',
        bgColor: 'bg-secondary/10',
        progress: 100
      },
      {
        id: 3,
        type: 'resource',
        title: 'Watched wellness video',
        description: 'Completed "5-Minute Breathing Exercise for Anxiety Relief"',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        icon: 'Play',
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        progress: 100
      },
      {
        id: 4,
        type: 'exercise',
        title: 'Breathing exercise',
        description: 'Practiced 4-7-8 breathing technique for 10 minutes',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000), // 1 day 3 hours ago
        icon: 'Wind',
        color: 'text-success',
        bgColor: 'bg-success/10',
        progress: 100
      },
      {
        id: 5,
        type: 'milestone',
        title: 'Achievement unlocked',
        description: 'Maintained 7-day journaling streak - Keep up the great work!',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        icon: 'Award',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        progress: 100
      },
      {
        id: 6,
        type: 'chat',
        title: 'Crisis support session',
        description: 'Received immediate emotional support and coping resources',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        icon: 'Shield',
        color: 'text-error',
        bgColor: 'bg-error/10',
        progress: 100
      }
    ];

    setActivities(mockActivities);
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const displayedActivities = showAll ? activities : activities?.slice(0, 4);

  return (
    <div className="bg-card rounded-lg p-6 therapeutic-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-gentle-pulse" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>
      <div className="space-y-4">
        {displayedActivities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className={`w-10 h-10 rounded-full ${activity?.bgColor} flex items-center justify-center flex-shrink-0`}>
              <Icon name={activity?.icon} size={16} className={activity?.color} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-foreground truncate">{activity?.title}</h4>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                {activity?.description}
              </p>
              
              {activity?.progress && (
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${activity?.color?.replace('text-', 'bg-')} transition-all duration-500`}
                      style={{ width: `${activity?.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{activity?.progress}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {activities?.length > 4 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="w-full micro-feedback"
            iconName={showAll ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAll ? 'Show Less' : `Show ${activities?.length - 4} More Activities`}
          </Button>
        </div>
      )}
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Activity" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-2">No recent activity</p>
          <p className="text-sm text-muted-foreground">Start a chat or create a journal entry to see your activity here</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivityFeed;