export default class CTFLData {
	static async getPages(slug: string) {
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
		console.log(query);
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