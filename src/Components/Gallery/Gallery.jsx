import React, { useState, useEffect } from "react";
import styles from "./Gallery.module.css";
import Masonry from "../../blocks/Components/Masonry/Masonry";

import resort1 from "../../images/resort1.png";
import resort2 from "../../images/resort2.png";
import resort3 from "../../images/resort3.png";
import resort4 from "../../images/resort4.png";
import resort5 from "../../images/resort5.png";

import resort6 from "../../images/dummy1.jpg";
import resort7 from "../../images/dummy2.jpg";
import resort8 from "../../images/dummy3.jpg";
import resort9 from "../../images/dummy4.jpg";
import resort10 from "../../images/dummy5.jpg";

import resort11 from "../../images/island.jpg";
import resort12 from "../../images/kayaking.jpg";
import resort13 from "../../images/scuba.jpg";
import resort14 from "../../images/snorkeling3.jpg";
import resort15 from "../../images/TheResort.jpg";

export default function Gallery() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Create responsive image heights based on screen size
  const getResponsiveItems = () => {
    if (isMobile) {
      // Mobile: Smaller heights to fit all images
      return [
        { id: "1", img: resort1, url: "#", height: 400 },
        { id: "2", img: resort2, url: "#", height: 350 },
        { id: "3", img: resort3, url: "#", height: 450 },
        { id: "4", img: resort4, url: "#", height: 380 },
        { id: "5", img: resort5, url: "#", height: 420 },
        { id: "6", img: resort7, url: "#", height: 320 },
        { id: "7", img: resort6, url: "#", height: 400 },
        { id: "8", img: resort8, url: "#", height: 360 },
        { id: "9", img: resort9, url: "#", height: 430 },
        { id: "10", img: resort10, url: "#", height: 340 },
        { id: "11", img: resort11, url: "#", height: 320 },
        { id: "12", img: resort12, url: "#", height: 400 },
        { id: "13", img: resort13, url: "#", height: 360 },
        { id: "14", img: resort14, url: "#", height: 430 },
        { id: "15", img: resort15, url: "#", height: 340 },
      ];
    } else if (isTablet) {
      // Tablet: Medium heights
      return [
        { id: "1", img: resort1, url: "#", height: 600 },
        { id: "2", img: resort2, url: "#", height: 500 },
        { id: "3", img: resort3, url: "#", height: 700 },
        { id: "4", img: resort4, url: "#", height: 550 },
        { id: "5", img: resort5, url: "#", height: 650 },
        { id: "6", img: resort7, url: "#", height: 450 },
        { id: "7", img: resort6, url: "#", height: 575 },
        { id: "8", img: resort8, url: "#", height: 525 },
        { id: "9", img: resort9, url: "#", height: 625 },
        { id: "10", img: resort10, url: "#", height: 475 },
        { id: "11", img: resort11, url: "#", height: 450 },
        { id: "12", img: resort12, url: "#", height: 575 },
        { id: "13", img: resort13, url: "#", height: 525 },
        { id: "14", img: resort14, url: "#", height: 625 },
        { id: "15", img: resort15, url: "#", height: 475 },
      ];
    } else {
      // Desktop: Original large heights
      return [
        { id: "1", img: resort1, url: "#", height: 1200 },
        { id: "2", img: resort2, url: "#", height: 1000 },
        { id: "3", img: resort3, url: "#", height: 1400 },
        { id: "4", img: resort4, url: "#", height: 1100 },
        { id: "5", img: resort5, url: "#", height: 1300 },
        { id: "6", img: resort7, url: "#", height: 900 },
        { id: "7", img: resort6, url: "#", height: 1150 },
        { id: "8", img: resort8, url: "#", height: 1050 },
        { id: "9", img: resort9, url: "#", height: 1250 },
        { id: "10", img: resort10, url: "#", height: 950 },
        { id: "11", img: resort11, url: "#", height: 900 },
        { id: "12", img: resort12, url: "#", height: 1150 },
        { id: "13", img: resort13, url: "#", height: 1050 },
        { id: "14", img: resort14, url: "#", height: 1250 },
        { id: "15", img: resort15, url: "#", height: 950 },
      ];
    }
  };

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.masonryContainer}>
        <Masonry
          items={getResponsiveItems()}
          ease="power3.out"
          duration={0.6}
          stagger={isMobile ? 0.1 : 0.05}
          animateFrom="bottom"
          scaleOnHover={!isMobile}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </div>

      {isMobile && (
        <div className={styles.mobileInfo}>
          <p>
            All {getResponsiveItems().length} images are now visible on mobile!
          </p>
        </div>
      )}
    </div>
  );
}
