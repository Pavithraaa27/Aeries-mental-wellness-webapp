🧠 Aeries: Emotion-Aware AI Mental Wellness Platform

Aeries is an AI-powered mental wellness platform designed to provide emotion-aware conversational support along with integrated therapeutic tools such as journaling, relaxation content, and guided breathing exercises.

📌 Overview

Mental health challenges like stress, anxiety, and emotional imbalance are increasing, while access to timely support remains limited. Aeries addresses this gap by combining:

🤖 Emotion-aware chatbot
🧠 AI-driven emotion detection
💬 Empathetic response generation
🧘 Self-care and wellness modules

The platform leverages Natural Language Processing (NLP) and Transformer-based models to understand user emotions and respond accordingly.

🚀 Features
💬 Conversational AI
Emotion-aware chatbot
Contextual and empathetic responses
Real-time interaction
🎯 Emotion Detection
Transformer-based model (BERT)
Detects emotions like:
Happy 😊
Sad 😔
Stressed 😣
Anxious 😟
📝 Digital Journaling
Record thoughts and emotions
Track emotional patterns over time
🎥 Relaxation Module
Mindfulness and stress-relief videos
🎧 Audio Therapy
Guided breathing exercises
Relaxation audio support
🏗️ System Architecture

The system follows a client-server architecture:

User inputs message via frontend (React)
Backend (FastAPI) processes request
Emotion detection model analyzes input
Generative AI creates response
Response sent back to user interface
🛠️ Tech Stack
Frontend
React.js
HTML, CSS, JavaScript
Backend
FastAPI
Uvicorn (ASGI server)
AI/ML
PyTorch
Hugging Face Transformers
BERT (Emotion Detection)
Generative Language Model (API-based)
Other Tools
REST APIs
CORS Middleware
Environment Variables for security
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/aeries.git
cd aeries
2️⃣ Backend Setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
3️⃣ Frontend Setup
cd frontend
npm install
npm start
📊 Results
🎯 Emotion Detection Accuracy: 86.5%
⚡ Average Response Time: 2.3 seconds
👥 User Satisfaction: ~80% found responses empathetic
🔐 Security
API keys stored using environment variables
CORS enabled for secure communication
User data handled with confidentiality
📈 Future Enhancements
🎙️ Voice-based emotion detection
🧠 Multi-label emotion classification
☁️ Cloud deployment for scalability
💾 Chat memory for personalized experience
📚 Fine-tuned domain-specific models
⚠️ Disclaimer

Aeries is not a substitute for professional mental health care. It is designed to provide supportive assistance and should be used alongside professional guidance when needed.

👩‍💻 Authors
Esha Gupta
Pavithra Nair
Sonali Gautam

Information Science and Engineering
Jain (Deemed-to-be) University, Bengaluru

📄 License

This project is for academic and research purposes.
