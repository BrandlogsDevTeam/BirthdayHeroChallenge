"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../actions/AuthContext";
import { ClientNavTabs } from "./clientNavTabs";
import { PublicAccountDBO } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

interface ClientCommunityProps {
  initialEndorsedShops: PublicAccountDBO[];
  assistant?: {
    name: string;
    username: string;
    adminId: string;
    avatar_url: string;
  };
}

export const ClientCommunity: React.FC<ClientCommunityProps> = ({
  initialEndorsedShops,
  assistant,
}) => {
  const [endorsedShops, setEndorsedShops] =
    useState<PublicAccountDBO[]>(initialEndorsedShops);
  const { profile } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    const subscription = supabase
      .channel("public-endorsed-brands-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "accounts_public_view",
          filter: "is_brand=eq.true",
        },
        async (payload) => {
          const { data, error } = await supabase
            .from("accounts_public_view")
            .select()
            .eq("is_brand", true)
            .order("created_at", { ascending: false });

          if (!error && data) {
            console.log("Changes received!", payload);
            setEndorsedShops(data as PublicAccountDBO[]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [supabase]);

  return (
    <ClientNavTabs
      isLoggedIn={!!profile}
      endorsedShops={endorsedShops}
      assistant={assistant}
      user_role={profile?.account_role}
    />
  );
};
