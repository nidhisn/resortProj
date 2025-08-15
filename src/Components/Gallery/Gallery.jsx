import React from "react";
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

const items = [
  {
    id: "1",
    img: resort1,
    url: "#",
    height: 1200,
  },
  {
    id: "2",
    img: resort2,
    url: "#",
    height: 1000,
  },
  {
    id: "3",
    img: resort3,
    url: "#",
    height: 1400,
  },
  {
    id: "4",
    img: resort4,
    url: "#",
    height: 1100,
  },
  {
    id: "5",
    img: resort5,
    url: "#",
    height: 1300,
  },
  // Add more items with different heights for better masonry effect
  {
    id: "6",
    img: resort7,
    url: "#",
    height: 900,
  },
  {
    id: "7",
    img: resort6,
    url: "#",
    height: 1150,
  },
  {
    id: "8",
    img: resort8,
    url: "#",
    height: 1050,
  },
  {
    id: "9",
    img: resort9,
    url: "#",
    height: 1250,
  },
  {
    id: "10",
    img: resort10,
    url: "#",
    height: 950,
  },

  {
    id: "11",
    img: resort11,
    url: "#",
    height: 900,
  },
  {
    id: "12",
    img: resort12,
    url: "#",
    height: 1150,
  },
  {
    id: "13",
    img: resort13,
    url: "#",
    height: 1050,
  },
  {
    id: "14",
    img: resort14,
    url: "#",
    height: 1250,
  },
  {
    id: "15",
    img: resort15,
    url: "#",
    height: 950,
  },
];

export default function Gallery() {
  return (
    <div className={styles.galleryContainer}>
      <div className={styles.masonryContainer}>
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </div>
    </div>
  );
}
