import { useState } from "react";
import styles from "./AmenitiesSection.module.css";
import acGif from "../../images/ac.gif";
import bedGif from "../../images/bed.gif";
import bathGif from "../../images/bathroom.gif";
import beachGif from "../../images/beach.gif";
import wifiGif from "../../images/wifi.gif";
import tvGif from "../../images/tv.gif";

const amenities = [
  {
    id: "twin or double bed",
    title: "Twin or Double Bed",
    imgOff: bedGif,
    imgOn: bedGif,
    sound: "/sounds/reception-sound.mp3",
  },
  {
    id: "Air conditioned Rooms",
    title: "Air Conditioned Rooms",
    imgOff: acGif,
    imgOn: acGif,
    sound: "/sounds/freeLuggage-sound.mp3",
  },
  {
    id: "Bathroom Products",
    title: "Bathroom Products",
    imgOff: bathGif,
    imgOn: bathGif,
    sound: "/sounds/freeKey-sound.mp3",
  },
  {
    id: "Beach Access",
    title: "Beach Access",
    imgOff: beachGif,
    imgOn: beachGif,
    sound: "/sounds/chillOut-sound.mp3",
  },
  {
    id: "Wifi Available",
    title: "Wifi Available",
    imgOff: wifiGif,
    imgOn: wifiGif,
    sound: "/sounds/paella-sound.mp3",
  },
  {
    id: "Smart TV",
    title: "Smart TV",
    imgOff: tvGif,
    imgOn: tvGif,
    sound: "/sounds/fifa-sound.mp3",
  },
];

export default function AmenitiesSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className={styles.amenitiesSection} id="offerings">
      <div className={styles.pt10}>
        {amenities.map((item) => (
          <div
            key={item.id}
            className={styles.offering}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className={styles.offeringWrapper}>
              <h4 className={styles.amenityTitle} id={item.id}>
                {item.title}
              </h4>
            </div>
            <img
              alt={item.title}
              loading="lazy"
              width="80"
              height="80"
              className={styles.amenityImage}
              src={hovered === item.id ? item.imgOn : item.imgOff}
            />
          </div>
        ))}
      </div>

      {/* Mobile image */}
      <div className={styles.offeringsMobile}>
        <img src={acGif} alt="Mobile showcase" className={styles.mobileImage} />
      </div>
    </section>
  );
}
