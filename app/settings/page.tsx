"use client";

import { Layout } from "@/app/components/Layout";
import { NavTabs } from "../components/NavTab";
import { HelpCircle, ShieldCheck } from "lucide-react";
import HelpCenter from "./help";
import PrivacyPolicy from "./privacy-policy/privacy-policy";
import { WelcomeButton } from "../components/welcom-button";
import { fetchUser } from "@/lib/supabase/server";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

const Settings = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await fetchUser();
      if (user) setUser(user);
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
  ];

  return (
    <Layout>
      {user ? (
        <NavTabs tabs={tabs} />
      ) : (
        <WelcomeButton currentPage="Settings" />
      )}
    </Layout>
  );
};

export default Settings;
