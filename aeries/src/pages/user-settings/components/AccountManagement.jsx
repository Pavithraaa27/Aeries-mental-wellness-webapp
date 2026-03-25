import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountManagement = () => {
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    phone: '',
    relationship: ''
  });
  const [sessionHistory, setSessionHistory] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const mockSessionHistory = [
    {
      id: 1,
      date: '2024-09-30',
      duration: '45 minutes',
      interactions: 23,
      mood: 'calm',
      topics: ['anxiety', 'work stress']
    },
    {
      id: 2,
      date: '2024-09-29',
      duration: '32 minutes',
      interactions: 18,
      mood: 'anxious',
      topics: ['sleep', 'relationships']
    },
    {
      id: 3,
      date: '2024-09-28',
      duration: '28 minutes',
      interactions: 15,
      mood: 'happy',
      topics: ['gratitude', 'goals']
    },
    {
      id: 4,
      date: '2024-09-27',
      duration: '51 minutes',
      interactions: 31,
      mood: 'stressed',
      topics: ['work', 'time management']
    },
    {
      id: 5,
      date: '2024-09-26',
      duration: '39 minutes',
      interactions: 22,
      mood: 'sad',
      topics: ['family', 'loneliness']
    }
  ];

  useEffect(() => {
    const savedContact = localStorage.getItem('emergencyContact');
    if (savedContact) {
      setEmergencyContact(JSON.parse(savedContact));
    }
    setSessionHistory(mockSessionHistory);
  }, []);

  const saveEmergencyContact = () => {
    localStorage.setItem('emergencyContact', JSON.stringify(emergencyContact));
  };

  const handleContactChange = (field, value) => {
    setEmergencyContact(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getMoodColor = (mood) => {
    const colors = {
      happy: 'text-success',
      calm: 'text-primary',
      anxious: 'text-warning',
      sad: 'text-secondary',
      stressed: 'text-error'
    };
    return colors?.[mood] || 'text-muted-foreground';
  };

  const getMoodIcon = (mood) => {
    const icons = {
      happy: 'Smile',
      calm: 'Waves',
      anxious: 'AlertCircle',
      sad: 'CloudRain',
      stressed: 'Zap'
    };
    return icons?.[mood] || 'Circle';
  };

  const deleteAccount = () => {
    if (showDeleteConfirm) {
      // Clear all data
      localStorage.clear();
      alert('Account deleted successfully. You will be redirected to the homepage.');
      window.location.href = '/';
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 10000); // Reset after 10 seconds
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-foreground mb-4">Emergency Contact</h4>
        <div className="space-y-4">
          <Input
            label="Contact Name"
            type="text"
            placeholder="Enter emergency contact name"
            value={emergencyContact?.name}
            onChange={(e) => handleContactChange('name', e?.target?.value)}
          />
          
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter phone number"
            value={emergencyContact?.phone}
            onChange={(e) => handleContactChange('phone', e?.target?.value)}
          />
          
          <Input
            label="Relationship"
            type="text"
            placeholder="e.g., Family member, Friend, Therapist"
            value={emergencyContact?.relationship}
            onChange={(e) => handleContactChange('relationship', e?.target?.value)}
          />
          
          <Button onClick={saveEmergencyContact} variant="outline" className="w-full">
            <Icon name="Shield" size={16} className="mr-2" />
            Save Emergency Contact
          </Button>
        </div>
      </div>
      <div>
        <h4 className="font-medium text-foreground mb-4">Session History</h4>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sessionHistory?.map((session) => (
            <div key={session?.id} className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium">{session?.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getMoodIcon(session?.mood)} 
                    size={16} 
                    className={getMoodColor(session?.mood)} 
                  />
                  <span className={`text-sm capitalize ${getMoodColor(session?.mood)}`}>
                    {session?.mood}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} />
                  <span>{session?.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={14} />
                  <span>{session?.interactions} interactions</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {session?.topics?.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-muted rounded-full text-muted-foreground"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-4 border-t">
        <h4 className="font-medium text-foreground mb-4 text-error">Danger Zone</h4>
        
        <div className="bg-error/5 border border-error/20 rounded-lg p-4">
          <div className="flex items-start space-x-3 mb-4">
            <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
            <div>
              <h5 className="font-medium text-error mb-1">Delete Account</h5>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
          </div>
          
          <Button
            onClick={deleteAccount}
            variant="destructive"
            className="w-full"
          >
            {showDeleteConfirm ? (
              <>
                <Icon name="AlertTriangle" size={16} className="mr-2" />
                Click Again to Confirm Deletion
              </>
            ) : (
              <>
                <Icon name="Trash2" size={16} className="mr-2" />
                Delete Account
              </>
            )}
          </Button>
          
          {showDeleteConfirm && (
            <p className="text-xs text-error mt-2 text-center">
              This confirmation will expire in 10 seconds
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;