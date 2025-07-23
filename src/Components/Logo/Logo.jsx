import React from "react";
import styles from "./logo.module.css";
import logo from "../../images/logoWhite.png";

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <img src={logo} alt="Resort logo" className={styles.logoImage} />
    </div>
  );
};

export default Logo;
