import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Header.module.css";

export default function Header() {
	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__logo}/>
				<div className={styles.header__title}>
					<h1>Rezepte</h1>
					<p>All die tollen Rezepte der Cook Eat Essen zum selber kochen und auf dem Marktplatz anbieten.</p>
				</div>
			</header>
		</>
	)
}