import express, { Request, Response } from 'express';
import { query } from '../config/database';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

const COLLEGES = [
  { name: 'Harvard', sat: 1505, gpa: 4.0, rate: 3.0 },
  { name: 'Stanford', sat: 1485, gpa: 4.0, rate: 3.7 },
  { name: 'MIT', sat: 1535, gpa: 4.0, rate: 3.2 },
  { name: 'Yale', sat: 1500, gpa: 4.0, rate: 4.0 },
  { name: 'Princeton', sat: 1520, gpa: 4.0, rate: 2.8 },
  { name: 'UPenn', sat: 1505, gpa: 4.0, rate: 3.2 },
  { name: 'Northwestern', sat: 1470, gpa: 3.9, rate: 6.0 },
  { name: 'Duke', sat: 1510, gpa: 3.95, rate: 5.8 },
  { name: 'Chicago', sat: 1540, gpa: 3.98, rate: 5.2 },
  { name: 'Cornell', sat: 1480, gpa: 3.85, rate: 7.3 },
  { name: 'UMich', sat: 1400, gpa: 3.8, rate: 17.0 },
  { name: 'UCLA', sat: 1350, gpa: 3.87, rate: 8.6 },
  { name: 'Berkeley', sat: 1410, gpa: 3.88, rate: 8.8 },
  { name: 'Tech', sat: 1410, gpa: 3.84, rate: 17.0 },
  { name: 'Purdue', sat: 1230, gpa: 3.5, rate: 46.0 },
];

router.post('/calculate', async (req: Request, res: Response) => {
  const { sat, gpa } = req.body;

  const reach = COLLEGES.filter((c) => {
    const satDiff = sat - c.sat;
    const gpaDiff = gpa - c.gpa;
    const chance = c.rate + (satDiff / 50) * 5 + (gpaDiff / 0.1) * 10;
    return chance < 20;
  }).sort((a, b) => a.rate - b.rate);

  const target = COLLEGES.filter((c) => {
    const satDiff = sat - c.sat;
    const gpaDiff = gpa - c.gpa;
    const chance = c.rate + (satDiff / 50) * 5 + (gpaDiff / 0.1) * 10;
    return chance >= 20 && chance < 60;
  }).sort((a, b) => b.rate - a.rate);

  const likely = COLLEGES.filter((c) => {
    const satDiff = sat - c.sat;
    const gpaDiff = gpa - c.gpa;
    const chance = c.rate + (satDiff / 50) * 5 + (gpaDiff / 0.1) * 10;
    return chance >= 60;
  }).sort((a, b) => b.rate - a.rate);

  res.json({ reach, target, likely });
});

export default router;
