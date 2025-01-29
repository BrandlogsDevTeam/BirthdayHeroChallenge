"use server";

import { createClient } from "../server";
import { addNominationChat, createRepost } from "./log-stories";

export async function createNomination(data: {
  username: string;
  email: "";
  metadata: {
    name: string;
    avatar_url: string;
    [key: string]: any;
  };
}) {
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

  console.log("meta", data);
  const { data: nomination, error } = await supabase
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

  if (error) throw error;

  if (data.metadata?.inviting_brand)
    await addNominationChat(data.metadata.inviting_brand, data.username);

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

  return nomination;
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
