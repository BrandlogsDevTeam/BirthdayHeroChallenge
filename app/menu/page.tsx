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
import Image from "next/image";
import Link from "next/link";
import Spinner from "../components/spinner";

const Settings = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { isLoading, profile, revalidate } = useAuth();
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
    <div className="min-h-full">
      {isLoading ? (
        <Spinner />
      ) : profile ? (
        <div className="space-y-6">
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <Link href={`#`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white relative">
                    <Image
                      src={profile.avatar_url || "/default-avatar.png"}
                      alt="Profile"
                      width={48}
                      height={48}
                      className="object-cover"
                      priority={true}
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {profile.name}
                    </h2>
                    <p className="text-sm text-gray-500">@{profile.username}</p>
                  </div>
                </div>
              </Link>
              {/* Logout Button */}
              <Button
                variant="outline"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2 text-sm"
              >
                <LogOut className="w-4 h-4" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4">
            <NavTabs tabs={tabs} defaultTab={tabs[0].value} disableRefresh />
          </div>
        </div>
      ) : (
        <WelcomeButton currentPage="menu" />
      )}
    </div>
  );
};

export default Settings;
