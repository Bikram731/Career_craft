import React, { useEffect, useState } from 'react';
import HeroSection from "../components/Herosection";
import AboutSection from '../components/AboutSection';
import FeaturesScroll from '../components/FeaturesScroll'

const Home = () => {
  const [careerPaths, setCareerPaths] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/careerpaths')
      .then(res => res.json())
      .then(data => setCareerPaths(data))
      .catch(err => console.error("Error fetching:", err));
  }, []);

  return (
      <div>
      <HeroSection />
      <AboutSection />
      <FeaturesScroll/>
      {/* Add CareerPathGrid component here later */}
    </div>
  );
};

export default Home;