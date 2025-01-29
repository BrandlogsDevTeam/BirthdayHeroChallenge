"use server";

import { createClient } from "@/lib/supabase/server";
import { ChatType, LogStory, PublicLogStory } from "@/lib/types";

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
    .eq("original_post_by", user_id)
    .eq("is_brand_origin", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return { error: "Failed to fetch log stories" };
  }

  return { data };
};

export const getSelectedLogStory = async (id: string) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Auth Error:", authError || "No user found");
    return { data: null, error: "Authentication required" };
  }

  // First get the log story
  const { data: logStory, error: logError } = await supabase
    .schema("bhc")
    .from("log_stories")
    .select("*")
    .eq("id", id)
    .single();

  if (logError) {
    console.error("Fetch Error:", logError);
    return { data: null, error: logError.message };
  }

  // Get the user profile for the original poster
  const { data: userProfile, error: userError } = await supabase
    .schema("bhc")
    .from("user_profiles")
    .select("*")
    .eq("id", logStory.created_by)
    .single();

  if (userError) {
    console.error("User Profile Error:", userError);
    return { data: null, error: userError.message };
  }

  // Transform the data to match your Post component props
  const transformedData = {
    id: logStory.id,
    profilePhoto: userProfile.avatar_url,
    name: userProfile.full_name,
    username: userProfile.username,
    content: logStory.description,
    images: logStory.image_urls,
    likes: logStory.like_count,
    chats: logStory.chat_count,
    shares: logStory.share_count,
    title: logStory.title,
    date: logStory.start_date,
    avatars: [], // Add avatars if needed
    is_brand_origin: logStory.is_brand_origin,
    is_repost: logStory.is_repost,
    post: logStory,
    original_post_by: logStory.original_post_by,
    brand_origin: logStory.brand_origin || "",
  };

  return { data: transformedData, error: null };
};

export const getBrandLogStories = async (brand_id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("bhc")
    .from("log_stories")
    .select()
    .eq("brand_origin", brand_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return { error: "Failed to fetch log stories" };
  }

  return { data };
};

export const getLogStory = async (id: string, user_id?: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("bhc")
    .rpc("get_full_log_story", { story_id: id });

  if (error) {
    console.error(error);
    return { error: error.message };
  }

  if (!data) {
    console.log("story not found for id ==>", id);
    return { data: null };
  }

  console.log({ data });

  return { data };
};

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

export const getRecentChats = async (
  log_story_id: string,
  type: ChatType,
  preTS: Date,
  postTS: Date,
  limit: number = 20,
  offset: number = 0
) => {
  const supabase = await createClient();

  const { data, error } = await supabase.schema("bhc").rpc("get_comments", {
    ls_id: log_story_id,
    ls_type: type,
    prets: preTS.toISOString(),
    postts: postTS.toISOString(),
    limit_count: limit,
    offset_count: offset,
  });

  if (error) return { error: error.message };

  return { data };
};

export const addChat = async (
  log_story_id: string,
  content: string,
  parent_id: string | null = null
) => {
  const validChat = {
    log_story_id,
    content,
    parent_id,
  };
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("bhc")
    .from("ls_comments")
    .insert([validChat])
    .select();

  console.log({ data, error });
  if (error) return { error: error.message };

  return { data };
};

export const fetchChatBacks = async (parent_id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("bhc")
    .from("ls_comments")
    .select("*")
    .eq("parent_id", parent_id)
    .order("created_at", { ascending: true });

  if (error) return { error: error.message };

  return { data };
};

export const addNominationChat = async (brand_id: string, username: string) => {
  const supabase = await createClient();
  const { data: ls } = await supabase
    .schema("bhc")
    .from("log_stories")
    .select("id")
    .eq("brand_origin", brand_id)
    .order("created_at", { ascending: true })
    .single();

  if (!ls || !ls?.id) return { error: "Brand log story not found" };

  const validChat = {
    log_story_id: ls.id,
    content: `Welcome ${username} to the age of hunger liberation!`,
    parent_id: null,
    user_id: null,
  };
  const { data, error } = await supabase
    .schema("bhc")
    .from("ls_comments")
    .insert([validChat])
    .select();

  console.log({ data, error });
  if (error) return { error: error.message };

  return { data };
};

interface RepostData {
  title: string;
  description: string | null;
  image_urls: string[];
  original_story_id: string;
  start_date: string;
  end_date: string;
  start_time?: string;
  end_time?: string;
}

export const createRepost = async (repostData: RepostData) => {
  const supabase = await createClient();

  try {
    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Auth Error:", authError || "No user found");
      return { error: "Authentication required" };
    }

    // Get original story to copy relevant fields
    const { data: originalStory, error: fetchError } = await supabase
      .schema("bhc")
      .from("log_stories")
      .select("*")
      .eq("id", repostData.original_story_id)
      .single();

    if (fetchError || !originalStory) {
      console.error("Fetch Error:", fetchError);
      return { error: "Failed to fetch original story" };
    }

    // Prepare repost data
    const validRepost = {
      title: repostData.title,
      description: repostData.description,
      image_urls: repostData.image_urls,
      story_type: originalStory.story_type,
      start_date: repostData.start_date || originalStory.start_date,
      end_date: repostData.end_date || originalStory.end_date,
      start_time: repostData.start_time || originalStory.start_time,
      end_time: repostData.end_time || originalStory.end_time,
      is_repost: true,
      repost_of: repostData.original_story_id,
      created_by: user.id,
      brand_origin: originalStory.brand_origin,
      is_brand_origin: originalStory.is_brand_origin,
      original_post_by:
        originalStory.original_post_by || originalStory.created_by,
    };

    console.log("Attempting to create repost with payload:", validRepost);

    // Insert repost
    const { data: newRepost, error: insertError } = await supabase
      .schema("bhc")
      .from("log_stories")
      .insert([validRepost])
      .select("*")
      .single();

    if (insertError) {
      console.error("Insert Error:", insertError);
      return { error: insertError.message, details: insertError };
    }

    if (!newRepost) {
      console.error("No data returned from insert");
      return { error: "Insert failed - no data returned" };
    }

    // Update repost count on original story
    const { error: updateError } = await supabase
      .schema("bhc")
      .from("log_stories")
      .update({
        repost_count: originalStory.repost_count + 1,
      })
      .eq("id", repostData.original_story_id);

    if (updateError) {
      console.error("Failed to update repost count:", updateError);
      // Don't return here as the repost was still created successfully
    }

    console.log("Repost created successfully:", newRepost);
    return { data: newRepost };
  } catch (error) {
    console.error("Create Repost Error:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
      details: error,
    };
  }
};

export const uploadRepostImages = async (files: File[]) => {
  const supabase = await createClient();
  const uploadedUrls: string[] = [];

  try {
    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `public-image/${fileName}`;

      const { data, error } = await supabase.storage
        .from("public-image") // replace with your bucket name
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      const { data: publicUrl } = supabase.storage
        .from("public-image") // replace with your bucket name
        .getPublicUrl(filePath);

      uploadedUrls.push(publicUrl.publicUrl);
    }

    return { data: uploadedUrls };
  } catch (error) {
    console.error("Image upload error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to upload images",
    };
  }
};
