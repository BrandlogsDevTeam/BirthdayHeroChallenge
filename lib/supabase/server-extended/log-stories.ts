"use server";

import { createClient } from "@/lib/supabase/server";
import {
  ChatType,
  ChatWithUserDBO,
  CreateLogStoryDBO,
  LogStory,
  LogStoryDBO,
  LogStoryDetailsDBO,
  PublicLogStory,
} from "@/lib/types";
import { getSelfProfile } from "./userProfile";

export const createLogStory = async (story: CreateLogStoryDBO) => {
  const supabase = await createClient();

  if (
    !story.title ||
    !story.description ||
    !story.image_urls ||
    !story.start_date ||
    !story.end_date ||
    !story.start_time ||
    !story.end_time
  ) {
    return { error: "Missing required fields" };
  }

  try {
    const { data: user, error: authError } = await getSelfProfile();
    if (authError || !user) {
      console.error("Auth Error:", authError || "No user found");
      return { error: "Authentication required" };
    }

    const validStory: CreateLogStoryDBO = {
      is_brand_log: user.is_brand,
      post_by: user.id,
      title: story.title,
      description: story.description,
      image_urls: story.image_urls,
      start_date: story.start_date,
      end_date: story.end_date,
      start_time: story.start_time,
      end_time: story.end_time,
      is_repost: story.is_repost,
      repost_of: story.repost_of,
    };

    // console.log("Attempting database insert with payload:", validStory);

    const { data, error: insertError } = await supabase
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

    // console.log("Insert successful, returned data:", data);
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

export const createRepostAssist = async (story: CreateLogStoryDBO) => {
  const supabase = await createClient();

  if (
    !story.title ||
    !story.description ||
    !story.image_urls ||
    !story.start_date ||
    !story.end_date ||
    !story.start_time ||
    !story.end_time
  ) {
    return { error: "Missing required fields" };
  }

  try {
    const validStory: CreateLogStoryDBO = {
      is_brand_log: story.is_brand_log,
      post_by: story.post_by,
      title: story.title,
      description: story.description,
      image_urls: story.image_urls,
      start_date: story.start_date,
      end_date: story.end_date,
      start_time: story.start_time,
      end_time: story.end_time,
      is_repost: story.is_repost,
      repost_of: story.repost_of,
    };

    // console.log("Attempting database insert with payload:", validStory);

    const { data, error: insertError } = await supabase
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

    // console.log("Insert successful, returned data:", data);
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

export const getUserLogStories = async (
  user_id?: string,
  viewer_id: string | null = null,
  limit: number = 10,
  offset: number = 0
) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("rpc_get_log_stories_by_account", {
    account_id: user_id,
    viewer_id,
    limit_count: limit,
    offset_count: offset,
  });

  if (error) {
    console.error(error);
    return { error: "Failed to fetch log stories" };
  }

  return { data };
};

export const getSelectedLogStory = async (
  id: string,
  viewer_id: string | null = null
) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("rpc_get_log_story", {
    log_story_id: id,
    viewer_id,
  });

  if (error) {
    console.error(error);
    return { error: "Failed to fetch log story" };
  }

  return { data };
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

export const getLogStory = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("rpc_get_log_story", {
    log_story_id: id,
  });

  if (error) {
    console.error(error);
    return { error: error.message };
  }

  if (!data) {
    console.log("story not found for id ==>", id);
    return { data: null };
  }

  return { data };
};

export const getAllLogStories = async (
  limit: number = 10,
  offset: number = 0
) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("rpc_get_log_stories", {
    limit_count: limit,
    offset_count: offset,
  });

  if (error) {
    console.error(error);
    return { error: "Failed to fetch log stories" };
  }

  return { data: data as LogStoryDetailsDBO[], error: null };
};

export const getStoryForRepost = async (account_id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("log_stories")
    .select("*")
    .eq("post_by", account_id)
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error(error);
    return { error: "Failed to fetch story for repost" };
  }

  return { data: data as LogStoryDBO };
};

export const likeLogStory = async (log_story_id: string, liked: boolean) => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("rpc_add_remove_like", {
    ls_id: log_story_id,
    add_like: liked,
  });

  if (error) return { error: error.message };
  return {
    data: data as {
      new_like_count: number;
      is_liked: boolean;
    },
  };
};

export const shareLogStory = async (log_story_id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("rpc_new_share", {
    ls_id: log_story_id,
  });

  if (error) return { error: error.message };

  return { data };
};

export const getRecentChats = async (
  log_story_id: string,
  type: ChatType,
  preTS: Date,
  postTS: Date,
  parent_id_filter: string | null,
  limit: number = 20,
  offset: number = 0
) => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("rpc_get_recent_chats", {
    ls_id: log_story_id,
    chat_type: type,
    pre_timestamp: preTS.toISOString(),
    post_timestamp: postTS.toISOString(),
    parent_id_filter: parent_id_filter,
    limit_count: limit,
    offset_count: offset,
  });

  if (error) return { error: error.message };

  return { data: data as ChatWithUserDBO[] };
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
    .from("ls_comments")
    .insert([validChat])
    .select();

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

  // console.log({ data, error });
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
