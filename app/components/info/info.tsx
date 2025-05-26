import React from "react";
import Hero from "./hero";
import HowItWorks from "./howitworks";
import BenefitsGrid from "./benefits";
import Blogs from "../../blogs/blogs";
import FAQs from "@/app/faqs/faqs";
import LifetimeDonations from "./lifetime-donation";

const InfoTab = () => {
  return (
    <main className="min-h-screen">
      <div className="py-12">
        <Hero />
        {/* <LifetimeDonations /> */}
        <HowItWorks />
        <BenefitsGrid />
        <Blogs />
        <FAQs />
      </div>
    </main>
  );
};

export default InfoTab;
