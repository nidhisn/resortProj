import React, { useState } from "react";
import styles from "./Faqs.module.css";
import header from "../../images/faq.jpg";

const faqs = [
  // Lakshadweep-related questions

  {
    question: "What are the entry rules for visiting Lakshadweep?",
    answer:
      "To visit Lakshadweep, an archipelago of 36 islands in the Arabian Sea, travelers must secure an entry permit issued by the Lakshadweep Administration. This requirement applies to both Indian nationals and foreign visitors to protect the islands’ delicate ecosystem and cultural heritage. The process involves obtaining a Police Clearance Certificate, securing sponsorship, preparing necessary documents, and submitting an application online or offline. For more details, visit the Entry Permit Portal: http://epermit.utl.gov.in.",
    category: "island",
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
    category: "island",
  },

  {
    question: "What is the best time to visit Lakshadweep?",
    answer:
      "The best time to visit Lakshadweep is between September and May, when the weather is pleasant and ideal for water sports like surfing, snorkeling, scuba diving, kayaking, and more. The temperature during this period ranges between 22°C and 36°C. After summer, monsoon rains between June and August make the islands lush and green. The peak tourist season is from December to February.",
    category: "island",
  },
  {
    question: "How do I reach Lakshadweep?",
    answer:
      "Kochi (Cochin) is the gateway. Flights: Kochi → Agatti (the only airstrip). From Agatti, boats run to Kavaratti and Kadmat Oct–May; during monsoon, helicopter transfers to Kavaratti may be available. Ships: Passenger ships sail from Kochi to the islands in about 14–18 hours, with multiple classes. High‑speed vessels operate between islands in fair season.",
    category: "Island",
  },

  {
    question: "Does the resort have private bathrooms and private entrances?",
    answer:
      "Yes, all rooms come with private bathrooms and private entrances for your comfort and privacy.",
    category: "Sandbank",
  },
  {
    question: "Is the resort family-friendly?",
    answer:
      "Yes, the resort is family-friendly and can accommodate families comfortably. One extra adult per room can also be added at an additional cost.",
    category: "Sandbank",
  },
  {
    question: "Are there beach-view rooms available?",
    answer:
      "No, the resort does not currently offer beach-view rooms. However, there are 5 non-beach-view rooms available.",
    category: "Sandbank",
  },
  {
    question: "What amenities are provided in the rooms?",
    answer:
      "The rooms are equipped with air conditioning, a table and chair, wireless internet, bed and bath essentials such as hangers, shampoo, soap, and towels.",
    category: "Sandbank",
  },
  {
    question: "What facilities does the resort offer?",
    answer:
      "The resort offers family/kid-friendly facilities, free parking on the premises, and is also suitable for hosting events.",
    category: "Sandbank",
  },
  {
    question: "Are meals included in the stay?",
    answer:
      "Yes, breakfast, lunch, and dinner are included in your stay at the resort.",
    category: "Sandbank",
  },
  {
    question: "Is the resort located on the beachfront?",
    answer:
      "Yes, the resort is beachfront, offering easy access to the beach and beautiful surroundings.",
    category: "Sandbank",
  },
  {
    question: "Are pets allowed in the rooms?",
    answer: "Unfortunately, pets are not allowed.",
    category: "Sandbank",
  },
  {
    question: "Can I change my booking?",
    answer:
      "We understand that even the best plans can change. Yes, you can change your booking, provided you give us at least 14 days’ notice. Please call or message us, and we’ll do our best to accommodate your changes.",
    category: "Booking",
  },
  {
    question: "How do I cancel my booking?",
    answer:
      "You can cancel your booking, provided you give us at least 14 days’ notice. Just give us a call or send us an email.",
    category: "Booking",
  },
  {
    question: "How do I check in?",
    answer:
      "We don’t have a reception desk. We will text you when your Denmark accommodation is ready—our goal is to have it prepared by 2 pm. Once you receive your welcome text, you can enter your chalet at your convenience. Even though you won’t meet us at check-in, we’re always available if you need assistance.",
    category: "Booking",
  },
  {
    question: "How do I check out?",
    answer:
      "Check-out is by 10 am on your departure day. We appreciate your cooperation with our check-out time, as it allows us to clean and prepare the chalets for incoming guests. We take pride in maintaining the high cleanliness standards of our chalets and value this turnover time.",
    category: "Booking",
  },
];

export default function Faqs() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (index) => setOpenFAQ(openFAQ === index ? null : index);

  const groups = [
    { id: "faq-section--1", title: "Island" },
    { id: "faq-section--2", title: "Booking" },
    { id: "faq-section--3", title: "Sandbank" },
  ];

  const groupedAll = groups.map((g) => ({
    ...g,
    items: faqs.filter(
      (f) => (f.category || "").toLowerCase() === g.title.toLowerCase()
    ),
  }));
  const visibleGroups = groupedAll.filter((g) => g.items.length > 0);

  return (
    <div className={styles.faqPage}>
      {/* Header Image & Title */}
      <div className={styles.headerImage}>
        <img src={header} alt="FAQs Header" />
      </div>
      <div className={styles.pageTitle}>
        <h1>Frequently Asked Questions</h1>
      </div>

      {/* FAQ Content (categories only, no sidebar) */}
      <section className={styles.faqContent}>
        {visibleGroups.map((group, groupIndex) => (
          <div key={group.id} id={group.id} className={styles.faqGroup}>
            <h2 className={styles.groupTitle}>{group.title}</h2>
            <div className={styles.faqSection}>
              {group.items.map((faq, index) => {
                const absoluteIndex = `${groupIndex}-${index}`;
                return (
                  <div
                    key={absoluteIndex}
                    className={`${styles.faqItem} ${
                      openFAQ === absoluteIndex ? styles.open : ""
                    }`}
                    onClick={() => toggleFAQ(absoluteIndex)}
                  >
                    <div className={styles.faqItemHeader}>
                      <div className={styles.faqLine}></div>
                      <h2 className={styles.question}>{faq.question}</h2>
                    </div>
                    {openFAQ === absoluteIndex && (
                      <div className={styles.answer}>{faq.answer}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
