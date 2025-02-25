"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../actions/AuthContext";
import { ClientNavTabs } from "./clientNavTabs";
import { PublicAccountDBO } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { getPublicEndorsedBrands } from "@/lib/supabase/server-extended/brandProfile";
import { debounce } from "lodash";
import { getCachedData, setCachedData } from "@/lib/utils/localStorage";

interface ClientCommunityProps {
  initialEndorsedShops: PublicAccountDBO[];
  assistant?: {
    name: string;
    username: string;
    adminId: string;
    avatar_url: string;
  };
  pageSize: number;
  totalCakeShops: number;
}

export const ClientCommunity: React.FC<ClientCommunityProps> = ({
  initialEndorsedShops,
  assistant,
  pageSize,
  totalCakeShops,
}) => {
  const [endorsedShops, setEndorsedShops] =
    useState<PublicAccountDBO[]>(initialEndorsedShops);
  const [offSet, setOffSet] = useState(pageSize);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { profile, isLoading } = useAuth();
  const supabase = createClient();

  const loadMoreData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const { data: newData } = await getPublicEndorsedBrands(offSet, pageSize);

    if (newData && newData.length > 0) {
      setEndorsedShops((prev) => [...prev, ...newData]);
      setOffSet((prev) => prev + pageSize);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  }, [loading, hasMore, offSet, pageSize]);

  // Initial load: Check for cached data
  useEffect(() => {
    const cachedData = getCachedData<{
      data: PublicAccountDBO[];
      timestamp: number;
    }>("endorsedCakeShops");

    if (cachedData && Date.now() - cachedData.timestamp < 5 * 60 * 1000) {
      console.log("Using cached data for initial load");
      setEndorsedShops(cachedData.data);
    } else {
      console.log("Fetching fresh data for initial load");
      setEndorsedShops(initialEndorsedShops);
    }
  }, [initialEndorsedShops]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreData();
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreData]);

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
      hasMore={hasMore}
      loading={loading}
      totalCakeShops={totalCakeShops}
    />
  );
};
