import React from "react";
import Image from "next/image";
import Titus from "@/public/titus.jpg";
import { AcceptNomination } from "@/app/components/AcceptInvitationModals";
import { Users } from "lucide-react";

const WhoWeAre = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="flex gap-2">
        <h2 className="text-3xl font-bold text-green-600 mb-6">About us</h2>
        <Users className="text-green-600 w-8 h-8 mb-2 font-bold" />
      </div>
      <div className="space-y-6 md:space-y-8">
        {/* Introduction */}
        <p id="our-community" className="text-base md:text-lg leading-relaxed">
          We take pride in the{" "}
          <span className="font-semibold">Birthday Heroes community</span>. With
          over 60,000 co-creators, the Birthday Heroes Community has an
          inspiring story influenced by Tony Robbins, a renowned American author
          and motivational speaker. Tony Robbins is known as a great hero in the
          fight against hunger, having dedicated more than 40 years to
          championing causes that have helped feed almost 100 million people
          through his unwavering efforts to serve humanity.
        </p>

        {/* Purpose Section */}
        <section id="our-purpose" className="space-y-4 md:space-y-6">
          <h2 className="text-xl md:text-2xl text-gray-800 font-semibold">
            Our Purpose
          </h2>
          <h3 className="text-lg md:text-xl font-quicksand font-bold text-orange capitalize">
            To ensure no child goes to bed hungry
          </h3>
          <p className="text-base md:text-lg font-opensans">
            By unlocking new gifting possibilities in America and beyond
          </p>

          <div className="space-y-4">
            <p className="text-base md:text-lg leading-relaxed">
              <span className="font-quicksand font-semibold">
                Did you know?
              </span>{" "}
              In 2019, a New York publication revealed that{" "}
              <span className="font-semibold">74%</span> of Americans engage in
              gift-giving, purchasing items meant for others to use. This
              flourishing market is valued at an impressive $162 billion and is
              projected to soar to $388 billion by 2027. However, this vibrant
              industry highlights a striking contrast against an urgent social
              issue: hunger.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Feeding America reports that 40 million people in the United
              States, including 9 million children, are grappling with food
              insecurity. On a global scale, 800 million people are struggling
              to get enough food to eat. These statistics are not just numbers;
              they represent a profound crisis that demands our attention and
              action!
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section id="our-vision" className="space-y-4 md:space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Our Vision
          </h2>
          <h3 className="text-lg md:text-xl font-quicksand font-semibold text-gray-700 capitalize">
            To pioneer the future of humanity where no child goes to bed hungry.
          </h3>
          <p className="text-base md:text-lg leading-relaxed">
            Our unwavering commitment to hunger donations, fueled by a vast
            network of up to 245 million potential Birthday Gifting customers
            across America, puts us on track to contribute as much as $4.9
            billion each year by 2029. This significant funding will play a
            crucial role in ensuring that school children—part of the nearly 800
            million individuals globally facing food insecurity—receive the
            nutritious meals they desperately need. We aim to achieve this
            through strategic partnerships with schools and dedicated
            organizations that are at the forefront of the battle against
            hunger, working tirelessly to make a difference in the lives of
            those who are food deprived.
          </p>
        </section>

        {/* Quote Section */}
        <figure className="py-8 md:py-12">
          <svg
            className="w-8 h-8 mx-auto mb-4 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 14"
          >
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote className="max-w-3xl mx-auto text-center">
            <p className="text-lg md:text-xl lg:text-2xl italic font-medium text-gray-600">
              "The Age of Hunger Liberation will transform the way we live and
              work, how businesses run, and how society functions and does it in
              a radically shorter timeframe than any other major economic
              transformation in history."
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
            <Image
              className="w-8 h-8 rounded-full"
              src={Titus}
              alt="profile picture"
            />
            <div className="flex items-center divide-x-2 divide-gray-500">
              <cite className="pe-3 font-medium text-gray-900">
                Titus Gicharu
              </cite>
              <cite className="ps-3 text-sm text-gray-500">
                CEO at Brandlogs Inc.
              </cite>
            </div>
          </figcaption>
        </figure>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <p className="text-base md:text-lg font-opensans">
            Become a birthday hero and ensure no child goes to bed hungry.
          </p>
          <AcceptNomination />
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
