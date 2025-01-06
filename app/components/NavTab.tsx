"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Info, BookOpen, Award } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import InfoTab from "../info/info";

interface NavTab {
  value: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface NavTabsProps {
  defaultTab?: string;
  children: React.ReactNode;
}

export function NavTabs({ defaultTab, children }: NavTabsProps) {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(defaultTab || "log-stories");

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const tabs: NavTab[] = user
    ? [
        {
          value: "log-stories",
          label: "Log Stories",
          icon: <BookOpen className="w-4 h-4 mr-2" />,
          content: children,
        },
        {
          value: "birthday-hero-index",
          label: "Birthday Hero Index",
          icon: <Award className="w-4 h-4 mr-2" />,
          content: <div>Birthday Hero Index Content</div>,
        },
      ]
    : [
        {
          value: "information",
          label: "Information",
          icon: <Info className="w-4 h-4 mr-2" />,
          content: <InfoTab />,
        },
        {
          value: "log-stories",
          label: "Log Stories",
          icon: <BookOpen className="w-4 h-4 mr-2" />,
          content: children,
        },
      ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex items-center justify-center"
          >
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
