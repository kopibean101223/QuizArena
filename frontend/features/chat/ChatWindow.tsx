"use client";

import { useState } from "react";
import { useSocket } from "@/hooks/useSocket";

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
}

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const socket = useSocket({
    onMessage: (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    },
  });

  const sendMessage = () => {
    if (!input.trim() || !socket) return;
    socket.emit("chat:message", { text: input });
    setInput("");
  };

  return (
    <div className="flex h-full flex-col gap-3 rounded-lg border border-gray-200 p-4">
      <div className="flex-1 space-y-2 overflow-y-auto">
        {messages.map((m) => (
          <div key={m.id} className="rounded-md bg-gray-100 px-3 py-2 text-sm">
            <span className="font-medium">{m.sender}: </span>
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <button
          onClick={sendMessage}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
