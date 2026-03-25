import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPreferences = () => {
  const [dailyCheckIn, setDailyCheckIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState('09:00');
  const [wellnessTips, setWellnessTips] = useState(false);
  const [tipFrequency, setTipFrequency] = useState('daily');
  const [moodReminders, setMoodReminders] = useState(false);
  const [reminderTimes, setReminderTimes] = useState(['12:00', '18:00']);

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' }
  ];

  useEffect(() => {
    const savedNotifications = localStorage.getItem('notificationSettings');
    if (savedNotifications) {
      const settings = JSON.parse(savedNotifications);
      setDailyCheckIn(settings?.dailyCheckIn || false);
      setCheckInTime(settings?.checkInTime || '09:00');
      setWellnessTips(settings?.wellnessTips || false);
      setTipFrequency(settings?.tipFrequency || 'daily');
      setMoodReminders(settings?.moodReminders || false);
      setReminderTimes(settings?.reminderTimes || ['12:00', '18:00']);
    }
  }, []);

  const saveNotificationSettings = () => {
    const settings = {
      dailyCheckIn,
      checkInTime,
      wellnessTips,
      tipFrequency,
      moodReminders,
      reminderTimes,
      updatedAt: new Date()?.toISOString()
    };
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
  };

  const addReminderTime = () => {
    if (reminderTimes?.length < 5) {
      setReminderTimes([...reminderTimes, '12:00']);
    }
  };

  const removeReminderTime = (index) => {
    setReminderTimes(reminderTimes?.filter((_, i) => i !== index));
  };

  const updateReminderTime = (index, time) => {
    const newTimes = [...reminderTimes];
    newTimes[index] = time;
    setReminderTimes(newTimes);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-primary" />
            </div>
            <div>
              <div className="font-medium text-sm">Daily Check-in Reminder</div>
              <div className="text-xs text-muted-foreground">
                Get a gentle reminder to check in with yourself
              </div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={dailyCheckIn}
            onChange={(e) => setDailyCheckIn(e?.target?.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
        </div>

        {dailyCheckIn && (
          <div className="ml-4 pl-4 border-l-2 border-primary/20">
            <label className="block text-sm font-medium text-foreground mb-2">
              Check-in Time
            </label>
            <input
              type="time"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        )}
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Lightbulb" size={20} className="text-secondary" />
            </div>
            <div>
              <div className="font-medium text-sm">Wellness Tips</div>
              <div className="text-xs text-muted-foreground">
                Receive helpful mental health tips and insights
              </div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={wellnessTips}
            onChange={(e) => setWellnessTips(e?.target?.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
        </div>

        {wellnessTips && (
          <div className="ml-4 pl-4 border-l-2 border-secondary/20">
            <label className="block text-sm font-medium text-foreground mb-2">
              Frequency
            </label>
            <div className="grid gap-2">
              {frequencyOptions?.map((option) => (
                <label
                  key={option?.value}
                  className={`flex items-center p-2 rounded border cursor-pointer transition-colors ${
                    tipFrequency === option?.value
                      ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="tipFrequency"
                    value={option?.value}
                    checked={tipFrequency === option?.value}
                    onChange={(e) => setTipFrequency(e?.target?.value)}
                    className="sr-only"
                  />
                  <span className="text-sm">{option?.label}</span>
                  {tipFrequency === option?.value && (
                    <Icon name="Check" size={14} className="ml-auto text-primary" />
                  )}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={20} className="text-accent" />
            </div>
            <div>
              <div className="font-medium text-sm">Mood Tracking Reminders</div>
              <div className="text-xs text-muted-foreground">
                Gentle prompts to log your mood throughout the day
              </div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={moodReminders}
            onChange={(e) => setMoodReminders(e?.target?.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
        </div>

        {moodReminders && (
          <div className="ml-4 pl-4 border-l-2 border-accent/20 space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Reminder Times
            </label>
            
            {reminderTimes?.map((time, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => updateReminderTime(index, e?.target?.value)}
                  className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {reminderTimes?.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeReminderTime(index)}
                    className="text-error hover:text-error"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                )}
              </div>
            ))}
            
            {reminderTimes?.length < 5 && (
              <Button
                variant="outline"
                size="sm"
                onClick={addReminderTime}
                className="text-primary border-primary hover:bg-primary/5"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Add Reminder Time
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="pt-4 border-t">
        <Button onClick={saveNotificationSettings} className="w-full">
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationPreferences;