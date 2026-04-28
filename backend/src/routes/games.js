import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

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

const gameIds = data.map((g) => g.id);
console.log("gameIds:", gameIds); // ADD THIS

  const { data: gameGenresData, error: ggError } = await supabase
    .from("game_genres")
    .select("game_id, genre_id")
    .in("game_id", gameIds);

  console.log("gameGenresData:", gameGenresData, "error:", ggError);

  const { data: genresData } = await supabase
    .from("genres")
    .select("id, name");

  const genreMap = {};
  genresData?.forEach((g) => { genreMap[g.id] = g.name; });

  const games = data.map((game) => {
    const genreIds = gameGenresData
      ?.filter((gg) => gg.game_id === game.id)
      .map((gg) => gg.genre_id) || [];
    return {
      ...game,
      genres: genreIds.map((id) => genreMap[id]).filter(Boolean),
    };
  });

  res.json({
    games,
    total: count,
    page: parseInt(page),
    totalPages: Math.ceil(count / limit),
  });
});

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