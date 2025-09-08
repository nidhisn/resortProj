import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import styles from "./Menu.module.css";

const Menu = () => {
  const [isOpen, setOpen] = useState(false);
  const location = useLocation();
  const isBookingPage = location.pathname === "/booking";
  const isFaqPage = location.pathname === "/faqs";
  const isExplore = location.pathname === "/exploretheisland";
  const isHome = location.pathname === "/";
  const isResort = location.pathname === "/resort";

  // Detect when HeroSection is the active home (mobile/tablet with no fine pointer)
  const [isHeroHome, setIsHeroHome] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqPointerFine = window.matchMedia("(pointer: fine)");
    const evaluate = () => {
      const useThreeHome = mqDesktop.matches && mqPointerFine.matches;
      setIsHeroHome(!useThreeHome);
    };
    if (mqDesktop.addEventListener) {
      mqDesktop.addEventListener("change", evaluate);
      mqPointerFine.addEventListener("change", evaluate);
    } else {
      mqDesktop.addListener(evaluate);
      mqPointerFine.addListener(evaluate);
    }
    evaluate();
    return () => {
      if (mqDesktop.removeEventListener) {
        mqDesktop.removeEventListener("change", evaluate);
        mqPointerFine.removeEventListener("change", evaluate);
      } else {
        mqDesktop.removeListener(evaluate);
        mqPointerFine.removeListener(evaluate);
      }
    };
  }, []);

  return (
    <>
      <div
        className={`${styles.hamburgerWrapper} ${
          isBookingPage || isFaqPage || isExplore || isHome
            ? styles.bookingColor
            : ""
        } ${
          (isHome && isHeroHome) || (isResort && isHeroHome)
            ? styles.heroMobilePos
            : ""
        }`}
      >
        <div
          className={`${styles.MenuText} ${
            isBookingPage || isFaqPage || isExplore || isHome
              ? styles.bookingText
              : ""
          } ${isOpen ? styles.hidden : ""} ${
            (isHome && isHeroHome) || (isResort && isHeroHome)
              ? styles.heroMobileHideText
              : ""
          }`}
        >
          MENU
        </div>

        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          color={
            (isHome && isHeroHome) || (isResort && isHeroHome)
              ? isOpen
                ? "#1c5666"
                : "#FFFFFF"
              : isOpen || isBookingPage || isFaqPage || isExplore || isHome
              ? "#1c5666"
              : "#FFFFFF"
          }
        />
      </div>

      {/* Sidebar Menu */}
      <div
        className={`${styles.sidebar} ${isOpen ? styles.open : ""} ${
          isBookingPage ? styles.bookingSidebar : ""
        }`}
      >
        {/* CLOSE BUTTON */}
        <div
          className={`${styles.closeButton} ${
            (isHome && isHeroHome) || (isResort && isHeroHome)
              ? styles.heroMobileHideText
              : ""
          }`}
          onClick={() => setOpen(false)}
        >
          <span className={styles.closeText}></span>
        </div>
        <div className={styles.linkContainer}>
          <Link
            to="/resort"
            className={styles.link}
            onClick={() => setOpen(false)}
          >
            The Resort
          </Link>
          <Link
            to="/thingstodo"
            className={styles.link}
            onClick={() => setOpen(false)}
          >
            Things to Do
          </Link>
          <Link
            to="/exploretheisland"
            className={styles.link}
            onClick={() => setOpen(false)}
          >
            Explore the Island
          </Link>
          <div className={styles.linkContainerSecondary}>
            <Link
              to="/faqs"
              className={`${styles.link} ${styles.subLink}`}
              onClick={() => setOpen(false)}
            >
              FAQs
            </Link>
            <Link
              to="/booking"
              className={`${styles.link} ${styles.subLink}`}
              onClick={() => setOpen(false)}
            >
              CONTACT & BOOKING
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setOpen(false)}></div>
      )}
    </>
  );
};

export default Menu;
