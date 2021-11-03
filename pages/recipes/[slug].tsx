import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getRecipeBySlug, getAllRecipes } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";

export default function Recipe({ recipe }: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();
	if(!router.isFallback && !recipe?.slug) {
		return <ErrorPage statusCode={404} />
	}
	// @ts-ignore
	return (
		<>
			<p>{recipe.title}
				{recipe.date}
				{recipe.coverImage}
				{recipe.content}
			</p>
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const recipe = getRecipeBySlug(params?.slug, [
		'title',
		'date',
		'slug',
		'content',
		'ogImage',
		'coverImage'
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
		fallback: true,
	}
}