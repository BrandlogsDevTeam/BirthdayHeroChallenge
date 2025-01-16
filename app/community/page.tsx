import React from "react";
import { getPublicEndorsedBrands } from "@/lib/supabase/server-extended/brandProfile";
import { ClientCommunity } from "./community";

const Community = async () => {
  const { data: endorsedShops } = await getPublicEndorsedBrands();

  return (
      <ClientCommunity endorsedShops={endorsedShops ?? []} />
  );
};

export default Community;
