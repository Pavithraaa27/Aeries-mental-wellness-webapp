import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ onSearch, onFilter, onExport, totalEntries }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const moods = [
    { id: '', label: 'All Moods' },
    { id: 'happy', label: 'Happy' },
    { id: 'calm', label: 'Calm' },
    { id: 'anxious', label: 'Anxious' },
    { id: 'sad', label: 'Sad' },
    { id: 'stressed', label: 'Stressed' },
    { id: 'excited', label: 'Excited' }
  ];

  const dateRanges = [
    { id: '', label: 'All Time' },
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: '3months', label: 'Last 3 Months' }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleMoodFilter = (mood) => {
    setSelectedMood(mood);
    onFilter({ mood, dateRange });
  };

  const handleDateFilter = (range) => {
    setDateRange(range);
    onFilter({ mood: selectedMood, dateRange: range });
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedMood('');
    setDateRange('');
    onSearch('');
    onFilter({ mood: '', dateRange: '' });
  };

  const hasActiveFilters = searchQuery || selectedMood || dateRange;

  return (
    <div className="bg-card rounded-lg p-6 therapeutic-shadow space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">Search & Filter</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {totalEntries} {totalEntries === 1 ? 'entry' : 'entries'}
          </span>
          {totalEntries > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
            >
              Export CSV
            </Button>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search entries, moods, or tags..."
            value={searchQuery}
            onChange={(e) => handleSearch(e?.target?.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
        </div>

        <div>
          <select
            value={selectedMood}
            onChange={(e) => handleMoodFilter(e?.target?.value)}
            className="w-full p-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            {moods?.map((mood) => (
              <option key={mood?.id} value={mood?.id}>
                {mood?.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={dateRange}
            onChange={(e) => handleDateFilter(e?.target?.value)}
            className="w-full p-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            {dateRanges?.map((range) => (
              <option key={range?.id} value={range?.id}>
                {range?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Filter" size={14} />
            <span>Filters active</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;