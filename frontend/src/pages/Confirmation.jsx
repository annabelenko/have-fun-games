import { Link } from "react-router-dom";
import ItemPrice from "../components/ItemPrice";
import styles from "./Confirmation.module.css";

export default function ConfirmationPage({ accountName, total }) {
	accountName = accountName ? accountName : "AccountName";
	total = total ? total : 0;

	return (
		<>
			<div className={styles.center}>
				<div className={styles.confirmationModal}>
					<div className={styles.confirmationHeader}>
						Thank you for your purchase!
					</div>
				</div>
				<div className={styles.confirmationModal}>
					<div className={styles.confirmationHeader}>Receipt</div>
					<div className={styles.confirmationMessage}>
						Account: {accountName}
					</div>
					<div className={styles.confirmationMessage}>
						Total: {<ItemPrice price={total} numberOnly />}
					</div>
					<Link
						to="/"
						style={{
							marginTop: "30px",
							display: "flex",
						}}
					>
						<button>Return to Home</button>
					</Link>
				</div>
			</div>
		</>
	);
}
