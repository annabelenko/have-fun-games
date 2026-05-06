const currencyFormat = (price) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);
};

function ItemPrice({ price }) {
	return (
		<>
			<div style={{ fontSize: "20px" }}>
				{price > 0 ? `${currencyFormat(price)}` : "Free to Play"}
			</div>
		</>
	);
}

export default ItemPrice;
