import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResourceViewer = ({ resource, onClose, onBookmark, onComplete, isBookmarked }) => {
  const [showTranscript, setShowTranscript] = useState(false);

  const getResourceIcon = (type) => {
    const icons = {
      video: 'Play',
      article: 'FileText',
      audio: 'Headphones',
      interactive: 'Zap',
    };
    return icons?.[type] || 'Circle';
  };

  if (!resource) return null;

  // ✅ Extract YouTube ID safely
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const idMatch =
      url.match(/v=([^&]+)/) ||
      url.match(/youtu\.be\/([^?]+)/) ||
      url.match(/embed\/([^?]+)/);
    return idMatch ? `https://www.youtube-nocookie.com/embed/${idMatch[1]}` : null;
  };

  const videoSrc = getYouTubeEmbedUrl(resource?.videoUrl) ||
    'https://www.youtube-nocookie.com/embed/VpHz8Mb13_Y';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Icon name={getResourceIcon(resource?.type)} size={20} />
            <div>
              <h2 className="font-semibold">{resource?.title}</h2>
              <p className="text-sm text-muted-foreground">{resource?.category}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBookmark(resource?.id)}
            >
              <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} />
            </Button>

            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">

          {/* ✅ VIDEO SECTION (FIXED) */}
          {resource?.type === 'video' && (
            <div className="w-full aspect-video bg-black">
              <iframe
                src={videoSrc}
                title={resource?.title || 'Wellness Video'}
                className="w-full h-full"
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="p-6 space-y-6">

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">
                {resource?.fullDescription || resource?.description}
              </p>
            </div>

            {/* Key Points */}
            {resource?.keyPoints && (
              <div>
                <h3 className="font-semibold mb-3">Key Points</h3>
                <ul className="space-y-2">
                  {resource.keyPoints.map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <Icon name="CheckCircle" size={16} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Transcript */}
            {resource?.transcript && (
              <div>
                <div className="flex justify-between mb-3">
                  <h3 className="font-semibold">Transcript</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTranscript(!showTranscript)}
                  >
                    {showTranscript ? 'Hide' : 'Show'}
                  </Button>
                </div>

                {showTranscript && (
                  <div className="bg-muted p-4 rounded-lg text-sm max-h-64 overflow-y-auto">
                    {resource.transcript}
                  </div>
                )}
              </div>
            )}

            {/* Related */}
            {resource?.relatedResources?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Related Resources</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {resource.relatedResources.map((r) => (
                    <div key={r.id} className="flex gap-3 p-3 bg-muted rounded-lg">
                      <div className="w-12 h-12 overflow-hidden rounded">
                        <Image src={r.thumbnail} alt={r.title} />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{r.title}</h4>
                        <p className="text-xs text-muted-foreground">{r.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>⭐ {resource?.rating}</span>
                <span>👥 {resource?.completions} completed</span>
                <span>⏱ {resource?.duration}</span>
              </div>

              <Button onClick={() => onComplete(resource)}>
                <Icon name="CheckCircle" size={16} className="mr-2" />
                Mark Complete
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceViewer;