import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import logoGreen from "../../images/logoGreeen.png"; // If using src folder

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Left Column - Address */}
        <div className={styles.left}>
          <p>
            Sand Bank Resort, <br />
            V58V+25C, Agatti, Lakshadweep, <br />
            82553, India
          </p>
          <p className={styles.email}>
            <a href="mailto:reservations@sandbank.com.in">
              reservations@sandbank.com.in
            </a>
          </p>
          <div className={styles.socials}>
            <a href="#">Instagram</a>
            <a href="#">Tripadvisor</a>
            <a href="#">Facebook</a>
          </div>
        </div>

        {/* Center Column - Logo */}
        <div className={styles.center}>
          <img
            src={logoGreen}
            alt="Sand Bank Resort Logo"
            className={styles.logo}
          />
        </div>

        {/* Right Column - Links */}
        <div className={styles.right}>
          <Link to="/resort">The Resort</Link>
          <Link to="/thingstodo">Things to do</Link>
          <Link to="/exploretheisland">Explore the Island</Link>
          <Link to="/faqs">FAQ</Link>
          <Link to="/booking">Contact</Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottom}>
        <p>© Sand Bank Resort 2025 All Rights Reserved.</p>
        <div className={styles.bottomLinks}>
          <a href="#">Terms & Conditions</a>
          <a href="#">Cancellation Policy</a>
          <a href="#">Privacy</a>
          <a href="#">Sand Bank Resort</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
