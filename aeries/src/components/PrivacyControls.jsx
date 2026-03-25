import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacyControls = () => {
  const [conversationHistory, setConversationHistory] = useState('30days');
  const [moodDataRetention, setMoodDataRetention] = useState('1year');
  const [dataSharing, setDataSharing] = useState(false);
  const [analyticsOptIn, setAnalyticsOptIn] = useState(false);

  const retentionOptions = [
    { value: '7days', label: '7 Days', description: 'Minimal storage for basic functionality' },
    { value: '30days', label: '30 Days', description: 'Standard retention for pattern analysis' },
    { value: '90days', label: '90 Days', description: 'Extended tracking for trend insights' },
    { value: '1year', label: '1 Year', description: 'Long-term wellness journey tracking' },
    { value: 'indefinite', label: 'Indefinite', description: 'Keep data until manually deleted' }
  ];

  useEffect(() => {
    const savedPrivacy = localStorage.getItem('privacySettings');
    if (savedPrivacy) {
      const settings = JSON.parse(savedPrivacy);
      setConversationHistory(settings?.conversationHistory || '30days');
      setMoodDataRetention(settings?.moodDataRetention || '1year');
      setDataSharing(settings?.dataSharing || false);
      setAnalyticsOptIn(settings?.analyticsOptIn || false);
    }
  }, []);

  const savePrivacySettings = () => {
    const settings = {
      conversationHistory,
      moodDataRetention,
      dataSharing,
      analyticsOptIn,
      updatedAt: new Date()?.toISOString()
    };
    localStorage.setItem('privacySettings', JSON.stringify(settings));
  };

  const exportData = () => {
    const userData = {
      conversations: JSON.parse(localStorage.getItem('chatHistory') || '[]'),
      moodEntries: JSON.parse(localStorage.getItem('moodJournal') || '[]'),
      settings: JSON.parse(localStorage.getItem('userSettings') || '{}'),
      exportDate: new Date()?.toISOString()
    };

    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `mindcare-data-export-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const deleteAllData = () => {
    if (window.confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      localStorage.removeItem('chatHistory');
      localStorage.removeItem('moodJournal');
      localStorage.removeItem('userSettings');
      localStorage.removeItem('privacySettings');
      localStorage.removeItem('chatbotSettings');
      alert('All data has been deleted successfully.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-foreground mb-3">Conversation History Retention</h4>
        <div className="grid gap-2">
          {retentionOptions?.map((option) => (
            <label
              key={option?.value}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                conversationHistory === option?.value
                  ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
              }`}
            >
              <input
                type="radio"
                name="conversationHistory"
                value={option?.value}
                checked={conversationHistory === option?.value}
                onChange={(e) => setConversationHistory(e?.target?.value)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="font-medium text-sm">{option?.label}</div>
                <div className="text-xs text-muted-foreground">{option?.description}</div>
              </div>
              {conversationHistory === option?.value && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-medium text-foreground mb-3">Mood Data Retention</h4>
        <div className="grid gap-2">
          {retentionOptions?.map((option) => (
            <label
              key={option?.value}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                moodDataRetention === option?.value
                  ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
              }`}
            >
              <input
                type="radio"
                name="moodDataRetention"
                value={option?.value}
                checked={moodDataRetention === option?.value}
                onChange={(e) => setMoodDataRetention(e?.target?.value)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="font-medium text-sm">{option?.label}</div>
                <div className="text-xs text-muted-foreground">{option?.description}</div>
              </div>
              {moodDataRetention === option?.value && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Data Usage Preferences</h4>
        
        <label className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-muted/50">
          <div className="flex-1">
            <div className="font-medium text-sm">Anonymous Analytics</div>
            <div className="text-xs text-muted-foreground">
              Help improve MindCare by sharing anonymous usage patterns
            </div>
          </div>
          <input
            type="checkbox"
            checked={analyticsOptIn}
            onChange={(e) => setAnalyticsOptIn(e?.target?.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
        </label>

        <label className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-muted/50">
          <div className="flex-1">
            <div className="font-medium text-sm">Research Participation</div>
            <div className="text-xs text-muted-foreground">
              Contribute to mental health research with anonymized data
            </div>
          </div>
          <input
            type="checkbox"
            checked={dataSharing}
            onChange={(e) => setDataSharing(e?.target?.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
        </label>
      </div>
      <div className="space-y-3 pt-4 border-t">
        <Button onClick={exportData} variant="outline" className="w-full">
          <Icon name="Download" size={16} className="mr-2" />
          Export My Data
        </Button>
        
        <Button onClick={deleteAllData} variant="destructive" className="w-full">
          <Icon name="Trash2" size={16} className="mr-2" />
          Delete All Data
        </Button>
        
        <Button onClick={savePrivacySettings} className="w-full">
          Save Privacy Settings
        </Button>
      </div>
    </div>
  );
};

export default PrivacyControls;