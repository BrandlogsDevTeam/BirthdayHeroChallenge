import React from "react";
import { YouTubeEmbed } from "../YouTubeEmbed";
import { Lightbulb } from "lucide-react";

const HowItWorks = () => {
  return (
    <div id="howitworks" className="w-full h-full my-8">
      <div className="flex gap-2">
        <h2 className="text-3xl font-bold text-green-600 mb-6">How it works</h2>
        <Lightbulb className="text-green-600 w-8 h-8 mb-2 font-bold" />
      </div>
      <p className="text-base md:text-lg mb-6">
        You get $250 gift bonus to enjoy birthday gifting with no money out of
        your pocket, while ensuring no child goes to bed hungry.
      </p>
      <YouTubeEmbed id="7hDJxin35dI" title="How It Works" />
    </div>
  );
};

export default HowItWorks;
