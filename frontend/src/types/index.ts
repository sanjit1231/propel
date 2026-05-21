export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  subscriptionTier: 'free' | 'premium';
}

export interface College {
  name: string;
  sat: number;
  gpa: number;
  rate: number;
}

export interface FRQ {
  id: number;
  subject: string;
  title: string;
  question: string;
  solution: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface Flashcard {
  id: number;
  deckId: number;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface FlashcardDeck {
  id: number;
  name: string;
  subject: string;
  cardCount: number;
}

export interface PhysicsSimulation {
  id: number;
  name: string;
  subject: string;
  topic: string;
  description: string;
  physics: {
    g: number;
    friction: number;
  };
  animation: {
    fps: number;
    trail: boolean;
  };
}

export interface CollegeResult {
  reach: College[];
  target: College[];
  likely: College[];
}
