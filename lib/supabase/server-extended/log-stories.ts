"use server";

import { createClient } from "@/lib/supabase/server";
import { LogStory, PublicLogStory } from "@/lib/types";
import { error } from "console";

export const createLogStory = async (story: Partial<LogStory>) => {
  const supabase = await createClient();

  if (!story.end_date && story.story_type === "single_day") {
    story.end_date = story.start_date
  }

  const validStory: Partial<LogStory> = {
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

export const getAllLogStories = async (user_id?: string) => {
  const supabase = await createClient();
  const
    { data, error } = await supabase
      .schema('bhc')
      .rpc('get_all_log_stories',)

  if (error) {
    console.error(error);
    return { error: "Failed to fetch log stories" };
  }

  return { data: data, error: null };
};


export const likeLogStory = async (log_story_id: string, liked?: boolean) => {
  const supabase = await createClient();

  if (!liked) {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user)
      return { error: 'User not found' }

    const { error } = await supabase
      .schema("bhc")
      .from("ls_likes_tracker")
      .delete().eq('log_story_id', log_story_id).eq('user_id', user.id)

    if (error)
      return { error: error.message }

    return { data: 'OK' }

  } else {
    const { data, error } = await supabase
      .schema("bhc")
      .from("ls_likes_tracker")
      .insert([{
        log_story_id: log_story_id,
      }])
      .select();

    console.log({ data, error })

    if (error)
      return { error: error.message }

    if (data)
      return { data: 'OK' }

    return { data, error: "Unknown ERROR" }
  }
}

export const shareLogStory = async (log_story_id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("bhc")
    .from("ls_shares_tracker")
    .insert([{
      log_story_id,
    }])
    .select();

  if (error)
    return { error: error.message }

  return { data }

}