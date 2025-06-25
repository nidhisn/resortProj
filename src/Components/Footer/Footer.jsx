import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Contact Information */}
        <div className={styles.column}>
          <p className={styles.address}>
            Beach No.5, Lakshadweep Islands
            <br />
            Lakshadweep, IN 682559
          </p>
          <h4>GETTING HERE</h4>
          <p className={styles.phone}>+91 484 123 4567</p>

          <p>
            <strong>General Enquiries</strong>
            <br />
            hello@sandbankresort.com
          </p>
          <p>
            <strong>Reservations</strong>
            <br />
            booking@sandbankresort.com
          </p>

          <div className={styles.socials}>
            <span>INSTAGRAM</span>
            <span>FACEBOOK</span>
          </div>
        </div>

        {/* Local Info */}
        <div className={styles.column}>
          <h4>LOCAL INFORMATION</h4>
          <p>🌤️ 29°C / 84.2°F — Lakshadweep, IN</p>
          <p>🕒 11:34 PM</p>

          <h4>WEBSITE THEME</h4>
          <div className={styles.themeToggle}>
            <button className={styles.day}>DAY</button>
            <button className={styles.night}>NIGHT</button>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className={styles.column}>
          <p>
            Get exclusive offers, event info, and resort updates from
            Lakshadweep Sand Bank Resort, directly to your inbox.
          </p>
          <input
            type="email"
            className={styles.emailInput}
            placeholder="Email Address"
          />
          <p className={styles.terms}>
            By signing up, I accept the <a href="#">privacy policy</a> and{" "}
            <a href="#">terms & conditions</a>.
          </p>
          <button className={styles.subscribe}>SUBSCRIBE</button>
        </div>
      </div>

      {/* Footer Nav */}
      <div className={styles.bottom}>
        <div className={styles.links}>
          <a href="#">HOME</a>
          <a href="#">THE RESORT</a>
          <a href="#">ACTIVITIES</a>
          <a href="#">ENQUIRIES</a>
          <a href="#">FAQ</a>

          <div className={styles.legal}>
            <span>© Lakshadweep Sand Bank Resort 2025</span>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
