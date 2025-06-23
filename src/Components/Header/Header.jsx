import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Sand Bank</div>
      <nav className={styles.nav}>
        <button className={styles.bookButton}>Book My Stay</button>
      </nav>
    </header>
  );
}
