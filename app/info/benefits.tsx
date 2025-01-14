import React from "react";
import { Award, ExternalLink } from "lucide-react";
import { benefits } from "./items";
import Link from "next/link";

const BenefitsGrid = () => {
  return (
    <div id="benefits" className="w-full h-full my-8">
      <div className="flex gap-2">
        <h2 className="text-3xl font-bold text-green-600 mb-6">Benefits</h2>
        <Award className="text-green-600 w-8 h-8 mb-2 font-bold" />
      </div>
      <p className="text-base md:text-lg mb-6">
        From the age of hunger liberation
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-6 overflow-hidden transition-all duration-300 ease-in-out opacity-100 transform hover:shadow-lg"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full border border-spacing-0.5 border-red-600 text-red-600 mb-4">
              {item.icon}
            </div>
            <section className="flex font-quicksand gap-2 items-center">
              <h3 className={`text-4xl font-bold text-black mt-2`}>
                {item.stat}
              </h3>
              <h3 className="text-xl font-bold mb-2 capitalize text-black">
                {item.title}
              </h3>
            </section>
            <p className="text-gray-500 mb-4 normal-case">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsGrid;
