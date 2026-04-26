import { useParams } from "react-router";
import ErrorPage from "./ErrorPage";

import HeroCanvas from "../components/HeroCanvas";
import ItemPrice from "../components/ItemPrice";
import OSPlatform from "../components/OSPlatform";

import PurchaseButton from "../components/PurchaseButton";
import Thumbnail from "../components/Thumbnail";

import styles from "./GamePage.module.css";

export default function GamePage() {
	const params = useParams();

	if (!params.id)
		return (
			<>
				<ErrorPage message="This item is not available" />
			</>
		);

	// Todo: Link to API based on game
	const GAME_INFO = {
		Title: `[ Item ${params.id} ]`,
		Price: 0.99,
		Description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	};

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
								<div className={styles.purchaseModalTitle}>
									Buy {GAME_INFO.Title}
								</div>
								<ItemPrice />
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
							<div>{GAME_INFO.Description}</div>
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
