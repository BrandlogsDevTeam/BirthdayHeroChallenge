"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";
import type {
  RealtimeChannel,
} from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import {
  getSelfProfile,
  getUserNotifications,
} from "@/lib/supabase/server-extended/userProfile";
import { useToast } from "@/hooks/use-toast";
import { AccountDBO } from "@/lib/types";
import {
  getCachedData,
  setCachedData,
  clearCachedData,
} from "@/lib/utils/localStorage";

const PROFILE_CACHE_KEY = "auth_profile_cache";
const NOTIFICATIONS_CACHE_KEY = "auth_notifications_cache";
const CACHE_TIMESTAMP_KEY = "auth_cache_timestamp";
const CACHE_DURATION = 1000 * 60 * 60;

interface AuthContextType {
  profile: AccountDBO | null;
  isLoading: boolean;
  notifications: any[];
  revalidate: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  profile: null,
  isLoading: true,
  notifications: [],
  revalidate: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<AccountDBO | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const channel = useRef<RealtimeChannel | null>(null);
  const { toast } = useToast();
  const initialLoadCompleted = useRef(false);

  const isCacheValid = (): boolean => {
    const timestamp = getCachedData<number>(CACHE_TIMESTAMP_KEY);
    if (!timestamp) return false;

    console.log("Cache valid");
    return Date.now() - timestamp < CACHE_DURATION;
  };

  const updateCache = (
    profileData: AccountDBO | null,
    notificationsData: any[] = []
  ) => {
    if (profileData) {
      console.log("Caching profile data");
      setCachedData(PROFILE_CACHE_KEY, profileData);
      setCachedData(NOTIFICATIONS_CACHE_KEY, notificationsData);
      setCachedData(CACHE_TIMESTAMP_KEY, Date.now());
    } else {
      console.log("Clearing cached data");
      clearCachedData(PROFILE_CACHE_KEY);
      clearCachedData(NOTIFICATIONS_CACHE_KEY);
      clearCachedData(CACHE_TIMESTAMP_KEY);
    }
  };

  const fetchInitialState = async (forceRefresh = false) => {
    if (!initialLoadCompleted.current) {
      setIsLoading(true);
    }

    try {
      if (!forceRefresh && isCacheValid()) {
        const cachedProfile = getCachedData<AccountDBO>(PROFILE_CACHE_KEY);
        const cachedNotifications =
          getCachedData<any[]>(NOTIFICATIONS_CACHE_KEY) || [];

        if (cachedProfile) {
          setProfile(cachedProfile);
          setNotifications(cachedNotifications);
          console.log("Getting profile info from cache");
          refreshDataInBackground();
          setIsLoading(false);
          initialLoadCompleted.current = true;
          return;
        }
      }

      const { data: profileData, error } = await getSelfProfile();
      if (error) throw error;

      if (!profileData) throw "Profile is undefined";

      setProfile(profileData);
      console.log("API call for auth");
      const { data: notificationsData, error: notificationsError } =
        await getUserNotifications();
      if (notificationsError) console.error(notificationsError);

      setNotifications(notificationsData || []);

      updateCache(profileData, notificationsData || []);
    } catch (error) {
      console.log("User logged out:", error);
      setProfile(null);
      setNotifications([]);
      updateCache(null);
      console.log("Cleared cache for auth")
    } finally {
      setIsLoading(false);
      initialLoadCompleted.current = true;
    }
  };

  const refreshDataInBackground = async () => {
    try {
      const { data: profileData, error } = await getSelfProfile();
      if (error || !profileData) return;
      console.log("Background fetch for profile: " + profileData)
      const { data: notificationsData } = await getUserNotifications();

      setProfile(profileData);
      setNotifications(notificationsData || []);

      updateCache(profileData, notificationsData || []);
    } catch (error) {
      console.error("Background refresh error:", error);
    }
  };

  useEffect(() => {
    const checkInitialSession = async () => {
      if (isCacheValid()) {
        const cachedProfile = getCachedData<AccountDBO>(PROFILE_CACHE_KEY);
        const cachedNotifications =
          getCachedData<any[]>(NOTIFICATIONS_CACHE_KEY) || [];
        console.log("Loading authe state from cache")
        if (cachedProfile) {
          setProfile(cachedProfile);
          setNotifications(cachedNotifications);
          setIsLoading(false);
          initialLoadCompleted.current = true;

          console.log("Auth profile got from cache");
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            refreshDataInBackground();
          } else {
            setProfile(null);
            setNotifications([]);
            updateCache(null);
          }
          return;
        }
      }

      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setProfile(null);
        setIsLoading(false);
        initialLoadCompleted.current = true;
        updateCache(null);
      } else {
        fetchInitialState();
      }
    };

    checkInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          fetchInitialState(true);
        } else if (event === "SIGNED_OUT") {
          setProfile(null);
          setNotifications([]);
          updateCache(null);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!channel.current && profile) {
      channel.current = supabase.channel("supabase_realtime");
      channel.current
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "notifications" },
          (payload) => {
            const nf = payload.new;
            setNotifications((n) => {
              const newNotifications = [nf, ...n];
              if (profile) updateCache(profile, newNotifications);
              return newNotifications;
            });
            toast(
              "New Notification",
              "default",
              {
                description:
                  nf?.content?.message || "You have a new notification",
              }
            );
          }
        )
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "notifications" },
          (payload) => {
            const nf = payload.new;
            setNotifications((ns) => {
              const updatedNotifications = ns.map((n) => {
                if (nf.id === n.id) return nf;
                return n;
              });
              if (profile) updateCache(profile, updatedNotifications);
              return updatedNotifications;
            });
          }
        )
        .on(
          "postgres_changes",
          { event: "DELETE", schema: "public", table: "notifications" },
          (payload) => {
            const nf = payload.old;
            setNotifications((ns) => {
              const filteredNotifications = ns.filter((n) => n.id !== nf.id);
              if (profile) updateCache(profile, filteredNotifications);
              return filteredNotifications;
            });
          }
        )
        .subscribe();
    }

    return () => {
      channel.current?.unsubscribe();
      channel.current = null;
    };
  }, [profile]);

  return (
    <AuthContext.Provider
      value={{
        profile,
        isLoading,
        revalidate: () => fetchInitialState(true),
        notifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
