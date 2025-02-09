import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { QuestionKeys, QUESTIONS } from "@/data/questions";
import { apiClient, RUN_ID, WORKFLOW_ID } from "@/lib/client";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
}

const Onboarding = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: QUESTIONS[currentIndex].question,
      sender: "ai",
    },
  ]);

  const [answers, setAnswers] = useState<Record<QuestionKeys, string>>({
    goal: "",
    somethingElse: "",
    timeline: "",
  });

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
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

      setTimeout(() => {
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);

      setCurrentIndex((prev) => prev + 1);
    } else {
      await handleStartConversation();
    }

    formRef.current.reset();
  }

  async function handleStartConversation() {
    setIsLoading(true);

    const llm_content = `My goal is ${answers.goal} and I want to complete it in ${answers.timeline}. And from this book, I have something specific
      and that is ${answers.somethingElse}`;

    await apiClient
      .put(
        `/AgentRag/${WORKFLOW_ID}/${RUN_ID}`,
        {
          eventName: "message",
          eventInput: {
            content: llm_content,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        toast.success(
          error instanceof Error ? error.message : "Something went wrong"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
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
              disabled={isLoading}
              name="answer"
              required
              placeholder="Type your answer..."
              className="flex-1"
              type={
                QUESTIONS[currentIndex].key === "timeline" ? "number" : "text"
              }
            />
            <Button disabled={isLoading} className="group">
              <Send className="h-4 w-4 group-hover:animate-float" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
