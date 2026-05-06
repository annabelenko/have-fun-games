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

async function getOrCreateGenre(genreName) {
  // check if genre already exists
  const { data: existing } = await supabase
    .from("genres")
    .select("id")
    .eq("name", genreName)
    .single();

  if (existing) return existing.id;

  // create it if it doesn't
  const { data: created, error } = await supabase
    .from("genres")
    .insert({ name: genreName })
    .select("id")
    .single();

  if (error) {
    console.error(`Failed to create genre ${genreName}:`, error);
    return null;
  }

  console.log(`  + Created genre: ${genreName}`);
  return created.id;
}

async function updateGenres() {
  // grab all games
  const { data: games, error } = await supabase
    .from("games")
    .select("id, title");

  if (error) {
    console.error("Supabase fetch error:", error);
    return;
  }

  console.log(`Processing genres for ${games.length} games...`);

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    console.log(`\n${i + 1}/${games.length}: ${game.title}`);

    const rawgId = await fetchRawgGameId(game.title);
    await sleep(300);

    if (!rawgId) {
      console.log(`  No RAWG match found`);
      continue;
    }

    const detail = await fetchRawgDetail(rawgId);
    await sleep(300);

    const genres = detail?.genres ?? [];

    if (genres.length === 0) {
      console.log(`  No genres found`);
      continue;
    }

    for (const genre of genres) {
      const genreId = await getOrCreateGenre(genre.name);
      if (!genreId) continue;

      // link game to genre, ignore if already linked
      const { error: linkError } = await supabase
        .from("game_genres")
        .upsert(
          { game_id: game.id, genre_id: genreId },
          { onConflict: "game_id,genre_id" }
        );

      if (linkError) {
        console.error(`  Failed to link ${game.title} → ${genre.name}:`, linkError);
      } else {
        console.log(`  ✓ ${genre.name}`);
      }
    }
  }

  console.log("\nDone!");
}

updateGenres();