import "keen-slider/keen-slider.min.css";
import "./GameSlide.css";
import OSPlatform from "./OSPlatform";

function GameSlide() {
	// TODO: Implement thumbnail and description sections.
	return (
		<>
			<div className="game-slide">
				<div className="keen-slider__slide number-slide1">
					<div className="slide-element slide-thumbnail">Thumbnail</div>
					<div
						className="slide-element number-slide2 slide-description"
						style={{ display: "flex", flexDirection: "column" }}
					>
						<div>Game Title</div>
						<div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
							<div>$0.99</div>
							<OSPlatform Windows Mac Linux />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default GameSlide;
