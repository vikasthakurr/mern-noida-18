import { useState, useRef, useEffect } from "react";
import axios from "axios";

// RAG backend runs on port 3001, endpoint is /api/chat, returns { answer }
const RAG_URL = "http://localhost:3001/api/chat";

function ChatBot() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm your shopping assistant. Ask me anything about our products 🛍️" },
  ]);
  const [input, setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(RAG_URL, { message: text });
      setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I couldn't connect to the assistant right now. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#2874f0] hover:bg-blue-700 text-white shadow-lg flex items-center justify-center text-2xl transition-all cursor-pointer"
        aria-label="Open chat assistant"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          style={{ maxHeight: "70vh" }}
        >
          {/* header */}
          <div className="bg-[#2874f0] px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2874f0] font-bold text-sm">
              AI
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Shopping Assistant</p>
              <p className="text-blue-200 text-xs">Powered by RAG</p>
            </div>
          </div>

          {/* messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#2874f0] text-white rounded-br-sm"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm">
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* input */}
          <div className="p-3 border-t border-gray-200 bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about products..."
              disabled={loading}
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#2874f0] transition-colors disabled:opacity-60"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-full bg-[#2874f0] hover:bg-blue-700 text-white flex items-center justify-center disabled:opacity-40 cursor-pointer transition-colors shrink-0"
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
