import { useKeenSlider } from "keen-slider/react";
import "./GameCarousel.css";

function Arrow({ left }) {
	return (
		<svg
			className={`arrow ${left ? "arrow--left" : "arrow--right"}`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			{left && (
				<path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
			)}
			{!left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
		</svg>
	);
}

function GameCarousel({ children }) {
	const [sliderRef] = useKeenSlider();

	return (
		<>
			<div className="navigation-wrapper">
				<div ref={sliderRef} className="keen-slider">
					{children}
				</div>
				<Arrow left />
				<Arrow />
			</div>
		</>
	);
}

export default GameCarousel;
