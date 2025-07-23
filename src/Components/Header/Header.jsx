import React from "react";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>

      {/* ✅ Only show the button if NOT on the booking page */}
      {location.pathname !== "/booking" && (
        <nav className={styles.nav}>
          <Link to="/booking" className={styles.bookButton}>
            BOOK MY STAY
          </Link>
        </nav>
      )}
    </header>
  );
}
