import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;
        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        try {
            const res = await axios.post("http://localhost:5000/chat", { message: input }, { headers: { "Content-Type": "application/json" } });
            setMessages([...newMessages, { sender: "bot", text: res.data.response }]);
        } catch (error) {
            console.error("Error fetching chatbot response", error);
        }
    };

    return (
        <div className="flex flex-col items-center h-screen p-4 bg-gray-100">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-4 flex flex-col h-4/5 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-2 my-2 rounded-md w-fit max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black"}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="w-full max-w-lg mt-4 flex">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-l-md"
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
