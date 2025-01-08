"use client";

import { useEffect, useState } from "react";

import { Layout } from "./components/Layout";
import Post from "./components/Post";
import { NavTabs } from "./components/NavTab";
import { postData } from "./data/post-data";
import { createClient } from "@/lib/supabase/client";
import { Award, Info } from "lucide-react";
import { BookOpen } from "lucide-react";
import InfoTab from "./info/info";
import { BirthdayIndex } from "./components";

export default function Home() {
  const [user, setUser] = useState<any>(null);

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

  const tabs = user
    ? [
        {
          value: "log-stories",
          label: "Log Stories",
          icon: BookOpen,
          content: (
            <div className="container mx-auto py-8 space-y-6">
              {postData.map((post, index) => (
                <Post key={index} {...post} />
              ))}
            </div>
          ),
        },
        {
          value: "birthday-hero-index",
          label: "Birthday Hero Index",
          icon: Award,
          content: <BirthdayIndex />,
        },
      ]
    : [
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
            <div className="container mx-auto py-8 space-y-6">
              {postData.map((post, index) => (
                <Post key={index} {...post} />
              ))}
            </div>
          ),
        },
      ];

  return (
    <Layout>
      <NavTabs defaultTab={user ? "log-stories" : "information"} tabs={tabs} />
    </Layout>
  );
}
