import React from "react";
import styles from "./HeroSection.module.css";
import resortImg from "../../images/TheResort.jpg";
import scubaImg from "../../images/scuba.jpg";
import islandImg from "../../images/island.jpg";
import sandBg from "../../images/skyy.jpg";

import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleResortClick = () => {
    navigate("/resort");
  };

  const images = [
    { src: resortImg, alt: "The Resort", onClick: handleResortClick },
    {
      src: scubaImg,
      alt: "Things to do",
      onClick: () => navigate("/thingstodo"),
    },
    {
      src: islandImg,
      alt: "Island Tour",
      onClick: () => navigate("/exploretheisland"),
    },
  ];

  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: `url(${sandBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={styles.cards}>
        {images.map((img, index) => (
          <div key={index} className={styles.card} onClick={img.onClick}>
            <img src={img.src} alt={img.alt} className={styles.image} />
            <div className={styles.textOverlay}>
              <h1>{img.alt}</h1>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
