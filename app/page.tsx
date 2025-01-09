"use client";

import { useEffect, useState } from "react";

import { Layout } from "./components/Layout";
import Post from "./components/Post";
import { NavTabs } from "./components/NavTab";
import { createClient } from "@/lib/supabase/client";
import { Award, Info } from "lucide-react";
import { BookOpen } from "lucide-react";
import InfoTab from "./info/info";
import { BirthdayIndex } from "./components";
import { getAllLogStories } from "@/lib/supabase/server-extended/log-stories";
import { LogStory, PublicLogStory } from "@/lib/types";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [logStories, setLogStories] = useState<(PublicLogStory)[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    const fetchLogStories = async () => {
      const { data, error } = await getAllLogStories();
      console.log("log stories: ", data);
      if (data) {
        setLogStories(data);
      }
    };

    fetchUser();
    fetchLogStories();
  }, []);

  const tabs = user
    ? [
      {
        value: "log-stories",
        label: "Log Stories",
        icon: BookOpen,
        content: (
          <div className="container mx-auto py-8 space-y-6">
            {logStories.map((post) => (
              <Post
                key={post.id}
                {...{
                  profilePhoto: post.is_brand_origin ? (post?.bb_avatar || "") : (post?.up_avatar || ""),
                  name: post.is_brand_origin ? (post?.bb_name || "") : (post?.up_name || ""),
                  username: post.is_brand_origin ? (post?.bb_username || "") : (post?.up_username || ""),
                  content: post.description,
                  images: post.image_urls,
                  logs: 0,
                  chats: post.chat_count,
                  shares: post.share_count,
                  title: post.title,
                  date: post.created_at,
                  avatars: [],
                  is_brand_origin: post.is_brand_origin,
                }}
              />
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
            {logStories.map((post) => (
              <Post
                key={post.id}
                {...{
                  profilePhoto: post.is_brand_origin ? (post?.bb_avatar || "") : (post?.up_avatar || ""),
                  name: post.is_brand_origin ? (post?.bb_name || "") : (post?.up_name || ""),
                  username: post.is_brand_origin ? (post?.bb_username || "") : (post?.up_username || ""),
                  content: post.description,
                  images: post.image_urls,
                  logs: 0,
                  chats: post.chat_count,
                  shares: post.share_count,
                  title: post.title,
                  date: post.created_at,
                  avatars: [],
                  is_brand_origin: post.is_brand_origin,
                }}
              />
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
