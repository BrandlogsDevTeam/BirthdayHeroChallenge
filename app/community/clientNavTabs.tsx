"use client";

import { useState, useEffect, Suspense } from "react";
import { BookOpen, MessageCircleMore, Info } from "lucide-react";
import { PublicLogStory } from "@/lib/types";
import { CakeShopCard } from "../components/cake-shop";
import { SkeletonCard } from "../components/ui/skeleton-card";
import { BirthdayIndex } from "../components";
import { NavTabs } from "../components/NavTabs/NavTabs";
import AssistantProfile from "../components/assistant-profile";

interface BrandsProp {
  id: string;
  name: string;
  location: string;
  is_accepted: string;
  endorsement_message: string;
  avatar_url: string;
}

interface ClientNavTabsProps {
  isLoggedIn: boolean;
  endorsedShops: BrandsProp[];
}

export function ClientNavTabs({
  isLoggedIn,
  endorsedShops,
}: ClientNavTabsProps) {
  const [activeTab, setActiveTab] = useState("brands");

  const tabs = !isLoggedIn
    ? [
        {
          value: "brands",
          label: "Cake Shops",
          icon: Info,
          content: (
            <div className="space-y-6">
              {endorsedShops.length > 0 ? (
                endorsedShops.map((shop) => (
                  <CakeShopCard
                    key={shop.id}
                    name={shop.name}
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
        },
        {
          value: "birthday-hero-index",
          label: "Birthday Hero Index",
          icon: BookOpen,
          content: (
            <Suspense fallback={<SkeletonCard />}>
              <BirthdayIndex />
            </Suspense>
          ),
        },
      ]
    : [
        {
          value: "brands",
          label: "Cake Shops",
          icon: Info,
          content: (
            <div className="space-y-6">
              {endorsedShops.length > 0 ? (
                endorsedShops.map((shop) => (
                  <CakeShopCard
                    key={shop.id}
                    name={shop.name}
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
        },
        {
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
        },
      ];

  return (
    <NavTabs activeTab={activeTab} tabs={tabs} onTabChange={setActiveTab} />
  );
}
