import Head from "next/head";
import { getAllRecipes } from "../lib/api";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import RecipeCard from "../components/RecipeCard";
import styles from "../styles/Index.module.css";

export default function Index({ allRecipes }: InferGetStaticPropsType<typeof getStaticProps>) {

	const recipe = allRecipes.map((item: any) => { return item; })
	return (
		<>
			<Head>
				<title>cookEat.ch</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link
					href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap"
					rel="stylesheet" />
			</Head>
			<div className={styles.layout}>
				<Header
					isDetailpage={false}
					isFullWidth={false}
					coverImage={""} />
				<Search/>
				<main className={styles.main} key={recipe.slug}>
					<div className={styles.recipeCard}>
						{allRecipes.map((recipe: { title: string; excerpt: string; coverImage: string; date: string; ogImage: string; imageCreditUrl: string; imageCreditName: string; tags: []; persons: number; ingredients: []; directions: []; slug: string; }, index: number) => (
							<RecipeCard
								key={index}
								title={recipe.title}
								excerpt={recipe.excerpt}
								coverImage={recipe.coverImage}
								date={recipe.date}
								ogImage={recipe.ogImage}
								imageCreditUrl={recipe.imageCreditUrl}
								imageCreditName={recipe.imageCreditName}
								tags={recipe.tags}
								persons={recipe.persons}
								ingredients={recipe.ingredients}
								directions={recipe.directions}
								slug={recipe.slug}
							/>
						))}
					</div>
				</main>
				<Footer
					isDetailpage={false}
					isFullWidth={false} />
			</div>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const allRecipes = getAllRecipes([
		'title',
		'excerpt',
		'coverImage',
		'date',
		'ogImage',
		'imageCreditUrl',
		'imageCreditName',
		'tags',
		'persons',
		'ingredients',
		'directions',
		'slug'
	]);

	return {
		props: { allRecipes },
	}
}