import React, { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import styles from "./Menu.module.css";
import closeIcon from "../../images/close.png";

const Menu = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className={styles.hamburgerWrapper}>
        <div className={styles.MenuText}>MENU</div>
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          color={isOpen ? "#1c5666" : "#FFFFFF"}
        />
      </div>

      {/* Sidebar Menu */}
      <div className={styles.sidebar + (isOpen ? ` ${styles.open}` : "")}>
        {/* CLOSE BUTTON */}
        <div className={styles.closeButton} onClick={() => setOpen(false)}>
          <span className={styles.closeText}>CLOSE</span>
        </div>

        <div className={styles.linkContainer}>
          <a href="/resort" className={styles.link}>
            The Resort
          </a>
          <a href="/thingstodo" className={styles.link}>
            Things to Do
          </a>
          <a href="/exploretheisland" className={styles.link}>
            Explore the Island
          </a>
          <div className={styles.linkContainerSecondary}>
            <a href="/faq" className={`${styles.link} ${styles.subLink}`}>
              FAQ
            </a>
            <a href="/book" className={`${styles.link} ${styles.subLink}`}>
              CONTACT & BOOKING
            </a>
          </div>
        </div>
      </div>

      {/* Overlay to darken background when menu is open */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setOpen(false)}></div>
      )}
    </>
  );
};

export default Menu;
