function Thumbnail({ src }) {
	return (
		<>
			<img
				style={{
					position: "absolute",
					height: "100%",
					overflow: "hidden",
				}}
				src={src}
			/>
			<div style={{ fontSize: "75%" }}>Thumbnail</div>
		</>
	);
}

export default Thumbnail;
