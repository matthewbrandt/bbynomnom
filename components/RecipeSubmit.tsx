import React from "react";
import styles from "../styles/RecipeSubmit.module.css";

export default function RecipeSubmit() {
	return (
		<>
        <section className={styles.recipeSubmit__grid}>
			<p className={`${styles.recipeSubmit__spacing} headline headline--h3`}>Du willst Dein Rezept auch hier sehen?</p>
			<a href="https://docs.google.com/forms/d/e/1FAIpQLSfTL-vfsnWmBadCLCoK0ShkHOw737W5NBXDelwc-d_-eIrFlw/viewform" target="_blank" className="btn btn--green">Hey, das wäre toll!</a>
		</section>
		</>
  )
}