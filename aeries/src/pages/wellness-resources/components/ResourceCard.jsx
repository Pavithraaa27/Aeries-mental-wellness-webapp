import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResourceCard = ({ resource, onBookmark, onView, isBookmarked }) => {
  const getDifficultyColor = (level) => {
    const colors = {
      beginner: 'bg-success text-success-foreground',
      intermediate: 'bg-warning text-warning-foreground',
      advanced: 'bg-error text-error-foreground'
    };
    return colors?.[level] || 'bg-muted text-muted-foreground';
  };

  const getTypeIcon = (type) => {
    const icons = {
      video: 'Play',
      article: 'FileText',
      audio: 'Headphones',
      interactive: 'Zap'
    };
    return icons?.[type] || 'Circle';
  };

  return (
    <div className="bg-card rounded-lg therapeutic-shadow overflow-hidden hover:shadow-lg transition-all duration-300 micro-feedback">
      <div className="relative">
        <div className="w-full h-48 overflow-hidden">
          <Image
            src={resource?.thumbnail}
            alt={resource?.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource?.difficulty)}`}>
            {resource?.difficulty}
          </span>
          <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
            <Icon name={getTypeIcon(resource?.type)} size={12} />
            <span>{resource?.duration}</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onBookmark(resource?.id)}
          className={`absolute top-3 right-3 bg-white/90 hover:bg-white ${isBookmarked ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} />
        </Button>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs text-primary font-medium uppercase tracking-wide">
            {resource?.category}
          </span>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={12} className="text-warning fill-current" />
            <span className="text-xs text-muted-foreground">{resource?.rating}</span>
          </div>
        </div>

        <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">
          {resource?.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {resource?.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Users" size={12} />
            <span>{resource?.completions} completed</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(resource)}
            className="micro-feedback"
          >
            <Icon name="Play" size={14} className="mr-1" />
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;