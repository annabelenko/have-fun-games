import { useContext } from "react";
import { CartContext } from "./CartContext";

function LibraryPage() {
  const { library } = useContext(CartContext);

  return (
    <div className="page-content">
      <h1>My Games</h1>
      {library.length === 0 ? (
        <p className="empty-message">You do not own any games yet. Purchase a game to add it to your library.</p>
      ) : (
        <div className="library-grid">
          {library.map((game) => (
            <div key={game.id} className="library-card">
              <h2>{game.name}</h2>
              <p>Quantity: {game.quantity}</p>
              <p>Activation key: {game.activationKey}</p>
              <a className="download-link" href={game.downloadUrl}>
                Download / Activate
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LibraryPage;
