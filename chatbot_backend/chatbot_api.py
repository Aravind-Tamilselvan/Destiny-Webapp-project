import random
import json
import torch
from fastapi import FastAPI
from pydantic import BaseModel
from nltk_utils import tokenize, bag_of_words
from model import NeuralNet

app = FastAPI()

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open("intents.json") as f:
    intents = json.load(f)

data = torch.load("data.pth")
input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data["all_words"]
tags = data["tags"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(data["model_state"])
model.eval()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    sentence = tokenize(req.message.lower())
    X = bag_of_words(sentence, all_words)
    X = torch.from_numpy(X.reshape(1, -1)).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)
    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]

    if prob.item() > 0.4:
        for intent in intents["intents"]:
            if intent["tag"] == tag:
                return {"reply": random.choice(intent["responses"])}

    return {"reply": "I don't understand 😕"}
