"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import CakeShops from "./cake-shops";
import AdminProfile from "@/app/components/AdminProfile";
import { NavTabs } from "../components/NavTab";
import { useAuth } from "../actions/AuthContext";
import { CardPreview } from "../components/card-preview";
import NomineeList from "./nominees";

const Gift = dynamic(() => import("lucide-react").then((mod) => mod.Gift), {
  ssr: false,
});

const Cake = dynamic(() => import("lucide-react").then((mod) => mod.Cake), {
  ssr: false,
});

const Award = dynamic(() => import("lucide-react").then((mod) => mod.Award), {
  ssr: false,
});

export default function AdminPage() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("bonuses");

  const tabs = [
    {
      label: "Your Cause Bonuses",
      value: "bonuses",
      icon: Gift,
      content: (
        <div>
          <CardPreview
            title="Your Cause Bonuses"
            sections={[
              { title: "Allocated", data: `$36000` },
              { title: "Pipeline", data: `$0` },
              { title: "Earned", data: `$0` },
            ]}
          />
        </div>
      ),
    },
    {
      label: "Cake Shops",
      value: "shops",
      icon: Cake,
      content: <CakeShops setActiveTab={setActiveTab} />,
    },
    {
      label: "Birthday Hero Nominees",
      value: "nominees",
      icon: Award,
      content: <NomineeList />,
    },
  ];

  return (
    <>
      {profile && (
        <AdminProfile
          {...{
            ...profile,
            name: profile?.name || "",
            username: profile?.username,
            id: profile?.id,
            imageUrl: profile?.avatar_url,
            can_edit: false,
          }}
        />
      )}
      <NavTabs tabs={tabs} defaultTab={activeTab} onChange={setActiveTab} />
    </>
  );
}
