import React from "react";
import { YouTubeEmbed } from "../components/YouTubeEmbed";

const HowItWorks = () => {
  return (
    <div id="howitworks" className="flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold text-gray-600 mb-6">How it works</h2>
      <p className="text-lg text-center mb-6">
        You get $250 gift bonus to enjoy birthday gifting with no money out of
        your pocket, while ensuring no child goes to bed hungry.
      </p>
      <YouTubeEmbed id="7hDJxin35dI" title="How It Works" />
    </div>
  );
};

export default HowItWorks;
