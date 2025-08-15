import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import { Link, useLocation } from "react-router-dom";
import GreenLogo from "../../images/logoGreeen.png"; // <-- Import your green logo

export default function Header() {
  const location = useLocation();
  const isFaqPage = location.pathname === "/faqs";
  const isThingsToDo = location.pathname === "/thingstodo";
  const isExplore = location.pathname === "/exploretheisland";
  const isHome = location.pathname === "/";
  const isGallery = location.pathname === "/gallery";

  const [isHeaderVisible, setIsHeaderVisible] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setIsHeaderVisible(true);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        // Show header after 100px scroll
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <header
      className={`${styles.header} ${isHeaderVisible ? styles.visible : ""}`}
    >
      <Link to="/" className={styles.logo}>
        {isFaqPage || isHome || isGallery ? (
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
              isFaqPage || isHome || isGallery ? styles.bookButtonGreen : ""
            }`}
          >
            BOOK MY STAY
          </Link>
        </nav>
      )}
    </header>
  );
}
