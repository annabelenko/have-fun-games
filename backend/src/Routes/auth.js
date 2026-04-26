import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ user: data.user });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(401).json({ error: error.message });

  res.json({ user: data.user, session: data.session });
});

// POST /api/auth/logout
router.post("/logout", async (req, res) => {
  const { error } = await supabase.auth.signOut();

  if (error) return res.status(500).json({ error: error.message });

  res.json({ message: "Logged out successfully" });
});

export default router;