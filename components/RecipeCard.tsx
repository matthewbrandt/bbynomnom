import Link from 'next/link';
import Image from "next/image";
import styles from "../styles/RecipeCard.module.css";
import React from "react";

type RecipeCard = {
	title: string;
	excerpt: string;
	coverImage: string;
	date: string;
	ogImage: string;
	imageCreditUrl: string;
	imageCreditName: string;
	tags: [];
	persons: number;
	ingredients: [];
	directions: [];
	slug: string;
}

export default function RecipeCard({title, excerpt, coverImage, date, ogImage, imageCreditUrl, imageCreditName, tags, persons, ingredients, directions, slug }: RecipeCard) {
	// @ts-ignore
	const RecipeCardInner = React.forwardRef(({ onClick, href }, ref) => {
		return (
			<a className={styles.recipeCard__link} href={href} onClick={onClick}>
				<div className={styles.recipeCard__image}>
					{coverImage !== '' ? <Image src={coverImage} width="420" height="227" layout="responsive" /> : ''}
				</div>
				<p className={styles.recipeCard__title}>{title}</p>
			</a>
		)
	});

	return (
		<>
		<section className={styles.recipeCard}>
			<Link as={`/recipes/${slug}`} href="/recipes/[slug]" passHref>
				<RecipeCardInner />
			</Link>
		</section>
		</>
  )
}