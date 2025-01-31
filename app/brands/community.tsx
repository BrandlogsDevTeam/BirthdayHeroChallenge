"use client";

import React from "react";
import { useAuth } from "../actions/AuthContext";
import { ClientNavTabs } from "./clientNavTabs";

interface ClientCommunityProps {
  endorsedShops: Array<any>;
}

export const ClientCommunity: React.FC<ClientCommunityProps> = ({
  endorsedShops,
}) => {
  const { profile } = useAuth();

  return (
    <ClientNavTabs
      isLoggedIn={!!profile}
      endorsedShops={endorsedShops}
      user_role={profile?.role}
    />
  );
};
