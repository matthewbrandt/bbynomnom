import styles from "../styles/Search.module.css";

export default function Search() {
	return (
		<>
			<div className={styles.search}>
				<input type="text" className={styles.search__input} placeholder="Suche nach einem Rezept"/>
			</div>
		</>
	)
}