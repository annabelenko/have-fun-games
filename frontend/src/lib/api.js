const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function GetGameInfo(id) {
	const data = fetch(`${BACKEND_URL}/api/games/${id}`)
		.then((response) => response.json())
		.then((data) => {
			return data;
		});
	return data;
}
