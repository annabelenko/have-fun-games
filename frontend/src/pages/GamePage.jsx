import { useState } from "react";
import { useParams } from "react-router";
import { GetGameInfo } from "../lib/api";

import ErrorPage from "./ErrorPage";

import HeroCanvas from "../components/HeroCanvas";
import ItemPrice from "../components/ItemPrice";

import PurchaseButton from "../components/PurchaseButton";
import Thumbnail from "../components/Thumbnail";

import styles from "./GamePage.module.css";

export default function GamePage() {
	const params = useParams();
	const [gameTitle, setGameTitle] = useState(``);
	const [gameDescription, setGameDescription] = useState(``);
	const [gamePrice, setGamePrice] = useState(0);
	const [gameCover, setGameCover] = useState(``);
	const [gamePreview, setGamePreview] = useState(``);
	const [gameReleaseDate, setGameReleaseDate] = useState(``);
	const [gameDeveloper, setGameDeveloper] = useState(``);
	const [dataReady, setDataReady] = useState(false);

	if (!params.id)
		return (
			<>
				<ErrorPage message="This item is not available" />
			</>
		);

	GetGameInfo(params.id).then((data) => {
		console.log(data);
		setGameTitle(data.title);
		setGameDescription(data.description);
		setGamePrice(data.price);
		setGameCover(data.cover_image_url);
		setGamePreview(data.micro_trailer_url);
		setGameReleaseDate(data.release_date);
		setGameDeveloper(data.developer);
		setDataReady(true);
	});

	return (
		<>
			<div className={styles.center}>
				<div className={`${styles.gamePage} ${dataReady ? "" : styles.hidden}`}>
					<div className={styles.gamePageContent}>
						<div
							className={`${styles.gamePageSection} ${styles.gamePageSectionLeft}`}
						>
							{/* Game Cover */}
							<img
								src={gameCover}
								style={{
									aspectRatio: 16 / 9,
									width: "100%",
									objectFit: "contain",
								}}
							/>
							{/* Purchase Modal */}
							<div className={styles.purchaseModal}>
								<div className={styles.purchaseModalTitle}>Buy {gameTitle}</div>
								<ItemPrice price={gamePrice} />
								<div style={{ display: "flex" }}>
									<div
										style={{
											display: "flex",
											justifyContent: "left",
											width: "50%",
											marginTop: "50px",
										}}
									>
										<PurchaseButton />
									</div>
									<div
										style={{
											display: "flex",
											justifyContent: "right",
											width: "50%",
										}}
									></div>
								</div>
							</div>
						</div>
						<div
							className={`${styles.gamePageSection} ${styles.gamePageSectionRight}`}
						>
							{/* Game Trailer */}
							<video
								style={{ width: "100%" }}
								autoplay
								playsinline
								controls
								muted
								loop
								src={gamePreview}
							/>
							<div style={{ display: "flex", flexDirection: "column" }}>
								<p>Release Date: {gameReleaseDate}</p>
								<p>Developer: {gameDeveloper}</p>
							</div>
						</div>
					</div>
					{/* Game Description */}
					<div style={{ padding: "10px 60px 60px 60px" }}>
						{gameDescription}
					</div>
				</div>
			</div>
			<div className={`${styles.background} ${dataReady ? "" : styles.hidden}`}>
				<HeroCanvas />
			</div>
		</>
	);
}
