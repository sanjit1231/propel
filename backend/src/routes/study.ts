import express, { Request, Response } from 'express';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

const DECKS = [
  { id: 1, name: 'Physics 1 Kinematics', subject: 'Physics 1', cardCount: 25 },
  { id: 2, name: 'Physics 1 Forces', subject: 'Physics 1', cardCount: 20 },
  { id: 3, name: 'Chemistry Atomic Structure', subject: 'Chemistry', cardCount: 30 },
  { id: 4, name: 'Biology Cell Structure', subject: 'Biology', cardCount: 35 },
  { id: 5, name: 'Calculus Derivatives', subject: 'Calculus', cardCount: 28 },
];

const CARDS = [
  { id: 1, deckId: 1, front: 'What is displacement?', back: 'Change in position from start to end point' },
  { id: 2, deckId: 1, front: 'Define velocity', back: 'Rate of change of displacement (displacement/time)' },
  { id: 3, deckId: 1, front: 'What is acceleration?', back: 'Rate of change of velocity (v₁-v₀)/t' },
  { id: 4, deckId: 2, front: 'Newtons Second Law', back: 'F = ma' },
  { id: 5, deckId: 2, front: 'Friction formula', back: 'f = μN where μ is coefficient and N is normal force' },
];

router.get('/decks', verifyToken, (req: Request, res: Response) => {
  const { subject } = req.query;
  let filtered = DECKS;
  if (subject) {
    filtered = DECKS.filter((d) => d.subject === subject);
  }
  res.json(filtered);
});

router.get('/decks/:id/cards', (req: Request, res: Response) => {
  const cards = CARDS.filter((c) => c.deckId === parseInt(req.params.id));
  res.json(cards);
});

router.post('/session', verifyToken, (req: Request, res: Response) => {
  res.json({ sessionId: Math.random(), deckId: req.body.deckId });
});

router.post('/card-result', verifyToken, (req: Request, res: Response) => {
  const { cardId, quality } = req.body;
  res.json({ success: true, nextCard: Math.floor(Math.random() * 5) + 1 });
});

router.get('/progress', verifyToken, (req: Request, res: Response) => {
  res.json({
    totalCards: 150,
    mastered: 45,
    masteryPercent: 30,
    streakDays: 5,
  });
});

export default router;
