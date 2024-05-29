// components/Card.js
import React from "react";
import styles from "./Card.module.css";

const Card = ({
  title,
  description,
  imageUrl,
  linkUrl,
  linkText,
  newsdate,
}) => {
  return (
    <div className={styles.card}>
      {imageUrl && <img src={imageUrl} alt={title} className={styles.image} />}
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        {linkUrl && (
          <a
            href={linkUrl}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
        )}
        <p className={styles.description}>{newsdate}</p>
      </div>
    </div>
  );
};
export default Card;
