
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "mentor";
  timestamp: Date;
}

interface ChatWindowProps {
  mentor: {
    name: string;
    image?: string;
  };
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ mentor, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hi! I'm ${mentor.name}. How can I help you today?`,
      sender: "mentor",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: newMessage,
          sender: "user",
          timestamp: new Date(),
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-background border rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="flex items-center p-4 border-b">
        <Avatar className="h-10 w-10">
          <AvatarImage src={mentor.image} alt={mentor.name} />
          <AvatarFallback>{mentor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <h3 className="font-semibold">{mentor.name}</h3>
        </div>
        <Button variant="ghost" className="ml-auto" onClick={onClose}>
          ✕
        </Button>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p>{message.text}</p>
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
