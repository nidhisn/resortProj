import React, { useState } from "react";
import styles from "./Resort.module.css";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import img1 from "../../images/TheResort.jpg";
import resort1 from "../../images/resort1.png";
import resort2 from "../../images/resort2.png";
import resort3 from "../../images/resort3.png";
import resort4 from "../../images/resort4.png";
import resort5 from "../../images/resort5.png";
import resort6 from "../../images/resort6.png";
import BedIcon from "@mui/icons-material/Bed";
import WifiIcon from "@mui/icons-material/Wifi";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ShowerIcon from "@mui/icons-material/Shower";
import WavesIcon from "@mui/icons-material/Waves";
import TvIcon from "@mui/icons-material/Tv";

const galleryImages = [resort1, resort2, resort3, resort4, resort5, resort6];

const faqs = [
  // Resort-related questions
  {
    question: "What are the check-in and check-out hours at the resort?",
    answer:
      "Check-in time is at 11:00 AM, and check-out time is at 9:00 AM. Early check-in and late check-out are available free of charge, subject to availability.",
  },
  {
    question: "Are there beach-view rooms available?",
    answer:
      "No, the resort does not currently offer beach-view rooms. However, there are 5 non-beach-view rooms available.",
  },
  {
    question: "Are meals included in the stay?",
    answer:
      "Yes, breakfast, lunch, and dinner are included in your stay at the resort.",
  },
  {
    question: "Are pets allowed in the rooms?",
    answer: "Unfortunately, pets are not allowed.",
  },
];

const Resort = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className={styles.resort}>
      {/* Hero Image */}
      <section className={styles.heroOverlay}>
        <img src={img1} alt="Resort" className={styles.backgroundImage} />
        <div className={styles.textOverlay}>
          <div className={styles.leftText}>
            <h1>
              Sand <br /> Bank <br /> Resort
            </h1>
          </div>
          <div className={styles.rightDetails}>
            <p>
              <strong>Rooms</strong>
              <br />7
            </p>
            <p>
              <strong>Guests</strong>
              <br />
              Max 2
            </p>
          </div>
        </div>
      </section>
      {/* Description Section */}
      <section className={styles.description}>
        <h2>The balance between comfort and nature</h2>
        <p>
          Beachfront cottages and air-conditioned rooms with ocean views. Direct
          beach access and free wifi. Stay in the refined beauty of a bright
          suite or cottage surrounded by nature.
          <div className={styles.amenities}>
            <h2>Amenities</h2>
            <div className={styles.amenitiesGrid}>
              <div className={styles.amenityItem}>
                <BedIcon fontSize="large" className={styles.icon} />
                <p>Twin or double bed</p>
              </div>
              <div className={styles.amenityItem}>
                <AcUnitIcon fontSize="large" className={styles.icon} />
                <p>Air conditioned</p>
              </div>
              <div className={styles.amenityItem}>
                <ShowerIcon fontSize="large" className={styles.icon} />
                <p>Bathroom Products</p>
              </div>
              <div className={styles.amenityItem}>
                <WavesIcon fontSize="large" className={styles.icon} />
                <p>Beach access</p>
              </div>
              <div className={styles.amenityItem}>
                <WifiIcon fontSize="large" className={styles.icon} />
                <p>Wifi available</p>
              </div>
              <div className={styles.amenityItem}>
                <TvIcon fontSize="large" className={styles.icon} />
                <p>Smart TV</p>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Link to="/booking" className={styles.bookButton}>
                BOOK MY STAY
              </Link>
            </div>
          </div>
        </p>
      </section>

      {/* Gallery Section */}
      <section className={styles.galleryWrapper}>
        <div className={styles.gallery}>
          {[...galleryImages, ...galleryImages].map((img, index) => (
            <img key={index} src={img} alt={`Gallery ${index + 1}`} />
          ))}
        </div>
      </section>

      <div className={styles.pageTitle}>
        <h1>Frequently Asked Questions</h1>
      </div>
      {/* FAQs */}
      {/* FAQ Section */}
      <section className={styles.faqSection}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${
              openFAQ === index ? styles.open : ""
            }`}
            onClick={() => toggleFAQ(index)}
          >
            <div className={styles.faqItemHeader}>
              <div className={styles.faqLine}></div>
              <h2 className={styles.question}>{faq.question}</h2>
            </div>

            {openFAQ === index && <p className={styles.answer}>{faq.answer}</p>}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Resort;
