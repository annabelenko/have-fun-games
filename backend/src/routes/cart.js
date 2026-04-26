import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// GET cart for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from("cart")
    .select("*, games(*)")
    .eq("user_id", userId);

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

// POST add item to cart
router.post("/", async (req, res) => {
  const { user_id, game_id, quantity = 1 } = req.body;

  const { data, error } = await supabase
    .from("cart")
    .upsert({ user_id, game_id, quantity }, { onConflict: "user_id,game_id" })
    .select();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data);
});

// DELETE remove item from cart
router.delete("/", async (req, res) => {
  const { user_id, game_id } = req.body;

  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("user_id", user_id)
    .eq("game_id", game_id);

  if (error) return res.status(500).json({ error: error.message });

  res.json({ message: "Item removed from cart" });
});

export default router;