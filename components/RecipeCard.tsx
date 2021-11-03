import Link from 'next/link';

// @ts-ignore
export default function RecipeCard({title, excerpt, coverImage, date, ogImage, imageCreditUrl, imageCreditName, tags, persons, ingredients, directions, slug }) {
	return (
    <div>
      <div>
				{excerpt}
				{coverImage}
				{date}
				{ogImage}
				{imageCreditName}
				{imageCreditUrl}
				{tags}
				{persons}
				{ingredients}
				{directions}
      </div>
      <h3>
        <Link as={`/recipes/${slug}`} href="/recipes/[slug]">
          <a>{title}</a>
        </Link>
      </h3>
    </div>
  )
}