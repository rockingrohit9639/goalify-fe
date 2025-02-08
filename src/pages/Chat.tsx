
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
}

const Chat = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! What goals would you like to achieve from this book?",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user" as const,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content:
          "Would you like to see your actionable items based on our discussion?",
        sender: "ai" as const,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-4 mb-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`p-4 animate-fade-in ${
                message.sender === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "mr-auto bg-muted"
              } max-w-[80%]`}
            >
              {message.content}
            </Card>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend} className="group">
              <Send className="h-4 w-4 group-hover:animate-float" />
            </Button>
            {messages.length > 1 && (
              <Button
                onClick={() => navigate("/actions")}
                variant="secondary"
                className="ml-2"
              >
                View Actions
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
