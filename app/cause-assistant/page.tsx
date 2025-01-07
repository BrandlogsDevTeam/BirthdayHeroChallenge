"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Layout } from "../components/Layout";
import { CakeBonusesCard } from "./bonuses";
import CakeShops from "./cake-shops";
import AdminProfile from "@/app/components/AdminProfile";
import { NavTabs } from "../components/NavTab";

// Dynamically import to avoid SSR for icons
const Gift = dynamic(() => import("lucide-react").then((mod) => mod.Gift), {
  ssr: false,
});

const Cake = dynamic(() => import("lucide-react").then((mod) => mod.Cake), {
  ssr: false,
});

export default function AdminPage() {
  const adminData = {
    name: "John Doe",
    username: "johndoe",
    id: "AD123456",
    imageUrl: "/placeholder.svg?height=64&width=64",
  };

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
      <AdminProfile {...adminData} />
      <NavTabs tabs={tabs} />
    </Layout>
  );
}
