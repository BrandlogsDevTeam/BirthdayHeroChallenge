// components/DonationsMetricCounter.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Wallet, TrendingUp, RefreshCw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getTotalPromissoryDonations } from "@/lib/supabase/server-extended/birthdayIndex";

const DonationsMetricCounter: React.FC = () => {
  const [totalDonations, setTotalDonations] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [animateValue, setAnimateValue] = useState<boolean>(false);
  const supabase = createClient();

  const fetchDonationsTotal = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const { total, error: fetchError } = await getTotalPromissoryDonations();

      if (fetchError) throw new Error(fetchError);

      if (totalDonations !== total) {
        setAnimateValue(true);
        setTimeout(() => setAnimateValue(false), 1000);
      }

      setTotalDonations(total);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching donations:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load donations data"
      );
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDonationsTotal();

    // Set up realtime subscription (remains the same)
    const channel = supabase
      .channel("accounts_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "accounts",
        },
        fetchDonationsTotal
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Formatting functions remain the same
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatLastUpdated = (date: Date | null): string => {
    if (!date) return "Never";
    return date.toLocaleTimeString();
  };

  // JSX remains mostly the same
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-600 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="text-white" size={24} />
            <h2 className="text-xl font-bold text-white">Total Donations</h2>
          </div>
          <button
            onClick={fetchDonationsTotal}
            className="p-2 rounded-full bg-green-500 hover:bg-green-700 text-white transition-colors duration-200"
            disabled={loading}
            aria-label="Refresh data"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="p-6">
          {error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : (
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span
                  className={`text-4xl font-bold text-gray-800 transition-all ${
                    animateValue ? "text-green-600 scale-110" : ""
                  }`}
                >
                  {formatNumber(totalDonations)}
                </span>
              </div>

              <div className="flex items-center justify-center text-green-600 mb-4">
                <TrendingUp size={18} className="mr-1" />
                <span className="text-sm">Live tracking enabled</span>
              </div>

              <div className="text-xs text-gray-500">
                Last updated: {formatLastUpdated(lastUpdated)}
              </div>
            </div>
          )}
        </div>

        <div className="bg-green-50 p-3 border-t border-green-100">
          <div className="text-xs text-green-700 text-center">
            Realtime updates from all accounts
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationsMetricCounter;
