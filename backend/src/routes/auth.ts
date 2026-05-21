import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/database';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await query(
      'INSERT INTO users (email, password_hash, first_name, last_name, subscription_tier) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [email, hash, firstName, lastName, 'free']
    );
    const userId = result.rows[0].id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, userId });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await query('SELECT id, password_hash FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
});

export default router;
