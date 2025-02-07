// components/ComingSoon.tsx
import { Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ComingSoonProps {
  featureName: string;
  description: string;
  notificationLink: string;
  whatToExpect: string[];
  supportLink: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  featureName,
  description,
  notificationLink,
  whatToExpect,
  supportLink,
}) => {
  return (
    <div className="max-w-2xl w-full mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8 space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <Clock className="w-20 h-20 text-green-600" />
          </div>

          {/* Title and Subtitle */}
          <h1 className="text-3xl font-bold text-center text-gray-800">
            {featureName} Feature
          </h1>
          <h2 className="text-2xl font-semibold text-center text-green-600">
            Coming Soon!
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-center text-lg">{description}</p>

          {/* Get Notified Button */}
          <div className="flex justify-center">
            <Link
              href={notificationLink}
              className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-300"
            >
              Get Notified
            </Link>
          </div>

          {/* What to Expect Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What to expect:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {whatToExpect.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Support Link */}
      <div className="mt-6 text-center text-gray-500">
        <p>
          Have questions?{" "}
          <Link href={supportLink} className="text-green-600 hover:underline">
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
