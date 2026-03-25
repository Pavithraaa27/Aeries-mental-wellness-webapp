import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryTabs = ({ categories, activeCategory, onCategoryChange, resourceCounts }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'stress-management': 'Brain',
      'meditation': 'Flower2',
      'coping-strategies': 'Shield',
      'crisis-support': 'Heart',
      'breathing-exercises': 'Wind',
      'mindfulness': 'Sparkles',
      'sleep-wellness': 'Moon',
      'anxiety-relief': 'Waves'
    };
    return icons?.[category] || 'Circle';
  };

  const getCategoryColor = (category, isActive) => {
    if (isActive) return 'bg-primary text-primary-foreground';
    
    const colors = {
      'stress-management': 'hover:bg-error/10 hover:text-error',
      'meditation': 'hover:bg-primary/10 hover:text-primary',
      'coping-strategies': 'hover:bg-secondary/10 hover:text-secondary',
      'crisis-support': 'hover:bg-destructive/10 hover:text-destructive',
      'breathing-exercises': 'hover:bg-accent/10 hover:text-accent-foreground',
      'mindfulness': 'hover:bg-success/10 hover:text-success',
      'sleep-wellness': 'hover:bg-muted hover:text-muted-foreground',
      'anxiety-relief': 'hover:bg-warning/10 hover:text-warning'
    };
    return colors?.[category] || 'hover:bg-muted hover:text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg therapeutic-shadow p-1">
      <div className="flex flex-wrap gap-1">
        {categories?.map((category) => {
          const isActive = activeCategory === category?.id;
          const count = resourceCounts?.[category?.id] || 0;
          
          return (
            <Button
              key={category?.id}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => onCategoryChange(category?.id)}
              className={`micro-feedback transition-all duration-200 ${getCategoryColor(category?.id, isActive)}`}
            >
              <Icon 
                name={getCategoryIcon(category?.id)} 
                size={16} 
                className="mr-2" 
              />
              <span className="font-medium">{category?.name}</span>
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                isActive 
                  ? 'bg-primary-foreground/20 text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {count}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;