"use client";

import React, { useEffect, useState } from "react";
import { Info, BookOpen, Award } from "lucide-react";

interface Tab {
  value: string;
  label: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

interface NavTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  disableRefresh?: boolean
}

export function NavTabs({ tabs, defaultTab, disableRefresh = false }: NavTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    if (disableRefresh) return
    setActiveTab(defaultTab || tabs[0].value)
  }, [tabs]);

  return (
    <div className="w-full bg-white shadow-sm">
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-gray-200">
          <nav
            className="-mb-px flex justify-center gap-3 overflow-x-auto"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`group inline-flex shrink-0 items-center border-b-2 py-4 px-4 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.value
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                <tab.icon
                  className={`mr-2 h-5 w-5 ${
                    activeTab === tab.value
                      ? "text-green-600"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
    </div>
  );
}
