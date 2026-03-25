import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import MoodSelector from './MoodSelector';

const JournalEntryForm = ({ onEntrySubmit, editingEntry = null, onCancel }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [entryText, setEntryText] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');

  const suggestedTags = [
    'work', 'family', 'friends', 'exercise', 'sleep', 'weather', 
    'health', 'achievement', 'challenge', 'gratitude', 'meditation', 'therapy'
  ];

  useEffect(() => {
    if (editingEntry) {
      setSelectedMood(editingEntry?.mood);
      setEntryText(editingEntry?.content);
      setTags(editingEntry?.tags?.join(', ') || '');
    }
  }, [editingEntry]);

  useEffect(() => {
    if (entryText?.length > 10 && selectedMood) {
      const timer = setTimeout(() => {
        setAutoSaveStatus('Auto-saved');
        setTimeout(() => setAutoSaveStatus(''), 2000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [entryText, selectedMood]);

  const detectMoodFromText = (text) => {
    const moodKeywords = {
      happy: ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'fantastic'],
      sad: ['sad', 'down', 'depressed', 'upset', 'disappointed', 'hurt', 'crying'],
      anxious: ['anxious', 'worried', 'nervous', 'scared', 'panic', 'stress', 'overwhelmed'],
      calm: ['calm', 'peaceful', 'relaxed', 'serene', 'content', 'balanced'],
      stressed: ['stressed', 'pressure', 'deadline', 'busy', 'exhausted', 'tired']
    };

    const lowerText = text?.toLowerCase();
    for (const [mood, keywords] of Object.entries(moodKeywords)) {
      if (keywords?.some(keyword => lowerText?.includes(keyword))) {
        return mood;
      }
    }
    return null;
  };

  const handleTextChange = (e) => {
    const text = e?.target?.value;
    setEntryText(text);
    
    if (!selectedMood && text?.length > 20) {
      const detectedMood = detectMoodFromText(text);
      if (detectedMood) {
        const moodObj = {
          id: detectedMood,
          label: detectedMood?.charAt(0)?.toUpperCase() + detectedMood?.slice(1)
        };
        setSelectedMood(moodObj);
      }
    }
  };

  const handleTagClick = (tag) => {
    const currentTags = tags?.split(',')?.map(t => t?.trim())?.filter(t => t);
    if (!currentTags?.includes(tag)) {
      setTags(currentTags?.length > 0 ? `${tags}, ${tag}` : tag);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!selectedMood || !entryText?.trim()) return;

    setIsSubmitting(true);
    
    const entry = {
      id: editingEntry?.id || Date.now(),
      mood: selectedMood,
      content: entryText?.trim(),
      tags: tags?.split(',')?.map(tag => tag?.trim())?.filter(tag => tag),
      timestamp: editingEntry?.timestamp || new Date(),
      wordCount: entryText?.trim()?.split(/\s+/)?.length
    };

    try {
      await onEntrySubmit(entry);
      if (!editingEntry) {
        setSelectedMood(null);
        setEntryText('');
        setTags('');
      }
    } catch (error) {
      console.error('Failed to save entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const wordCount = entryText?.trim()?.split(/\s+/)?.filter(word => word)?.length;

  return (
    <div className="bg-card rounded-lg p-6 therapeutic-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {editingEntry ? 'Edit Journal Entry' : 'New Journal Entry'}
        </h2>
        {autoSaveStatus && (
          <div className="flex items-center space-x-2 text-sm text-success">
            <Icon name="Check" size={16} />
            <span>{autoSaveStatus}</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <MoodSelector
          selectedMood={selectedMood}
          onMoodSelect={setSelectedMood}
          disabled={isSubmitting}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            How was your day? Share your thoughts...
          </label>
          <textarea
            value={entryText}
            onChange={handleTextChange}
            placeholder="Write about your feelings, experiences, or anything on your mind. This is your safe space..."
            className="w-full h-32 p-4 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            disabled={isSubmitting}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{wordCount} words</span>
            <span>Minimum 10 words recommended</span>
          </div>
        </div>

        <div className="space-y-3">
          <Input
            label="Tags (optional)"
            type="text"
            value={tags}
            onChange={(e) => setTags(e?.target?.value)}
            placeholder="work, family, exercise..."
            description="Separate tags with commas to help categorize your entry"
            disabled={isSubmitting}
          />
          
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Suggested tags:</span>
            <div className="flex flex-wrap gap-2">
              {suggestedTags?.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="px-2 py-1 text-xs bg-muted hover:bg-muted-foreground/10 text-muted-foreground rounded-md transition-colors micro-feedback"
                  disabled={isSubmitting}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {new Date()?.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          
          <div className="flex space-x-3">
            {editingEntry && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={!selectedMood || !entryText?.trim() || wordCount < 1 || isSubmitting}
              loading={isSubmitting}
              iconName="Save"
              iconPosition="left"
            >
              {editingEntry ? 'Update Entry' : 'Save Entry'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JournalEntryForm;