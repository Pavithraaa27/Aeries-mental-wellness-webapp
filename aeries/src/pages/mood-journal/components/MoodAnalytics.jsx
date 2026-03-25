import React, { useMemo } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const MoodAnalytics = ({ entries }) => {
  const analytics = useMemo(() => {
    if (!entries?.length) return null;

    // Weekly mood trends
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date?.setDate(date?.getDate() - i);
      return date?.toDateString();
    })?.reverse();

    const weeklyData = last7Days?.map(date => {
      const dayEntries = entries?.filter(entry => 
        new Date(entry.timestamp)?.toDateString() === date
      );
      
      const moodCounts = dayEntries?.reduce((acc, entry) => {
        acc[entry.mood.id] = (acc?.[entry?.mood?.id] || 0) + 1;
        return acc;
      }, {});

      const dominantMood = Object.entries(moodCounts)?.sort(([,a], [,b]) => b - a)?.[0]?.[0] || 'neutral';

      return {
        date: new Date(date)?.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: date,
        entries: dayEntries?.length,
        mood: dominantMood,
        moodScore: getMoodScore(dominantMood)
      };
    });

    // Mood distribution
    const moodDistribution = entries?.reduce((acc, entry) => {
      const mood = entry?.mood?.id;
      acc[mood] = (acc?.[mood] || 0) + 1;
      return acc;
    }, {});

    const pieData = Object.entries(moodDistribution)?.map(([mood, count]) => ({
      name: mood?.charAt(0)?.toUpperCase() + mood?.slice(1),
      value: count,
      color: getMoodColor(mood)
    }));

    // Progress indicators
    const recentEntries = entries?.slice(-14); // Last 14 entries
    const olderEntries = entries?.slice(-28, -14); // Previous 14 entries
    
    const recentAvgScore = recentEntries?.reduce((sum, entry) => 
      sum + getMoodScore(entry?.mood?.id), 0) / recentEntries?.length;
    const olderAvgScore = olderEntries?.length > 0 
      ? olderEntries?.reduce((sum, entry) => sum + getMoodScore(entry?.mood?.id), 0) / olderEntries?.length
      : recentAvgScore;

    const progressTrend = recentAvgScore - olderAvgScore;

    return {
      weeklyData,
      pieData,
      totalEntries: entries?.length,
      averageMoodScore: recentAvgScore,
      progressTrend,
      streakDays: calculateStreak(entries),
      mostCommonMood: Object.entries(moodDistribution)?.sort(([,a], [,b]) => b - a)?.[0]?.[0] || 'neutral'
    };
  }, [entries]);

  const getMoodScore = (moodId) => {
    const scores = {
      happy: 5,
      excited: 4,
      calm: 3,
      anxious: 2,
      sad: 1,
      stressed: 1
    };
    return scores?.[moodId] || 3;
  };

  const getMoodColor = (moodId) => {
    const colors = {
      happy: '#68D391',
      calm: '#4A90A4',
      anxious: '#F6AD55',
      sad: '#7B9E87',
      stressed: '#FC8181',
      excited: '#E8B86D'
    };
    return colors?.[moodId] || '#718096';
  };

  const calculateStreak = (entries) => {
    if (!entries?.length) return 0;
    
    const sortedEntries = entries?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    let streak = 0;
    let currentDate = new Date();
    
    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.timestamp);
      const daysDiff = Math.floor((currentDate - entryDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
        currentDate = entryDate;
      } else if (daysDiff > streak) {
        break;
      }
    }
    
    return streak;
  };

  const getTrendIcon = (trend) => {
    if (trend > 0.5) return { icon: 'TrendingUp', color: 'text-success' };
    if (trend < -0.5) return { icon: 'TrendingDown', color: 'text-error' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  if (!analytics) {
    return (
      <div className="bg-card rounded-lg p-6 therapeutic-shadow">
        <div className="text-center py-8">
          <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Analytics Yet</h3>
          <p className="text-muted-foreground">
            Create a few journal entries to see your mood patterns and insights
          </p>
        </div>
      </div>
    );
  }

  const trendInfo = getTrendIcon(analytics?.progressTrend);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Mood Analytics</h2>
        <div className="text-sm text-muted-foreground">
          Last 7 days
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 therapeutic-shadow">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">Total Entries</span>
          </div>
          <div className="text-2xl font-semibold text-foreground">
            {analytics?.totalEntries}
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 therapeutic-shadow">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Flame" size={16} className="text-warning" />
            <span className="text-sm text-muted-foreground">Streak</span>
          </div>
          <div className="text-2xl font-semibold text-foreground">
            {analytics?.streakDays} days
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 therapeutic-shadow">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Heart" size={16} className="text-success" />
            <span className="text-sm text-muted-foreground">Avg Mood</span>
          </div>
          <div className="text-2xl font-semibold text-foreground">
            {analytics?.averageMoodScore?.toFixed(1)}/5
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 therapeutic-shadow">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={trendInfo?.icon} size={16} className={trendInfo?.color} />
            <span className="text-sm text-muted-foreground">Trend</span>
          </div>
          <div className={`text-2xl font-semibold ${trendInfo?.color}`}>
            {analytics?.progressTrend > 0 ? '+' : ''}
            {analytics?.progressTrend?.toFixed(1)}
          </div>
        </div>
      </div>
      {/* Weekly Mood Trend */}
      <div className="bg-card rounded-lg p-6 therapeutic-shadow">
        <h3 className="text-lg font-medium text-foreground mb-4">Weekly Mood Trend</h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics?.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                domain={[0, 5]}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="moodScore" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Mood Distribution */}
        <div className="bg-card rounded-lg p-6 therapeutic-shadow">
          <h3 className="text-lg font-medium text-foreground mb-4">Mood Distribution</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics?.pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {analytics?.pieData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {analytics?.pieData?.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">
                  {entry?.name} ({entry?.value})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-card rounded-lg p-6 therapeutic-shadow">
          <h3 className="text-lg font-medium text-foreground mb-4">Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Icon name="Star" size={16} className="text-accent mt-1" />
              <div>
                <p className="text-sm font-medium text-foreground">Most Common Mood</p>
                <p className="text-sm text-muted-foreground">
                  You feel {analytics?.mostCommonMood} most often
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="Target" size={16} className="text-primary mt-1" />
              <div>
                <p className="text-sm font-medium text-foreground">Consistency</p>
                <p className="text-sm text-muted-foreground">
                  {analytics?.streakDays > 7 
                    ? "Great job maintaining your journaling habit!" :"Try to journal daily for better insights"
                  }
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name={trendInfo?.icon} size={16} className={`${trendInfo?.color} mt-1`} />
              <div>
                <p className="text-sm font-medium text-foreground">Progress</p>
                <p className="text-sm text-muted-foreground">
                  {analytics?.progressTrend > 0.5 
                    ? "Your mood has been improving lately!"
                    : analytics?.progressTrend < -0.5
                    ? "Consider reaching out for support if needed"
                    : "Your mood has been stable recently"
                  }
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="Calendar" size={16} className="text-secondary mt-1" />
              <div>
                <p className="text-sm font-medium text-foreground">Activity</p>
                <p className="text-sm text-muted-foreground">
                  You've made {analytics?.totalEntries} entries so far
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodAnalytics;