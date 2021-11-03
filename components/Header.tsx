import styles from "../styles/Header.module.css";
import Image from "next/image";
import Link from 'next/link';
import React from "react";

type Header = {
	isDetailpage: boolean;
	isFullWidth: boolean;
	coverImage: string;
}

export default function Header({isDetailpage, isFullWidth, coverImage}: Header) {
	// @ts-ignore
	const CloseButtonInner = React.forwardRef(({ onClick, href }, ref) => {
		return (
			<a href={href} onClick={onClick}>
				<div className={styles.header__detailPageClose}>
					<div className={styles.header__detailPageCloseIcon}/>
				</div>
			</a>
		)
	});


	const renderIndexHeader = () => {
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
	};

	const renderDetailHeader = () => {
		return (
			<>
				{isFullWidth ?
					<header className={styles.header__detailPageFullWidth}>
						<div className={styles.header__detailPageImageFullWidth}>
							<Image src={coverImage} layout="fill"/>
						</div>
						<div className={styles.header__detailPageLogo}/>
						<Link href="/">
							<CloseButtonInner/>
						</Link>
					</header>
					:
					<header className={styles.header__detailPage}>
						<div className={styles.header__detailPageImage}>
							<Image src={coverImage} layout="fill"/>
						</div>
						<div className={styles.header__detailPageLogo}/>
						<Link href="/">
							<CloseButtonInner/>
						</Link>
					</header>
				}
			</>
		)
	};

	return (
		<>
			{isDetailpage ? renderDetailHeader() : renderIndexHeader()}
		</>
	)
}