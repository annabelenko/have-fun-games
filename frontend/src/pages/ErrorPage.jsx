import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage({ message }) {
	// Default error message if not specified
	if (!message) message = "Unexpected error";

	return (
		<>
			<div className={styles.center}>
				<div className={styles.errorModal}>
					<div className={styles.errorHeader}>Oops, sorry!</div>
					<div>An error was encountered while processing your request:</div>
					<div className={styles.errorMessage}>{message}</div>
					<Link
						to="/"
						style={{
							margin: "30px",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<button>Return to Home</button>
					</Link>
				</div>
			</div>
		</>
	);
}
