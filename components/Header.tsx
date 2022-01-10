import styles from "../styles/Header.module.css";
import Image from "next/image";
import Link from 'next/link';
import React from "react";

type Header = {
	isDetailpage: boolean;
	isFullWidth: boolean;
	image: {
		url: string
	};
}

export default function Header({isDetailpage, isFullWidth, image}: Header) {
	// @ts-ignore
	// eslint-disable-next-line react/display-name
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
							<Image src={image.url} layout="fill" alt={""}/>
						</div>
						<div className={styles.header__detailPageLogo}/>
						<Link href="/" passHref>
							<CloseButtonInner/>
						</Link>
					</header>
					:
					<header className={styles.header__detailPage}>
						<div className={styles.header__detailPageImage}>
							<Image src={image.url} layout="fill" alt={""}/>
						</div>
						<div className={styles.header__detailPageLogo}/>
						<Link href="/" passHref>
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