import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import JournalEntryForm from './components/JournalEntryForm';
import JournalTimeline from './components/JournalTimeline';
import MoodAnalytics from './components/MoodAnalytics';
import SearchAndFilter from './components/SearchAndFilter';

const MoodJournal = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [activeTab, setActiveTab] = useState('entries');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ mood: '', dateRange: '' });
  const [showSuccessMessage, setShowSuccessMessage] = useState('');

  // Mock data for demonstration
  const mockEntries = [
    {
      id: 1,
      mood: { id: 'happy', label: 'Happy' },
      content: `Had an amazing day at work today! Finally completed the project I've been working on for weeks. The team was so supportive and collaborative. Feeling grateful for such wonderful colleagues and the opportunity to grow professionally. Looking forward to celebrating this milestone with my family tonight.`,
      tags: ['work', 'achievement', 'gratitude', 'family'],
      timestamp: new Date('2025-09-30T09:30:00'),
      wordCount: 52
    },
    {
      id: 2,
      mood: { id: 'calm', label: 'Calm' },
      content: `Started my morning with meditation and yoga. The peaceful routine really sets a positive tone for the day. Spent some time in the garden, watching the sunrise and listening to birds. These quiet moments help me feel centered and ready to face whatever comes my way.`,
      tags: ['meditation', 'morning', 'nature', 'peace'],
      timestamp: new Date('2025-09-29T07:15:00'),
      wordCount: 45
    },
    {
      id: 3,
      mood: { id: 'anxious', label: 'Anxious' },
      content: `Feeling overwhelmed with the upcoming presentation next week. Keep second-guessing myself and worrying about what could go wrong. Need to practice more and maybe talk to my mentor about strategies to manage this anxiety. Trying to remember that preparation is key.`,
      tags: ['work', 'presentation', 'anxiety', 'preparation'],
      timestamp: new Date('2025-09-28T14:45:00'),
      wordCount: 41
    },
    {
      id: 4,
      mood: { id: 'excited', label: 'Excited' },
      content: `Just booked tickets for the concert I've been wanting to attend! It's been months since I've done something fun like this. Planning to go with my best friend - we're both huge fans of this artist. Can't wait to sing along and dance the night away!`,
      tags: ['music', 'friends', 'entertainment', 'plans'],
      timestamp: new Date('2025-09-27T16:20:00'),
      wordCount: 48
    },
    {
      id: 5,
      mood: { id: 'sad', label: 'Sad' },
      content: `Missing my family today. It's been months since I've seen them due to work commitments. Video calls help, but it's not the same as being there in person. Planning to visit them soon, maybe take some time off to spend quality time together.`,
      tags: ['family', 'distance', 'longing', 'plans'],
      timestamp: new Date('2025-09-26T20:10:00'),
      wordCount: 43
    },
    {
      id: 6,
      mood: { id: 'stressed', label: 'Stressed' },
      content: `Deadlines are piling up and I feel like I'm drowning in tasks. Need to prioritize better and maybe ask for help with some projects. Taking deep breaths and reminding myself that this too shall pass. Going to make a detailed plan tomorrow morning.`,
      tags: ['work', 'deadlines', 'stress', 'planning'],
      timestamp: new Date('2025-09-25T18:30:00'),
      wordCount: 40
    }
  ];

  useEffect(() => {
    // Load entries from localStorage or use mock data
    const savedEntries = localStorage.getItem('moodJournalEntries');
    if (savedEntries) {
      const parsed = JSON.parse(savedEntries);
      setEntries(parsed?.map(entry => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      })));
    } else {
      setEntries(mockEntries);
      localStorage.setItem('moodJournalEntries', JSON.stringify(mockEntries));
    }
  }, []);

  useEffect(() => {
    applyFilters();
  }, [entries, searchQuery, filters]);

  useEffect(() => {
    // Update activity tracking
    const today = new Date()?.toDateString();
    const currentActivity = parseInt(localStorage.getItem(`journalActivity_${today}`) || '0');
    localStorage.setItem(`journalActivity_${today}`, (currentActivity + 1)?.toString());
  }, [entries?.length]);

  const applyFilters = () => {
    let filtered = [...entries];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(entry =>
        entry?.content?.toLowerCase()?.includes(query) ||
        entry?.mood?.label?.toLowerCase()?.includes(query) ||
        entry?.tags?.some(tag => tag?.toLowerCase()?.includes(query))
      );
    }

    // Apply mood filter
    if (filters?.mood) {
      filtered = filtered?.filter(entry => entry?.mood?.id === filters?.mood);
    }

    // Apply date range filter
    if (filters?.dateRange) {
      const now = new Date();
      const filterDate = new Date();

      switch (filters?.dateRange) {
        case 'today':
          filterDate?.setHours(0, 0, 0, 0);
          filtered = filtered?.filter(entry => 
            new Date(entry.timestamp) >= filterDate
          );
          break;
        case 'week':
          filterDate?.setDate(now?.getDate() - 7);
          filtered = filtered?.filter(entry => 
            new Date(entry.timestamp) >= filterDate
          );
          break;
        case 'month':
          filterDate?.setMonth(now?.getMonth() - 1);
          filtered = filtered?.filter(entry => 
            new Date(entry.timestamp) >= filterDate
          );
          break;
        case '3months':
          filterDate?.setMonth(now?.getMonth() - 3);
          filtered = filtered?.filter(entry => 
            new Date(entry.timestamp) >= filterDate
          );
          break;
      }
    }

    setFilteredEntries(filtered);
  };

  const handleEntrySubmit = async (entry) => {
    let updatedEntries;
    
    if (editingEntry) {
      updatedEntries = entries?.map(e => e?.id === entry?.id ? entry : e);
      setShowSuccessMessage('Entry updated successfully!');
    } else {
      updatedEntries = [entry, ...entries];
      setShowSuccessMessage('Entry saved successfully!');
    }

    setEntries(updatedEntries);
    localStorage.setItem('moodJournalEntries', JSON.stringify(updatedEntries));
    
    // Update current mood in localStorage
    localStorage.setItem('currentMood', JSON.stringify(entry?.mood));
    
    setEditingEntry(null);
    
    // Clear success message after 3 seconds
    setTimeout(() => setShowSuccessMessage(''), 3000);
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setActiveTab('entries');
  };

  const handleDeleteEntry = (entryId) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      let updatedEntries = entries?.filter(entry => entry?.id !== entryId);
      setEntries(updatedEntries);
      localStorage.setItem('moodJournalEntries', JSON.stringify(updatedEntries));
      setShowSuccessMessage('Entry deleted successfully!');
      setTimeout(() => setShowSuccessMessage(''), 3000);
    }
  };

  const handleExportData = async () => {
    const csvContent = [
      ['Date', 'Time', 'Mood', 'Content', 'Tags', 'Word Count'],
      ...filteredEntries?.map(entry => [
        new Date(entry.timestamp)?.toLocaleDateString(),
        new Date(entry.timestamp)?.toLocaleTimeString(),
        entry?.mood?.label,
        `"${entry?.content?.replace(/"/g, '""')}"`,
        entry?.tags?.join('; ') || '',
        entry?.wordCount
      ])
    ]?.map(row => row?.join(','))?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link?.setAttribute('href', url);
    link?.setAttribute('download', `mood-journal-${new Date()?.toISOString()?.split('T')?.[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const tabs = [
    { id: 'entries', label: 'Journal Entries', icon: 'BookOpen' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-20 right-4 z-50 bg-success text-success-foreground px-4 py-3 rounded-lg therapeutic-shadow animate-gentle-pulse">
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} />
              <span>{showSuccessMessage}</span>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-foreground mb-2">Mood Journal</h1>
            <p className="text-muted-foreground">
              Track your emotional wellness journey through daily reflections and insights
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => navigate('/chat-interface')}
              iconName="MessageCircle"
              iconPosition="left"
            >
              Chat Support
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/wellness-resources')}
              iconName="Heart"
              iconPosition="left"
            >
              Resources
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Entry Form */}
            <JournalEntryForm
              onEntrySubmit={handleEntrySubmit}
              editingEntry={editingEntry}
              onCancel={() => setEditingEntry(null)}
            />

            {/* Search and Filter */}
            <SearchAndFilter
              onSearch={setSearchQuery}
              onFilter={setFilters}
              onExport={handleExportData}
              totalEntries={filteredEntries?.length}
            />

            {/* Tabs */}
            <div className="bg-card rounded-lg therapeutic-shadow">
              <div className="border-b border-border">
                <nav className="flex space-x-8 px-6">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`
                        flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors
                        ${activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                        }
                      `}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'entries' && (
                  <JournalTimeline
                    entries={filteredEntries}
                    onEditEntry={handleEditEntry}
                    onDeleteEntry={handleDeleteEntry}
                    searchQuery={searchQuery}
                  />
                )}
                
                {activeTab === 'analytics' && (
                  <MoodAnalytics entries={entries} />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-card rounded-lg p-6 therapeutic-shadow">
              <h3 className="text-lg font-medium text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Total Entries</span>
                  </div>
                  <span className="font-semibold text-foreground">{entries?.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Flame" size={16} className="text-warning" />
                    <span className="text-sm text-muted-foreground">Current Streak</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {entries?.length > 0 ? Math.min(entries?.length, 7) : 0} days
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={16} className="text-success" />
                    <span className="text-sm text-muted-foreground">This Week</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {entries?.filter(entry => {
                      const weekAgo = new Date();
                      weekAgo?.setDate(weekAgo?.getDate() - 7);
                      return new Date(entry.timestamp) >= weekAgo;
                    })?.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Wellness Tips */}
            <div className="bg-card rounded-lg p-6 therapeutic-shadow">
              <h3 className="text-lg font-medium text-foreground mb-4">Wellness Tips</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Lightbulb" size={16} className="text-accent mt-1" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Daily Reflection</p>
                    <p className="text-xs text-muted-foreground">
                      Try to journal at the same time each day for consistency
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Icon name="Heart" size={16} className="text-success mt-1" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Gratitude Practice</p>
                    <p className="text-xs text-muted-foreground">
                      Include three things you're grateful for in each entry
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Icon name="Target" size={16} className="text-primary mt-1" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Pattern Recognition</p>
                    <p className="text-xs text-muted-foreground">
                      Look for triggers and patterns in your mood changes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Support */}
            <div className="bg-error/10 border border-error/20 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="AlertTriangle" size={16} className="text-error" />
                <h3 className="text-sm font-medium text-error">Need Immediate Support?</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                If you're experiencing a mental health crisis, help is available 24/7
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => navigate('/chat-interface?crisis=true')}
                  className="border-error text-error hover:bg-error hover:text-white"
                >
                  Crisis Chat Support
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  National Suicide Prevention Lifeline: 988
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodJournal;