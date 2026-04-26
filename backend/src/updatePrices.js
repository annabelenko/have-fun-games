import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function generatePrice(rating, releaseYear) {
  // newer + higher rated = more expensive
  const currentYear = new Date().getFullYear();
  const age = currentYear - (releaseYear ?? 2020);

  let basePrice;

  if (rating >= 0.85) {
    basePrice = 29.99; // highly rated games
  } else if (rating >= 0.70) {
    basePrice = 19.99;
  } else if (rating >= 0.50) {
    basePrice = 14.99;
  } else {
    basePrice = 9.99;
  }

  // older games get cheaper
  if (age >= 5) basePrice = Math.max(4.99, basePrice - 10);
  else if (age >= 3) basePrice = Math.max(4.99, basePrice - 5);

  return basePrice;
}

async function updatePrices() {
  const { data: games, error } = await supabase
    .from("games")
    .select("id, title, rating, release_date")
    .is("price", null);

  if (error) {
    console.error("Supabase fetch error:", error);
    return;
  }

  console.log(`Found ${games.length} games missing a price`);

  for (const game of games) {
    const price = generatePrice(
      game.rating ?? 0.5,
      game.release_date ? parseInt(game.release_date) : null,
    );

    const { error: updateError } = await supabase
      .from("games")
      .update({ price })
      .eq("id", game.id);

    if (updateError) {
      console.error(`Update failed for ${game.title}:`, updateError);
    } else {
      console.log(`✓ ${game.title} → $${price}`);
    }
  }

  console.log("Done!");
}

updatePrices();