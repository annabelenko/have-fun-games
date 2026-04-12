import "keen-slider/keen-slider.min.css";
import "./GameSlide.css";
import OSPlatform from "./OSPlatform";
import ItemPrice from "./ItemPrice";
import Thumbnail from "./Thumbnail";

function GameSlide({ name, price, platform = [] }) {
	// TODO: Implement button logic
	return (
		<>
			<div className="game-slide">
				<div className="keen-slider__slide number-slide1">
					<div className="slide-element slide-thumbnail">
						<Thumbnail src="" />
					</div>
					<div
						className="slide-element number-slide2 slide-description"
						style={{ display: "flex", flexDirection: "column", zIndex: 1 }}
					>
						<div style={{ fontSize: "75%" }}>{name}</div>
						<div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
							<ItemPrice price={price} />
							<OSPlatform
								Windows={platform.includes("Windows")}
								Mac={platform.includes("Mac")}
								Linux={platform.includes("Linux")}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default GameSlide;
