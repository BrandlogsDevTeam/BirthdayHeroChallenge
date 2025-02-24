import React from "react";
import Image from "next/image";

interface DirectorData {
  name: string;
  photo: string;
  position: string;
  school: string;
  beneficiary: string;
  quote: string;
}

interface DirectorCardsGridProps {
  directorsData: DirectorData[];
}

const DirectorInfoCard: React.FC<DirectorData> = ({
  name,
  photo,
  position,
  school,
  beneficiary,
  quote,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 flex items-center space-x-4">
        {/* <div className="relative w-16 h-16">
          <Image
            src={photo}
            alt={name}
            fill
            className="rounded-full object-cover"
            sizes="(max-width: 768px) 64px, 64px"
            priority={false}
          />
        </div> */}
        <div>
          <h3 className="font-semibold text-lg text-blue">{name}</h3>
          <p className="text-sm text-blue-gray-600">{position}</p>
        </div>
      </div>
      <div className="px-4 py-2 bg-green-100">
        <p className="text-sm font-medium text-green-800 capitalize">{school}</p>
        <p className="text-xs text-green-600">{beneficiary}</p>
      </div>
      <div className="p-4 text-sm">
        <blockquote className="text-sm italic text-blue-gray-600">
          {quote}
        </blockquote>
      </div>
    </div>
  );
};

export const DirectorCardsGrid: React.FC<DirectorCardsGridProps> = ({
  directorsData,
}) => {
  return (
    <div className="container mx-auto px-4 py-6 my-12">
      <h2 className="text-xl md:text-3xl sm:text-lg font-quicksand font-bold text-orange capitalize">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {directorsData.map((director, index) => (
          <DirectorInfoCard key={index} {...director} />
        ))}
      </div>
    </div>
  );
};
