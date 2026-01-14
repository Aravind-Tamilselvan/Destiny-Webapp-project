import React, { useEffect, useState, useRef } from 'react'
import "./ChatBot.css"
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import useUser from '../hooks/useUser';
import { useChatMutation } from '../hooks/useChatMutation';

const ChatBot = () => {
    const { user } = useUser()
    const [messages, setMessages] = useState([])
    const [state, setState] = useState(false)

    const chatboxRef = useRef(null)
    const inputRef = useRef(null)

    const { mutate, isPending } = useChatMutation()

    useEffect(() => {
        const welcomeMessage = {
            name: "Abimanyu",
            message: "Hello! I am Abimanyu, How can I help you?"
        };
        setMessages([welcomeMessage]);
    }, [])

    const handleMessage = () => {
        const text = inputRef.current.value;
        if (!text.trim()) return;

        const userMessage = { name: user.name, message: text };
        setMessages(prev => [...prev, userMessage]);
        inputRef.current.value = "";

        mutate(text, {
            onSuccess: (data) => {
                const botMessage = {
                    name: "Abimanyu",
                    message: data.reply || "Sorry, I couldn't understand that."
                };
                setMessages(prev => [...prev, botMessage]);
            },
            onError: () => {
                setTimeout(()=>{
                    setMessages(prev => [
                        ...prev,
                        {
                            name: "Abimanyu",
                            message: "Oops! Something went wrong. Please try again later."
                        }
                    ]);
                },5000)
                
            }
        });
    }

    const handleState = (e) => {
        e.preventDefault()
        setState(prev => !prev)
        chatboxRef.current?.classList.toggle('chatbox--active')
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleMessage()
    }

    return (
        <div className="chatbox-container">
            <div className="chatbox">
                <div className="chatbox__support" ref={chatboxRef}>
                    <div className="chatbox__header">
                        <div className="chatbox__image--header">
                            <img src="/assets/chatbot-modified.png" alt="chatbot" />
                        </div>
                        <div className="chatbox__content--header">
                            <h4 className="chatbox__heading--header">Chat support</h4>
                        </div>
                    </div>

                    <div className="chatbox__messages">
                        {messages.slice().map((msg, i) => (
                            <div
                                key={i}
                                className={`messages__item messages__item--${msg.name === "Abimanyu" ? "visitor" : "operator"}`}
                            >
                                {msg.message}
                            </div>
                        ))}

                        {isPending && (
                            <div className="messages__item messages__item--visitor">
                                Typing...
                            </div>
                        )}
                    </div>

                    <div className="chatbox__footer">
                        <input
                            type="text"
                            placeholder="Write a message..."
                            ref={inputRef}
                            onKeyDown={handleKeyPress}
                            disabled={isPending}
                        />
                        <button
                            className="chatbox__send--footer send__button"
                            onClick={handleMessage}
                            disabled={isPending}
                        >
                            <IoMdSend />
                        </button>
                    </div>
                </div>

                <div className="chatbox__button">
                    <button onClick={handleState}>
                        <IoChatbubblesOutline />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatBot
