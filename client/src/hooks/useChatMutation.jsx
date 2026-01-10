import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const sendMessage = async (message) => {
  const res = await axios.post("http://localhost:7000/api/chat/chat", {
    message,
  });
  return res.data;
};

export const useChatMutation = () => {
  return useMutation({
    mutationFn: sendMessage,
  });
};
