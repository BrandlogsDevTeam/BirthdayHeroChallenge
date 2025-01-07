"use client";

import React, { useState } from "react";
import { CardPreview } from "../components/card-preview";
import { CakeShopCard } from "../components/cake-shop";
import { Button } from "@/components/ui/button";
import { EndorsementFlow } from "../components/endorsement-flow";

const sections = [
  {
    title: "Endorsed",
    amount: 10,
  },
  {
    title: "Accepted",
    amount: 7,
  },
];

const CakeShops = () => {
  const [isEndorsementFlowOpen, setIsEndorsementFlowOpen] = useState(false);
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
      <CardPreview title="Endorsed Cake Shops" sections={sections} />
      <CakeShopCard
        name="Sweet Dreams Bakery"
        location="Oakland, CA"
        status="Accepted"
        testimonial="Frosted Delights Bakery transformed our wedding with their incredible custom cake! The attention to detail and flavors were absolutely perfect. They're not just bakers - they're artists who make dreams come true. Best bakery in Berkeley! 🎂✨"
        profilePhoto="/images/logoipsum-282.svg"
      />
    </div>
  );
};

export default CakeShops;
