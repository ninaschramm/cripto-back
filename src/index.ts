import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from "./routes/authRouters";
import { userRouter } from './routes/userRouters';
import criptoRouter from './routes/criptoRouters';

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});
app.use(authRouter, userRouter, criptoRouter);

export default app;