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
