import React from "react";
import styles from "./ExploreIsland.module.css";

export default function ExploreIsland() {
  return (
    <section id="explore" className={styles.explore}>
      <h2>Explore the Island</h2>
      <p>View our map to see where we are and what’s nearby.</p>
      <div className={styles.mapPlaceholder}>Map Coming Soon</div>
    </section>
  );
}
