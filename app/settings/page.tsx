"use client";

import { Layout } from "@/app/components/Layout";
import { NavTabs } from "../components/NavTab";
import { HelpCircle, LogOut, ShieldCheck, Globe, Bell } from "lucide-react";
import HelpCenter from "./help";
import PrivacyPolicy from "./privacy-policy/privacy-policy";
import { WelcomeButton } from "../components/welcom-button";
import { fetchUser } from "@/lib/supabase/server";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { logoutUser } from "@/lib/supabase/server-extended/userProfile";
import { Button } from "@/components/ui/button";
import TimezoneSelect from "../components/timezoneSelect";

const Settings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await fetchUser();
      if (user) setUser(user);
    })();
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const { error } = await logoutUser();
      if (error) {
        console.error("Logout error:", error);
        return;
      }
      router.push("/"); // Redirect to home page after logout
      router.refresh(); // Refresh the page to update auth state
    } catch (error) {
      console.error("Unexpected error during logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const tabs = [
    {
      value: "help",
      label: "Help",
      icon: HelpCircle,
      content: <HelpCenter />,
    },
    {
      value: "policy",
      label: "Policy",
      icon: ShieldCheck,
      content: <PrivacyPolicy />,
    },
    {
      value: "timezone",
      label: "Timezone",
      icon: Globe,
      content: (
        <TimezoneSelect
          onTimezoneChange={(timezone) =>
            console.log("New timezone set:", timezone)
          }
        />
      ),
    },
    {
      value: "log notifications",
      label: "Log Notifications",
      icon: Bell,
      content: <PrivacyPolicy />,
    },
  ];

  return (
    <Layout>
      {user ? (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button
              variant="destructive"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
          <NavTabs tabs={tabs} />
        </div>
      ) : (
        <WelcomeButton currentPage="Settings" />
      )}
    </Layout>
  );
};

export default Settings;
