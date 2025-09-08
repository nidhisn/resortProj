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
  const isResort = location.pathname === "/resort";

  const [isHeaderVisible, setIsHeaderVisible] = useState(!isHome);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    if (!isHome) {
      setIsHeaderVisible(true);
      return;
    }

    // On small screens, keep header hidden on Home regardless of scroll
    if (isMobile) {
      setIsHeaderVisible(false);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, isMobile]);

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

      {/* Hide header CTA on small screens for Resort; keep on others */}
      {location.pathname !== "/booking" && (
        <nav className={styles.nav}>
          <Link
            to="/booking"
            className={`${styles.bookButton} ${
              isFaqPage || isHome || isGallery ? styles.bookButtonGreen : ""
            } ${
              isResort || isThingsToDo || isExplore || isGallery || isFaqPage
                ? styles.hideOnMobile
                : ""
            }`}
          >
            BOOK MY STAY
          </Link>
        </nav>
      )}
    </header>
  );
}
