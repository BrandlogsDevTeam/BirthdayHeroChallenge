"use client";

import React from "react";
import { ArrowRight, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

const WalletActivation = () => {
  const router = useRouter();

  const handleActivateWallet = () => {
    router.push("/wallet-feature");
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-xl shadow-lg bg-white">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="bg-green-100 p-4 rounded-full">
          <Wallet size={40} className="text-green-600" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Activate Your Wallet
          </h2>
          <p className="text-gray-600">
            To start your journey of impacting lives, while you enjoy the
            following benefits:
          </p>
        </div>

        <div className="space-y-4 text-start">
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
              If nominated as a co-creator for the Birthday Hero Challenge, you
              will receive a promissory food donation of 5,000 meals, credited
              as your current balance into your wallet at $1 per meal. This
              initiative aims to ensure that no child goes to bed hungry in your
              community by providing meals to children in need.
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
              Enjoy the freedom to transfer your available balance to your bank
              account at any time.
            </p>
          </div>
        </div>

        <button
          onClick={handleActivateWallet}
          className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center justify-center transition-colors duration-200"
        >
          <span>Activate Wallet</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default WalletActivation;
