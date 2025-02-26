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
            Set up your personal wallet to start managing your finances securely
            in one place.
          </p>
        </div>

        <div className="w-full bg-gray-100 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-200 p-2 rounded-full">
              <svg
                className="w-5 h-5 text-green-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="text-sm text-left">
              <p className="font-medium text-gray-800">Quick Setup</p>
              <p className="text-gray-600">Takes only a few minutes</p>
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-100 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-200 p-2 rounded-full">
              <svg
                className="w-5 h-5 text-green-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
            <div className="text-sm text-left">
              <p className="font-medium text-gray-800">Secure Transactions</p>
              <p className="text-gray-600">End-to-end encryption</p>
            </div>
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
