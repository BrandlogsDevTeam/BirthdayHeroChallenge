import React from "react";
import { Layout } from "@/app/components/Layout";
import { getPublicEndorsedBrands } from "@/lib/supabase/server-extended/brandProfile";
import { ClientCommunity } from "./community";

const Community = async () => {
  const { data: endorsedShops } = await getPublicEndorsedBrands();

  return (
    <Layout>
      <ClientCommunity endorsedShops={endorsedShops ?? []} />
    </Layout>
  );
};

export default Community;
