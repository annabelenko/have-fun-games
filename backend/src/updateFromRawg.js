import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const RAWG_API_KEY = process.env.RAWG_API_KEY;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchRawgGameId(gameName) {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(gameName)}&page_size=1`,
  );
  if (!response.ok) return null;
  const data = await response.json();
  return data.results?.[0]?.id ?? null;
}

async function fetchRawgDetail(rawgId) {
  const response = await fetch(
    `https://api.rawg.io/api/games/${rawgId}?key=${RAWG_API_KEY}`,
  );
  if (!response.ok) return null;
  return response.json();
}

async function updateFromRawg() {
  // grab games missing either developer or description
  const { data: games, error } = await supabase
    .from("games")
    .select("id, title")
    .or("developer.is.null,description.is.null");

  if (error) {
    console.error("Supabase fetch error:", error);
    return;
  }

  console.log(`Found ${games.length} games to update`);

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    console.log(`Processing ${i + 1}/${games.length}: ${game.title}`);

    const rawgId = await fetchRawgGameId(game.title);
    await sleep(300);

    if (!rawgId) {
      console.log(`  No RAWG match found for: ${game.title}`);
      continue;
    }

    const detail = await fetchRawgDetail(rawgId);
    await sleep(300);

    const updates = {};

    const developer = detail?.developers?.[0]?.name ?? null;
    if (developer) updates.developer = developer;

    // description_raw is plain text, description is HTML
    const description = detail?.description_raw ?? null;
    if (description) updates.description = description;

    if (Object.keys(updates).length === 0) {
      console.log(`  Nothing to update for: ${game.title}`);
      continue;
    }

    const { error: updateError } = await supabase
      .from("games")
      .update(updates)
      .eq("id", game.id);

    if (updateError) {
      console.error(`  Update failed for ${game.title}:`, updateError);
    } else {
      console.log(`  ✓ ${game.title} → developer: ${updates.developer ?? "skipped"} | description: ${description ? "✓" : "skipped"}`);
    }
  }

  console.log("Done!");
}

updateFromRawg();