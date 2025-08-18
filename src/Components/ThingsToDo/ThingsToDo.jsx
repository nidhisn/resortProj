import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ThingsToDo.module.css";
import image1 from "../../images/snorkeling3.jpg";
import image2 from "../../images/scuba.jpg";
import fishing from "../../images/fishing.jpg";
import kite from "../../images/kitesurfing.jpg";
import kayaking from "../../images/kayaking.jpg";
import dolphin from "../../images/dolphin.jpg";
// import kayakingIcon from "../../images/kayakingActivityy.gif"; // Disabled: thread GIF
import theResortImage from "../../images/TheResort.jpg";
import theIslandImage from "../../images/island.jpg";

const activities = [
  {
    title: "Snorkeling",
    description:
      "Discover vibrant coral gardens and colorful fish just beneath the surface. Snorkeling in the crystal-clear waters of Agatti, Kadmat, and Bangaram is perfect for all skill levels—an easy and breathtaking introduction to marine life. Location: Agatti, Kadmat, Bangaram. Approx. Cost: ₹500 – ₹2000",
    image: image1,
  },
  {
    title: "Scuba diving",
    description:
      "Dive deeper into Lakshadweep’s marine magic. Explore coral reefs, underwater cliffs, and spot turtles, rays, and reef sharks—guided by certified instructors. Ideal for both beginners and seasoned divers. Location: Agatti, Bangaram, Kavaratti. Approx. Cost: ₹3500 – ₹7000",
    image: image2,
  },
  {
    title: "Fishing",
    description:
      "For a fun local experience, visit Kadmat Island and join the fishermen on a real fishing trip. Ride in their traditional boats, learn how they fish, and enjoy the calm blue sea. Whether you’ve fished before or it’s your first time, it’s a great mix of fun and peace. Fishing is one of the top things to do in Lakshadweep if you want to try something new and connect with the island life.",
    image: fishing,
  },
  {
    title: "Kite Surfing",
    description:
      "Ride the waves and feel the thrill of the wind at Minicoy Island. Whether you're a beginner or a pro, kite surfing here promises an unforgettable adventure across the lagoon’s sparkling waters. Location: Minicoy Island. Approx. Cost: ₹3000 – ₹5000",
    image: kite,
  },
  {
    title: "Kayaking",
    description:
      "Glide through turquoise lagoons and mangrove-lined channels. Kayaking offers a peaceful way to explore Lakshadweep’s serene beauty—ideal for nature lovers and adventure seekers alike.Location: Agatti, Bangaram, Kavaratti. Approx. Cost: ₹500 – ₹1500",
    image: kayaking,
  },
  {
    title: "Dolphin watching",
    description:
      "Dolphin watching is one of the most exciting things to do in Lakshadweep. The Dolphin Drive Centre on Kavaratti Island is the best place to see these amazing animals. Local fishermen take you out in traditional wooden boats called ‘oti’ for a fun and safe ride. The best part? You can spot Bottlenose dolphins jumping, playing, and swimming in the clear blue sea. These dolphins are friendly and often come close to the boat, making it easy to take photos and enjoy the moment. Watching them in their natural home is truly a magical experience you won’t forget.",
    image: dolphin,
  },
];

const ThingsToDo = () => {
  const bgRef = useRef(null);
  // const threadSvgRef = useRef(null); // Disabled: thread SVG
  // const threadPathRef = useRef(null); // Disabled: thread SVG path
  // const kayakingIconRef = useRef(null); // Disabled: thread GIF icon
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const subheadingRef = useRef(null);
  const oceanSectionRef = useRef(null);
  const lastActivityRef = useRef(null); // Ref for the last activity element
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Track viewport size to disable thread/gif on small screens
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const handleChange = (e) => setIsSmallScreen(e.matches);
    setIsSmallScreen(mql.matches);
    if (mql.addEventListener) {
      mql.addEventListener("change", handleChange);
    } else {
      mql.addListener(handleChange);
    }
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleChange);
      } else {
        mql.removeListener(handleChange);
      }
    };
  }, []);

  // Parallax effect for background image (unchanged)
  useEffect(() => {
    const bg = bgRef.current;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 10;
      const y = (e.clientY / innerHeight - 0.5) * 10;
      bg.style.transform = `scale(1.08) rotateX(${y}deg) rotateY(${x}deg)`;
    };

    const handleMouseLeave = () => {
      bg.style.transform = `scale(1.05) rotateX(0) rotateY(0)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  /*
   * Thread + GIF animation temporarily disabled.
   * Keeping the implementation commented for future reactivation.
   *
   * // Scroll thread growth animation with SVG path drawing and icon movement
   * useEffect(() => {
   *   if (isSmallScreen) return;
   *   const threadSvg = threadSvgRef.current;
   *   const threadPath = threadPathRef.current;
   *   const kayakingIconElement = kayakingIconRef.current;
   *   const subheadingElement = subheadingRef.current;
   *   const lastActivityElement = lastActivityRef.current;
   *   // ...rest of implementation
   * }, [isSmallScreen]);
   */

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div ref={heroRef} className={styles.hero}>
        <div ref={bgRef} className={styles.background}></div>
        <div ref={heroContentRef} className={styles.heroContent}>
          <h1 className={styles.heading}>Looking to get away from it all?</h1>
          <span ref={subheadingRef} className={styles.subheading}>
            Scroll Your Way to Adventure
          </span>
          {/*
            Thread + GIF temporarily disabled. Keeping markup for future use.
            {!isSmallScreen && (
              <div className={styles.threadWrapper}>
                <svg
                  ref={threadSvgRef}
                  className={styles.threadSvg}
                  viewBox="0 0 100 2500"
                  preserveAspectRatio="xMidYMin slice"
                >
                  <defs>
                    <linearGradient id="threadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fff" />
                      <stop offset="88%" stopColor="#b9e6f9" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <path
                    ref={threadPathRef}
                    className={styles.threadPath}
                    d="M 50 0 C 1 181 117 190 50 300 S 72 429 38 508 S 108 551 50 900 S 70 1100 50 1200 S -81 1219 50 1500 S 70 1700 50 1800 S 30 2000 50 2100 S 70 2300 50 2400"
                  />
                  <image
                    ref={kayakingIconRef}
                    href={kayakingIcon}
                    x="0"
                    y="0"
                    width="200"
                    height="200"
                    className={styles.kayakingIcon}
                  />
                </svg>
              </div>
            )}
          */}
        </div>
      </div>

      {/* Activities Section */}
      <div ref={oceanSectionRef} className={styles.oceanSection}>
        {activities.map((item, index) => (
          <div
            key={index}
            // Assign the lastActivityRef to the very last activity item
            ref={index === activities.length - 1 ? lastActivityRef : null}
            className={`${styles.activity} ${
              index % 2 !== 0 ? styles.reverse : ""
            }`}
          >
            <img src={item.image} alt={item.title} className={styles.image} />
            <div className={`${styles.text} ${styles.floatingText}`}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* NEW: Explore More Section 
      <div className={styles.exploreMoreSection}>
       
        <Link to="/resort" className={styles.exploreBox}>
          <img src={theResortImage} alt="The Resort" />
          <div className={styles.exploreTextOverlay}>
            <h2>The resort</h2>
          </div>
        </Link>

       
        <Link to="/exploretheisland" className={styles.exploreBox}>
          <img src={theIslandImage} alt="Island Tour" />
          
          <div className={styles.exploreTextOverlay}>
            <h2>Island tour</h2>
            
          </div>
        </Link>
      </div>
*/}
    </div>
  );
};

export default ThingsToDo;
