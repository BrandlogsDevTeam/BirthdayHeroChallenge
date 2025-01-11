// components/NavTabs/ClientNavTabs.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { NavTabs } from "./NavTabs";
import { BookOpen, Award, Info } from "lucide-react";
import { PublicLogStory } from "@/lib/types";
import { LogStoriesTab } from "../logStoriesTab";
import { BirthdayIndex } from "..";
import InfoTab from "../../info/info";
import { SkeletonCard } from "../ui/skeleton-post";

interface ClientNavTabsProps {
  isLoggedIn: boolean;
  logStories: PublicLogStory[];
}

export function ClientNavTabs({ isLoggedIn, logStories }: ClientNavTabsProps) {
  const [activeTab, setActiveTab] = useState("");
  console.log("Client side - isLoggedIn:", isLoggedIn);

  const tabs = !isLoggedIn
    ? [
        {
          value: "information",
          label: "Information",
          icon: Info,
          content: <InfoTab />,
        },
        {
          value: "log-stories",
          label: "Log Stories",
          icon: BookOpen,
          content: (
            <Suspense fallback={<SkeletonCard />}>
              <LogStoriesTab logStories={logStories} />
            </Suspense>
          ),
        },
      ]
    : [
        {
          value: "log-stories",
          label: "Log Stories",
          icon: BookOpen,
          content: (
            <Suspense fallback={<SkeletonCard />}>
              <LogStoriesTab logStories={logStories} />
            </Suspense>
          ),
        },
        {
          value: "birthday-hero-index",
          label: "Birthday Hero Index",
          icon: Award,
          content: (
            <Suspense fallback={<SkeletonCard />}>
              <BirthdayIndex />
            </Suspense>
          ),
        },
      ];

  useEffect(() => {
    setActiveTab(!isLoggedIn ? "information" : "log-stories");
  }, [isLoggedIn]);

  return (
    <NavTabs activeTab={activeTab} tabs={tabs} onTabChange={setActiveTab} />
  );
}
