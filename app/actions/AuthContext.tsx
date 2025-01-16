"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { getSelfProfile } from "@/lib/supabase/server-extended/userProfile";

interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar_url?: string;
  [key: string]: any;
}

interface AuthContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  revalidate: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  profile: null,
  isLoading: true,
  revalidate: async () => { }
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const fetchInitialState = async () => {
    try {
      const { data: profile, error } = await getSelfProfile();
      if (error)
        throw error

      if (!profile)
        throw "Profile is undefined"

      setProfile(profile)

    } catch (error) {
      setProfile(null)
      console.error("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchInitialState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('event', event)
      if (session?.user) {

      } else {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ profile, isLoading, revalidate: fetchInitialState }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
