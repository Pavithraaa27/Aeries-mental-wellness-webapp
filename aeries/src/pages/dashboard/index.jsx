import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MoodTrackingWidget from './components/MoodTrackingWidget';
import QuickActionCards from './components/QuickActionCards';
import RecentActivityFeed from './components/RecentActivityFeed';
import WellnessInsights from './components/WellnessInsights';
import LanguageSelector from './components/LanguageSelector';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    // Load user name from localStorage or set default
    const savedUserName = localStorage.getItem('userName') || 'Friend';
    setUserName(savedUserName);

    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Mock weather data
    setWeatherInfo({
      condition: 'Partly Cloudy',
      temperature: 72,
      icon: 'Cloud'
    });

    return () => clearInterval(timeInterval);
  }, []);

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleStartJournal = () => {
    navigate('/mood-journal');
  };

  const handleEmergencySupport = () => {
    navigate('/chat-interface?crisis=true');
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - MindCare</title>
        <meta name="description" content="Your personal wellness dashboard with mood tracking, chat access, and mental health insights." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">
                    {getGreeting()}, {userName}!
                  </h1>
                  {weatherInfo && (
                    <div className="flex items-center space-x-2 px-3 py-1 bg-card rounded-full therapeutic-shadow">
                      <Icon name={weatherInfo?.icon} size={16} className="text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {weatherInfo?.temperature}°F, {weatherInfo?.condition}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground">
                  {currentTime?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Welcome back to your wellness journey. How can we support you today?
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <Button
                  variant="outline"
                  onClick={handleEmergencySupport}
                  className="text-error border-error hover:bg-error/10"
                  iconName="Phone"
                  iconPosition="left"
                >
                  Crisis Support
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Primary Actions */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <QuickActionCards />

              {/* Recent Activity */}
              <RecentActivityFeed />
            </div>

            {/* Right Column - Tracking & Insights */}
            <div className="space-y-8">
              {/* Mood Tracking Widget */}
              <MoodTrackingWidget onStartJournal={handleStartJournal} />

              {/* Wellness Insights */}
              <WellnessInsights />
            </div>
          </div>

          {/* Bottom Section - Additional Resources */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 therapeutic-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="BookOpen" size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Learning Center</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Explore articles, videos, and guides about mental health and wellness.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/wellness-resources')}
                className="w-full micro-feedback"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Browse Resources
              </Button>
            </div>

            <div className="bg-card rounded-lg p-6 therapeutic-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground">Community</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Connect with others on similar wellness journeys in a safe space.
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="w-full micro-feedback"
                iconName="ArrowRight"
                iconPosition="right"
                disabled
              >
                Coming Soon
              </Button>
            </div>

            <div className="bg-card rounded-lg p-6 therapeutic-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name="Settings" size={20} className="text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">Preferences</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Customize your experience, notifications, and privacy settings.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/user-settings')}
                className="w-full micro-feedback"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Manage Settings
              </Button>
            </div>
          </div>

          {/* Footer Information */}
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                  <Icon name="Shield" size={16} className="text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Your data is secure</p>
                  <p className="text-xs text-muted-foreground">End-to-end encrypted conversations</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>24/7 Available</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Globe" size={14} />
                  <span>12 Languages</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Heart" size={14} />
                  <span>Evidence-Based</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;