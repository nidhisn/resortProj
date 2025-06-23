import React from "react";
import styles from "./ThingsToDo.module.css";

export default function ThingsToDo() {
  return (
    <section id="things" className={styles.thingsToDo}>
      <h2>Scroll Your Way to Adventure</h2>
      <div className={styles.activities}>
        <div className={styles.activity}>
          <h3>Snorkeling</h3>
          <p>
            Float on the surface and watch colorful fish swim around coral
            reefs. The water is clear and calm, perfect for beginners.
          </p>
        </div>
        <div className={styles.activity}>
          <h3>Scuba Diving</h3>
          <p>
            Go deeper and explore Lakshadweep’s underwater world. Swim beside
            turtles, rays, and coral walls with a trained guide.
          </p>
        </div>
      </div>
    </section>
  );
}
