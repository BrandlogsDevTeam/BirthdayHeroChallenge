"use client";

import React from "react";
import { useAuth } from "../actions/AuthContext";
import { ClientNavTabs } from "./clientNavTabs";

interface ClientCommunityProps {
  endorsedShops: Array<any>; // Replace `any` with the actual type
}

export const ClientCommunity: React.FC<ClientCommunityProps> = ({
  endorsedShops,
}) => {
  const { user } = useAuth();

  return <ClientNavTabs isLoggedIn={!!user} endorsedShops={endorsedShops} />;
};
