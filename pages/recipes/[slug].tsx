import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getRecipeBySlug, getAllRecipes } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RecipeDetail from "../../components/RecipeDetail";
import styles from "../../styles/Index.module.css";

export default function Recipe({ recipe = null }: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();
	if(!router.isFallback && !recipe?.slug) {
		return <ErrorPage statusCode={404} />
	}
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
					isDetailpage={true}
					isFullWidth={false}
					coverImage={recipe.coverImage} />
				<main className={styles.main}>
					<RecipeDetail
						title={recipe.title}
						excerpt={recipe.excerpt}
						date={recipe.date}
						imageCreditUrl={recipe.imageCreditUrl}
						imageCreditName={recipe.imageCreditName}
						tags={recipe.tags}
						persons={recipe.persons}
						ingredients={recipe.ingredients}
						directions={recipe.directions} />
				</main>
				<Footer
					isDetailpage={true}
					isFullWidth={false} />
			</div>
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const recipe = getRecipeBySlug(params?.slug, [
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
	const content = await markdownToHtml(recipe.content || '');

	return {
		props: {
			recipe: {
				...recipe,
				content,
			},
		},
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const recipes = getAllRecipes(["slug"]);
	return {
		paths: recipes.map((recipe) => {
			return {
				params: {
					slug: recipe.slug,
				},
			}
		}),
		fallback: false,
	}
}