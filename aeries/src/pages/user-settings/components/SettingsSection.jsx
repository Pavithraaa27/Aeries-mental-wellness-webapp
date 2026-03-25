import React from 'react';
import Icon from '../../../components/AppIcon';

const SettingsSection = ({ title, description, icon, children, isExpanded, onToggle }) => {
  return (
    <div className="bg-card rounded-lg therapeutic-shadow border console-border">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors rounded-t-lg"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-6 border-t">
          <div className="pt-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsSection;