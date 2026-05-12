const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://have-fun-games-production.up.railway.app";

export async function GetGameInfo(id) {
	const response = await fetch(`${BACKEND_URL}/api/games/${id}`);

	if (response?.ok) {
		console.log(`Successfully fetched game with id of ${id}`);
	} else {
		console.warn(`Failed to fetch game: HTTP ${response?.status}`);
	}

	return response.json();
}

export async function GetAllGames(page = 1, limit = 20) {
	const params = new URLSearchParams({ page, limit });
	const response = await fetch(`${BACKEND_URL}/api/games?${params}`);

	if (response?.ok) {
		console.log(`Successfully fetched games page ${page}`);
	} else {
		console.warn(`Failed to fetch games: HTTP ${response?.status}`);
	}

	return response.json();
}

export { BACKEND_URL };