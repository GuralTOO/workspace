import React from "react";
// import "./LandingPage.css"; // Make sure to create this CSS file


import Header from "./Components/Header";
import FeatureSection from "./Components/FeatureSection";
import HowItWorksSection from "./Components/HowItWorksSection";
import WhatItIsSection from "./Components/WhatItIsSection";
import TestimonialsSection from "./Components/TestimonialsSection";
import CallToActionSection from "./Components/CallToActionSection";
import Footer from "./Components/Footer";


const LandingPage = () => {
  return (
    <div className="LandingPage">
      <Header />
      <WhatItIsSection />
      <FeatureSection />
      <HowItWorksSection />
      {/* <Contact /> */}
      <Footer />
    </div>
  );
};

export default LandingPage;
