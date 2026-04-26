import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import gamesRouter from "./routes/games.js";
import authRouter from "./routes/auth.js";
import cartRouter from "./routes/cart.js";

dotenv.config({ path: new URL('../../.env', import.meta.url).pathname });

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// routes
app.use("/api/games", gamesRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);

// health check
app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});