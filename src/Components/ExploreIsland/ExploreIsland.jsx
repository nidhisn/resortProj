import React, { useState } from "react";
import styles from "./ExploreIsland.module.css";
import markerData from "./MarkerData";
import mapImage from "../../images/mapofisland.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CallIcon from "@mui/icons-material/Call";
import InfoIcon from "@mui/icons-material/Info";
import header from "../../images/header.jpg";

export default function ExploreIsland() {
  const [activeCategory, setActiveCategory] = useState("Resort");
  const filteredData = markerData.filter(
    (marker) => marker.category === activeCategory
  );

  return (
    <section className={styles.container}>
      {/* Header Image */}
      <div className={styles.header}>
        <img src={header} alt="Lakshadweep Islands" />
      </div>

      {/* Intro Paragraph */}
      <div className={styles.introText}>
        <p>
          The untouched beauty of Lakshadweep makes Sandbank Resort a perfect
          escape for every traveler. With white beaches, coral-fringed lagoons,
          and the deep blue sea in harmony, this smallest Union Territory feels
          boundless. Meaning 'one hundred thousand islands' in Sanskrit,
          Lakshadweep is a serene world of 36 scattered islands, from Agatti to
          Minicoy, offering a rare sense of remoteness and pristine charm.
          Staying with us places you at the heart of this tranquil paradise,
          where time slows and nature takes center stage.
        </p>
      </div>

      {/* Content Section (Map + Info) */}
      <div className={styles.contentWrapper}>
        {/* Map Section */}
        <div className={styles.mapSection}>
          <div className={styles.mapWrapper}>
            <img
              src={mapImage}
              alt="Lakshadweep Map"
              className={styles.mapImage}
            />
            <div className={styles.zoomControls}>
              <AddIcon fontSize="large" className={styles.zoomIcon} />
              <RemoveIcon fontSize="large" className={styles.zoomIcon} />
            </div>
          </div>
          <div className={styles.legend}>
            {["Airports", "Resort", "Shop", "Island"].map((cat, i) => (
              <div key={i} className={styles.legendItem}>
                <span
                  className={`${styles.dot} ${
                    styles[cat.replace(/\s/g, "").toLowerCase()]
                  }`}
                ></span>
                <span>{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div className={styles.infoPanel}>
          <div className={styles.tabs}>
            {["Resort", "Airports", "Shop"].map((cat, idx) => (
              <button
                key={idx}
                className={`${styles.tab} ${
                  activeCategory === cat ? styles.activeTab : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.infoContent}>
            <h3>{filteredData[0]?.title}</h3>
            <p>{filteredData[0]?.description}</p>
            <p>{filteredData[0]?.address}</p>
            <p>{filteredData[0]?.phone}</p>

            {activeCategory === "Airports" && (
              <div className={styles.flights}>
                <h3>Direct Flights from India</h3>
                <div className={styles.flightItem}>
                  <p>
                    <strong>Cochin International Airport (COK)</strong> → Agatti
                    Island <br /> Duration: 1 hr 20 min
                  </p>
                  <p>
                    <strong>Goa International Airport (GOX)</strong> → Agatti
                    Island <br /> Duration: 1 hr 50 min
                  </p>
                  <p>
                    <strong>
                      Kempegowda International Airport, Bangalore (BLR)
                    </strong>{" "}
                    → Agatti Island <br /> Time: 2 hr 10 min
                  </p>
                </div>
              </div>
            )}

            <div className={styles.links}>
              {filteredData[0]?.contact && (
                <a
                  href={filteredData[0].contact}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CallIcon fontSize="small" /> Contact
                </a>
              )}
              {filteredData[0]?.discover && (
                <a
                  href={filteredData[0].discover}
                  target="/faq"
                  rel="noopener noreferrer"
                >
                  <InfoIcon fontSize="small" /> FAQs
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
