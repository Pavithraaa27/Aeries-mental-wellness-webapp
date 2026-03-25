import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatbotCustomization = () => {
  const [responseTone, setResponseTone] = useState('gentle');
  const [conversationStyle, setConversationStyle] = useState('supportive');
  const [crisisSensitivity, setCrisisSensitivity] = useState('medium');

  const toneOptions = [
    {
      id: 'gentle',
      name: 'Gentle',
      description: 'Soft, nurturing responses with careful language',
      icon: 'Heart'
    },
    {
      id: 'encouraging',
      name: 'Encouraging',
      description: 'Motivational and uplifting communication style',
      icon: 'Zap'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Clinical, structured therapeutic approach',
      icon: 'Briefcase'
    }
  ];

  const styleOptions = [
    {
      id: 'supportive',
      name: 'Supportive',
      description: 'Empathetic listening with validation focus'
    },
    {
      id: 'solution-focused',
      name: 'Solution-Focused',
      description: 'Goal-oriented with practical suggestions'
    },
    {
      id: 'exploratory',
      name: 'Exploratory',
      description: 'Deep reflection and self-discovery guidance'
    }
  ];

  const sensitivityLevels = [
    {
      id: 'low',
      name: 'Low Sensitivity',
      description: 'Minimal crisis detection, more casual conversations'
    },
    {
      id: 'medium',
      name: 'Medium Sensitivity',
      description: 'Balanced approach with appropriate interventions'
    },
    {
      id: 'high',
      name: 'High Sensitivity',
      description: 'Enhanced monitoring with proactive support'
    }
  ];

  useEffect(() => {
    const savedSettings = localStorage.getItem('chatbotSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setResponseTone(settings?.responseTone || 'gentle');
      setConversationStyle(settings?.conversationStyle || 'supportive');
      setCrisisSensitivity(settings?.crisisSensitivity || 'medium');
    }
  }, []);

  const saveSettings = () => {
    const settings = {
      responseTone,
      conversationStyle,
      crisisSensitivity,
      updatedAt: new Date()?.toISOString()
    };
    localStorage.setItem('chatbotSettings', JSON.stringify(settings));
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-foreground mb-3">Response Tone</h4>
        <div className="grid gap-3">
          {toneOptions?.map((option) => (
            <label
              key={option?.id}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                responseTone === option?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
              }`}
            >
              <input
                type="radio"
                name="responseTone"
                value={option?.id}
                checked={responseTone === option?.id}
                onChange={(e) => setResponseTone(e?.target?.value)}
                className="sr-only"
              />
              <div className="flex items-center space-x-3 flex-1">
                <Icon 
                  name={option?.icon} 
                  size={18} 
                  className={responseTone === option?.id ? 'text-primary' : 'text-muted-foreground'} 
                />
                <div>
                  <div className="font-medium text-sm">{option?.name}</div>
                  <div className="text-xs text-muted-foreground">{option?.description}</div>
                </div>
              </div>
              {responseTone === option?.id && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-medium text-foreground mb-3">Conversation Style</h4>
        <div className="grid gap-3">
          {styleOptions?.map((option) => (
            <label
              key={option?.id}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                conversationStyle === option?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
              }`}
            >
              <input
                type="radio"
                name="conversationStyle"
                value={option?.id}
                checked={conversationStyle === option?.id}
                onChange={(e) => setConversationStyle(e?.target?.value)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="font-medium text-sm">{option?.name}</div>
                <div className="text-xs text-muted-foreground">{option?.description}</div>
              </div>
              {conversationStyle === option?.id && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-medium text-foreground mb-3">Crisis Detection Sensitivity</h4>
        <div className="grid gap-3">
          {sensitivityLevels?.map((option) => (
            <label
              key={option?.id}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                crisisSensitivity === option?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
              }`}
            >
              <input
                type="radio"
                name="crisisSensitivity"
                value={option?.id}
                checked={crisisSensitivity === option?.id}
                onChange={(e) => setCrisisSensitivity(e?.target?.value)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="font-medium text-sm">{option?.name}</div>
                <div className="text-xs text-muted-foreground">{option?.description}</div>
              </div>
              {crisisSensitivity === option?.id && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </label>
          ))}
        </div>
      </div>
      <div className="pt-4 border-t">
        <Button onClick={saveSettings} className="w-full">
          Save Chatbot Settings
        </Button>
      </div>
    </div>
  );
};

export default ChatbotCustomization;