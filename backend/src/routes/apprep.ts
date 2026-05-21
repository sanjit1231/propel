import express, { Request, Response } from 'express';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

const FRQS = [
  {
    id: 1,
    subject: 'Physics 1',
    title: 'Projectile Motion',
    question: 'A ball is thrown at 20 m/s at 45°. How far does it travel?',
    solution: 'Use range formula: R = v₀²sin(2θ)/g = 400·sin(90°)/9.8 ≈ 40.8 m',
    hints: ['Use kinematics', 'Separate x and y components', 'Time to return to ground?'],
    difficulty: 'medium',
    points: 7,
  },
  {
    id: 2,
    subject: 'Chemistry',
    title: 'Equilibrium',
    question: 'For N₂ + 3H₂ ⇌ 2NH₃, predict shift when pressure increases',
    solution: 'System shifts right (toward products) since 4 moles → 2 moles',
    hints: ['Count moles', 'Le Chatelier principle', 'Pressure favors fewer moles'],
    difficulty: 'easy',
    points: 5,
  },
  {
    id: 3,
    subject: 'Biology',
    title: 'Photosynthesis',
    question: 'Explain light-dependent reactions and ATP/NADPH production',
    solution: 'Water splits, electrons flow through ETC, H⁺ gradient drives ATP synthase',
    hints: ['Two photosystems involved', 'Water is electron source', 'H⁺ pumping critical'],
    difficulty: 'hard',
    points: 8,
  },
  {
    id: 4,
    subject: 'Calculus',
    title: 'Derivatives',
    question: 'Find derivative of f(x) = sin(3x²+1)',
    solution: 'f\'(x) = cos(3x²+1)·6x',
    hints: ['Identify outer/inner functions', 'Chain rule: df/dx = df/du · du/dx'],
    difficulty: 'medium',
    points: 5,
  },
  {
    id: 5,
    subject: 'Statistics',
    title: 'Hypothesis Testing',
    question: 'Test H₀: μ=70 with sample mean 72, σ=10, n=50, α=0.05',
    solution: 'z = 1.414, critical ±1.96, fail to reject H₀',
    hints: ['Calculate z-statistic', 'Two-tailed test', 'Compare to critical value'],
    difficulty: 'hard',
    points: 8,
  },
];

router.get('/frqs', (req: Request, res: Response) => {
  const { subject } = req.query;
  let filtered = FRQS;
  if (subject) {
    filtered = FRQS.filter((f) => f.subject === subject);
  }
  res.json(filtered);
});

router.get('/frqs/:id', (req: Request, res: Response) => {
  const frq = FRQS.find((f) => f.id === parseInt(req.params.id));
  res.json(frq || { error: 'Not found' });
});

router.post('/attempts', verifyToken, (req: Request, res: Response) => {
  res.json({ success: true, message: 'Attempt recorded' });
});

router.get('/progress', verifyToken, (req: Request, res: Response) => {
  res.json({ frqsDone: 5, masteryPercent: 65 });
});

export default router;
