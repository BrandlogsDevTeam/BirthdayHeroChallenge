"use server";

import { createClient } from "@/lib/supabase/server";
import { LogStory } from "@/lib/types";

export const createLogStory = async (story: Partial<LogStory>) => {
  const supabase = await createClient();

  let validStory: Partial<LogStory> = {
    title: story.title || "",
    description: story.description || "",
    image_urls: story.image_urls?.splice(0, 5) || [],
    story_type: story.story_type,
    start_date: story.start_date,
    end_date: story.end_date,
    start_time: story.start_time,
    end_time: story.end_time,
  };

  const { data, error } = await supabase
    .schema("bhc")
    .from("log_stories")
    .insert([validStory])
    .select();

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  return { data };
};

export const createDefaultLogStory = async () => {
  return { error: "not implemented" };
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("bhc")
    .from("log_stories")
    .insert([
      {
        title: "Welcome to your second log story!",
        description:
          "This is a sample log story. You can edit this story to add your own content.",
        image_urls: ["https://randomuser.me/api/portraits/men/78.jpg"],
        story_type: "single_day",
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        start_time: "00:00",
        end_time: "23:59",
      },
    ])
    .select();

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  console.log(data);
  return { data };
};

export const getUserLogStories = async (user_id?: string) => {
  const supabase = await createClient();

  if (!user_id) {
    const {
      data: { user },
      error: err,
    } = await supabase.auth.getUser();
    if (!user) return { error: "User not found" };

    if (err) {
      console.error(err);
      return { error: "encountered an error" };
    }

    user_id = user.id;
  }

  const { data, error } = await supabase
    .schema("bhc")
    .from("log_stories")
    .select()
    .eq("original_post_by", user_id);

  if (error) {
    console.error(error);
    return { error: "Failed to fetch log stories" };
  }

  console.log(data);

  return { data };
};

interface LogStoryProps {
  profilePhoto: string;
  name: string;
  username: string;
  content: string;
  images: string[];
  logs: number;
  chats: number;
  shares: number;
  title: string;
  date: string;
  avatars: { src: string; alt: string }[];
}

export const getAllLogStories = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("bhc")
    .from("log_stories")
    .select();

  if (error) {
    console.error(error);
    return { error: "Failed to fetch log stories" };
  }

  console.log(data);

  return { data: data as LogStoryProps[], error: null };
};
