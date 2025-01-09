"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Layout } from "../components/Layout";
import { CakeBonusesCard } from "./bonuses";
import CakeShops from "./cake-shops";
import AdminProfile from "@/app/components/AdminProfile";
import { NavTabs } from "../components/NavTab";
import { getSelfProfile } from "@/lib/supabase/server-extended/userProfile";

// Dynamically import to avoid SSR for icons
const Gift = dynamic(() => import("lucide-react").then((mod) => mod.Gift), {
  ssr: false,
});

const Cake = dynamic(() => import("lucide-react").then((mod) => mod.Cake), {
  ssr: false,
});

export default function AdminPage() {
  const [adminData, setAdminData] = useState<any>();

  useEffect(() => {
    getSelfProfile().then(({ data, error }) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(data);
      setAdminData(data);
    });
  }, []);

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
      {/* <div>{adminData && JSON.stringify(adminData, null, 2)}</div> */}
      {adminData && (
        <AdminProfile
          {...{
            name: adminData?.name || "",
            username: adminData?.username,
            id: adminData?.id,
            imageUrl: adminData?.avatar_url,
            can_edit: false,
            user_data: adminData,
          }}
        />
      )}
      <NavTabs tabs={tabs} />
    </Layout>
  );
}
