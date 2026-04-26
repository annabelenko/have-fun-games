const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function GetGameInfo(id) {
	const response = await fetch(`${BACKEND_URL}/api/games/${id}`);

	if (response?.ok) {
		console.log(`Successfully fetched game with id of ${id}`);
	} else {
		console.warn(`Failed to fetch game: HTTP ${response?.status}`);
	}

	return response.json();
}

export async function GetAllGames() {
	const response = await fetch(`${BACKEND_URL}/api/games`);

	if (response?.ok) {
		console.log(`Successfully fetched all games`);
	} else {
		console.warn(`Failed to fetch games: HTTP ${response?.status}`);
	}

	return response.json();
}

export { BACKEND_URL };
