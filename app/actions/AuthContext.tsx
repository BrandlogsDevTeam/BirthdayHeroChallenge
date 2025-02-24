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

  const fetchInitialState = async () => {
    if (!initialLoadCompleted.current) {
      setIsLoading(true);
    }

    try {
      const { data: profile, error } = await getSelfProfile();
      if (error) throw error;

      if (!profile) throw "Profile is undefined";

      setProfile(profile);
      getNotifications();
    } catch (error) {
      setProfile(null);
      console.log("User logged out:", error);
    } finally {
      setIsLoading(false);
      initialLoadCompleted.current = true;
    }
  };

  const getNotifications = async () => {
    const { data, error } = await getUserNotifications();
    if (error) console.error(error);
    setNotifications(data || []);
  };

  // Use a stronger loading strategy that doesn't cause UI flicker
  useEffect(() => {
    // Check for stored auth state immediately to minimize loading time
    const checkInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        // If no session, we know user is not authenticated
        setProfile(null);
        setIsLoading(false);
        initialLoadCompleted.current = true;
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
          fetchInitialState();
        } else if (event === "SIGNED_OUT") {
          setProfile(null);
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
            setNotifications((n) => [nf, ...n]);
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
            setNotifications((ns) =>
              ns.map((n) => {
                if (nf.id === n.id) return nf;
                return n;
              })
            );
          }
        )
        .on(
          "postgres_changes",
          { event: "DELETE", schema: "public", table: "notifications" },
          (payload) => {
            const nf = payload.old;
            setNotifications((ns) => ns.filter((n) => n.id !== nf.id));
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
        revalidate: fetchInitialState,
        notifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
