"use server";

import { createClient } from "@/lib/supabase/server";
import { LogStory, PublicLogStory } from "@/lib/types";

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

export const getAllLogStories = async () => {
  const supabase = await createClient();

  // Original SQL QUERY ->
  //   select ls.*, 
  //      up.name as up_name,
  //      up.username as up_username,
  //      up.avatar_url as up_avatar,
  //      bb.name as bb_name,
  //      bb.username as bb_username,
  //      bb.avatar_url as bb_avatar,
  //      bb.is_accepted as bb_accepted
  //   from bhc.log_stories ls 
  //     left join bhc.user_profiles up on up.id = ls.original_post_by
  //     left join bhc.brands bb on bb.id = ls.brand_origin; 

  const
    { data, error } = await supabase
      .schema('bhc')
      .rpc('get_all_log_stories')

  if (error) {
    console.error(error);
    return { error: "Failed to fetch log stories" };
  }

  return { data: data as PublicLogStory[], error: null };
};


export const likeLogStory = async (log_story_id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("bhc")
    .from("ls_likes_tracker")
    .insert([{
      log_story_id,
    }])
    .select();

  if (error)
    return { error: error.message }

  return { data }

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