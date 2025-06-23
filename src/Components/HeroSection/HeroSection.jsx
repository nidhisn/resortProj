import React from "react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <h1>Welcome to Sand Bank Resort</h1>
      <p>Beachfront Cottages | Ocean Views | Private Sundecks</p>
    </section>
  );
}
