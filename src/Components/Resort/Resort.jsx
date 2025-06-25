import React, { useState } from "react";
import styles from "./Resort.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import img1 from "../../images/TheResort.jpg";
import img2 from "../../images/scuba.jpg";
import img3 from "../../images/island.jpg";
import BedIcon from "@mui/icons-material/Bed";
import WifiIcon from "@mui/icons-material/Wifi";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ShowerIcon from "@mui/icons-material/Shower";
import WavesIcon from "@mui/icons-material/Waves";

const galleryImages = [img2, img3];

const faqs = [
  {
    question: "When is the check-in time?",
    answer: "Check-in is after 3 PM.",
  },
  {
    question: "What time is check-out?",
    answer: "Check-out is before 11 AM.",
  },
  {
    question: "Is late check-out available?",
    answer:
      "Late check-out is available upon request and subject to availability.",
  },
  {
    question: "Are pets allowed in the rooms?",
    answer: "Unfortunately, pets are not allowed.",
  },
  {
    question: "Is breakfast included?",
    answer: "Yes, complimentary breakfast is included with your stay.",
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
            <p>
              <strong>Price</strong>
              <br />
              From 2K Rupees
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
            </div>
          </div>
        </p>
      </section>

      {/* Gallery Section */}
      <section className={styles.gallery}>
        {galleryImages.map((img, index) => (
          <img key={index} src={img} alt={`Gallery ${index + 1}`} />
        ))}
      </section>
      {/* FAQs */}
      <section className={styles.faqSection}>
        <h3>Helpful Information</h3>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${
                openFAQ === index ? styles.open : ""
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className={styles.faqItemHeader}>
                <div className={styles.question}>{faq.question}</div>
                <div className={styles.arrow}>
                  {openFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              {openFAQ === index && (
                <div className={styles.answer}>{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Resort;
