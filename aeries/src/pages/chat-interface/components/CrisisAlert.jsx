import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CrisisAlert = ({ isVisible, onClose, onGetHelp }) => {
  if (!isVisible) return null;

  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free 24/7 crisis counseling"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Mental health & substance abuse"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg p-6 max-w-md w-full therapeutic-shadow border-2 border-error">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-error rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">Crisis Support Available</h3>
            <p className="text-sm text-muted-foreground">You're not alone. Help is available right now.</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {crisisResources?.map((resource, index) => (
            <div key={index} className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-sm text-foreground">{resource?.name}</h4>
                <Icon name="Phone" size={14} className="text-primary" />
              </div>
              <p className="font-mono text-lg text-primary font-semibold">{resource?.number}</p>
              <p className="text-xs text-muted-foreground">{resource?.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-accent/10 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-2">
            <Icon name="Heart" size={16} className="text-accent mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium mb-1">Immediate Self-Care</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Take slow, deep breaths</li>
                <li>• Find a safe, comfortable space</li>
                <li>• Reach out to someone you trust</li>
                <li>• Remember: This feeling will pass</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="default"
            onClick={onGetHelp}
            className="flex-1"
            iconName="Phone"
            iconPosition="left"
          >
            Get Help Now
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            iconName="MessageCircle"
            iconPosition="left"
          >
            Continue Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CrisisAlert;