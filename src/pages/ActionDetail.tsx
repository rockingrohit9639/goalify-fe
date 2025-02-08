
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
}

const ActionDetail = () => {
  const { actionId } = useParams();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
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
        content: "I'll help you adjust your action plan. What would you like to modify?",
        sender: "ai" as const,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6">Morning Routine</h1>
          <div className="prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground mb-6">
              Establish a productive morning routine that sets you up for success.
              This routine includes meditation, exercise, and planning your day.
            </p>

            <h2 className="text-xl font-semibold mb-4">Steps</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Wake up at 6:00 AM consistently</li>
              <li>10 minutes of meditation</li>
              <li>20 minutes of exercise</li>
              <li>Review your goals and plan your day</li>
              <li>Healthy breakfast</li>
            </ul>
          </div>
        </Card>

        {/* Floating Chat Button */}
        <Button
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>

        {/* Chat Interface */}
        {isChatOpen && (
          <div className="fixed bottom-20 right-6 w-96 bg-background rounded-lg shadow-lg animate-fade-in">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Assistant</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsChatOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${
                    message.sender === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "mr-auto bg-muted"
                  } max-w-[80%] rounded-lg p-3`}
                >
                  {message.content}
                </div>
              ))}
            </div>

            <div className="p-4 border-t flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for assistance..."
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionDetail;
