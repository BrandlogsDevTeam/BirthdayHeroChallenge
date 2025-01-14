import React from "react";
import OurTeam from "./team";
import WhoWeAre from "./whoweare";
import { Stories } from "./items";
import { DirectorCardsGrid } from "./testimonials";

const About = () => {
  return (
    <div id="aboutus">
      <WhoWeAre />
      <OurTeam />
      <DirectorCardsGrid directorsData={Stories} />
    </div>
  );
};

export default About;
