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
        <div className="w-full bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            What to Expect
          </h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-1 rounded-full mt-1">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <p className="text-gray-700">
                You can send and receive e-gifts from your family/friends.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-1 rounded-full mt-1">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <p className="text-gray-700">
                Get a $250 gift bonus reward credited into your wallet if you
                activate your purse with a +1 country code.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-1 rounded-full mt-1">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <p className="text-gray-700">
                If you were nominated as our community Co-creator, get a
                promissory food donation of $500,000 credited into your wallet
                to enable you to feed a hungry child of your choice in your
                community.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-1 rounded-full mt-1">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <p className="text-gray-700">
                Enjoy the freedom to transfer your available balance to your
                bank account at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Activate Button */}
        <div className="mt-6 text-center text-gray-500">
          <p>
            Have any questions?{" "}
            <Link
              href="mailto:info@brandlogs.com"
              className="text-green-600 hover:underline"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletFeaturePage;
