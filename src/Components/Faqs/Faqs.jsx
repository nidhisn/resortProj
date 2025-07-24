import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Faqs.module.css";
import header from "../../images/faq.jpg";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  // Lakshadweep-related questions
  {
    question: "What are the entry rules for visiting Lakshadweep?",
    answer:
      "To visit Lakshadweep, an archipelago of 36 islands in the Arabian Sea, travelers must secure an entry permit issued by the Lakshadweep Administration. This requirement applies to both Indian nationals and foreign visitors to protect the islands’ delicate ecosystem and cultural heritage. The process involves obtaining a Police Clearance Certificate, securing sponsorship, preparing necessary documents, and submitting an application online or offline. For more details, visit the Entry Permit Portal: http://epermit.utl.gov.in.",
  },
  {
    question: "What are the do's and don'ts when visiting Lakshadweep?",
    answer: (
      <div>
        <strong>Do's:</strong>
        <ul>
          <li>
            Book your tour well in advance, as the number of tourists allowed is
            restricted.
          </li>
          <li>
            Carry all necessary items, including medicines and basic amenities,
            as shops are limited.
          </li>
        </ul>
        <strong>Don'ts:</strong>
        <ul>
          <li>Picking corals from the island is a punishable act.</li>
          <li>
            Carrying prohibited drugs and narcotics into Lakshadweep is strictly
            prohibited.
          </li>
        </ul>
      </div>
    ),
  },

  {
    question: "What is the best time to visit Lakshadweep?",
    answer:
      "The best time to visit Lakshadweep is between September and May, when the weather is pleasant and ideal for water sports like surfing, snorkeling, scuba diving, kayaking, and more. The temperature during this period ranges between 22°C and 36°C. After summer, monsoon rains between June and August make the islands lush and green. The peak tourist season is from December to February.",
  },
  {
    question: "What are the check-in and check-out hours at the resort?",
    answer:
      "Check-in time is at 11:00 AM, and check-out time is at 9:00 AM. Early check-in and late check-out are available free of charge, subject to availability.",
  },
  {
    question: "Does the resort have private bathrooms and private entrances?",
    answer:
      "Yes, all rooms come with private bathrooms and private entrances for your comfort and privacy.",
  },
  {
    question: "Is the resort family-friendly?",
    answer:
      "Yes, the resort is family-friendly and can accommodate families comfortably. One extra adult per room can also be added at an additional cost.",
  },
  {
    question: "Are there beach-view rooms available?",
    answer:
      "No, the resort does not currently offer beach-view rooms. However, there are 5 non-beach-view rooms available.",
  },
  {
    question: "What amenities are provided in the rooms?",
    answer:
      "The rooms are equipped with air conditioning, a table and chair, wireless internet, bed and bath essentials such as hangers, shampoo, soap, and towels.",
  },
  {
    question: "What facilities does the resort offer?",
    answer:
      "The resort offers family/kid-friendly facilities, free parking on the premises, and is also suitable for hosting events.",
  },
  {
    question: "Are meals included in the stay?",
    answer:
      "Yes, breakfast, lunch, and dinner are included in your stay at the resort.",
  },
  {
    question: "Is the resort located on the beachfront?",
    answer:
      "Yes, the resort is beachfront, offering easy access to the beach and beautiful surroundings.",
  },
  {
    question: "Are pets allowed in the rooms?",
    answer: "Unfortunately, pets are not allowed.",
  },
];

export default function Faqs() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (index) => setOpenFAQ(openFAQ === index ? null : index);

  return (
    <div className={styles.faqPage}>
      {/* Header Image & Title */}
      <div className={styles.headerImage}>
        <img src={header} alt="FAQs Header" />
      </div>
      <div className={styles.pageTitle}>
        <h1>Frequently Asked Questions</h1>
      </div>

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

            {openFAQ === index && (
              <div className={styles.answer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
