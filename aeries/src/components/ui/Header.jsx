import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showCrisisBanner, setShowCrisisBanner] = useState(false);
  const [currentMood, setCurrentMood] = useState(null);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Your wellness overview'
    },
    {
      path: '/chat-interface',
      label: 'Chat',
      icon: 'MessageCircle',
      tooltip: 'Talk with your AI companion'
    },
    {
      path: '/mood-journal',
      label: 'Journal',
      icon: 'BookOpen',
      tooltip: 'Track your daily mood'
    },
    {
      path: '/wellness-resources',
      label: 'Resources',
      icon: 'Heart',
      tooltip: 'Wellness tools and content'
    }
  ];

  const secondaryItems = [
    {
      path: '/user-settings',
      label: 'Settings',
      icon: 'Settings',
      tooltip: 'Customize your experience'
    }
  ];

  useEffect(() => {
    const checkCrisisKeywords = () => {
      const crisisKeywords = ['crisis', 'emergency', 'help', 'suicide', 'harm'];
      const currentPath = location?.pathname;
      const shouldShow = crisisKeywords?.some(keyword => 
        window.location?.search?.includes(keyword) || 
        sessionStorage.getItem('crisisDetected') === 'true'
      );
      setShowCrisisBanner(shouldShow);
    };

    checkCrisisKeywords();
  }, [location]);

  useEffect(() => {
    const savedMood = localStorage.getItem('currentMood');
    if (savedMood) {
      setCurrentMood(JSON.parse(savedMood));
    }

    const calculateProgress = () => {
      const today = new Date()?.toDateString();
      const chatActivity = localStorage.getItem(`chatActivity_${today}`) || '0';
      const journalActivity = localStorage.getItem(`journalActivity_${today}`) || '0';
      const resourceActivity = localStorage.getItem(`resourceActivity_${today}`) || '0';
      
      const totalActivities = parseInt(chatActivity) + parseInt(journalActivity) + parseInt(resourceActivity);
      const progress = Math.min((totalActivities / 3) * 100, 100);
      setSessionProgress(progress);
    };

    calculateProgress();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleCrisisSupport = () => {
    navigate('/chat-interface?crisis=true');
    setShowCrisisBanner(false);
  };

  const getMoodColor = (mood) => {
    const moodColors = {
      happy: 'text-success',
      calm: 'text-primary',
      anxious: 'text-warning',
      sad: 'text-secondary',
      stressed: 'text-error'
    };
    return moodColors?.[mood] || 'text-muted-foreground';
  };

  const getMoodIcon = (mood) => {
    const moodIcons = {
      happy: 'Smile',
      calm: 'Waves',
      anxious: 'AlertCircle',
      sad: 'CloudRain',
      stressed: 'Zap'
    };
    return moodIcons?.[mood] || 'Circle';
  };

  return (
    <>
      {showCrisisBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-error text-error-foreground px-4 py-3 therapeutic-shadow">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="AlertTriangle" size={20} />
              <span className="font-medium">Crisis support is available 24/7</span>
              <span className="text-sm opacity-90">National Suicide Prevention Lifeline: 988</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCrisisSupport}
                className="bg-white text-error hover:bg-gray-50"
              >
                Get Help Now
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCrisisBanner(false)}
                className="text-error-foreground hover:bg-white/10"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
      <header className={`sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${showCrisisBanner ? 'mt-16' : ''}`}>
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Brain" size={20} color="white" />
              </div>
              <span className="font-heading font-semibold text-xl text-foreground">MindCare</span>
            </div>

            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems?.map((item) => {
                const isActive = location?.pathname === item?.path;
                return (
                  <Button
                    key={item?.path}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleNavigation(item?.path)}
                    className={`micro-feedback ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    title={item?.tooltip}
                  >
                    <Icon name={item?.icon} size={16} className="mr-2" />
                    {item?.label}
                    {item?.path === '/dashboard' && sessionProgress > 0 && (
                      <div className="ml-2 w-2 h-2 bg-success rounded-full animate-gentle-pulse" />
                    )}
                  </Button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {currentMood && (
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-muted">
                <Icon 
                  name={getMoodIcon(currentMood?.type)} 
                  size={14} 
                  className={getMoodColor(currentMood?.type)}
                />
                <span className="text-sm text-muted-foreground capitalize">
                  {currentMood?.type}
                </span>
              </div>
            )}

            <div className="hidden md:flex items-center space-x-2">
              {secondaryItems?.map((item) => {
                const isActive = location?.pathname === item?.path;
                return (
                  <Button
                    key={item?.path}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleNavigation(item?.path)}
                    className="micro-feedback"
                    title={item?.tooltip}
                  >
                    <Icon name={item?.icon} size={16} />
                  </Button>
                );
              })}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-4 py-4 space-y-2">
              {[...navigationItems, ...secondaryItems]?.map((item) => {
                const isActive = location?.pathname === item?.path;
                return (
                  <Button
                    key={item?.path}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full justify-start micro-feedback ${isActive ? 'bg-primary text-primary-foreground' : ''}`}
                  >
                    <Icon name={item?.icon} size={16} className="mr-3" />
                    {item?.label}
                    {item?.path === '/dashboard' && sessionProgress > 0 && (
                      <div className="ml-auto w-2 h-2 bg-success rounded-full animate-gentle-pulse" />
                    )}
                  </Button>
                );
              })}
              
              {currentMood && (
                <div className="flex items-center space-x-2 px-3 py-2 mt-4 rounded-lg bg-muted">
                  <Icon 
                    name={getMoodIcon(currentMood?.type)} 
                    size={16} 
                    className={getMoodColor(currentMood?.type)}
                  />
                  <span className="text-sm text-muted-foreground">
                    Current mood: <span className="capitalize font-medium">{currentMood?.type}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;