import { useRef, useState } from "react";
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

const QUESTIONS = [
  {
    index: 1,
    question: "Hello! What goals would you like to achieve from this book?",
    key: "goal",
  },
  {
    index: 2,
    question: "What is the timeline to achieve your goal?",
    key: "timeline",
  },
  {
    index: 3,
    question: "Is there something that you like form the book?",
    key: "somethingElse",
  },
] as const;

type Question = (typeof QUESTIONS)[number];
type Keys = (typeof QUESTIONS)[number]["key"];

const Chat = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const formRef = useRef<HTMLFormElement>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: QUESTIONS[currentIndex].question,
      sender: "ai",
    },
  ]);

  const [answers, setAnswers] = useState<Record<Keys, string>>({
    goal: "",
    somethingElse: "",
    timeline: "",
  });

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const answer = String(formData.get("answer"));

    const userMessage: Message = {
      id: Date.now().toString(),
      content: answer,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setAnswers((prev) => ({
      ...prev,
      [QUESTIONS[currentIndex].key]: answer,
    }));

    if (currentIndex < QUESTIONS.length - 1) {
      const newQuestion = QUESTIONS[currentIndex + 1];
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: newQuestion.question,
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.log("This is end");
    }

    formRef.current.reset();
  }

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
          <form
            ref={formRef}
            onSubmit={handleFormSubmit}
            className="max-w-2xl mx-auto flex gap-2"
          >
            <Input
              name="answer"
              required
              placeholder="Type your answer..."
              className="flex-1"
            />
            <Button className="group">
              <Send className="h-4 w-4 group-hover:animate-float" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
