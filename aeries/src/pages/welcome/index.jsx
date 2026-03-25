import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Welcome = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setIsLoading(true);
      // Store user name in localStorage
      localStorage.setItem('userName', name.trim());
      // Navigate to chat interface after a brief delay for animation
      setTimeout(() => {
        navigate('/chat-interface');
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
              <Icon name="Heart" size={40} color="white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">MindCare</h1>
          <p className="text-lg text-muted-foreground">Your Personal Wellness Companion</p>
        </div>

        {/* Welcome Card */}
        <div className="bg-card rounded-xl shadow-xl p-8 mb-8 border border-border/50">
          <h2 className="text-2xl font-semibold text-card-foreground mb-2">Welcome!</h2>
          <p className="text-muted-foreground mb-8">
            We're here to support your mental health journey. Let's start by getting to know you.
          </p>

          {/* Name Input Form */}
          <form onSubmit={handleContinue} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                What's your name?
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                autoFocus
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full"
              disabled={!name.trim() || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <Icon name="Loader" size={18} />
                  <span>Getting Started...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>Continue</span>
                  <Icon name="ArrowRight" size={18} />
                </span>
              )}
            </Button>
          </form>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="MessageCircle" size={20} className="text-primary" />
            </div>
            <p className="text-xs text-muted-foreground font-medium">Chat Support</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-secondary/10 rounded-full flex items-center justify-center">
              <Icon name="BarChart3" size={20} className="text-secondary" />
            </div>
            <p className="text-xs text-muted-foreground font-medium">Mood Tracking</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name="BookOpen" size={20} className="text-accent" />
            </div>
            <p className="text-xs text-muted-foreground font-medium">Resources</p>
          </div>
        </div>

        {/* Privacy Notice */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Your privacy is important to us. All conversations are end-to-end encrypted.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
