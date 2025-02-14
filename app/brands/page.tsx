import React from "react";
import { getPublicEndorsedBrands } from "@/lib/supabase/server-extended/brandProfile";
import { getAssistantProfile } from "@/lib/supabase/server-extended/userProfile";
import { ClientCommunity } from "./community";

const Community = async () => {
  const { data: endorsedShops } = await getPublicEndorsedBrands();
  const { data: assistantData } = await getAssistantProfile();
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
      endorsedShops={endorsedShops ?? []}
      assistant={assistant}
    />
  );
};

export default Community;
