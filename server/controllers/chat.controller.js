import axios from "axios"

export const chat = async (req, res) => {
    try {
        const userMessage = req.body.message;
        const response = await axios.post("http://127.0.0.1:8001/chat", {
            message: userMessage,
        });

        res.json({ reply: response.data.reply });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ reply: "Chatbot service unavailable" });
    }
}