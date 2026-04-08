import "keen-slider/keen-slider.min.css";
import "./GameSlide.css";

function GameSlide() {
	return (
		<>
			// TODO: Implement thumbnail and description sections.
			<div className="game-slide">
				<div className="keen-slider__slide number-slide1">
					<div className="slide-element slide-thumbnail">Thumbnail</div>
					<div className="slide-element slide-description">Game Title</div>
				</div>
			</div>
		</>
	);
}

export default GameSlide;
