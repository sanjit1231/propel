import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import collegeRoutes from './routes/college';
import apPrepRoutes from './routes/apprep';
import physicsRoutes from './routes/physics';
import studyRoutes from './routes/study';
import { verifyToken } from './middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Error handler middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

// Routes
app.use('/auth', authRoutes);
app.use('/college', collegeRoutes);
app.use('/ap-prep', apPrepRoutes);
app.use('/physics', physicsRoutes);
app.use('/study', studyRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Propel API running on port ${PORT}`);
});
