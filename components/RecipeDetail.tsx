import React from "react";
import Link from "next/link";
import styles from "../styles/RecipeDetail.module.css";

type RecipeDetail = {
	title: string;
	excerpt: string;
	date: string;
	imageCreditUrl: string;
	imageCreditName: string;
	tags: [];
	persons: number;
	ingredients: [];
	directions: [];
}
export default function RecipeDetail({title, excerpt, date, imageCreditUrl, imageCreditName, tags, persons, ingredients, directions}: RecipeDetail) {
	let formRef: any = React.useRef();
	const scrollPastChecked = (event: any) => {
		if(!event.current) return;
		event.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'start'
		})
	};

	// @ts-ignore
	const tagsList = tags.items.map((item) => {
		return item;
	});
	return (
		<>
			<div className={styles.recipeDetail__title}>
				<h1 className="headline headline--h2">{title}</h1>
				{imageCreditUrl ?
					<p className={styles.recipeDetail__imageCredit}>
						<span>Fotonachweis: </span>
						<Link href={imageCreditUrl}>
							<a target="_blank">{imageCreditName}</a>
						</Link>
					</p>
					: '' }

					<div className={styles.recipeDetail__tags}>
						<span>Tags: </span>
						<ul className={styles.recipeDetail__tagsList}>
							{tagsList.map((item: any, index: number) => {
								return (
									<>
										<li key={index} className={styles.recipeDetail__tagsListItem}>{item.tag}</li>
									</>
								)
							})}
						</ul>
					</div>
			</div>

			<div className={styles.recipeDetail__recipe}>
				<div className={styles.recipeDetail__recipeLeft}>
					<h2 className="headline headline--h3">Zutaten für {persons} {persons === 1 ? 'Person' : 'Personen'}</h2>
					{ingredients ?
						<ul className={styles.recipeDetail__ingredients}>
							{ingredients.map((ingredient, index) => {
								let formId: string = `ingredient-${index}`;
								return (
									<li key={index} className={styles.recipeDetail__ingredientsItem}>
										<input type="checkbox" id={formId} onClick={scrollPastChecked}/>
										<label htmlFor={formId} ref={formRef}>{ingredient}</label>
									</li>
								)
							})}
						</ul>
						: ''}
				</div>
				<div className={styles.recipeDetail__recipeRight}>
					<h2 className="headline headline--h3">Anleitung</h2>
					{directions ?
						<ul className={styles.recipeDetail__directions}>
							{directions.map((direction, index) => {
								let formId: string = `direction-${index}`;
								return (
									<li key={index} className={styles.recipeDetail__directionsItem}>
										<input type="checkbox" id={formId} onClick={scrollPastChecked}/>
										<label htmlFor={formId} ref={formRef}>{direction}</label>
									</li>
								)
							})}
						</ul>
						: ''}
				</div>
			</div>
		</>
	)
}