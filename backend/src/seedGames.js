import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const GAMEBRAIN_API_KEY = process.env.GAMEBRAIN_API_KEY;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchGames(query = "indie", limit = 20, offset = 0) {
  const response = await fetch(
    `https://api.gamebrain.co/v1/games?query=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${GAMEBRAIN_API_KEY}`,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) throw new Error(`GameBrain search failed: ${response.status}`);
  return response.json();
}

async function fetchGameDetail(id) {
  const response = await fetch(
    `https://api.gamebrain.co/v1/games/${id}`,
    {
      headers: {
        Authorization: `Bearer ${GAMEBRAIN_API_KEY}`,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    console.warn(`Detail fetch failed for game ${id}: ${response.status}`);
    return null;
  }

  return response.json();
}

async function fetchAllGames(totalWanted = 100) {
  const pageSize = 20;
  let allResults = [];
  let offset = 0;

  while (allResults.length < totalWanted) {
    console.log(`Fetching offset ${offset}...`);
    const data = await fetchGames("indie", pageSize, offset);

    if (!data.results || data.results.length === 0) break;

    allResults = [...allResults, ...data.results];
    offset += pageSize;

    if (allResults.length >= totalWanted) break;
  }

  return allResults.slice(0, totalWanted);
}

function cleanGamebrainLink(link) {
  if (!link) return null;
  const marker = "https://gamebrain.co/game/";
  const index = link.lastIndexOf(marker);
  return index !== -1 ? link.slice(index) : link;
}

async function insertGames(games) {
  const rows = [];

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    console.log(`Fetching detail ${i + 1}/${games.length}: ${game.name}`);

    const detail = await fetchGameDetail(game.id);
    await sleep(200); // 200ms delay to avoid rate limiting

    rows.push({
      external_gamebrain_id: game.id ?? null,
      title: game.name ?? "",
      description: detail?.short_description ?? detail?.description ?? game.short_description ?? null,
      cover_image_url: game.image ?? null,
      release_date: game.year ? String(game.year) : null,
      developer: detail?.developer ?? null,
      gamebrain_link: cleanGamebrainLink(game.link),
      gameplay_url: game.gameplay ?? null,
      micro_trailer_url: game.micro_trailer ?? null,
      adult_only: game.adult_only ?? false,
      price: detail?.price?.[0] ?? null,
      rating: game.rating?.mean ?? null,
      rating_count: game.rating?.count ?? null,
    });
  }

  console.log(`Inserting ${rows.length} games...`);

  const { data, error } = await supabase
    .from("games")
    .upsert(rows, { onConflict: "external_gamebrain_id" })
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    return;
  }

  console.log("Upserted games:", data.length);
}

async function main() {
  try {
    const games = await fetchAllGames(100);
    console.log(`Total fetched: ${games.length}`);
    await insertGames(games);
  } catch (error) {
    console.error(error);
  }
}

main();