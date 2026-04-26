import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// GET all games (with optional search and pagination)
router.get("/", async (req, res) => {
  const { search, page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;

  let query = supabase
    .from("games")
    .select("*", { count: "exact" })
    .range(offset, offset + limit - 1);

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) return res.status(500).json({ error: error.message });

  res.json({
    games: data,
    total: count,
    page: parseInt(page),
    totalPages: Math.ceil(count / limit),
  });
});

// GET single game by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(404).json({ error: "Game not found" });

  res.json(data);
});

export default router;