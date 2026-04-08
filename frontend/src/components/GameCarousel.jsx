import { useKeenSlider } from "keen-slider/react";

function GameCarousel({ children }) {
	const [sliderRef] = useKeenSlider();

	return (
		<>
			<div ref={sliderRef} className="keen-slider">
				{children}
			</div>
		</>
	);
}

export default GameCarousel;
