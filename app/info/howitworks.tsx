import React from "react";
import { YouTubeEmbed } from "../components/YouTubeEmbed";
import { Lightbulb } from "lucide-react";

const HowItWorks = () => {
  return (
    <div
      id="howitworks"
      className="flex flex-col md:justify-center md:items-center"
    >
      <div className="flex justify-center gap-2">
        <h2 className="text-3xl font-bold text-blue-500 mb-6">How it works</h2>
        <Lightbulb className="text-blue-500 w-8 h-8 mb-2 font-bold" />
      </div>
      <p className="text-base md:text-lg md:text-center mb-6">
        You get $250 gift bonus to enjoy birthday gifting with no money out of
        your pocket, while ensuring no child goes to bed hungry.
      </p>
      <YouTubeEmbed id="7hDJxin35dI" title="How It Works" />
    </div>
  );
};

export default HowItWorks;
