import React from "react";
import styles from "./ThingsToDo.module.css";
import image1 from "../../images/snorkeling3.jpg";
import image2 from "../../images/scuba.jpg";
import fishing from "../../images/fishing.jpg";
import kite from "../../images/kitesurfing.jpg";
import kayaking from "../../images/kayaking.jpg";
import dolphin from "../../images/dolphin.jpg";

const activities = [
  {
    title: "Snorkeling",
    description:
      "Discover vibrant coral gardens and colorful fish just beneath the surface. Snorkeling in the crystal-clear waters of Agatti, Kadmat, and Bangaram is perfect for all skill levels—an easy and breathtaking introduction to marine life. Location: Agatti, Kadmat, Bangaram.  Approx. Cost: ₹500 – ₹2000",
    image: image1,
  },
  {
    title: "Scuba diving",
    description:
      "Dive deeper into Lakshadweep’s marine magic. Explore coral reefs, underwater cliffs, and spot turtles, rays, and reef sharks—guided by certified instructors. Ideal for both beginners and seasoned divers. Location: Agatti, Bangaram, Kavaratti.  Approx. Cost: ₹3500 – ₹7000",
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

  {
    title: "Dolphin watching",
    description:
      "Dolphin watching is one of the most exciting things to do in Lakshadweep. The Dolphin Drive Centre on Kavaratti Island is the best place to see these amazing animals. Local fishermen take you out in traditional wooden boats called ‘oti’ for a fun and safe ride. The best part? You can spot Bottlenose dolphins jumping, playing, and swimming in the clear blue sea. These dolphins are friendly and often come close to the boat, making it easy to take photos and enjoy the moment. Watching them in their natural home is truly a magical experience you won’t forget.",
    image: dolphin,
  },

  {
    title: "Dolphin watching",
    description:
      "Dolphin watching is one of the most exciting things to do in Lakshadweep. The Dolphin Drive Centre on Kavaratti Island is the best place to see these amazing animals. Local fishermen take you out in traditional wooden boats called ‘oti’ for a fun and safe ride. The best part? You can spot Bottlenose dolphins jumping, playing, and swimming in the clear blue sea. These dolphins are friendly and often come close to the boat, making it easy to take photos and enjoy the moment. Watching them in their natural home is truly a magical experience you won’t forget.",
    image: dolphin,
  },
];

const ThingsToDo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}></div>

      <div className={styles.content}>
        <div className={styles.main}>
          <h1 className={styles.heading}>
            Looking to get away from it all?
            <span className={styles.subheading}>
              Scroll Your Way to Adventure
            </span>
            <div className={styles.threadWrapper}>
              <svg
                width="30"
                height="200"
                viewBox="0 0 30 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="15" cy="10" r="5" fill="white" />
                <path
                  d="M15 10 C25 80, 5 120, 15 190"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </h1>
        </div>

        {activities.map((item, index) => (
          <div
            key={index}
            className={`${styles.activity} ${
              index % 2 !== 0 ? styles.reverse : ""
            }`}
          >
            <img src={item.image} alt={item.title} className={styles.image} />
            <div className={styles.text}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThingsToDo;
