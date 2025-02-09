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
      <div className="w-full">
        <div className="flex flex-col items-center h-[90vh] w-full p-4 bg-gradient-to-r from-blue-50 to-indigo-100">
          {/* Chat Container */}
          <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 flex flex-col h-4/5 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 my-3 rounded-xl text-sm w-fit max-w-sm ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white self-end"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input and Send Button */}
          <div className="w-full max-w-lg mt-4 flex">
            <input
              type="text"
              className="flex-1 p-3 border rounded-l-full focus:outline-none shadow-sm"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r cursor-pointer from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-r-full hover:bg-blue-600 shadow-md transition-all duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
}
