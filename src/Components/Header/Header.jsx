import React from "react";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import { Link, useLocation } from "react-router-dom";
import GreenLogo from "../../images/logoGreeen.png"; // <-- Import your green logo

export default function Header() {
  const location = useLocation();
  const isFaqPage = location.pathname === "/faqs";
  const isThingsToDo = location.pathname === "/thingstodo";

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        {isFaqPage || isThingsToDo ? (
          <img
            src={GreenLogo}
            alt="Green Logo"
            className={`${styles.logoImage} ${styles.logoImageFaq}`}
          />
        ) : (
          <Logo />
        )}
      </Link>

      {/* ✅ Only show the button if NOT on the booking page */}
      {location.pathname !== "/booking" && (
        <nav className={styles.nav}>
          <Link
            to="/booking"
            className={`${styles.bookButton} ${
              isFaqPage || isThingsToDo ? styles.bookButtonGreen : ""
            }`}
          >
            BOOK MY STAY
          </Link>
        </nav>
      )}
    </header>
  );
}
