"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Layout } from "../components/Layout";
import { CakeBonusesCard } from "./bonuses";
import CakeShops from "./cake-shops";
import AdminProfile from "@/app/components/AdminProfile";
import { NavTabs } from "../components/NavTab";
import { getSelfProfile } from "@/lib/supabase/server-extended/userProfile";
import { useAuth } from "../actions/AuthContext";
import { CardPreview } from "../components/card-preview";

// Dynamically import to avoid SSR for icons
const Gift = dynamic(() => import("lucide-react").then((mod) => mod.Gift), {
  ssr: false,
});

const Cake = dynamic(() => import("lucide-react").then((mod) => mod.Cake), {
  ssr: false,
});

export default function AdminPage() {

  const { profile } = useAuth()

  const tabs = [
    {
      label: "Your Cake Bonuses",
      value: "bonuses",
      icon: Gift,
      content: <div>
        <CardPreview title="Your Cake Bonuses" sections={[
          { title: "Allocated", data: `$36000` },
          { title: "Earned", data: `$${profile?.permissiory_donations || 0}` },
          { title: "Paid", data: `$0` },
        ]} />
      </div>,
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
      {/* <div>{profile && JSON.stringify(profile, null, 2)}</div> */}
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
      <NavTabs tabs={tabs} />
    </Layout>
  );
}
