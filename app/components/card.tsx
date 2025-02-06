import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CardProps {
  title: string;
  description: string;
  href: string;
}

const Card: React.FC<CardProps> = ({ title, description, href }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:border-green-600 overflow-hidden">
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <Link
          href={href}
          className="inline-block text-green-600 hover:text-green-700 font-semibold transition-colors duration-300"
        >
          Get started
          <ArrowRight className="inline-block w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default Card;
