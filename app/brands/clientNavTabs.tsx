"use client";

import { useState, useEffect, Suspense } from "react";
import { BookOpen, MessageCircleMore, Store } from "lucide-react";
import { PublicAccountDBO, PublicLogStory } from "@/lib/types";
import { CakeShopCard } from "./card";
import { SkeletonCard } from "../components/ui/skeleton-card";
import { BirthdayIndex } from "../components";
import { NavTabs } from "../components/NavTabs/NavTabs";
import AssistantProfile from "../components/assistant-profile";
import { useAuth } from "../actions/AuthContext";
import { AuthModal } from "../components/Post";
import { Dialog } from "@/components/ui/dialog";
import { useConnectionFlow } from "../actions/connectionContext";

interface BrandsProp {
  id: string;
  index: number;
  name: string;
  username: string;
  state: string;
  location: string;
  account_status: string;
  bio: string;
  avatar_url: string;
}

interface ClientNavTabsProps {
  isLoggedIn: boolean;
  endorsedShops: PublicAccountDBO[];
  user_role?: string;
  assistant?: {
    name: string;
    username: string;
    adminId: string;
    avatar_url: string;
  };
}

export function ClientNavTabs({
  isLoggedIn,
  endorsedShops,
  user_role,
  assistant,
}: ClientNavTabsProps) {
  const [activeTab, setActiveTab] = useState("brands");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { openFlow } = useConnectionFlow();
  const { profile } = useAuth();

  const getBrandsTab = () => ({
    value: "brands",
    label: "Brands",
    icon: Store,
    content: (
      <>
        <div className="space-y-6">
          {endorsedShops.length > 0 ? (
            endorsedShops.map((shop, index) => {
              const reverseIndex = endorsedShops.length - index;
              return (
                <CakeShopCard
                  key={shop.id}
                  id={shop.id}
                  index={reverseIndex}
                  name={shop.name || ""}
                  username={shop.username}
                  state={shop.state || ""}
                  county={shop.county || ""}
                  status={
                    shop.account_status === "accepted" ? "Accepted" : "Endorsed"
                  }
                  testimonial={shop.bio || ""}
                  profilePhoto={shop.avatar_url || ""}
                  connection={shop.connection || null}
                />
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
              <Store className="w-12 h-12 mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">No Brands Yet</h3>
              <p className="max-w-md">
                It looks like there are no endorsed shops to display right now.
                Check back later for updates or explore other tabs!
              </p>
            </div>
          )}
        </div>
        <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
          <AuthModal />
        </Dialog>
      </>
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
        avatar_url={assistant?.avatar_url || ""}
        name={assistant?.name || ""}
        username={assistant?.username || ""}
        assistantId={assistant?.adminId || ""}
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
