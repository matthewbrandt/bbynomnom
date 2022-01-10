import Head from "next/head";
import CTFLData from "../lib/api";
import {GetStaticPaths, GetStaticPathsContext, GetStaticProps, InferGetStaticPropsType} from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import RecipeCard from "../components/RecipeCard";
import styles from "../styles/Index.module.css";

export default function Index({ recipes }: InferGetStaticPropsType<typeof getStaticProps>) {

	const recipe = recipes.map((item: any) => { return item; })
	return (
		<>
			<Head>
				<title>Cook Eat Rezepte</title>

			</Head>
			<div className={styles.layout}>
				<Header
					isDetailpage={false}
					isFullWidth={false}
					coverImage={""} />
				<Search/>
				<main className={styles.main}>
					<div className={styles.recipeCard} key={recipe.slug}>
						{recipe.map((item: any, index: number) => {
							console.log(item);
							return (
								<>
									<RecipeCard
										key={index}
										title={item.title}
										excerpt={item.excerpt}
										tags={item.tagsCollection}
										image={item.image.url}
										imageCreditUrl={item.imageCreditUrl}
										imageCreditName={item.imageCreditName}
										persons={item.persons}
										ingredients={item.ingredients}
										directions={item.directions}
										slug={item.slug}
									/>
								</>
							)
						})}
					</div>
				</main>
				<Footer
					isDetailpage={false}
					isFullWidth={false} />
			</div>
		</>
	)
}

export const getStaticProps: GetStaticProps = async (slug) => {
	const recipes = await CTFLData.getPages("/home");

	return {
		props: {
			recipes
		},
		revalidate: 1,
	};
}