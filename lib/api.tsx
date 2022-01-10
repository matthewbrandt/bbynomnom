export default class CTFLData {
	static async getRecipeBySlug(slug: string) {
		const query = `{
			recipeCollection(where: { slug: "${slug}"}, limit: 1) {
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
		const content = await CTFLData.callApi(query);
		return content.recipeCollection.items;
	}

	static async getAllRecipes() {
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
		const content = await CTFLData.callApi(query);
		return content.recipeCollection.items;
	}

	static async callApi(query: any) {
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
				return response.json();
			});
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
}