import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccessibilityOptions = () => {
  const [textSize, setTextSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);

  const textSizeOptions = [
    { value: 'small', label: 'Small', description: 'Compact text for more content' },
    { value: 'medium', label: 'Medium', description: 'Standard readable text size' },
    { value: 'large', label: 'Large', description: 'Larger text for better readability' },
    { value: 'extra-large', label: 'Extra Large', description: 'Maximum text size for accessibility' }
  ];

  useEffect(() => {
    const savedAccessibility = localStorage.getItem('accessibilitySettings');
    if (savedAccessibility) {
      const settings = JSON.parse(savedAccessibility);
      setTextSize(settings?.textSize || 'medium');
      setHighContrast(settings?.highContrast || false);
      setScreenReader(settings?.screenReader || false);
      setReducedMotion(settings?.reducedMotion || false);
      setKeyboardNavigation(settings?.keyboardNavigation || false);
    }
  }, []);

  const saveAccessibilitySettings = () => {
    const settings = {
      textSize,
      highContrast,
      screenReader,
      reducedMotion,
      keyboardNavigation,
      updatedAt: new Date()?.toISOString()
    };
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    
    // Apply settings immediately
    applyAccessibilitySettings(settings);
  };

  const applyAccessibilitySettings = (settings) => {
    const root = document.documentElement;
    
    // Text size
    const sizeMap = {
      small: '0.875rem',
      medium: '1rem',
      large: '1.125rem',
      'extra-large': '1.25rem'
    };
    root.style?.setProperty('--base-font-size', sizeMap?.[settings?.textSize]);
    
    // High contrast
    if (settings?.highContrast) {
      root.classList?.add('high-contrast');
    } else {
      root.classList?.remove('high-contrast');
    }
    
    // Reduced motion
    if (settings?.reducedMotion) {
      root.classList?.add('reduced-motion');
    } else {
      root.classList?.remove('reduced-motion');
    }
    
    // Keyboard navigation
    if (settings?.keyboardNavigation) {
      root.classList?.add('keyboard-navigation');
    } else {
      root.classList?.remove('keyboard-navigation');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-foreground mb-3">Text Size</h4>
        <div className="grid gap-2">
          {textSizeOptions?.map((option) => (
            <label
              key={option?.value}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                textSize === option?.value
                  ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
              }`}
            >
              <input
                type="radio"
                name="textSize"
                value={option?.value}
                checked={textSize === option?.value}
                onChange={(e) => setTextSize(e?.target?.value)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="font-medium text-sm">{option?.label}</div>
                <div className="text-xs text-muted-foreground">{option?.description}</div>
              </div>
              {textSize === option?.value && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Visual & Motor Accessibility</h4>
        
        <label className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-muted/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Eye" size={20} className="text-primary" />
            </div>
            <div>
              <div className="font-medium text-sm">High Contrast Mode</div>
              <div className="text-xs text-muted-foreground">
                Enhanced contrast for better visibility
              </div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={highContrast}
            onChange={(e) => setHighContrast(e?.target?.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
        </label>

        <label className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-muted/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-secondary" />
            </div>
            <div>
              <div className="font-medium text-sm">Reduced Motion</div>
              <div className="text-xs text-muted-foreground">
                Minimize animations and transitions
              </div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={reducedMotion}
            onChange={(e) => setReducedMotion(e?.target?.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
        </label>

        <label className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-muted/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Keyboard" size={20} className="text-accent" />
            </div>
            <div>
              <div className="font-medium text-sm">Enhanced Keyboard Navigation</div>
              <div className="text-xs text-muted-foreground">
                Improved focus indicators and shortcuts
              </div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={keyboardNavigation}
            onChange={(e) => setKeyboardNavigation(e?.target?.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
        </label>
      </div>
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Screen Reader Support</h4>
        
        <label className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-muted/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Volume2" size={20} className="text-success" />
            </div>
            <div>
              <div className="font-medium text-sm">Screen Reader Optimization</div>
              <div className="text-xs text-muted-foreground">
                Enhanced descriptions and ARIA labels
              </div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={screenReader}
            onChange={(e) => setScreenReader(e?.target?.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
        </label>
      </div>
      <div className="pt-4 border-t">
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Accessibility Information</p>
              <p>
                MindCare is designed to be accessible to all users. These settings help customize 
                your experience based on your specific needs. Changes take effect immediately.
              </p>
            </div>
          </div>
        </div>
        
        <Button onClick={saveAccessibilitySettings} className="w-full">
          Save Accessibility Settings
        </Button>
      </div>
    </div>
  );
};

export default AccessibilityOptions;