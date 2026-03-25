import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JournalTimeline = ({ entries, onEditEntry, onDeleteEntry, searchQuery }) => {
  const [expandedEntry, setExpandedEntry] = useState(null);

  const getMoodColor = (moodId) => {
    const colors = {
      happy: 'text-success',
      calm: 'text-primary',
      anxious: 'text-warning',
      sad: 'text-secondary',
      stressed: 'text-error',
      excited: 'text-accent'
    };
    return colors?.[moodId] || 'text-muted-foreground';
  };

  const getMoodIcon = (moodId) => {
    const icons = {
      happy: 'Smile',
      calm: 'Waves',
      anxious: 'AlertCircle',
      sad: 'CloudRain',
      stressed: 'Zap',
      excited: 'Star'
    };
    return icons?.[moodId] || 'Circle';
  };

  const filteredEntries = entries?.filter(entry => {
    if (!searchQuery) return true;
    const query = searchQuery?.toLowerCase();
    return (entry?.content?.toLowerCase()?.includes(query) ||
    entry?.mood?.label?.toLowerCase()?.includes(query) || entry?.tags?.some(tag => tag?.toLowerCase()?.includes(query)));
  });

  const groupedEntries = filteredEntries?.reduce((groups, entry) => {
    const date = new Date(entry.timestamp)?.toDateString();
    if (!groups?.[date]) {
      groups[date] = [];
    }
    groups?.[date]?.push(entry);
    return groups;
  }, {});

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date()?.toDateString();
    const yesterday = new Date(Date.now() - 86400000)?.toDateString();
    
    if (dateString === today) return 'Today';
    if (dateString === yesterday) return 'Yesterday';
    
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '...';
  };

  if (filteredEntries?.length === 0) {
    return (
      <div className="bg-card rounded-lg p-8 therapeutic-shadow text-center">
        <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          {searchQuery ? 'No matching entries found' : 'No journal entries yet'}
        </h3>
        <p className="text-muted-foreground">
          {searchQuery 
            ? 'Try adjusting your search terms or create a new entry' :'Start your wellness journey by creating your first journal entry'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Journal Timeline</h2>
        <div className="text-sm text-muted-foreground">
          {filteredEntries?.length} {filteredEntries?.length === 1 ? 'entry' : 'entries'}
          {searchQuery && ' found'}
        </div>
      </div>
      <div className="space-y-6">
        {Object.entries(groupedEntries)?.sort(([a], [b]) => new Date(b) - new Date(a))?.map(([date, dayEntries]) => (
            <div key={date} className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <h3 className="text-lg font-medium text-foreground">
                  {formatDate(date)}
                </h3>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              <div className="space-y-3 ml-5">
                {dayEntries?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))?.map((entry) => (
                    <div
                      key={entry?.id}
                      className="bg-card border border-border rounded-lg p-4 therapeutic-shadow hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Icon
                            name={getMoodIcon(entry?.mood?.id)}
                            size={20}
                            className={getMoodColor(entry?.mood?.id)}
                          />
                          <div>
                            <span className={`font-medium ${getMoodColor(entry?.mood?.id)}`}>
                              {entry?.mood?.label}
                            </span>
                            <span className="text-sm text-muted-foreground ml-2">
                              {formatTime(entry?.timestamp)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEditEntry(entry)}
                            iconName="Edit"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteEntry(entry?.id)}
                            iconName="Trash2"
                            className="text-error hover:text-error"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-foreground leading-relaxed">
                          {expandedEntry === entry?.id 
                            ? entry?.content 
                            : truncateText(entry?.content)
                          }
                        </p>

                        {entry?.content?.length > 150 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedEntry(
                              expandedEntry === entry?.id ? null : entry?.id
                            )}
                            className="text-primary hover:text-primary p-0 h-auto"
                          >
                            {expandedEntry === entry?.id ? 'Show less' : 'Read more'}
                          </Button>
                        )}

                        {entry?.tags && entry?.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {entry?.tags?.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                          <span>{entry?.wordCount} words</span>
                          <span>
                            {new Date(entry.timestamp)?.toLocaleDateString('en-US')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default JournalTimeline;