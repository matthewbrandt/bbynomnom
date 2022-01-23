const {dotenv} = require("dotenv");
const {fetch} = require("node-fetch");
const {algoliasearch} = require("algoliasearch/lite");

const query = `{
	recipeCollection {
		items {
				sys {
					id
				}
				title
				slug
				tagsCollection {
					items {
						... on Tags {
							sys {
								id
							}
							tag 
							slug
						}
					}
				}
				excerpt
				image {
					url
					width
					height
				}
				imageCreditName
				imageCreditUrl
				persons
				ingredients
				directions
				description
			}
		} 
	}`;

console.log("", process.env.CTFL_SPACE_ID);
console.log(process.env.CTFL_DELIVERY_KEY);
async function callApi(query) {
	try {
		const response = await fetch(
			`https://graphql.contentful.com/content/v1/spaces/${process.env.CTFL_SPACE_ID}/environments/master`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.CTFL_DELIVERY_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ query }),
			},
		).then((response) => {
			console.log(response);
			return response.json();
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
}

async function getAllRecipes() {
	const content = await callApi(query);
	console.log("content",content);
	return content.recipeCollection.items;
}

(async function () {
	try {
	  const recipes = await getAllRecipes(query);
	  console.log("recipes",recipes);
  
	  if (recipes.length > 0) {
		const client = algoliasearch(
		  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
		  process.env.ALGOLIA_SEARCH_ADMIN_KEY,
		);
  
		const index = client.initIndex("cookeat_recipes");
		const algoliaResponse = await index.saveObjects(transformed);
  
		console.log(
		  `🎉 Sucessfully added ${
			algoliaResponse.objectIDs.length
		  } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
			"\n",
		  )}`,
		);
	  }
	} catch (error) {
	  console.log(error);
	}
  })();

