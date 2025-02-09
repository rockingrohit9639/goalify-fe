export const QUESTIONS = [
  {
    question: "Hello! What goals would you like to achieve from this book?",
    key: "goal",
  },
  {
    question: "What is the timeline to achieve your goal?",
    key: "timeline",
  },
  {
    question: "Is there something that you like form the book?",
    key: "somethingElse",
  },
] as const;

export type Question = (typeof QUESTIONS)[number];
export type QuestionKeys = (typeof QUESTIONS)[number]["key"];
