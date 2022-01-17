import Link from 'next/link';
import Image from "next/image";
import styles from "../styles/RecipeCard.module.css";
import React from "react";

type RecipeCard = {
	title: string;
	excerpt: string;
	image: string;
	imageCreditUrl: string;
	imageCreditName: string;
	tags: [];
	persons: number;
	ingredients: [];
	directions: [];
	slug: string;
}

export default function RecipeCard({ title, image,tags, slug }: RecipeCard) {
	// @ts-ignore
	// eslint-disable-next-line react/display-name
	const RecipeCardInner = React.forwardRef(({ onClick, href }, ref) => {
		return (
			<a className={styles.recipeCard__link} href={href} onClick={onClick}>
				<div className={styles.recipeCard__image}>
					{image ? <Image src={image} layout="fill" objectFit={'cover'} priority={true} alt={`Zum Rezept für ${title}`} /> : ''}
				</div>
				<p className={styles.recipeCard__title}>{title}</p>
			</a>
		)
	});

	return (
		<>
		<section className={styles.recipeCard} data-tags={tags} data-title={title}>
			<Link as={`/recipes/${slug}`} href="/recipes/[slug]" passHref>
				<RecipeCardInner />
			</Link>
		</section>
		</>
  )
}