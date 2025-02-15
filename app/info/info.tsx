import React from "react";
import Hero from "./hero";
import HowItWorks from "./howitworks";
import BenefitsGrid from "./benefits";
import Blogs from "../blogs/blogs";

const InfoTab = () => {
  return (
    <main className="min-h-screen">
      <div className="py-12">
        <Hero />
        <HowItWorks />
        <BenefitsGrid />
        <Blogs initialBlogs={[]} />
      </div>
    </main>
  );
};

export default InfoTab;
