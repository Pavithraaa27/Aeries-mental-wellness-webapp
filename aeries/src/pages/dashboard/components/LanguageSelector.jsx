import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' }
  ];

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
    setIsOpen(false);
    
    // Trigger language change event for other components
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: languageCode } 
    }));
  };

  const getCurrentLanguage = () => {
    return languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];
  };

  const currentLang = getCurrentLanguage();

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 micro-feedback"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="hidden sm:inline text-sm">{currentLang?.name}</span>
        <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={14} />
      </Button>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
            <div className="p-2">
              <div className="flex items-center space-x-2 px-3 py-2 mb-2">
                <Icon name="Globe" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Select Language</span>
              </div>
              
              {languages?.map((language) => (
                <button
                  key={language?.code}
                  onClick={() => handleLanguageChange(language?.code)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left hover:bg-muted transition-colors ${
                    currentLanguage === language?.code ? 'bg-primary/10 text-primary' : 'text-foreground'
                  }`}
                >
                  <span className="text-lg">{language?.flag}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{language?.name}</div>
                    <div className="text-xs text-muted-foreground">{language?.nativeName}</div>
                  </div>
                  {currentLanguage === language?.code && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="border-t border-border p-3">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Info" size={12} />
                <span>Language changes apply to all conversations and content</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;