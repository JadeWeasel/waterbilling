import BaseLayout from "../components/BaseLayout";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <BaseLayout>
      <h1 className="h1, chartGrid">Үндсэн хэсэг</h1>
      <Hero />
    </BaseLayout>
  );
};

export default Home;
