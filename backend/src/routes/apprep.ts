import express, { Request, Response } from 'express';
import { query } from '../config/database';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.get('/frqs', async (req: Request, res: Response) => {
  try {
    const { subject } = req.query;
    let queryStr = 'SELECT id, subject, title, question, solution, hints, difficulty, points FROM frqs';
    const params: any[] = [];

    if (subject) {
      queryStr += ' WHERE subject = $1';
      params.push(subject);
    }

    queryStr += ' ORDER BY difficulty';
    const result = await query(queryStr, params);
    res.json(result.rows);
  } catch (error) {
    console.error('FRQ fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch FRQs' });
  }
});

router.get('/frqs/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM frqs WHERE id = $1', [id]);
    res.json(result.rows[0] || { error: 'FRQ not found' });
  } catch (error) {
    console.error('FRQ fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch FRQ' });
  }
});

router.post('/attempts', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { frqId, response, score } = req.body;

    await query(
      'INSERT INTO frq_attempts (user_id, frq_id, response, score) VALUES ($1, $2, $3, $4)',
      [userId, frqId, response, score]
    );

    res.json({ success: true, message: 'Attempt recorded' });
  } catch (error) {
    console.error('Attempt save error:', error);
    res.status(500).json({ error: 'Failed to save attempt' });
  }
});

router.get('/progress', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    // Get total FRQs and completed FRQs
    const totalResult = await query('SELECT COUNT(*) as total FROM frqs');
    const total = parseInt(totalResult.rows[0].total);

    const completedResult = await query(
      'SELECT COUNT(*) as completed FROM frq_attempts WHERE user_id = $1 GROUP BY user_id',
      [userId]
    );
    const completed = completedResult.rows[0]?.completed || 0;

    const masteryPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

    res.json({
      frqsDone: completed,
      totalFrqs: total,
      masteryPercent,
    });
  } catch (error) {
    console.error('Progress fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

export default router;
