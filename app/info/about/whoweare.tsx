import React from "react";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import Titus from "@/public/titus.jpg";
import { AcceptNomination } from "@/app/components/AcceptInvitationModals";

const WhoWeAre = () => {
  return (
    <div>
      <p className="text-lg">
        We take pride in the{" "}
        <span className="font-semibold">Birthday Heroes community</span>. With
        over 60,000 co-creators, the Birthday Heroes Community has an inspiring
        story influenced by Tony Robbins, a renowned American author and
        motivational speaker. Tony Robbins is known as a great hero in the fight
        against hunger, having dedicated more than 40 years to championing
        causes that have helped feed almost 100 million people through his
        unwavering efforts to serve humanity.
      </p>
      <div className="my-8">
        <div className="container mx-auto">
          <h2 className="text-xl text-gray-800 font-semibold my-6">
            Our Purpose
          </h2>
          <h2 className="text-lg text-gray-700 my-4 font-quicksand font-bold text-orange capitalize">
            <Balancer>to end hunger in america and beyond!</Balancer>
          </h2>
          <p className="text-lg font-opensans">
            By unlocking new gifting possibilities to ensure no child goes to
            bed hungry.
          </p>

          <p className="text-lg">
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
          <p className="text-lg">
            Feeding America reports that 40 million people in the United States,
            including 9 million children, are grappling with food insecurity. On
            a global scale, 800 million people are struggling to get enough food
            to eat. These statistics are not just numbers; they represent a
            profound crisis that demands our attention and action!
          </p>
        </div>
      </div>
      <div className="my-8">
        <div className="container mx-auto">
          <h2 className="text-xl font-semibold my-6 text-gray-800">
            Our Vision
          </h2>
          <h2 className="text-lg font-quicksand font-semibold text-gray-700 capitalize">
            <Balancer>
              To impact lives by pioneering a sustainable future of hunger
              liberation for humanity.
            </Balancer>
          </h2>
          <p className="text-lg">
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
        </div>
      </div>
      <div className="my-8">
        <figure className="max-w-screen-md mx-auto text-center my-8">
          <svg
            className="w-8 h-8 mx-auto mb-3 text-gray-400 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 14"
          >
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote>
            <p className="text-xl italic font-medium text-gray-600 dark:text-white">
              "The Age of Hunger Liberation will transform the way we live and
              work, how businesses run, and how society functions and does it in
              a radically shorter timeframe than any other major economic
              transformation in history."
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <Image
              className="w-6 h-6 rounded-full"
              src={Titus}
              alt="profile picture"
            />
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
              <cite className="pe-3 font-medium text-gray-900 dark:text-white">
                Titus Gicharu
              </cite>
              <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">
                CEO at Brandlogs Inc.
              </cite>
            </div>
          </figcaption>
        </figure>
        <p className="text-lg font-opensans">
          <Balancer>
            Become a birthday hero and ensure no child goes to bed hungry.
          </Balancer>
        </p>
        <AcceptNomination />
      </div>
    </div>
  );
};

export default WhoWeAre;
