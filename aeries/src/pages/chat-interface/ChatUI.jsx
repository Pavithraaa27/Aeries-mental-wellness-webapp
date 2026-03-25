import { useState } from "react";
import ConversationHeader from "./components/ConversationHeader";
import MessageBubble from "./components/MessageBubble";
import MessageInput from "./components/MessageInput";
import MoodIndicator from "./components/MoodIndicator";
import WellnessQuickActions from "./components/WellnessQuickActions";
import CrisisAlert from "./components/CrisisAlert";
import AudioPlayer from "../../components/AudioPlayer";

function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [youtubeLink, setYoutubeLink] = useState("");


  const sendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;
     console.log("Sending to backend:", userMessage);
    

    // Add user message
    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      console.log("Response status:", res.status);

      const data = await res.json();
      console.log("Backend full response:", data);
      if (!data.reply) {
      throw new Error("No reply from backend");
    }

      setYoutubeLink(data.youtubeLink);
localStorage.setItem("wellnessVideo", data.youtubeLink);
console.log("YouTube link from backend:", data.youtubeLink);
console.log("Saved in localStorage:", localStorage.getItem("wellnessVideo"));


      

      // Add bot reply
      setMessages([...newMessages, { sender: "bot", text: data.reply }]);
    } catch (err) {
      console.error("Error:", err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <ConversationHeader />

      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      <MoodIndicator />
      <WellnessQuickActions />
      <CrisisAlert />

      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
}

export default ChatUI;
