import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MessageBubble from './components/MessageBubble';
import CrisisAlert from './components/CrisisAlert';
import WellnessQuickActions from './components/WellnessQuickActions';
import MessageInput from './components/MessageInput';
import MoodIndicator from './components/MoodIndicator';
import ConversationHeader from './components/ConversationHeader';
import { analyzeMessageSentiment, generateTherapeuticResponse, checkOpenAIConfiguration } from '../../utils/openai';

const ChatInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMood, setCurrentMood] = useState(null);
  const [moodConfidence, setMoodConfidence] = useState(0);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [sessionStartTime] = useState(Date.now());
  const [openaiConfigured, setOpenaiConfigured] = useState(false);

  // Check OpenAI configuration on component mount
  useEffect(() => {
    const configured = checkOpenAIConfiguration();
    setOpenaiConfigured(configured);
    
    if (!configured) {
      console.warn('OpenAI API key not configured. Add VITE_OPENAI_API_KEY to your .env file.');
    }
  }, []);

  // Fallback responses when OpenAI is not configured
  const fallbackResponses = {
    crisis: [
      "I'm really concerned about what you're sharing. Your safety is the most important thing right now. Please reach out to the National Suicide Prevention Lifeline at 988 or emergency services immediately.",
      "Thank you for trusting me with these difficult feelings. You're not alone, and there are people who want to help you through this. Please call 988 for immediate crisis support."
    ],
    anxious: [
      "I can sense you\'re feeling anxious right now. That\'s completely understandable. Let\'s take this one step at a time. Would you like to try a quick breathing exercise together?",
      "Anxiety can feel overwhelming, but you're safe right now. I'm here with you. Can you tell me what's making you feel most anxious at this moment?"
    ],
    sad: [
      "I hear the sadness in your words, and I want you to know that it's okay to feel this way. Your feelings are valid. Would you like to talk about what's contributing to these feelings?",
      "It sounds like you're going through a difficult time. I'm here to listen and support you. Sometimes sharing our feelings can help lighten the emotional load."
    ],
    stressed: [
      "It sounds like you\'re under a lot of pressure right now. Stress can be really challenging to manage. What\'s the biggest source of stress for you today?",
      "I can tell you're feeling overwhelmed. Let's work together to break down what you're dealing with into smaller, more manageable pieces."
    ],
    happy: [
      "I\'m so glad to hear some positivity in your message! It\'s wonderful when we can find moments of joy. What\'s bringing you happiness today?",
      "Your positive energy is really coming through! It\'s great to celebrate these good moments. How are you feeling overall?"
    ],
    neutral: [
      "Thank you for sharing that with me. I\'m here to listen and support you however I can. How are you feeling right now?",
      "I appreciate you taking the time to talk with me. What would be most helpful for you in our conversation today?"
    ]
  };

  // Crisis keywords for fallback detection
  const crisisKeywords = [
    'suicide', 'kill myself', 'end it all', 'not worth living', 'hurt myself',
    'die', 'death', 'harm myself', 'no point', 'give up', 'hopeless'
  ];

  // Fallback sentiment analysis
  const analyzeSentimentFallback = (text) => {
    const lowerText = text?.toLowerCase();
    
    if (crisisKeywords?.some(keyword => lowerText?.includes(keyword))) {
      return { sentiment: 'crisis', confidence: 0.95, riskLevel: 'crisis' };
    }
    
    if (lowerText?.includes('anxious') || lowerText?.includes('worried') || lowerText?.includes('panic')) {
      return { sentiment: 'anxious', confidence: 0.85, riskLevel: 'medium' };
    }
    
    if (lowerText?.includes('sad') || lowerText?.includes('depressed') || lowerText?.includes('down')) {
      return { sentiment: 'sad', confidence: 0.80, riskLevel: 'medium' };
    }
    
    if (lowerText?.includes('stressed') || lowerText?.includes('overwhelmed') || lowerText?.includes('pressure')) {
      return { sentiment: 'stressed', confidence: 0.75, riskLevel: 'medium' };
    }
    
    if (lowerText?.includes('happy') || lowerText?.includes('great') || lowerText?.includes('wonderful')) {
      return { sentiment: 'happy', confidence: 0.80, riskLevel: 'low' };
    }
    
    return { sentiment: 'neutral', confidence: 0.60, riskLevel: 'low' };
  };

  // Initialize with welcome message
  useEffect(() => {
    const userName = localStorage.getItem('userName') || 'Friend';
    const welcomeMessage = {
      id: 1,
      text: openaiConfigured 
        ? `Hello ${userName}! I'm your MindCare assistant, powered by advanced AI to provide personalized emotional support and wellness guidance. I'm trained to listen without judgment and help you navigate your feelings with evidence-based techniques.\n\nHow are you feeling today? Feel free to share whatever is on your mind.` : `Hello ${userName}! I'm your MindCare assistant, here to provide emotional support and wellness guidance. I'm trained to listen without judgment and help you navigate your feelings.\n\nNote: For the best experience, our backend AI is ready to help.\n\nHow are you feeling today? Feel free to share whatever is on your mind.`,
      isUser: false,
      timestamp: new Date()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sentiment: 'neutral'
    };
    
    setMessages([welcomeMessage]);

    // Check for crisis mode from URL
    const urlParams = new URLSearchParams(location.search);
    if (urlParams?.get('crisis') === 'true') {
      setShowCrisisAlert(true);
    }
  }, [location, openaiConfigured]);

  // Session duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionDuration(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionStartTime]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Analyze sentiment using OpenAI or fallback
      let sentimentAnalysis;
      if (openaiConfigured) {
        sentimentAnalysis = await analyzeMessageSentiment(messageText);
      } else {
        sentimentAnalysis = analyzeSentimentFallback(messageText);
      }

      setCurrentMood(sentimentAnalysis?.sentiment);
      setMoodConfidence(sentimentAnalysis?.confidence || 0);

      // Check for crisis
      if (sentimentAnalysis?.sentiment === 'crisis' || sentimentAnalysis?.riskLevel === 'crisis') {
        setShowCrisisAlert(true);
      }

      let aiResponseText;

      if (openaiConfigured) {
        // Use OpenAI for response generation
        const allMessages = [...messages, userMessage];
        aiResponseText = await generateTherapeuticResponse(allMessages, sentimentAnalysis);
      } else {
        // Use fallback responses
        const responseOptions = fallbackResponses?.[sentimentAnalysis?.sentiment] || fallbackResponses?.neutral;
        aiResponseText = responseOptions?.[Math.floor(Math.random() * responseOptions?.length)];
      }

      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponseText,
        isUser: false,
        timestamp: new Date()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sentiment: sentimentAnalysis?.sentiment
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Save mood to localStorage
      localStorage.setItem('currentMood', JSON.stringify({
        type: sentimentAnalysis?.sentiment,
        confidence: sentimentAnalysis?.confidence,
        timestamp: Date.now()
      }));

      // Update chat activity
      const today = new Date()?.toDateString();
      const currentActivity = parseInt(localStorage.getItem(`chatActivity_${today}`) || '0');
      localStorage.setItem(`chatActivity_${today}`, (currentActivity + 1)?.toString());

    } catch (error) {
      console.error('Error processing message:', error);
      
      // Fallback error response
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble processing your message right now. Please try again, or if this continues, consider reaching out to a mental health professional for support.",
        isUser: false,
        timestamp: new Date()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sentiment: 'neutral'
      };

      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleWellnessAction = (action) => {
    let actionMessage = '';
    
    switch (action?.id) {
      case 'breathing':
        actionMessage = "Let's do a 4-7-8 breathing exercise together. Breathe in for 4 counts, hold for 7, exhale for 8. Ready? Let's begin... Inhale... 1, 2, 3, 4... Hold... 1, 2, 3, 4, 5, 6, 7... Exhale... 1, 2, 3, 4, 5, 6, 7, 8. Great job! How do you feel?";
        break;
      case 'grounding':
        actionMessage = "Let's try the 5-4-3-2-1 grounding technique. Look around and name:\n• 5 things you can see\n• 4 things you can touch\n• 3 things you can hear\n• 2 things you can smell\n• 1 thing you can taste\n\nThis helps bring you back to the present moment. Take your time.";
        break;
      case 'affirmation':
        actionMessage = "Here's a positive affirmation for you: 'I am resilient, I am worthy, and I have the strength to overcome challenges.' Repeat this to yourself, and remember - you are more capable than you realize. What positive qualities do you see in yourself?";
        break;
      case 'journal': navigate('/mood-journal');
        return;
    }

    const aiMessage = {
      id: Date.now(),
      text: actionMessage,
      isUser: false,
      timestamp: new Date()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sentiment: 'neutral'
    };

    setMessages(prev => [...prev, aiMessage]);
  };

  const handleClearChat = () => {
    setMessages([{
      id: 1,
      text: openaiConfigured 
        ? "Chat cleared. I'm here to support you. How can I help you today?" :"Chat cleared. How can I help you today?",
      isUser: false,
      timestamp: new Date()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sentiment: 'neutral'
    }]);
    setCurrentMood(null);
  };

  const handleExportChat = () => {
    const chatData = messages?.map(msg => ({
      timestamp: msg?.timestamp,
      sender: msg?.isUser ? 'User' : 'MindCare Assistant',
      message: msg?.text,
      sentiment: msg?.sentiment || 'N/A'
    }));

    const csvContent = "data:text/csv;charset=utf-8," + "Timestamp,Sender,Message,Sentiment\n"
      + chatData?.map(row => `"${row?.timestamp}","${row?.sender}","${row?.message?.replace(/"/g, '""')}","${row?.sentiment}"`)?.join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link?.setAttribute("href", encodedUri);
    link?.setAttribute("download", `mindcare-chat-${new Date()?.toISOString()?.split('T')?.[0]}.csv`);
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const handleCrisisHelp = () => {
    window.open('tel:988', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {!openaiConfigured && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mx-4 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            <p className="text-sm text-yellow-800">
              <strong>Enhanced AI Features Available:</strong> Add your OpenAI API key to .env file (VITE_OPENAI_API_KEY) for personalized therapeutic responses and advanced sentiment analysis.
            </p>
          </div>
        </div>
      )}
      
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <ConversationHeader
          onClearChat={handleClearChat}
          onExportChat={handleExportChat}
          messageCount={messages?.length}
          sessionDuration={sessionDuration}
        />

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages?.map((message) => (
              <MessageBubble
                key={message?.id}
                message={message?.text}
                isUser={message?.isUser}
                timestamp={message?.timestamp}
                sentiment={message?.sentiment}
                isTyping={false}
              />
            ))}
            
            {isTyping && (
              <MessageBubble 
                isTyping={true}
                message=""
                isUser={false}
                timestamp=""
                sentiment="neutral"
              />
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        <MessageInput
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          disabled={isTyping}
        />
      </div>
      
      <MoodIndicator
        currentMood={currentMood}
        confidence={moodConfidence}
        isVisible={currentMood && currentMood !== 'neutral'}
      />
      
      <WellnessQuickActions
        onActionSelect={handleWellnessAction}
        isVisible={!showCrisisAlert}
      />
      
      <CrisisAlert
        isVisible={showCrisisAlert}
        onClose={() => setShowCrisisAlert(false)}
        onGetHelp={handleCrisisHelp}
      />
    </div>
  );
};

export default ChatInterface;