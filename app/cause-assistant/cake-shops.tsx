"use client";

import React, { useEffect, useState } from "react";
import { CardPreview } from "../components/card-preview";
import { CakeShopCard } from "../components/cake-shop";
import { Button } from "@/components/ui/button";
import { EndorsementFlow } from "../components/endorsement-flow";
import { getSelfEndorsedBrands } from "@/lib/supabase/server-extended/brandProfile";
import { AccountDBO } from "@/lib/types";
import { NomineeCardSkeleton } from "../components/skeleton";

const CakeShops = () => {
  const [endorsedShops, setEndorsedShops] = useState<AccountDBO[]>([]);
  const [isEndorsementFlowOpen, setIsEndorsementFlowOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await getSelfEndorsedBrands();
      if (error) {
        setError(error);
      }
      if (!data) return;
      setEndorsedShops(data);

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <NomineeCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500 font-medium">Error: {error}</div>
      </div>
    );
  }

  const handleNewEndorsement = (newBrand: AccountDBO) => {
    setEndorsedShops((prevShops) => [...prevShops, newBrand]);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Button
        className="bg-green-600 hover:bg-green-700"
        onClick={() => setIsEndorsementFlowOpen(true)}
      >
        Endorse Cake Shop
      </Button>
      <EndorsementFlow
        isOpen={isEndorsementFlowOpen}
        onClose={() => setIsEndorsementFlowOpen(false)}
        onNewEndorsement={handleNewEndorsement}
      />
      <CardPreview
        title="Endorsed Cake Shops"
        sections={[
          {
            title: "Endorsed Shops",
            data: `${endorsedShops.length}`,
            description: "Total endorsed shops",
          },
          {
            title: "Accepted Shops",
            data: `${endorsedShops.filter((shop) => shop.account_status === "accepted").length}`,
            description: "Total accepted shops",
          },
        ]}
      />

      {endorsedShops.length > 0 ? (
        endorsedShops.map((shop) => (
          <CakeShopCard
            key={shop.id}
            id={shop.id}
            name={shop.name || ""}
            username={shop.username}
            state={shop.state || ""}
            county={shop.county || ""}
            status={shop.account_status === "accepted" ? "Accepted" : "Endorsed"}
            testimonial={shop.bio || ""}
            profilePhoto={shop.avatar_url || ""}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default CakeShops;
