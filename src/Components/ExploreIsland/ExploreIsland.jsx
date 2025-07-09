import React, { useState } from "react";
import styles from "./ExploreIsland.module.css";
import markerData from "./MarkerData";
import mapImage from "../../images/mapofisland.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CallIcon from "@mui/icons-material/Call";
import InfoIcon from "@mui/icons-material/Info";

export default function ExploreIsland() {
  const [activeCategory, setActiveCategory] = useState("Resort");

  const filteredData = markerData.filter(
    (marker) => marker.category === activeCategory
  );

  return (
    <section className={styles.container}>
      <div className={styles.mapSection}>
        <div className={styles.mapWrapper}>
          <img
            src={mapImage}
            alt="image of the island"
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

          {/* Conditional flight info for Airports tab */}
          {activeCategory === "Airports" && (
            <div className={styles.flights}>
              <h3>Direct Flights from India</h3>
              <div className={styles.flightItem}>
                <p>
                  <strong>Cochin International Airport (COK)</strong> → Agatti
                  Island
                  <br />
                  <p>Duration: 1 hr 20 min</p>
                  <br />
                </p>
                <p>
                  <strong>Goa International Airport (GOX)</strong> → Agatti
                  Island
                  <br />
                  <p>Duration: 1 hr 50 min</p>
                  <br />
                </p>
                <p>
                  <strong>
                    Kempegowda International Airport, Bangalore (BLR)
                  </strong>{" "}
                  → Agatti Island
                  <br />
                  <p>Time: 2 hr 10 min</p>
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
                target="_blank"
                rel="noopener noreferrer"
              >
                <InfoIcon fontSize="small" /> FAQs
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
