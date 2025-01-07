import React from "react";
import Hero from "./hero";
import { NavCardGrid } from "./NavCardGrid";
import HowItWorks from "./howitworks";
import BenefitsGrid from "./benefits";
import AboutUs from "./about/about";
import { Blogs } from "../blogs/page";
import { FAQs } from "./faq";

const InfoTab = () => {
  return (
    <main className="min-h-screen">
      <div className="py-12">
        <Hero />
        <NavCardGrid />
        <HowItWorks />
        <BenefitsGrid />
        <AboutUs />
        <Blogs />
        <FAQs />
      </div>
    </main>
  );
};

export default InfoTab;
