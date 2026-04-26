import { useState } from "react";
import { useParams } from "react-router";
import { GetGameInfo } from "../lib/api";

import ErrorPage from "./ErrorPage";

import HeroCanvas from "../components/HeroCanvas";
import ItemPrice from "../components/ItemPrice";
import OSPlatform from "../components/OSPlatform";

import PurchaseButton from "../components/PurchaseButton";
import Thumbnail from "../components/Thumbnail";

import styles from "./GamePage.module.css";

export default function GamePage() {
	const params = useParams();
	const [gameTitle, setGameTitle] = useState(`[ Item ${params.id} ]`);
	const [gameDescription, setGameDescription] = useState(
		`[ Item ${params.id} ]`,
	);
	const [gamePrice, setGamePrice] = useState(0);

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
	});

	return (
		<>
			<div className={styles.center}>
				<div className={styles.gamePage}>
					<div className={styles.gamePageContent}>
						<div
							className={`${styles.gamePageSection} ${styles.gamePageSectionLeft}`}
						>
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
									>
										<OSPlatform Windows Mac Linux />
									</div>
								</div>
							</div>
							{/* Game Description */}
							<div>{gameDescription}</div>
						</div>
						<div
							className={`${styles.gamePageSection} ${styles.gamePageSectionRight}`}
						>
							<Thumbnail />
							<Thumbnail />
							<Thumbnail />
						</div>
					</div>
				</div>
			</div>
			<div className={styles.background}>
				<HeroCanvas />
			</div>
		</>
	);
}
