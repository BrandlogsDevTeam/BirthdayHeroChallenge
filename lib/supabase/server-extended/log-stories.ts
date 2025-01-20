"use server";

import { createClient } from "@/lib/supabase/server";
import { LogStory, PublicLogStory } from "@/lib/types";

export const createLogStory = async (story: Partial<LogStory>) => {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error("Auth Error:", authError || "No user found");
      return { error: "Authentication required" };
    }

    console.log("Current user ID:", user.id);

    const validStory = {
      title: story.title,
      description: story.description || null,
      image_urls: story.image_urls?.length ? story.image_urls : null,
      story_type: story.isMultiDay ? "multi_day" : "single_day",
      start_date: story.start_date,
      end_date: story.end_date || story.start_date,
      start_time: story.start_time || "00:00:00",
      end_time: story.end_time || "23:59:59",
    };

    console.log("Attempting database insert with payload:", validStory);

    const { data, error: insertError } = await supabase
      .schema("bhc")
      .from("log_stories")
      .insert([validStory])
      .select("*")
      .single();

    if (insertError) {
      console.error("Insert Error:", insertError);
      return { error: insertError.message, details: insertError };
    }

    if (!data) {
      console.error("No data returned from insert");
      return { error: "Insert failed - no data returned" };
    }

    console.log("Insert successful, returned data:", data);
    return { data };
  } catch (error) {
    console.error("Create Log Story Error:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
      details: error,
    };
  }
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

export const getLogStory = async (id: string, user_id?: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("bhc")
    .rpc('get_full_log_story', { story_id: id })

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  if (!data) {
    console.log("story not found for id ==>", id)
    return { data: null }
  }

  console.log({ data })

  return { data }
}

export const getAllLogStories = async (user_id?: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("bhc")
    .rpc("get_all_log_stories");

  if (error) {
    console.error(error);
    return { error: "Failed to fetch log stories" };
  }

  return { data: data, error: null };
};

export const likeLogStory = async (log_story_id: string, liked: boolean) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("bhc")
    .rpc("new_like_rpc", { ls_id: log_story_id, liked });

  if (error) return { error: error.message };
  return { data };
};

export const shareLogStory = async (log_story_id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("bhc")
    .rpc("new_share_rpc", { ls_id: log_story_id });

  if (error) return { error: error.message };

  return { data };
};
