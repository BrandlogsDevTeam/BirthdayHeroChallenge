import React from "react";
import OurTeam from "./team";
import WhoWeAre from "./whoweare";

const AboutUs = () => {
  return (
    <div id="aboutus">
      <h2 className="text-3xl font-bold text-gray-600 mb-6">About Us</h2>
      <OurTeam />
      <WhoWeAre />
    </div>
  );
};

export default AboutUs;
