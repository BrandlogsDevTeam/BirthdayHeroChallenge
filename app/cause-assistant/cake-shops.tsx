"use client";

import React, { useEffect, useState } from "react";
import { CardPreview } from "../components/card-preview";
import { CakeShopCard } from "../components/cake-shop";
import { Button } from "@/components/ui/button";
import { EndorsementFlow } from "../components/endorsement-flow";
import { getSelfEndorsedBrands } from "@/lib/supabase/server-extended/brandProfile";
import { BrandProfile } from "@/lib/types";
import { NomineeCardSkeleton } from "../components/skeleton";

const CakeShops = () => {
  const [endorsedShops, setEndorsedShops] = useState<BrandProfile[]>([]);
  const [isEndorsementFlowOpen, setIsEndorsementFlowOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("getSelfEndorsedBrands");
    (async () => {
      const { data, error } = await getSelfEndorsedBrands();
      if (error) {
        setError(error)
      }
      if (!data) return;
      console.log(data);
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

  const handleNewEndorsement = (newBrand: BrandProfile) => {
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
          },
          {
            title: "Accepted Shops",
            data: `${endorsedShops.filter((shop) => shop.is_accepted).length}`,
          },
        ]}
      />

      {endorsedShops.length > 0 ? (
        endorsedShops.map((shop) => (
          <CakeShopCard
            key={shop.id}
            id={shop.id}
            name={shop.name}
            username={shop.username}
            location={shop.location}
            status={shop.is_accepted ? "Accepted" : "Endorsed"}
            testimonial={shop.endorsement_message}
            profilePhoto={shop.avatar_url}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default CakeShops;
