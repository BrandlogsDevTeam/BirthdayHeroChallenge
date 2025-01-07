import React from "react";
import Balancer from "react-wrap-balancer";
import { AcceptNomination } from "../components/AcceptInvitationModals";

const Hero = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold text-gray-700 mb-4">
          BIRTHDAY HERO CHALLENGE
        </h1>
        <h3 className="text-gray-500 text-xl sm:text-2xl md:text-xl mb-6">
          <Balancer>
            Rewards you $250 Gift Bonus to ensure no child goes to bed hungry.
          </Balancer>
        </h3>

        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-500 text-lg">It's free!</p>
          <AcceptNomination />
        </div>
      </div>
    </div>
  );
};

export default Hero;
