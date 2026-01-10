import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const sendMessage = async (message) => {
  const res = await axios.post(import.meta.mode === 'development' ? "http://localhost:7000/api/chat/chat" : "https://chatbot-backend.onrender.com/api/chat/chat", {
    message,
  });
  return res.data;
};

export const useChatMutation = () => {
  return useMutation({
    mutationFn: sendMessage,
  });
};
