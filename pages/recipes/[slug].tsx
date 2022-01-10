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

export default function Recipe({ recipe, slug }: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();
	
	console.log(slug, recipe);

	if(!router.isFallback && !recipe?.slug) {
		return <ErrorPage statusCode={404} />
	}
	
	return (
		<>
			<Head>
				<title>Cook Eat Rezepte | {recipe.title}</title>
			</Head>
			<div className={styles.layout}>
				<Header
					isDetailpage={true}
					isFullWidth={false}
					image={recipe.image} />
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
	const { slug } = context.params! as IParams;
	const recipes = await CTFLData.getPages(`${slug}`);
	let recipe = recipes.map((item: any) => {
        return item;
    })

	return {
		props: {
			recipe, slug
		},
		revalidate: 1,
	};
}

export const getStaticPaths: GetStaticPaths = async () => {
	const recipes = await CTFLData.getPages('');

	return {
		paths: recipes.map((recipe: { slug: any; }) => {
			return {
				params: {
					slug: recipe.slug
				},
			}
		}),
		fallback: false,
	}
}