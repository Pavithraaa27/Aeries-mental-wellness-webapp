import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import SettingsSection from './components/SettingsSection';
import ChatbotCustomization from './components/ChatbotCustomization';
import LanguageSettings from './components/LanguageSettings';
//import PrivacyControls from '../../components/PrivacyControls';
import NotificationPreferences from './components/NotificationPreferences';
import AccessibilityOptions from './components/AccessibilityOptions';
import AccountManagement from './components/AccountManagement';

const UserSettings = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    chatbot: true,
    language: false,
    privacy: false,
    notifications: false,
    accessibility: false,
    account: false
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const settingsSections = [
    {
      id: 'chatbot',
      title: 'Chatbot Customization',
      description: 'Personalize your AI companion\'s response style',
      icon: 'Bot',
      component: ChatbotCustomization
    },
    {
      id: 'language',
      title: 'Language & Region',
      description: 'Set your preferred language and cultural context',
      icon: 'Globe',
      component: LanguageSettings
    },
    {
      id: 'privacy',
      title: 'Privacy & Data',
      description: 'Control your data retention and sharing preferences',
      icon: 'Shield',
      component: PrivacyControls
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage reminders and wellness notifications',
      icon: 'Bell',
      component: NotificationPreferences
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      description: 'Customize the interface for your needs',
      icon: 'Accessibility',
      component: AccessibilityOptions
    },
    {
      id: 'account',
      title: 'Account Management',
      description: 'Emergency contacts and session history',
      icon: 'User',
      component: AccountManagement
    }
  ];

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e?.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const expandAllSections = () => {
    const allExpanded = Object.keys(expandedSections)?.reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setExpandedSections(allExpanded);
  };

  const collapseAllSections = () => {
    const allCollapsed = Object.keys(expandedSections)?.reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    setExpandedSections(allCollapsed);
  };

  const resetAllSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      localStorage.removeItem('chatbotSettings');
      localStorage.removeItem('userLanguage');
      localStorage.removeItem('dateFormat');
      localStorage.removeItem('culturalContext');
      localStorage.removeItem('privacySettings');
      localStorage.removeItem('notificationSettings');
      localStorage.removeItem('accessibilitySettings');
      localStorage.removeItem('emergencyContact');
      
      alert('All settings have been reset to default values.');
      window.location?.reload();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Settings" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">User Settings</h1>
              <p className="text-muted-foreground">
                Customize your MindCare experience for optimal emotional wellness support
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={expandAllSections}
              className="text-primary border-primary hover:bg-primary/5"
            >
              <Icon name="ChevronDown" size={16} className="mr-2" />
              Expand All
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={collapseAllSections}
              className="text-secondary border-secondary hover:bg-secondary/5"
            >
              <Icon name="ChevronUp" size={16} className="mr-2" />
              Collapse All
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={resetAllSettings}
              className="text-error border-error hover:bg-error/5"
            >
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Reset All
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {settingsSections?.map((section) => {
            const Component = section?.component;
            return (
              <SettingsSection
                key={section?.id}
                title={section?.title}
                description={section?.description}
                icon={section?.icon}
                isExpanded={expandedSections?.[section?.id]}
                onToggle={() => toggleSection(section?.id)}
              >
                <Component />
              </SettingsSection>
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">Settings Information</p>
              <ul className="space-y-1">
                <li>• All settings are saved locally in your browser</li>
                <li>• Changes take effect immediately unless otherwise noted</li>
                <li>• Your privacy and data security are our top priorities</li>
                <li>• Emergency contacts are only used in crisis situations</li>
                <li>• You can export or delete your data at any time</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="text-primary border-primary hover:bg-primary/5"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;