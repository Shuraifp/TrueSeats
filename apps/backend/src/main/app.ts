import "reflect-metadata";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "../infrastructure/database";
import userRoutes from "../presentation/routes/userRoutes"
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();

app.use(express.json());


app.use("/api/users", userRoutes);

app.use(errorHandler);

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "OK" });
});

sequelize.authenticate()
  .then(() => console.log("DB connected"))
  .catch(err => console.error("DB connection error:", err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});