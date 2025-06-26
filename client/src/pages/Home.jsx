import React from "react";
import HeroSection from "../components/Home/HeroSection";
import AboutSection from "../components/Home/AboutSection";
import FeaturesSection from "../components/Home/FeaturesSection";
import MissionSection from "../components/Home/MissionSection";
import JoinUsSection from "../components/Home/JoinUsSection";


const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <MissionSection />
      <JoinUsSection />
    </div>
  );
};

export default Home;
