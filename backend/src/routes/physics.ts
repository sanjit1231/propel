import express, { Request, Response } from 'express';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

const SIMS = [
  { id: 1, name: 'Projectile Motion', subject: 'Physics 1', topic: 'Kinematics' },
  { id: 2, name: 'Forces & Acceleration', subject: 'Physics 1', topic: 'Forces' },
  { id: 3, name: 'Energy Conservation', subject: 'Physics 1', topic: 'Energy' },
  { id: 4, name: 'Collision Simulator', subject: 'Physics 1', topic: 'Momentum' },
  { id: 5, name: 'Spring Oscillator', subject: 'Physics 1', topic: 'Oscillations' },
  { id: 6, name: 'Wave Interference', subject: 'Physics 2', topic: 'Waves' },
  { id: 7, name: 'Mirror Optics', subject: 'Physics 2', topic: 'Optics' },
  { id: 8, name: 'Electric Fields', subject: 'Physics C', topic: 'E&M' },
  { id: 9, name: 'Molecular Viewer', subject: 'Chemistry', topic: 'Structure' },
  { id: 10, name: 'DNA Replication', subject: 'Biology', topic: 'Molecular' },
];

router.get('/simulations', (req: Request, res: Response) => {
  const { subject } = req.query;
  let filtered = SIMS;
  if (subject) {
    filtered = SIMS.filter((s) => s.subject === subject);
  }
  res.json(filtered);
});

router.get('/simulations/:id', (req: Request, res: Response) => {
  const sim = SIMS.find((s) => s.id === parseInt(req.params.id));
  const config = {
    ...sim,
    physics: { g: 9.8, friction: 0.1 },
    animation: { fps: 60, trail: true },
  };
  res.json(config);
});

router.post('/states', verifyToken, (req: Request, res: Response) => {
  res.json({ success: true, stateId: Math.random() });
});

router.get('/states', verifyToken, (req: Request, res: Response) => {
  res.json([{ id: 1, name: '45° Launch', simId: 1 }]);
});

export default router;
