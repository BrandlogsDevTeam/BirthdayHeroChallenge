import React, { useState } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { Balancer } from "react-wrap-balancer";
import { team } from "../info/data/team";

interface TeamProps {
  name: string;
  photo: StaticImageData;
  gifUrl: StaticImageData;
  position: string;
}

const TeamCards = ({ name, photo, position, gifUrl }: TeamProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="w-full h-full">
      <div
        className={`flex flex-col h-full transition-all duration-300 rounded-xl p-2
          ${
            isHovered
              ? "border-2 border-dotted border-sky-200"
              : "border-transparent"
          }`}
      >
        <div
          className="relative w-full aspect-square mb-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={isHovered ? gifUrl : photo}
            className="absolute inset-0 w-full h-full object-cover rounded-md transition-all duration-300"
            alt={name}
          />
        </div>

        <div className="text-center mt-auto">
          <h4 className="text-xl font-bold text-gray-800">
            <Balancer>{name}</Balancer>
          </h4>
          <p className="text-gray-500">{position}</p>
        </div>
      </div>
    </div>
  );
};

export const TeamCardsGrid = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member, index) => (
          <TeamCards key={index} {...member} />
        ))}
      </div>
    </div>
  );
};
