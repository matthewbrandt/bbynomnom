import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Footer.module.css";

export default function Footer() {
	return (
		<>
			<footer className={styles.footer}>
				<div className={styles.footer__pre}>
					<div className={styles.footer__preLeft}>
						<p className={styles.footer__preLeftHeader}>Verkaufe dein Essen</p>
						<p className={styles.footer__preLeftText}>Mit Cook Eat kannst Du die tollen Essen mit lieben Menschen in deiner Nachbarschaft teilen. Das spart dir Kosten und anderen Zeit. Probier es gleich aus!</p>
						<a href="https://www.cookeat.ch" className="btn btn--orange">Jetzt Essen Anbieten</a>
					</div>
					<div className={styles.footer__preRight}/>
				</div>
				<div className={styles.footer__legal}>
					<p>&copy; 2021 All rights reserved by Cook Eat</p>
				</div>
			</footer>
		</>
	)
}