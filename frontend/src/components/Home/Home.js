// LandingPage.js
import React from "react";
import "./Home.css";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import FAQs from "./FAQs";
import AboutUs from "./AboutUs";
import HeroSection from "./Hero";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleExploreButtonClick = () => {
    navigate("/home");
  };
  return (
    <>
      <HeroSection />
      <AboutUs />
      <Features />
      <HowItWorks />
      <FAQs />

      <footer className="footer">
        <p>&copy; 2023 Your Website. All rights reserved.</p>
      </footer>
    </>
  );
};

export default HomePage;
