import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MoodTrackingWidget = ({ onStartJournal }) => {
  const [currentMood, setCurrentMood] = useState(null);
  const [moodTrend, setMoodTrend] = useState([]);
  const [streak, setStreak] = useState(0);

  const moodOptions = [
    { type: 'happy', label: 'Happy', icon: 'Smile', color: 'text-success', bgColor: 'bg-success/10' },
    { type: 'calm', label: 'Calm', icon: 'Waves', color: 'text-primary', bgColor: 'bg-primary/10' },
    { type: 'anxious', label: 'Anxious', icon: 'AlertCircle', color: 'text-warning', bgColor: 'bg-warning/10' },
    { type: 'sad', label: 'Sad', icon: 'CloudRain', color: 'text-secondary', bgColor: 'bg-secondary/10' },
    { type: 'stressed', label: 'Stressed', icon: 'Zap', color: 'text-error', bgColor: 'bg-error/10' }
  ];

  useEffect(() => {
    // Load current mood and trend data
    const savedMood = localStorage.getItem('currentMood');
    if (savedMood) {
      setCurrentMood(JSON.parse(savedMood));
    }

    // Mock mood trend data for the past 7 days
    const mockTrend = [
      { date: '2025-09-24', mood: 'calm', intensity: 7 },
      { date: '2025-09-25', mood: 'happy', intensity: 8 },
      { date: '2025-09-26', mood: 'anxious', intensity: 5 },
      { date: '2025-09-27', mood: 'calm', intensity: 7 },
      { date: '2025-09-28', mood: 'happy', intensity: 9 },
      { date: '2025-09-29', mood: 'calm', intensity: 8 },
      { date: '2025-09-30', mood: 'happy', intensity: 8 }
    ];
    setMoodTrend(mockTrend);

    // Calculate streak
    const journalStreak = localStorage.getItem('journalStreak') || '7';
    setStreak(parseInt(journalStreak));
  }, []);

  const handleMoodSelect = (mood) => {
    const moodData = {
      ...mood,
      timestamp: new Date()?.toISOString(),
      intensity: 7
    };
    setCurrentMood(moodData);
    localStorage.setItem('currentMood', JSON.stringify(moodData));
  };

  const getTrendDirection = () => {
    if (moodTrend?.length < 2) return 'stable';
    const recent = moodTrend?.slice(-3);
    const avgRecent = recent?.reduce((sum, entry) => sum + entry?.intensity, 0) / recent?.length;
    const earlier = moodTrend?.slice(-7, -3);
    const avgEarlier = earlier?.reduce((sum, entry) => sum + entry?.intensity, 0) / earlier?.length;
    
    if (avgRecent > avgEarlier + 0.5) return 'improving';
    if (avgRecent < avgEarlier - 0.5) return 'declining';
    return 'stable';
  };

  const trendDirection = getTrendDirection();

  return (
    <div className="bg-card rounded-lg p-6 therapeutic-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Mood Tracking</h3>
        <div className="flex items-center space-x-2">
          <Icon 
            name={trendDirection === 'improving' ? 'TrendingUp' : trendDirection === 'declining' ? 'TrendingDown' : 'Minus'} 
            size={16} 
            className={trendDirection === 'improving' ? 'text-success' : trendDirection === 'declining' ? 'text-error' : 'text-muted-foreground'}
          />
          <span className="text-sm text-muted-foreground capitalize">{trendDirection}</span>
        </div>
      </div>
      {currentMood ? (
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-12 h-12 rounded-full ${moodOptions?.find(m => m?.type === currentMood?.type)?.bgColor} flex items-center justify-center`}>
              <Icon 
                name={moodOptions?.find(m => m?.type === currentMood?.type)?.icon} 
                size={24} 
                className={moodOptions?.find(m => m?.type === currentMood?.type)?.color}
              />
            </div>
            <div>
              <p className="font-medium text-foreground capitalize">{currentMood?.type}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(currentMood.timestamp)?.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-3">How are you feeling today?</p>
          <div className="grid grid-cols-5 gap-2">
            {moodOptions?.map((mood) => (
              <Button
                key={mood?.type}
                variant="ghost"
                size="sm"
                onClick={() => handleMoodSelect(mood)}
                className="flex flex-col items-center p-2 h-auto hover:bg-background"
                title={mood?.label}
              >
                <Icon name={mood?.icon} size={20} className={mood?.color} />
                <span className="text-xs mt-1">{mood?.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Icon name="Calendar" size={16} className="text-primary mr-1" />
            <span className="text-2xl font-bold text-foreground">{streak}</span>
          </div>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Icon name="BarChart3" size={16} className="text-secondary mr-1" />
            <span className="text-2xl font-bold text-foreground">
              {moodTrend?.length > 0 ? Math.round(moodTrend?.[moodTrend?.length - 1]?.intensity || 0) : 0}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Mood Score</p>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">7-Day Trend</span>
          <span className="text-xs text-muted-foreground">
            {moodTrend?.length > 0 ? `Avg: ${(moodTrend?.reduce((sum, entry) => sum + entry?.intensity, 0) / moodTrend?.length)?.toFixed(1)}` : 'No data'}
          </span>
        </div>
        <div className="flex items-end space-x-1 h-12">
          {moodTrend?.map((entry, index) => (
            <div
              key={index}
              className="flex-1 bg-primary/20 rounded-t"
              style={{ height: `${(entry?.intensity / 10) * 100}%` }}
              title={`${entry?.date}: ${entry?.mood} (${entry?.intensity}/10)`}
            />
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onStartJournal}
        className="w-full micro-feedback"
        iconName="BookOpen"
        iconPosition="left"
      >
        Update Mood Journal
      </Button>
    </div>
  );
};

export default MoodTrackingWidget;