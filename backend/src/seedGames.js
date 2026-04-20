import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const GAMEBRAIN_API_KEY = process.env.GAMEBRAIN_API_KEY;

async function fetchGames(query = 'indie', limit = 10) {
  const response = await fetch(
    `https://api.gamebrain.co/v1/games?query=${encodeURIComponent(query)}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${GAMEBRAIN_API_KEY}`,
        Accept: 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error(`GameBrain request failed: ${response.status}`);
  }

  return response.json();
}

function cleanGamebrainLink(link) {
  if (!link) return null;

  const marker = 'https://gamebrain.co/game/';
  const index = link.lastIndexOf(marker);

  if (index !== -1) {
    return link.slice(index);
  }

  return link;
}

async function insertGames(apiData) {
  const games = apiData.results;

  const rows = games.map((game) => ({
    external_gamebrain_id: game.id ?? null,
    title: game.name ?? '',
    description: game.short_description ?? null,
    cover_image_url: game.image ?? null,
    release_date: game.year ?? null,
    developer: null,
    gamebrain_link: cleanGamebrainLink(game.link),
    gameplay_url: game.gameplay ?? null,
    micro_trailer_url: game.micro_trailer ?? null,
    adult_only: game.adult_only ?? false,
    price: null
  }));

  const { data, error } = await supabase
    .from('games')
    .upsert(rows, { onConflict: 'external_gamebrain_id' })
    .select();

  if (error) {
    console.error('Supabase insert error:', error);
    return;
  }

  console.log('Upserted games:', data.length);
}

async function main() {
  try {
    const data = await fetchGames('indie', 5);

    console.log('Fetched:', data.results.length);

    await insertGames(data);
  } catch (error) {
    console.error(error);
  }
}

main();
