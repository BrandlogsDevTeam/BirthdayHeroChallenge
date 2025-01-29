"use client";

import { useState, useEffect, Suspense } from "react";
import { BookOpen, MessageCircleMore, Store } from "lucide-react";
import { PublicLogStory } from "@/lib/types";
import { CakeShopCard } from "./card";
import { SkeletonCard } from "../components/ui/skeleton-card";
import { BirthdayIndex } from "../components";
import { NavTabs } from "../components/NavTabs/NavTabs";
import AssistantProfile from "../components/assistant-profile";

interface BrandsProp {
  id: string;
  name: string;
  username: string;
  location: string;
  is_accepted: string;
  endorsement_message: string;
  avatar_url: string;
}

interface ClientNavTabsProps {
  isLoggedIn: boolean;
  endorsedShops: BrandsProp[];
  user_role?: string;
  assistants?: any[];
}

export function ClientNavTabs({
  isLoggedIn,
  endorsedShops,
  user_role,
}: ClientNavTabsProps) {
  const [activeTab, setActiveTab] = useState("brands");

  const getBrandsTab = () => ({
    value: "brands",
    label: "Brands",
    icon: Store,
    content: (
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-green-600">
          Endorsed Cake Shops
        </h2>
        {endorsedShops.length > 0 ? (
          endorsedShops.map((shop) => (
            <CakeShopCard
              key={shop.id}
              name={shop.name}
              username={shop.username}
              location={shop.location}
              status={shop.is_accepted ? "Accepted" : "Endorsed"}
              testimonial={shop.endorsement_message}
              profilePhoto={shop.avatar_url}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    ),
  });

  const getBirthdayHeroTab = () => ({
    value: "birthday-hero-index",
    label: "Birthday Hero Index",
    icon: BookOpen,
    content: (
      <Suspense fallback={<SkeletonCard />}>
        <BirthdayIndex />
      </Suspense>
    ),
  });

  const getAssistantTab = () => ({
    value: "assistant",
    label: "Cause Assistant",
    icon: MessageCircleMore,
    content: (
      <AssistantProfile
        name="Sarah John"
        username="sarahJ"
        assistantId="AST-2024-001"
      />
    ),
  });

  const tabs = !isLoggedIn
    ? [getBrandsTab()]
    : [
        getBrandsTab(),
        ...(user_role && user_role !== "assistant" ? [getAssistantTab()] : []),
      ];

  useEffect(() => {
    if (!tabs.some((tab) => tab.value === activeTab)) {
      setActiveTab("brands");
    }
  }, [tabs, activeTab]);

  return (
    <NavTabs activeTab={activeTab} tabs={tabs} onTabChange={setActiveTab} />
  );
}
