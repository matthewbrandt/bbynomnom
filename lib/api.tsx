import fs from "fs";
import {join} from "path";
import matter from "gray-matter";

const recipesDirectory = join(process.cwd(), '_recipes');

export function getRecipeSlugs() {
	return fs.readdirSync(recipesDirectory);
}

export function getRecipeBySlug(slug: string | string[] | undefined, fields: any[] = []) {
	if (typeof slug === "string") {
		const realSlug = slug.replace(/\.md$/, '');
		const fullPath = join(recipesDirectory, `${realSlug}.md`);
		const fileContents = fs.readFileSync(fullPath, 'utf-8');
		const { data, content } = matter(fileContents);
		const items: any = {};

		fields.forEach((field) => {
			(field === "slug") ? items[field] = realSlug : '';
			(field === "content") ? items[field] = content : '';
			(typeof data[field] !== "undefined") ? items[field] = data[field] : '';
		});
		return items;
	}
	return;
}

export function getAllRecipes(fields: any[] = []) {
	const slugs = getRecipeSlugs();
	return slugs
		.map((slug) => getRecipeBySlug(slug, fields))
		.sort((recipe1, recipe2) => (recipe1.date > recipe2.date ? -1 : 1));
}