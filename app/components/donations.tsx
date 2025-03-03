import React, { useState, useEffect } from "react";
import { Wallet, TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getTotalPromissoryDonations } from "@/lib/supabase/server-extended/userProfile";
import { formatCurrency } from "@/lib/utils";

const DonationsMetric: React.FC = () => {
  const [totalDonations, setTotalDonations] = useState<number>(0);
  const [animateValue, setAnimateValue] = useState<boolean>(false);
  const supabase = createClient();

  const fetchDonationsTotal = async (): Promise<void> => {
    try {
      const { total, error } = await getTotalPromissoryDonations();
      if (error) return;

      if (totalDonations !== total) {
        setAnimateValue(true);
        setTimeout(() => setAnimateValue(false), 1000);
      }
      setTotalDonations(total);
    } catch (err) {
      console.error("Error fetching donations:", err);
    }
  };

  useEffect(() => {
    fetchDonationsTotal();

    const channel = supabase
      .channel("accounts_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "accounts" },
        fetchDonationsTotal
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex items-center justify-center mb-2">
      <span
        className={`text-4xl font-bold text-gray-800 transition-all ${
          animateValue ? "text-green-600 scale-110" : ""
        }`}
      >
        {formatCurrency(totalDonations)}
      </span>
    </div>
  );
};

export default DonationsMetric;
