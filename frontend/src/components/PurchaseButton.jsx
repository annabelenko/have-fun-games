// Can be used on any page to add an item to the cart.

export default function PurchaseButton({ text, game_id }) {
	// Default text if not specified
	if (!text) text = "Add to Cart";

	const addToCart = () => {
		// TODO: Link to API and check if game exists
		if (!game_id) return;
	};

	return (
		<>
			<button onClick={addToCart}>{text}</button>
		</>
	);
}
