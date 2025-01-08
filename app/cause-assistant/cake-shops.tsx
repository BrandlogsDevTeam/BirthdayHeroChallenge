"use client";

import React, { useEffect, useState } from "react";
import { CardPreview } from "../components/card-preview";
import { CakeShopCard } from "../components/cake-shop";
import { Button } from "@/components/ui/button";
import { EndorsementFlow } from "../components/endorsement-flow";
import { getSelfEndorsedBrands } from "@/lib/supabase/server-extended/brandProfile";
import { BrandProfile } from "@/lib/types";

const CakeShops = () => {
  const [endorsedShops, setEndorsedShops] = useState<BrandProfile[]>([]);
  const [isEndorsementFlowOpen, setIsEndorsementFlowOpen] = useState(false);

  useEffect(() => {
    console.log('getSelfEndorsedBrands');
    (async () => {
      const { data, error } = await getSelfEndorsedBrands();
      if (error) {
        console.error(error);
        return;
      }
      if (!data) return;
      console.log(data);
      setEndorsedShops(data);
    })();
  }, []);

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
      />
      <CardPreview title="Endorsed Cake Shops" sections={[
        {
          title: "Endorsed Shops",
          amount: endorsedShops.length,
        },
        {
          title: "Accepted Shops",
          amount: endorsedShops.filter((shop) => shop.is_accepted).length,
        },
      ]} />

      {
        endorsedShops.length > 0 ?
          endorsedShops.map((shop) => (
            <CakeShopCard
              key={shop.id}
              name={shop.name}
              location={shop.location}
              status={shop.is_accepted ? "Accepted" : "Endorsed"}
              testimonial={shop.endorsement_message}
              profilePhoto={shop.avatar_url}
            />
          ))
          : <></>
      }
    </div>
  );
};

export default CakeShops;
