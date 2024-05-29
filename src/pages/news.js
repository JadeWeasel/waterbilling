import BaseLayout from "../components/BaseLayout";
import styles from "./news.module.css";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";

const cards = [
  {
    title: "Example Card 1",
    description: "This is a short description of the first card.",
    imageUrl: "https://via.placeholder.com/600x400",
    linkUrl: "https://example.com/1",
    linkText: "Learn more",
  },
  {
    title: "Example Card 2",
    description: "This is a short description of the second card.",
    imageUrl: "https://via.placeholder.com/600x400",
    linkUrl: "https://example.com/2",
    linkText: "Learn more",
  },
  {
    title: "Example Card 3",
    description: "This is a short description of the third card.",
    imageUrl: "https://via.placeholder.com/600x400",
    linkUrl: "https://example.com/3",
    linkText: "Learn more",
  },
  {
    title: "Example Card 4",
    description: "This is a short description of the fourth card.",
    imageUrl: "https://via.placeholder.com/600x400",
    linkUrl: "https://example.com/4",
    linkText: "Learn more",
  },
  {
    title: "Example Card 5",
    description: "This is a short description of the fourth card.",
    imageUrl: "https://via.placeholder.com/600x400",
    linkUrl: "https://example.com/4",
    linkText: "Learn more",
  },
  {
    title: "Example Card 6",
    description: "This is a short description of the fourth card.",
    imageUrl: "https://via.placeholder.com/600x400",
    linkUrl: "https://example.com/4",
    linkText: "Learn more",
  },

  // Add more cards as needed
];

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://159.89.203.190:8001/news");
        setNews(response.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <BaseLayout>
      <div className={styles.container}>
        <h1 className="h1" style={{ marginBottom: "30px" }}>
          Мэдээ мэдээлэл
        </h1>
        <div className={styles.cardGrid}>
          {news.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              imageUrl={card.newsimage}
              linkUrl={card.linkUrl}
              linkText={card.newsdate}
              newsdate={card.newsdate}
            />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default News;
