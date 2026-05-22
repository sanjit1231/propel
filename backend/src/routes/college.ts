import express, { Request, Response } from 'express';
import { query } from '../config/database';

const router = express.Router();

router.post('/calculate', async (req: Request, res: Response) => {
  try {
    const { sat, gpa } = req.body;

    // Query all colleges from database
    const result = await query('SELECT * FROM colleges');
    const colleges = result.rows;

    // Categorize colleges based on user stats
    const reach = colleges.filter((c: any) => {
      const satDiff = sat - c.sat;
      const gpaDiff = gpa - c.gpa;
      const chance = c.accept_rate + (satDiff / 50) * 5 + (gpaDiff / 0.1) * 10;
      return chance < 20;
    }).sort((a: any, b: any) => a.accept_rate - b.accept_rate);

    const target = colleges.filter((c: any) => {
      const satDiff = sat - c.sat;
      const gpaDiff = gpa - c.gpa;
      const chance = c.accept_rate + (satDiff / 50) * 5 + (gpaDiff / 0.1) * 10;
      return chance >= 20 && chance < 60;
    }).sort((a: any, b: any) => b.accept_rate - a.accept_rate);

    const likely = colleges.filter((c: any) => {
      const satDiff = sat - c.sat;
      const gpaDiff = gpa - c.gpa;
      const chance = c.accept_rate + (satDiff / 50) * 5 + (gpaDiff / 0.1) * 10;
      return chance >= 60;
    }).sort((a: any, b: any) => b.accept_rate - a.accept_rate);

    res.json({
      reach: reach.map((c: any) => ({
        name: c.name,
        sat: c.sat,
        gpa: c.gpa,
        rate: c.accept_rate,
      })),
      target: target.map((c: any) => ({
        name: c.name,
        sat: c.sat,
        gpa: c.gpa,
        rate: c.accept_rate,
      })),
      likely: likely.map((c: any) => ({
        name: c.name,
        sat: c.sat,
        gpa: c.gpa,
        rate: c.accept_rate,
      })),
    });
  } catch (error) {
    console.error('College calculation error:', error);
    res.status(500).json({ error: 'Failed to calculate college matches' });
  }
});

export default router;
