"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { WelcomeButton } from "../components/welcom-button";
import Spinner from "../components/spinner";

// Wallet Interface Component
const WalletInterface = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="text-center mb-4">
        <h2 className="font-bold text-2xl text-green-600 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          Total Balance
        </h2>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-1 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Current</h2>
          <p className="text-4xl font-bold text-green-600">$300.00</p>
        </div>
        <div className="border-l border-gray-300 h-16"></div>
        <div className="flex-1 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Available</h2>
          <p className="text-4xl font-bold text-green-600">$0.00</p>
        </div>
      </div>
    </div>
  );
};

// Wallet Breakdown Item Component
interface WalletBreakdownItemProps {
  icon: React.ReactNode;
  title: string;
  current: string;
  available: string;
  iconColor: string;
}

const WalletBreakdownItem = ({
  icon,
  title,
  current,
  available,
  iconColor,
}: WalletBreakdownItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300">
      <div className="flex items-center">
        {icon}
        <span className="ml-2 font-semibold">{title}</span>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col text-center">
          <span className="text-sm text-gray-500">Current</span>
          <span className="font-semibold text-green-600">{current}</span>
        </div>
        <div className="border-l border-gray-300"></div>
        <div className="flex flex-col text-center">
          <span className="text-sm text-gray-500">Available</span>
          <span className="font-semibold text-green-600">{available}</span>
        </div>
      </div>
    </div>
  );
};

// Wallet Breakdown Component
const WalletBreakdown = () => {
  const breakdownItems = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      ),
      title: "Gift Bonus",
      current: "$250.00",
      available: "$0.00",
      iconColor: "text-pink-500",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
          />
        </svg>
      ),
      title: "Cake Giveaway",
      current: "$50.00",
      available: "$0.00",
      iconColor: "text-yellow-500",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: "Cause Bonus",
      current: "$0.00",
      available: "$0.00",
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <button className="px-6 py-3 text-white bg-green-600 font-semibold rounded-full shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
          Activate Your Wallet
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-center mb-4">
          Itemized Balance
        </h3>
        <div className="space-y-4">
          {breakdownItems.map((item, index) => (
            <WalletBreakdownItem
              key={index}
              icon={item.icon}
              title={item.title}
              current={item.current}
              available={item.available}
              iconColor={item.iconColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const WalletPage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {user ? (
        <div className="max-w-3xl mx-auto space-y-8">
          <WalletInterface />
          <WalletBreakdown />
        </div>
      ) : (
        <div className="flex items-center justify-center h-70vh">
          <WelcomeButton currentPage="wallet" />
        </div>
      )}
    </>
  );
};

export default WalletPage;
