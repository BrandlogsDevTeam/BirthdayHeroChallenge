"use client";

import { useState, useEffect, Suspense } from "react";
import { NavTabs } from "./NavTabs";
import { BookOpen, Award, Info } from "lucide-react";
import { LogStoryDetailsDBO } from "@/lib/types";
import { LogStoriesTab } from "../logStoriesTab";
import { BirthdayIndex } from "..";
import InfoTab from "../../info/info";
import { SkeletonCard } from "../ui/skeleton-post";
import { createClient } from "@supabase/supabase-js";

interface ClientNavTabsProps {
  isLoggedIn: boolean;
  logStories: LogStoryDetailsDBO[];
}

export function ClientNavTabs({ isLoggedIn, logStories }: ClientNavTabsProps) {
  const [activeTab, setActiveTab] = useState("");
  console.log(logStories);

  const tabs = !isLoggedIn
    ? [
      {
        value: "information",
        label: "Information",
        icon: Info,
        content: <InfoTab />,
      },
    ]
    : [
      {
        value: "date-stories",
        label: "Date Stories",
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
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
    );
    // @ts-ignore
    window.supabase = supabase;
  }, [logStories]);

  useEffect(() => {
    setActiveTab(!isLoggedIn ? "information" : "date-stories");
  }, [isLoggedIn]);

  return (
    <NavTabs activeTab={activeTab} tabs={tabs} onTabChange={setActiveTab} />
  );
}
