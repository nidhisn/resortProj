import React, { useState, useRef, useEffect } from "react";
import styles from "./ExploreIsland.module.css";
import markerData from "./MarkerData";
import mapImage from "../../images/agattimap.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CallIcon from "@mui/icons-material/Call";
import InfoIcon from "@mui/icons-material/Info";
import header from "../../images/header.jpg";
import genericIsland from "../../images/island.jpg";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ExploreIsland() {
  const [activeCategory, setActiveCategory] = useState("Resort");
  const filteredData = markerData.filter(
    (marker) => marker.category === activeCategory
  );

  const islandCards = [
    {
      name: "Agatti Island",
      tagline: "Island",
      description:
        "Agatti, often called the gateway to Lakshadweep, is famous for its stunning lagoon and is the only island with an airport. The approach by air offers breathtaking views of the turquoise waters and coral reefs. Just 459 km from Kochi, Agatti is easily accessible and offers a comfortable tourist complex with modern amenities. Its lagoon, spread over 17.5 sq km, is rich with vibrant corals and colorful reef fish. Fishing is the main livelihood here, along with coir and copra production.",
      image: genericIsland,
    },
    {
      name: "Kadmat Island",
      tagline: "Island",
      description:
        "Kadmat is a paradise for beach lovers and adventure seekers. Its sandy shores, lagoons, and southern sandbanks create stunning views. The island is popular for water sports like kayaking, sailing, and glass-bottom boat rides, with a dedicated Water Sports Institute adding to the appeal. Kadmat is also among India’s best scuba diving spots, with clear waters, excellent visibility, and marine life including rays and reef sharks. Lagoon-facing huts and the Marine Wealth Awareness Package make it a memorable escape for nature and diving enthusiasts.",
      image: genericIsland,
    },
    {
      name: "Kalpeni Island",
      tagline: "Island",
      description:
        "Kalpeni, together with the islets of Tilakkam, Pitti, and Cheriyam, forms a single scenic atoll. A striking feature of the island is the massive storm bank of coral debris along its eastern shores, created by a violent storm in 1847. Known for its progressive spirit, Kalpeni was the first island in Lakshadweep where girls attended school. The vast lagoon is perfect for swimming, snorkeling, reef-walking, and water sports such as kayaking, sailing, and pedal boating. Visitors can also enjoy Koomel Beach, which offers bathing huts with changing rooms, as part of the Coral Reef package.",
      image: genericIsland,
    },
    {
      name: "Kavaratti Island",
      tagline: "Island",
      description:
        "Kavaratti, the administrative capital of Lakshadweep, is the most developed island and home to 52 mosques, with the Ujra Mosque being the most beautiful. The calm lagoon is perfect for swimming, snorkeling, and water sports, while glass-bottomed boat rides reveal its vibrant marine life. Visitors can also explore the marine aquarium, enjoy kayaking, windsurfing, or sailing, and experience scuba diving at the Dolphin Dive Centre. With sun-drenched beaches and tourist packages like Coral Reef and Taratashi, Kavaratti offers a rich blend of culture, adventure, and natural beauty.",
      image: genericIsland,
    },
    {
      name: "Minicoy Island",
      tagline: "Island",
      description:
        "Minicoy, located about 200 km south of the northern Lakshadweep group, is the second largest island and distinct for its culture, language, and traditions. Known for its vast lagoon and the nearby islet of Viringili, the island is home to 11 villages, each led by a Bodukaka, or village elder. Minicoy is celebrated for its folk dance Lava, colorful race boats called Jahadhoni, and a strong seafaring community. Attractions include the 300-foot British-era lighthouse, pristine beaches with bathing huts, and opportunities for water sports. Tuna fishing and canning are important industries, and visitors can stay in tourist cottages or the 20-bed tourist home. Minicoy is included in the Coral Reef and Swaying Palm packages.",
      image: genericIsland,
    },
    {
      name: "Bangaram",
      tagline: "Island",
      description:
        "A teardrop-shaped gem near Agatti and Kavaratti, Bangaram is Lakshadweep’s only uninhabited island resort—perfect for those seeking peace and exclusivity. Surrounded by a serene lagoon with its tiny neighbors Thinnakara and Parali, it offers pristine coral sands and magical nights when phosphorescent plankton light up the beach with a bluish glow. Guests can reach Bangaram by boat or helicopter from Agatti. Renowned worldwide as a haven for luxury and tranquility, it’s a destination that truly lets you unwind.",
      image: genericIsland,
    },
  ];

  // Responsive toggle for mobile behavior
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  const postcardsSectionRef = useRef(null);
  const stickyWrapperRef = useRef(null);
  const motionTrackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: postcardsSectionRef,
    offset: ["start start", "end start"],
  });

  const [scrollDistance, setScrollDistance] = useState(0);
  const [containerHeight, setContainerHeight] = useState(undefined);

  useEffect(() => {
    if (isMobile) {
      setContainerHeight(undefined);
      return; // no sticky math on mobile
    }
    const wrap = stickyWrapperRef.current;
    const track = motionTrackRef.current;
    if (!wrap || !track) return;

    const recalc = () => {
      const dist = Math.max(0, track.scrollWidth - wrap.clientWidth);
      const safeDist = dist > 0 ? dist : 1;
      setScrollDistance(safeDist);
      setContainerHeight(wrap.clientHeight + safeDist);
    };

    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(wrap);
    ro.observe(track);
    window.addEventListener("load", recalc);
    window.addEventListener("resize", recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", recalc);
      window.removeEventListener("resize", recalc);
    };
  }, [isMobile]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

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
            {/* Map Section 
            <div className={styles.zoomControls}>
              <AddIcon fontSize="large" className={styles.zoomIcon} />
              <RemoveIcon fontSize="large" className={styles.zoomIcon} />
            </div>
            */}
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

      {/* Horizontal Postcards Section */}
      <section
        className={styles.postcardsSection}
        ref={postcardsSectionRef}
        style={{
          height: isMobile
            ? "auto"
            : containerHeight
            ? `${containerHeight}px`
            : "100vh",
        }}
      >
        <div className={styles.stickyWrapper} ref={stickyWrapperRef}>
          <motion.div
            style={{ x: isMobile ? 0 : x }}
            className={styles.motionTrack}
            ref={motionTrackRef}
          >
            {/* Intro heading card */}
            <div className={styles.postcardHeading}>
              <h2 className={styles.headingTitle}>
                Discover the
                <br />
                Islands of Lakshadweep
              </h2>
            </div>
            {islandCards.map((card, idx) => (
              <article
                key={card.name}
                className={`${styles.postcard} ${
                  idx % 2 === 0 ? styles.imageLeft : styles.imageRight
                }`}
              >
                <div className={styles.postcardImage}>
                  <img src={card.image} alt={card.name} />
                </div>
                <div className={styles.postcardText}>
                  <div className={styles.textContainer}>
                    <h3 className={styles.postcardTagline}>{card.tagline}</h3>
                    <h4 className={styles.postcardTitle}>{card.name}</h4>
                    <p className={styles.postcardDesc}>{card.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </section>
    </section>
  );
}
