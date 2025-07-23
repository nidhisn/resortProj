import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import styles from "./Menu.module.css";

const Menu = () => {
  const [isOpen, setOpen] = useState(false);
  const location = useLocation();
  const isBookingPage = location.pathname === "/booking";

  return (
    <>
      <div
        className={`${styles.hamburgerWrapper} ${
          isBookingPage ? styles.bookingColor : ""
        }`}
      >
        <div
          className={`${styles.MenuText} ${
            isBookingPage ? styles.bookingText : ""
          } ${isOpen ? styles.hidden : ""}`}
        >
          MENU
        </div>

        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          color={isBookingPage || isOpen ? "#1c5666" : "#FFFFFF"} // ✅ fixed logic
        />
      </div>

      {/* Sidebar Menu */}
      <div
        className={`${styles.sidebar} ${isOpen ? styles.open : ""} ${
          isBookingPage ? styles.bookingSidebar : ""
        }`}
      >
        {/* CLOSE BUTTON */}
        <div className={styles.closeButton} onClick={() => setOpen(false)}>
          <span className={styles.closeText}>CLOSE</span>
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
              to="/faq"
              className={`${styles.link} ${styles.subLink}`}
              onClick={() => setOpen(false)}
            >
              FAQ
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
