import React from "react";
import styles from "./HeroSection.module.css";
import resortImg from "../../images/TheResort.jpg";
import scubaImg from "../../images/scuba.jpg";
import islandImg from "../../images/island.jpg";
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
      alt: "Activities",
      onClick: () => navigate("/thingstodo"),
    },
    {
      src: islandImg,
      alt: "Island Tour",
      onClick: () => navigate("/exploretheisland"),
    },
  ];

  return (
    <section className={styles.hero}>
      {images.map((img, index) => (
        <div key={index} className={styles.card} onClick={img.onClick}>
          <img src={img.src} alt={img.alt} className={styles.image} />
          <div className={styles.textOverlay}>
            <h1>{img.alt}</h1>
          </div>
        </div>
      ))}
    </section>
  );
}
