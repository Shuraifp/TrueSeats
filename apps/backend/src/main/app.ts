import "reflect-metadata";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRouter from "../presentation/routes/AuthRoutes";
import eventRouter from "../presentation/routes/EventRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from 'cors';
import helmet from 'helmet'; 
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import { initDatabase } from "../infrastructure/database/init";

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan('dev'))
app.use(cookieParser());
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter);

app.use(errorHandler);

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "OK" });
});

initDatabase()

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});