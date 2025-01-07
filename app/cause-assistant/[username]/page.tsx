"use client";

import dynamic from "next/dynamic";
import { Layout } from "@/app/components/Layout";
import { CakeBonusesCard } from "../bonuses";
import CakeShops from "../cake-shops";
import AdminProfile from "@/app/components/AdminProfile";
import { NavTabs } from "@/app/components/NavTab";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Spinner } from "@/app/components/ui/spinner";

// Dynamically import to avoid SSR for icons
const Gift = dynamic(() => import("lucide-react").then((mod) => mod.Gift), {
  ssr: false,
});

const Cake = dynamic(() => import("lucide-react").then((mod) => mod.Cake), {
  ssr: false,
});

interface DebugInfo {
  sessionUser?: {
    id: string;
    email: string;
    requestedUsername: string;
  };
  profileError?: string;
  profile?: {
    id: string;
    role: string;
    email: string;
    username: string;
  };
}

export default function AdminPage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const router = useRouter();
  const params = useParams();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function checkUserAccess() {
      // Get session and user data
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (!session || sessionError) {
        console.error("Session error:", sessionError);
        router.push("/login");
        return;
      }

      // Store debug info
      setDebugInfo({
        sessionUser: {
          id: session.user.id,
          email: session.user.email ?? '',
          requestedUsername: params.username ?? '',
        },
      });

      // Fetching user profile data including role
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", params.username)
        .single();

      if (profileError) {
        console.error("Profile error:", profileError);
        setDebugInfo((prev) => ({
          sessionUser: prev?.sessionUser,
          profileError: profileError.message,
        }));
        router.push("/404");
        return;
      }

      if (!profile) {
        console.error("No profile found for username:", params.username);
        setDebugInfo((prev) => ({
          sessionUser: prev?.sessionUser,
          profileError: "No profile found",
        }));
        router.push("/404");
        return;
      }

      setDebugInfo((prev) => ({
        sessionUser: prev?.sessionUser,
        profile: {
          id: profile.id,
          role: profile.role,
          email: profile.email,
          username: profile.username,
        },
      }));

      // Check if user is an assistant
      if (profile.role !== "assistant") {
        console.error("User is not an assistant. Role:", profile.role);
        router.push("/unauthorized");
        return;
      }

      // Check if the logged-in user matches the profile user
      if (session.user.id !== profile.id) {
        console.error("User ID mismatch:", session.user.id, profile.id);
        router.push("/unauthorized");
        return;
      }

      setUserData(profile);
      setLoading(false);
    }

    checkUserAccess();
  }, [params.username, router, supabase]);

  if (loading) {
    return (
      <Layout>
        <div className="space-y-4">
          <div>
            <Spinner />
          </div>
          {debugInfo && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-bold mb-2">Debug Information:</h3>
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  const tabs = [
    {
      label: "Your Cake Bonuses",
      value: "bonuses",
      icon: Gift,
      content: <CakeBonusesCard />,
    },
    {
      label: "Cake Shops",
      value: "shops",
      icon: Cake,
      content: <CakeShops />,
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {debugInfo && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">User Details:</h3>
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}
        <AdminProfile
          name={userData.full_name}
          username={userData.username}
          id={userData.id}
          imageUrl={
            userData.avatar_url || "/placeholder.svg?height=64&width=64"
          }
        />
        <NavTabs tabs={tabs} />
      </div>
    </Layout>
  );
}
