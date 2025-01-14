import { TeamCardsGrid } from "@/app/components/TeamCard";
import React from "react";
import Balancer from "react-wrap-balancer";

const OurTeam = () => {
  return (
    <div id="team">
      <section className="mb-6">
        <h2 className="text-xl font-semibold my-6">Our Team</h2>
        <p className="text-lg">
          We are a diverse and revolutionary team of co-creators, passionately
          working to usher the Age of Hunger liberation to ensure no child goes
          to bed hungry. Our team brings together unique perspectives,
          experiences, and expertise, all focused on revolutionizing how society
          approaches hunger through the power of giving.
        </p>
      </section>
      <TeamCardsGrid />
    </div>
  );
};

export default OurTeam;
