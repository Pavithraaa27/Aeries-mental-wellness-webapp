// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Groq = require("groq-sdk");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Groq client
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
// 🔗 YouTube Wellness Video
const YOUTUBE_VIDEO_LINK = "https://youtu.be/VpHz8Mb13_Y?si=uYEuzpUd8SET0lh1";


const apiKeyPrefix = process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.substring(0, 10) + '...' : 'NOT SET';
console.log("✅ Groq API Key Loaded:", process.env.GROQ_API_KEY ? "Yes" : "No");
console.log("📌 API Key Prefix:", apiKeyPrefix);


app.get("/", (req, res) => {
  res.send("🤖 MindCare AI Backend is running with Groq...");
});

app.post("/chat", async (req, res) => {
  const { message, context } = req.body;
  
  // ✅ FIRST validate message
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  console.log("📨 Incoming message:", message);

  // 🔮 THEN get emotion from ML API
  let emotion = "neutral";

  try {
    const mlResponse = await axios.post(
      "http://127.0.0.1:8000/predict",
      { text: message }
    );

    emotion = mlResponse.data.emotion;
    console.log("🧠 Detected Emotion:", emotion);

  } catch (err) {
    console.error("❌ ML API Error:", err.message);
  }

  try {
 
    // Build conversation history from context
    const conversationMessages = [
      { 
        role: "system", 
        content: `You are MindCare, a compassionate mental health support AI specializing in emotional wellness.

The user is currently feeling: ${emotion}

Your role is to:
- Provide empathetic, non-judgmental emotional support
- Adjust your tone based on the user's emotion
- Offer helpful coping strategies if needed
- Use warm and understanding language
- Ask gentle, open-ended questions

For anxiety: suggest grounding or breathing exercises  
For stress: help break problems into small steps  
For sadness: provide comfort and emotional support  

Always respond naturally and kindly.`
      }
    ];

    // Add conversation context if provided
    if (context && Array.isArray(context) && context.length > 0) {
      const recentMessages = context.slice(-10).map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text
      }));
      conversationMessages.push(...recentMessages);
    } else {
      // If no context, just add the current message
      conversationMessages.push({ role: "user", content: message });
    }

    // Using Groq API with varied parameters for better responses
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: conversationMessages,
      max_tokens: 500,
      temperature: 0.7, // Increased for more varied responses
      top_p: 0.9,
    });

    const aiReply = response.choices[0].message.content;
    console.log("✅ Response generated:", aiReply.substring(0, 100) + "...");
    res.json({
      reply: aiReply,
      emotion: emotion,
      youtubeLink: YOUTUBE_VIDEO_LINK
    });

  } catch (error) {
    console.error("❌ Groq API Error:", error.message);
    console.error("❌ Full Error:", error);
    res.status(500).json({ 
      error: "API Error",
      details: error.message,
      reply: "I apologize, but I'm having trouble processing your message right now. Please try again, or if this continues, consider reaching out to a mental health professional for support." 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));