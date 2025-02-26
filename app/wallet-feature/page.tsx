import React from "react";
import { Clock } from "lucide-react";
import Link from "next/link";

const WalletFeaturePage = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex flex-col items-center space-y-8">
        {/* Header with clock icon */}
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-green-100 p-4 rounded-full">
            <Clock size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Wallet Feature
          </h1>
          <h3 className="text-2xl font-semibold text-green-600">Coming Soon</h3>
        </div>

        {/* What to Expect Section */}
        <div className="w-full bg-white rounded-xl shadow-md p-6 flex items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            We will keep you updated
          </h2>
        </div>
      </div>
    </div>
  );
};

export default WalletFeaturePage;
