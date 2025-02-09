import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BOOKS } from "@/data/books";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Goalify</h1>
          <p className="text-muted-foreground">
            Transform book insights into actionable goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {BOOKS.map((book) => (
            <Card
              key={book.slug}
              className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in cursor-pointer"
              onClick={() => navigate(`/onboarding/${book.slug}`)}
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-medium">{book.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <Button className="group bg-primary hover:bg-primary/90 text-primary-foreground">
            <Upload className="mr-2 h-4 w-4 group-hover:animate-float" />
            Upload New Book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
