import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ onSearch, onFilter, filters, searchQuery }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const contentTypeOptions = [
    { value: 'all', label: 'All Content' },
    { value: 'video', label: 'Videos' },
    { value: 'article', label: 'Articles' },
    { value: 'audio', label: 'Audio' },
    { value: 'interactive', label: 'Interactive Tools' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Any Duration' },
    { value: 'short', label: 'Under 5 minutes' },
    { value: 'medium', label: '5-15 minutes' },
    { value: 'long', label: '15+ minutes' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'recent', label: 'Recently Added' },
    { value: 'duration', label: 'Shortest First' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(localSearchQuery);
  };

  const handleFilterChange = (filterType, value) => {
    onFilter({
      ...filters,
      [filterType]: value
    });
  };

  const clearFilters = () => {
    setLocalSearchQuery('');
    onSearch('');
    onFilter({
      contentType: 'all',
      duration: 'all',
      difficulty: 'all',
      sortBy: 'relevance'
    });
  };

  const hasActiveFilters = () => {
    return localSearchQuery || 
           filters?.contentType !== 'all' || 
           filters?.duration !== 'all' || 
           filters?.difficulty !== 'all' || 
           filters?.sortBy !== 'relevance';
  };

  return (
    <div className="bg-card rounded-lg therapeutic-shadow p-4 space-y-4">
      <form onSubmit={handleSearch} className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <Input
            type="search"
            placeholder="Search wellness resources..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e?.target?.value)}
            className="pl-10"
          />
        </div>
        
        <Button type="submit" variant="default" size="sm">
          <Icon name="Search" size={16} className="mr-1" />
          Search
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={showAdvancedFilters ? 'bg-muted' : ''}
        >
          <Icon name="Filter" size={16} className="mr-1" />
          Filters
          {hasActiveFilters() && (
            <div className="ml-1 w-2 h-2 bg-primary rounded-full" />
          )}
        </Button>
      </form>
      {showAdvancedFilters && (
        <div className="pt-4 border-t border-border space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Content Type"
              options={contentTypeOptions}
              value={filters?.contentType}
              onChange={(value) => handleFilterChange('contentType', value)}
            />

            <Select
              label="Duration"
              options={durationOptions}
              value={filters?.duration}
              onChange={(value) => handleFilterChange('duration', value)}
            />

            <Select
              label="Difficulty"
              options={difficultyOptions}
              value={filters?.difficulty}
              onChange={(value) => handleFilterChange('difficulty', value)}
            />

            <Select
              label="Sort By"
              options={sortOptions}
              value={filters?.sortBy}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-muted-foreground">
              {hasActiveFilters() ? 'Filters applied' : 'No filters applied'}
            </div>
            
            {hasActiveFilters() && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={14} className="mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;