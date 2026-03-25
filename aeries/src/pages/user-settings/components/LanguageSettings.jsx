import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageSettings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [culturalContext, setCulturalContext] = useState('western');

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸'
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸'
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷'
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪'
    },
    {
      code: 'pt',
      name: 'Portuguese',
      nativeName: 'Português',
      flag: '🇵🇹'
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳'
    }
  ];

  const dateFormats = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)', example: '12/31/2024' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (EU)', example: '31/12/2024' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)', example: '2024-12-31' }
  ];

  const culturalContexts = [
    {
      id: 'western',
      name: 'Western',
      description: 'Individual-focused therapeutic approaches'
    },
    {
      id: 'collectivist',
      name: 'Collectivist',
      description: 'Family and community-centered wellness'
    },
    {
      id: 'neutral',
      name: 'Neutral',
      description: 'Universal therapeutic principles'
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('userLanguage') || 'en';
    const savedDateFormat = localStorage.getItem('dateFormat') || 'MM/DD/YYYY';
    const savedCulturalContext = localStorage.getItem('culturalContext') || 'western';
    
    setSelectedLanguage(savedLanguage);
    setDateFormat(savedDateFormat);
    setCulturalContext(savedCulturalContext);
  }, []);

  const saveLanguageSettings = () => {
    localStorage.setItem('userLanguage', selectedLanguage);
    localStorage.setItem('dateFormat', dateFormat);
    localStorage.setItem('culturalContext', culturalContext);
    
    // Trigger language change event
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: selectedLanguage } 
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-foreground mb-3">Interface Language</h4>
        <div className="grid gap-2">
          {languages?.map((language) => (
            <label
              key={language?.code}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedLanguage === language?.code
                  ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
              }`}
            >
              <input
                type="radio"
                name="language"
                value={language?.code}
                checked={selectedLanguage === language?.code}
                onChange={(e) => setSelectedLanguage(e?.target?.value)}
                className="sr-only"
              />
              <div className="flex items-center space-x-3 flex-1">
                <span className="text-lg">{language?.flag}</span>
                <div>
                  <div className="font-medium text-sm">{language?.name}</div>
                  <div className="text-xs text-muted-foreground">{language?.nativeName}</div>
                </div>
              </div>
              {selectedLanguage === language?.code && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-medium text-foreground mb-3">Date Format</h4>
        <div className="grid gap-2">
          {dateFormats?.map((format) => (
            <label
              key={format?.value}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                dateFormat === format?.value
                  ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
              }`}
            >
              <input
                type="radio"
                name="dateFormat"
                value={format?.value}
                checked={dateFormat === format?.value}
                onChange={(e) => setDateFormat(e?.target?.value)}
                className="sr-only"
              />
              <div>
                <div className="font-medium text-sm">{format?.label}</div>
                <div className="text-xs text-muted-foreground">Example: {format?.example}</div>
              </div>
              {dateFormat === format?.value && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-medium text-foreground mb-3">Cultural Context</h4>
        <div className="grid gap-3">
          {culturalContexts?.map((context) => (
            <label
              key={context?.id}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                culturalContext === context?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
              }`}
            >
              <input
                type="radio"
                name="culturalContext"
                value={context?.id}
                checked={culturalContext === context?.id}
                onChange={(e) => setCulturalContext(e?.target?.value)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="font-medium text-sm">{context?.name}</div>
                <div className="text-xs text-muted-foreground">{context?.description}</div>
              </div>
              {culturalContext === context?.id && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </label>
          ))}
        </div>
      </div>
      <div className="pt-4 border-t">
        <Button onClick={saveLanguageSettings} className="w-full">
          Save Language Settings
        </Button>
      </div>
    </div>
  );
};

export default LanguageSettings;