"use client";

import dynamic from "next/dynamic";
import CakeShops from "./cake-shops";
import AdminProfile from "@/app/components/AdminProfile";
import { NavTabs } from "../components/NavTab";
import { useAuth } from "../actions/AuthContext";
import { CardPreview } from "../components/card-preview";

const Gift = dynamic(() => import("lucide-react").then((mod) => mod.Gift), {
  ssr: false,
});

const Cake = dynamic(() => import("lucide-react").then((mod) => mod.Cake), {
  ssr: false,
});

export default function AdminPage() {
  const { profile } = useAuth();

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
              { title: "Earned", data: `$0` },
              { title: "Paid", data: `$0` },
            ]}
          />
        </div>
      ),
    },
    {
      label: "Cake Shops",
      value: "shops",
      icon: Cake,
      content: <CakeShops />,
    },
  ];

  return (
    <>
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
    </>
  );
}
