"use server";

import { createClient } from "../server";
import { addNominationChat, createRepost } from "./log-stories";

interface NominationData {
  username: string;
  email: string;
  metadata: {
    name: string;
    avatar_url: string;
    inviting_brand?: string;
    [key: string]: any;
  };
}

interface NominationResponse {
  data?: any;
  error?: string | null;
}

export async function createNomination(
  data: NominationData
): Promise<NominationResponse> {
  const supabase = await createClient();

  if (
    !data.username ||
    !data.email ||
    !data.metadata?.name ||
    !data.metadata?.avatar_url
  ) {
    return {
      error:
        "Invalid input data: username, email, name, or avatar_url is missing",
    };
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return { error: authError?.message || "User not found" };
  }

  const { data: uP, error: profileError } = await supabase
    .schema("bhc")
    .from("user_profiles")
    .select("user_role")
    .eq("id", user.id)
    .single();

  if (profileError || !uP || uP.user_role !== "assistant") {
    return { error: profileError?.message || "Operation not permitted" };
  }

  const { data: nomination, error: nominationError } = await supabase
    .schema("bhc")
    .from("invitations")
    .insert([
      {
        username: data.username,
        email: data.email,
        metadata: data.metadata,
        invitation_type: "one_time",
      },
    ])
    .select("*")
    .single();

  if (nominationError) {
    return { error: nominationError.message };
  }

  // Adding nomination chat
  if (data.metadata?.inviting_brand) {
    try {
      await addNominationChat(data.metadata.inviting_brand, data.username);
    } catch (error) {
      console.error("Failed to add nomination chat:", error);
    }
  }

  // Fetch brand story
  const { data: brandStory, error: brandStoryError } = await supabase
    .schema("bhc")
    .from("log_stories")
    .select("*")
    .eq("brand_origin", data.metadata.inviting_brand)
    .eq("is_brand_origin", true)
    .single();

  if (brandStoryError || !brandStory) {
    console.error(
      "Error fetching brand's original story:",
      brandStoryError?.message || "No log story found"
    );
  } else {
    // Create repost
    const repostData = {
      original_story_id: brandStory.id,
      title: brandStory.title,
      description: `We're excited to welcome @(${data.username}) to the Birthday Hero Challenge! 🎉`,
      image_urls: [data.metadata.avatar_url],
      start_date: brandStory.start_date,
      end_date: brandStory.end_date,
    };

    const { error: repostError } = await createRepost(repostData);
    if (repostError) {
      console.error("Failed to create repost:", repostError);
    }
  }

  return { data: nomination, error: null };
}

export async function getNomination() {
  const supabase = await createClient();

  const {
    data: { user },
    error: err,
  } = await supabase.auth.getUser();
  if (!user) return { error: "User not found" };

  const { data: uP } = await supabase
    .schema("bhc")
    .from("user_profiles")
    .select("user_role")
    .eq("id", user.id)
    .single();

  if (!uP || uP.user_role !== "assistant") {
    return { error: "Operation not permitted" };
  }

  const { data, error } = await supabase
    .schema("bhc")
    .from("invitations")
    .select("*")
    .eq("invited_by_user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return { error: error.message };
  }

  return { data };
}

export async function getPublicNominations() {
  const supabase = await createClient();

  const {
    data: { user },
    error: err,
  } = await supabase.auth.getUser();
  if (!user) return { error: "User not found" };

  const { data, error } = await supabase
    .schema("bhc")
    .from("invitations")
    .select("*")
    .eq("invitation_role", "user")
    .order("created_at", { ascending: false });

  if (error) {
    return { error: error.message };
  }

  return { data };
}
