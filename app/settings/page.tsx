"use client";

import { Layout } from "@/app/components/Layout";
import { NavTabs } from "../components/NavTab";
import { HelpCircle, ShieldCheck } from "lucide-react";
import HelpCenter from "./help";
import PrivacyPolicy from "./privacy-policy/privacy-policy";

const Settings = () => {
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
      <NavTabs tabs={tabs} />
    </Layout>
  );
};

export default Settings;
