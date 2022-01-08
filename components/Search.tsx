import React, {useEffect} from "react";
import styles from "../styles/Search.module.css";

export default function Search() {
	useEffect(() => {
		let recipeTags: NodeList = document.querySelectorAll('[data-tags]');
		let recipeTitles: NodeList = document.querySelectorAll('[data-title]');
		// @ts-ignore
		let searchBar: HTMLInputElement = document.querySelector("#searchbar");

		let filterPage = (filter: string) => {
			return (
				<>
				</>
			);
		}
		
		searchBar.addEventListener("keydown", (event: KeyboardEvent) => {
			const  el = event.target as HTMLInputElement;
			recipeTags.forEach((tags: any) => {
				let tagList: string = tags.getAttribute('data-tags');
				let tag = tagList.split(",");
				(tag.includes(el.value)) ? filterPage(el.value) : '';
			});

			recipeTitles.forEach((titles: any) => {
				let titleList: string = titles.getAttribute('data-title');
				let title = titleList.split(" ");
				(title.includes(el.value)) ? filterPage(el.value) : '';
			});
		});

	});

	return (
		<>
			<div className={styles.search}>
				<input type="text" className={styles.search__input} placeholder="Suche nach einem Rezept" id="searchbar" />
			</div>
		</>
	)
}