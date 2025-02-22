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
          value: "birthday-hero-index",
          label: "Birthday Hero Index",
          icon: Award,
          content: (
            <Suspense fallback={<SkeletonCard />}>
              <BirthdayIndex />
            </Suspense>
          ),
        },
        {
          value: "date-stories",
          label: "Date Stories",
          icon: BookOpen,
          content:
            logStories.length > 0 ? (
              <LogStoriesTab logStories={logStories} />
            ) : (
              <div className="h-[70vh]">
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                  <BookOpen className="w-12 h-12 mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Date Stories Yet
                  </h3>
                  <p className="max-w-md">
                    It looks like there are no date stories to display right
                    now. Check back later for updates or explore other tabs!
                  </p>
                </div>
              </div>
            ),
        },
      ];

  useEffect(() => {
    setActiveTab(!isLoggedIn ? "information" : "birthday-hero-index");
  }, [isLoggedIn]);

  return (
    <NavTabs activeTab={activeTab} tabs={tabs} onTabChange={setActiveTab} />
  );
}
