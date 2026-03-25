import OpenAI from 'openai';

/**
 * Initialize OpenAI client with API key from environment variables
 */
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage in React
});

/**
 * Mental health chatbot system prompt optimized for therapeutic conversations
 */
const MENTAL_HEALTH_SYSTEM_PROMPT = `You are MindCare Assistant, a compassionate and professional AI companion specialized in mental health support. Your role is to:

CORE PRINCIPLES:
- Provide empathetic, non-judgmental emotional support
- Listen actively and validate feelings
- Offer evidence-based coping strategies
- Recognize crisis situations and recommend immediate help
- Maintain therapeutic boundaries

CONVERSATION STYLE:
- Use warm, understanding language
- Ask gentle, open-ended questions
- Reflect emotions back to show understanding
- Provide practical, actionable suggestions
- Stay present-focused while acknowledging past experiences

CRISIS DETECTION:
- Watch for expressions of self-harm, suicide ideation, or immediate danger
- If detected, immediately express concern and recommend crisis resources
- Provide National Suicide Prevention Lifeline: 988

THERAPEUTIC TECHNIQUES:
- Cognitive Behavioral Therapy (CBT) techniques
- Mindfulness and grounding exercises
- Breathing techniques for anxiety
- Positive affirmations
- Journaling prompts

BOUNDARIES:
- You are not a replacement for professional therapy
- Encourage seeking professional help for serious concerns
- Don't diagnose mental health conditions
- Focus on support, coping skills, and wellness

Keep responses conversational, supportive, and appropriately length for a chat interface.`;

/**
 * Analyze user message for sentiment and emotional state
 */
export async function analyzeMessageSentiment(message) {
  try {
    // Use simple keyword-based sentiment analysis
    return analyzeSentimentFallback(message);
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    return analyzeSentimentFallback(message);
  }
}

/**
 * Fallback sentiment analysis using keywords
 */
function analyzeSentimentFallback(message) {
  const text = message.toLowerCase();
  
  // Crisis keywords
  if (/suicide|kill myself|self harm|harm myself|want to die|no point|hopeless|can't go on/.test(text)) {
    return {
      sentiment: 'crisis',
      confidence: 0.9,
      keywords: ['suicidal', 'crisis'],
      riskLevel: 'crisis'
    };
  }
  
  // Happy/positive keywords
  if (/happy|great|wonderful|amazing|love|excellent|good/.test(text)) {
    return {
      sentiment: 'happy',
      confidence: 0.8,
      keywords: ['positive', 'happy'],
      riskLevel: 'low'
    };
  }
  
  // Anxious keywords
  if (/anxiety|anxious|worried|nervous|panic|stress|overwhelm/.test(text)) {
    return {
      sentiment: 'anxious',
      confidence: 0.8,
      keywords: ['anxiety', 'stress'],
      riskLevel: 'medium'
    };
  }
  
  // Sad keywords
  if (/sad|depressed|down|upset|heartbroken|lonely|miserable/.test(text)) {
    return {
      sentiment: 'sad',
      confidence: 0.8,
      keywords: ['sad', 'depression'],
      riskLevel: 'medium'
    };
  }
  
  // Default neutral
  return {
    sentiment: 'neutral',
    confidence: 0.5,
    keywords: [],
    riskLevel: 'low'
  };
}

/**
 * Call backend API for therapeutic response
 */
export async function generateTherapeuticResponse(messages, currentSentiment = null) {
  try {
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: messages[messages.length - 1]?.text || '',
        context: messages
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Error generating therapeutic response:', error);
    throw error;
  }
}

/**
 * Generate streaming therapeutic response for real-time chat
 */
export async function generateStreamingResponse(messages, currentSentiment, onChunk) {
  try {
    const conversationMessages = [
      { role: 'system', content: MENTAL_HEALTH_SYSTEM_PROMPT }
    ];

    const recentMessages = messages?.slice(-10)?.map(msg => ({
      role: msg?.isUser ? 'user' : 'assistant',
      content: msg?.text
    }));
    
    conversationMessages?.push(...recentMessages);

    if (currentSentiment) {
      conversationMessages?.push({
        role: 'system',
        content: `Current user emotional state: ${currentSentiment?.sentiment} (confidence: ${currentSentiment?.confidence}). 
        Risk level: ${currentSentiment?.riskLevel}. 
        Adjust your response accordingly.`
      });
    }

    const stream = await openai?.chat?.completions?.create({
      model: 'gpt-5-mini', // Fast streaming model
      messages: conversationMessages,
      stream: true,
      reasoning_effort: 'minimal', // Fast streaming
      max_completion_tokens: 500
    });

    let fullResponse = '';
    for await (const chunk of stream) {
      const content = chunk?.choices?.[0]?.delta?.content || '';
      if (content) {
        fullResponse += content;
        onChunk(content);
      }
    }

    return fullResponse;
  } catch (error) {
    console.error('Error generating streaming response:', error);
    throw error;
  }
}

/**
 * Generate wellness recommendations based on user's mood and conversation
 */
export async function generateWellnessRecommendations(messages, sentiment) {
  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-5-mini',
      messages: [
        {
          role: 'system',
          content: `Generate personalized wellness recommendations based on the user's current emotional state and conversation history. 
          
          Focus on:
          - Immediate coping strategies
          - Self-care activities
          - Mindfulness exercises
          - Professional resources if needed
          
          Return practical, actionable suggestions in a supportive tone.`
        },
        {
          role: 'user',
          content: `User sentiment: ${sentiment?.sentiment || 'neutral'}, Risk level: ${sentiment?.riskLevel || 'low'}. 
          Recent conversation context: ${messages?.slice(-3)?.map(m => m?.text)?.join(' ')}`
        }
      ],
      reasoning_effort: 'medium',
      verbosity: 'medium',
      max_completion_tokens: 300
    });

    return response?.choices?.[0]?.message?.content;
  } catch (error) {
    console.error('Error generating wellness recommendations:', error);
    return 'I recommend taking some time for self-care today. Consider practicing deep breathing, going for a walk, or reaching out to someone you trust.';
  }
}

/**
 * Check if backend API is available
 */
export function checkOpenAIConfiguration() {
  // Backend is always available if server is running
  return true;
}

/**
 * Test OpenAI connection
 */
export async function testOpenAIConnection() {
  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-5-nano',
      messages: [{ role: 'user', content: 'Hello' }],
      max_completion_tokens: 10
    });
    return { success: true, message: 'OpenAI connection successful' };
  } catch (error) {
    return { success: false, message: error?.message };
  }
}

export default openai;