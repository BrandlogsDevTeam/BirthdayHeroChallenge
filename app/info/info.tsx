import React from "react";
import Hero from "./hero";
import HowItWorks from "./howitworks";
import BenefitsGrid from "./benefits";
import InfoFooter from "../components/info-footer";

const InfoTab = () => {
  return (
    <main className="min-h-screen">
      <div className="py-12">
        <Hero />
        <HowItWorks />
        <BenefitsGrid />
      </div>
    </main>
  );
};

export default InfoTab;
