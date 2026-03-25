import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import AudioPlayer from '../../../components/AudioPlayer';

const InteractiveTools = ({ tools, onToolStart }) => {
  const [activeTimer, setActiveTimer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setIsRunning(false);
            setActiveTimer(null);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const startTool = (tool) => {
    setActiveTimer(tool?.id);
    setTimeRemaining(tool?.duration * 60);
    setIsRunning(true);
    onToolStart(tool);
  };

  const pauseTimer = () => {
    setIsRunning(!isRunning);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setActiveTimer(null);
    setTimeRemaining(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getToolIcon = (type) => {
    const icons = {
      breathing: 'Wind',
      meditation: 'Flower2',
      relaxation: 'Waves',
      mindfulness: 'Sparkles',
      grounding: 'Anchor'
    };
    return icons?.[type] || 'Circle';
  };

  const getToolColor = (type) => {
    const colors = {
      breathing: 'from-primary/20 to-primary/5',
      meditation: 'from-secondary/20 to-secondary/5',
      relaxation: 'from-accent/20 to-accent/5',
      mindfulness: 'from-success/20 to-success/5',
      grounding: 'from-warning/20 to-warning/5'
    };
    return colors?.[type] || 'from-muted/20 to-muted/5';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Icon name="Zap" size={20} className="mr-2 text-accent" />
          Interactive Wellness Tools
        </h2>
        <div className="text-xs text-muted-foreground">
          Guided exercises with audio support
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools?.map((tool) => {
          const isActive = activeTimer === tool?.id;
          
          return (
            <div
              key={tool?.id}
              className={`bg-gradient-to-br ${getToolColor(tool?.type)} rounded-lg p-6 therapeutic-shadow hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center">
                    <Icon name={getToolIcon(tool?.type)} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-card-foreground">{tool?.name}</h3>
                    <p className="text-xs text-muted-foreground">{tool?.duration} minutes</p>
                  </div>
                </div>
                
                {tool?.hasAudio && (
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="Volume2" size={12} />
                    <span>Audio</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {tool?.description}
              </p>
              {isActive && (
                <div className="mb-4 space-y-4">
                  {tool?.hasAudio && (
                    <AudioPlayer key={`${tool?.id}-${tool?.audioUrl}`} audioUrl={tool?.audioUrl} />
                  )}
                  
                  {!tool?.hasAudio && (
                    <div className="p-3 bg-card rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-card-foreground">
                          {isRunning ? 'In Progress' : 'Paused'}
                        </span>
                        <span className="text-lg font-mono text-primary">
                          {formatTime(timeRemaining)}
                        </span>
                      </div>
                      
                      <div className="w-full bg-muted rounded-full h-2 mb-3">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-1000"
                          style={{
                            width: `${((tool?.duration * 60 - timeRemaining) / (tool?.duration * 60)) * 100}%`
                          }}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={pauseTimer}
                          className="flex-1"
                        >
                          <Icon name={isRunning ? "Pause" : "Play"} size={14} className="mr-1" />
                          {isRunning ? 'Pause' : 'Resume'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={stopTimer}
                        >
                          <Icon name="Square" size={14} />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {!isActive && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="Users" size={12} />
                    <span>{tool?.completions} completed today</span>
                  </div>
                  
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => startTool(tool)}
                    className="micro-feedback"
                  >
                    <Icon name="Play" size={14} className="mr-1" />
                    Start
                  </Button>
                </div>
              )}
              <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                  <span className="text-xs text-muted-foreground">{tool?.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-primary font-medium capitalize">
                  {tool?.difficulty}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveTools;