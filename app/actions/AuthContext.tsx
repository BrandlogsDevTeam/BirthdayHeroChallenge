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
  SupabaseClient,
  User,
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

// Cache keys
const PROFILE_CACHE_KEY = "auth_profile_cache";
const NOTIFICATIONS_CACHE_KEY = "auth_notifications_cache";
const CACHE_TIMESTAMP_KEY = "auth_cache_timestamp";
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour in milliseconds

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

  // Check if cache is still valid
  const isCacheValid = (): boolean => {
    const timestamp = getCachedData<number>(CACHE_TIMESTAMP_KEY);
    if (!timestamp) return false;

    console.log("Cache valid");
    return Date.now() - timestamp < CACHE_DURATION;
  };

  // Save data to cache
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
      // Check cache first if not forcing refresh
      if (!forceRefresh && isCacheValid()) {
        const cachedProfile = getCachedData<AccountDBO>(PROFILE_CACHE_KEY);
        const cachedNotifications =
          getCachedData<any[]>(NOTIFICATIONS_CACHE_KEY) || [];

        if (cachedProfile) {
          setProfile(cachedProfile);
          setNotifications(cachedNotifications);
          console.log("Getting profile info from cache");
          // Still fetch in the background for fresh data
          refreshDataInBackground();
          setIsLoading(false);
          initialLoadCompleted.current = true;
          return;
        }
      }

      // No valid cache or force refresh, get from API
      const { data: profileData, error } = await getSelfProfile();
      if (error) throw error;

      if (!profileData) throw "Profile is undefined";

      setProfile(profileData);
      console.log("API call for auth");
      // Get notifications
      const { data: notificationsData, error: notificationsError } =
        await getUserNotifications();
      if (notificationsError) console.error(notificationsError);

      setNotifications(notificationsData || []);

      updateCache(profileData, notificationsData || []);
    } catch (error) {
      console.log("User logged out:", error);
      setProfile(null);
      setNotifications([]);
      updateCache(null); // Clear cache
      console.log("Cleared cache for auth")
    } finally {
      setIsLoading(false);
      initialLoadCompleted.current = true;
    }
  };

  // Background refresh without affecting loading state
  const refreshDataInBackground = async () => {
    try {
      const { data: profileData, error } = await getSelfProfile();
      if (error || !profileData) return;
      console.log("Background fetch for profile: " + profileData)
      const { data: notificationsData } = await getUserNotifications();

      // Only update state if user is still logged in
      setProfile(profileData);
      setNotifications(notificationsData || []);

      // Update cache
      updateCache(profileData, notificationsData || []);
    } catch (error) {
      console.error("Background refresh error:", error);
    }
  };

  // Use a stronger loading strategy that doesn't cause UI flicker
  useEffect(() => {
    // Check for stored auth state immediately to minimize loading time
    const checkInitialSession = async () => {
      // First, try to load from cache to prevent UI flicker
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
          // Verify session still exists
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            // Session exists, do a background refresh
            refreshDataInBackground();
          } else {
            setProfile(null);
            setNotifications([]);
            updateCache(null);
          }
          return;
        }
      }

      // No valid cache, check session normally
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        // If no session, we know user is not authenticated
        setProfile(null);
        setIsLoading(false);
        initialLoadCompleted.current = true;
        updateCache(null);
      } else {
        // If session exists, fetch the profile
        fetchInitialState();
      }
    };

    checkInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          // Force refresh on sign in
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
              // Update cache with new notifications
              if (profile) updateCache(profile, newNotifications);
              return newNotifications;
            });
            toast(
              "New Notification", // Title
              "default", // Variant
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
              // Update cache with updated notifications
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
              // Update cache with filtered notifications
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
        revalidate: () => fetchInitialState(true), // Force refresh
        notifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
