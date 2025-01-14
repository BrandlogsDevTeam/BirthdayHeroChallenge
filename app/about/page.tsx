import React from "react";
import OurTeam from "./team";
import WhoWeAre from "./whoweare";
import { Users } from "lucide-react";

const AboutUs = () => {
  return (
    <div id="aboutus">
      <div className="flex justify-center gap-2">
        <h2 className="text-3xl font-bold text-blue-500 mb-6">About us</h2>
        <Users className="text-blue-500 w-8 h-8 mb-2 font-bold" />
      </div>
      <OurTeam />
      <WhoWeAre />
    </div>
  );
};

export default AboutUs;
