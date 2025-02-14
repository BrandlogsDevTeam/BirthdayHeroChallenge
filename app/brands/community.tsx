"use client";

import React from "react";
import { useAuth } from "../actions/AuthContext";
import { ClientNavTabs } from "./clientNavTabs";
import { PublicAccountDBO } from "@/lib/types";

interface ClientCommunityProps {
  endorsedShops: PublicAccountDBO[];
  assistant?: {
    name: string;
    username: string;
    adminId: string;
    avatar_url: string;
  };
}

export const ClientCommunity: React.FC<ClientCommunityProps> = ({
  endorsedShops,
  assistant,
}) => {
  const { profile } = useAuth();

  return (
    <ClientNavTabs
      isLoggedIn={!!profile}
      endorsedShops={endorsedShops}
      assistant={assistant}
      user_role={profile?.account_role}
    />
  );
};
