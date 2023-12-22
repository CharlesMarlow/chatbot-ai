import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';

config();

// Middlewares
const app = express();
app.use(express.json());

// Remove on prod
app.use(morgan("dev"));

app.use('/api/v1', appRouter);

export default app;