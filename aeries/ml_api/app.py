import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# ---------------------------
# Initialize FastAPI
# ---------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Load Emotion Model
# ---------------------------
MODEL_PATH = "./model"

tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()

print("Number of labels:", model.config.num_labels)

# ---------------------------
# GoEmotions Labels
# ---------------------------
GOEMOTIONS_LABELS = [
    "admiration", "amusement", "anger", "annoyance", "approval",
    "caring", "confusion", "curiosity", "desire", "disappointment",
    "disapproval", "disgust", "embarrassment", "excitement", "fear",
    "gratitude", "grief", "joy", "love", "nervousness",
    "optimism", "pride", "realization", "relief", "remorse",
    "sadness", "surprise", "neutral"
]

# ---------------------------
# Input Schema
# ---------------------------
class TextInput(BaseModel):
    text: str

# ---------------------------
# Root Endpoint
# ---------------------------
@app.get("/")
def home():
    return {"message": "Emotion API is running 🚀"}

# ---------------------------
# Prediction Endpoint
# ---------------------------
@app.post("/predict")
def predict(input: TextInput):

    # -------- Emotion Prediction --------
    inputs = tokenizer(
        input.text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    ).to(device)

    with torch.no_grad():
        outputs = model(**inputs)
        predicted_class = torch.argmax(outputs.logits, dim=1).item()

    emotion = GOEMOTIONS_LABELS[predicted_class]

    # -------- Simple Reply (No OpenAI) --------
    reply = f"You seem to be feeling {emotion}. I'm here for you 💙"

    return {
        "emotion": emotion,
        "reply": reply
    }