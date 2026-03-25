import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedContent = ({ featuredResources, onResourceSelect, videoLink }) => {
  // Map resource IDs to their YouTube links
  const videoLinks = {
    1: 'https://youtu.be/VpHz8Mb13_Y?si=uYEuzpUd8SET0lh1',
    3: 'https://youtu.be/86HUcX8ZtAk?si=hXC8Sig8DZp0bJGT',
    5: 'https://youtu.be/GdiQVpWsxeU?si=oykej_w_Y87pOc6Z'
  };

  const handleStartClick = (e, resource) => {
    e.stopPropagation();
    // Get the correct YouTube link based on resource ID
    const youtubeUrl = videoLinks[resource?.id] || 'https://youtu.be/VpHz8Mb13_Y?si=uYEuzpUd8SET0lh1';
    window.open(youtubeUrl, '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 therapeutic-shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center">
            <Icon name="Star" size={20} className="mr-2 text-warning" />
            Recommended for You
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Based on your recent mood patterns and conversations
          </p>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="TrendingUp" size={14} />
          <span>Personalized suggestions</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredResources?.map((resource) => (
          <div
            key={resource?.id}
            className="bg-card rounded-lg overflow-hidden therapeutic-shadow hover:shadow-md transition-all duration-300 micro-feedback cursor-pointer"
            onClick={() => onResourceSelect(resource)}
          >
            <div className="relative">
              <div className="w-full h-32 overflow-hidden">
                <Image
                  src={resource?.thumbnail}
                  alt={resource?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                Featured
              </div>
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                {resource?.duration}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-card-foreground mb-1 line-clamp-1">
                {resource?.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {resource?.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-warning fill-current" />
                    <span className="text-xs text-muted-foreground">{resource?.rating}</span>
                  </div>
                  <span className="text-xs text-primary font-medium">
                    {resource?.matchReason}
                  </span>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={(e) => handleStartClick(e, resource)}
                >
                  <Icon name="Play" size={12} className="mr-1" />
                  Start
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedContent;