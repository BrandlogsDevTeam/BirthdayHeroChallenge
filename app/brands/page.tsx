import React from "react";
import {
  getPublicEndorsedBrands,
  getTotalCakeShopsCount,
} from "@/lib/supabase/server-extended/brandProfile";
import { getAssistantProfile } from "@/lib/supabase/server-extended/userProfile";
import { ClientCommunity } from "./community";

const PAGE_SIZE = 10;

const Community = async () => {
  const { data: endorsedShops } = await getPublicEndorsedBrands(0, PAGE_SIZE);
  const { data: assistantData } = await getAssistantProfile();
  const { count: totalCakeShops } = await getTotalCakeShopsCount();

  const assistant = assistantData
    ? {
        name: assistantData.name,
        username: assistantData.username,
        adminId: assistantData.admin_id,
        avatar_url: assistantData.avatar_url,
      }
    : undefined;

  console.log(endorsedShops);
  return (
    <ClientCommunity
      initialEndorsedShops={endorsedShops ?? []}
      assistant={assistant}
      pageSize={PAGE_SIZE}
      totalCakeShops={totalCakeShops ?? 0}
    />
  );
};

export default Community;
