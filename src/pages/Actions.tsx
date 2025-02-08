
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Action {
  id: string;
  title: string;
  description: string;
}

const Actions = () => {
  const navigate = useNavigate();
  const actions: Action[] = [
    {
      id: "1",
      title: "Morning Routine",
      description: "Establish a productive morning routine for better focus",
    },
    {
      id: "2",
      title: "Goal Setting",
      description: "Create SMART goals for personal development",
    },
    {
      id: "3",
      title: "Habit Stacking",
      description: "Implement habit stacking technique for better habits",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Your Action Items</h1>
          <p className="text-muted-foreground">
            Click on any item to see detailed information
          </p>
        </div>

        <div className="space-y-4">
          {actions.map((action) => (
            <Card
              key={action.id}
              className="p-6 group hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in"
              onClick={() => navigate(`/action/${action.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-muted-foreground">{action.description}</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Actions;
