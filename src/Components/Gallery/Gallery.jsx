import React, { useState, useEffect, useRef } from "react";
import styles from "./Gallery.module.css";

import resort1 from "../../images/resort1.png";
import resort2 from "../../images/resort2.png";
import resort3 from "../../images/resort3.png";
import resort4 from "../../images/resort4.png";
import resort5 from "../../images/resort5.png";

const images = [
  {
    src: resort1,
    title: "Oceanfront Escape",
    alt: "Sandbank Resort Exterior",
  },
  {
    src: resort2,
    title: "Tropical Haven",
    alt: "Resort Garden and Surroundings",
  },
  {
    src: resort3,
    title: "Seaside Lounge",
    alt: "Relaxing Lounge Area",
  },
  {
    src: resort4,
    title: "Coastal Flavors",
    alt: "Resort Dining and Kitchen",
  },
  {
    src: resort5,
    title: "Island Retreat",
    alt: "Private Villa Interior",
  },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(Math.floor(images.length / 2));
  const [isZoomed, setIsZoomed] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!carouselRef.current || isZoomed) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const mouseX = clientX / innerWidth - 0.5;
      const mouseY = clientY / innerHeight - 0.5;

      const rotateY = mouseX * 15; // Tilt effect strength
      const rotateX = mouseY * -15;

      carouselRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isZoomed]);

  const handleImageClick = (index) => {
    if (index === activeIndex) {
      setIsZoomed(true);
    } else {
      setActiveIndex(index);
    }
  };

  const handleCloseZoom = () => setIsZoomed(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getPositionClass = (index) => {
    const numImages = images.length;
    let diff = index - activeIndex;

    // Handle wrap-around for a circular feel
    if (diff > numImages / 2) {
      diff -= numImages;
    }
    if (diff <= -numImages / 2) {
      diff += numImages;
    }

    switch (diff) {
      case 0:
        return styles.active;
      case 1:
        return styles.next;
      case -1:
        return styles.prev;
      case 2:
        return styles.farNext;
      case -2:
        return styles.farPrev;
      default:
        return styles.hidden;
    }
  };

  return (
    <div
      className={`${styles.galleryContainer} ${
        isZoomed ? styles.zoomedViewActive : ""
      }`}
    >
      <div className={styles.carouselWrapper}>
        <div ref={carouselRef} className={styles.carousel}>
          {images.map((image, index) => (
            <div
              key={image.src}
              className={`${styles.imageWrapper} ${getPositionClass(index)}`}
              onClick={() => handleImageClick(index)}
            >
              <img src={image.src} alt={image.alt} className={styles.image} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.titleContainer}>
        <p>The</p>
        <h1>{images[activeIndex].title.split(" ").pop()}</h1>
      </div>

      {isZoomed && (
        <div className={styles.zoomOverlay} onClick={handleCloseZoom}>
          <div
            className={styles.zoomContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={images[activeIndex].src} alt={images[activeIndex].alt} />
            <button onClick={handleCloseZoom} className={styles.closeButton}>
              CLOSE IMAGE
            </button>
            <button
              onClick={handlePrev}
              className={`${styles.navButton} ${styles.prevButton}`}
            >
              PREV IMAGE
            </button>
            <button
              onClick={handleNext}
              className={`${styles.navButton} ${styles.nextButton}`}
            >
              NEXT IMAGE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
