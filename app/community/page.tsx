"use client";

import React, { useEffect, useState } from "react";
import { Layout } from "@/app/components/Layout";
import { getPublicEndorsedBrands } from "@/lib/supabase/server-extended/brandProfile";
import { CakeShopCard } from "../components/cake-shop";
import { BrandProfile } from "@/lib/types";

const Community = () => {
  const [endorsedShops, setEndorsedShops] = useState<BrandProfile[]>([]);

  useEffect(() => {
    console.log("getSelfEndorsedBrands");
    (async () => {
      const { data, error } = await getPublicEndorsedBrands();
      if (error) {
        console.error(error);
        return;
      }
      if (!data) return;
      console.log(data);
      setEndorsedShops(data as BrandProfile[]);
    })();
  }, []);
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-4">Community</h1>
      <div className="space-y-6">
        {endorsedShops.length > 0 ? (
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
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
};

export default Community;
