import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { cepRoutes } from "./routes/cep.routes";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);
app.use(express.json());

// Healthcheck
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/cep", cepRoutes);

export { app };
