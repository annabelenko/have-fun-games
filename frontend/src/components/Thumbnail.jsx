import styles from "./Thumbnail.module.css";

function Thumbnail({ src }) {
	const thumbnailImage = (
		<>{!src ? <>Thumbnail</> : <img style={{}} src={src} />}</>
	);

	return (
		<>
			<div className={styles.gameCard}>
				<div className={styles.gameCardThumb}>{thumbnailImage}</div>
			</div>
		</>
	);
}

export default Thumbnail;
