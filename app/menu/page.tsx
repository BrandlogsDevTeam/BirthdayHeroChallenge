"use client";

import { NavTabs } from "../components/NavTab";
import { HelpCircle, LogOut, ShieldCheck, Globe, Bell } from "lucide-react";
import HelpCenter from "./help";
import PrivacyPolicy from "./privacy-policy/privacy-policy";
import { WelcomeButton } from "../components/welcom-button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getSelfSettings,
  logoutUser,
  updateSettings,
} from "@/lib/supabase/server-extended/userProfile";
import { Button } from "@/components/ui/button";
import TimezoneSelect from "../components/timezoneSelect";
import { useAuth } from "../actions/AuthContext";
import LogNotification from "./log-notification";

const Settings = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { profile, revalidate } = useAuth();
  const [settings, setSettings] = useState<any>({});

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const { error } = await logoutUser();
      if (error) {
        console.error("Logout error:", error);
        return;
      }
      await revalidate();
      router.push("/"); // Redirect to home page after logout
      router.refresh(); // Refresh the page to update auth state
    } catch (error) {
      console.error("Unexpected error during logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleUpdateSetting = async (e: { timezone?: string; ln?: string }) => {
    const { data, error } = await updateSettings(e);
    if (data) setSettings(data);
    return;
  };

  useEffect(() => {
    (async () => {
      const { data } = await getSelfSettings();
      if (data) setSettings(data);
    })();
  }, []);

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
          current={settings?.timezone}
          onTimezoneChange={(e) => handleUpdateSetting({ timezone: e })}
        />
      ),
    },
    {
      value: "log notifications",
      label: "Log Notifications",
      icon: Bell,
      content: (
        <LogNotification
          current={settings?.log_notification}
          onUpdate={(e) => handleUpdateSetting({ ln: e })}
        />
      ),
    },
  ];

  return (
    <>
      {profile ? (
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
          <NavTabs tabs={tabs} defaultTab={tabs[0].value} disableRefresh />
        </div>
      ) : (
        <WelcomeButton currentPage="menu" />
      )}
    </>
  );
};

export default Settings;
