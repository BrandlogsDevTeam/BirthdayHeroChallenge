"use server";

import { createClient } from "@/lib/supabase/server";
import { LogStory, PublicLogStory } from "@/lib/types";

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
