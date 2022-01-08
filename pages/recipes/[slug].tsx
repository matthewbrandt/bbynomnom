import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import {
	GetStaticPaths,
	GetStaticProps,
	GetStaticPropsContext,
	InferGetStaticPropsType,
	PreviewData
} from "next";
import CTFLData from "../../lib/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RecipeDetail from "../../components/RecipeDetail";
import styles from "../../styles/Index.module.css";
import {ParsedUrlQuery} from "querystring";

export default function Recipe({ recipe = null }: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();
	if(!router.isFallback && !recipe?.slug) {
		return <ErrorPage statusCode={404} />
	}
	return (
		<>
			<Head>
				<title>cookEat.ch</title>
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

interface IParams extends ParsedUrlQuery {
	slug: string | undefined;
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>) => {
	const { page } = context.params! as IParams;
	const recipes = await CTFLData.getPages(`${page}`);

	return {
		props: {
			recipes, page
		},
		revalidate: 1,
	};
}

export const getStaticPaths: GetStaticPaths = async () => {
	const recipes = await CTFLData.getPages("");

	return {
		paths: recipes.map((recipe: { slug: any; }) => {
			return {
				params: {
					slug: recipe.slug,
				},
			}
		}),
		fallback: false,
	}
}