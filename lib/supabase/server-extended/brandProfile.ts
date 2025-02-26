"use server";

import { LOG_STORY_ECS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import {
  AccountDBO,
  BrandProfile,
  CreateLogStoryDBO,
  LogStoryDBO,
  PublicAccountDBO,
} from "@/lib/types";
import { profile } from "console";
import { getSelfProfile } from "./userProfile";
import {
  getCachedData,
  setCachedData,
  clearCachedData,
} from "@/lib/utils/localStorage";

interface BrandProps {
  id: string;
  name: string;
  username: string;
  avatar_url: string;
  state: string;
  county: string;
  endorsement_message: string;
}

export type BrandProfileResult =
  | { data: BrandProps; error?: undefined }
  | { data?: undefined; error: string };

export const endorseBrand = async (brand_profile: Partial<BrandProfile>) => {
  if (!brand_profile.brand_email) return { error: "Missing email address" };
  const { data: profile } = await getSelfProfile();

  if (!profile || profile.account_role !== "assistant") {
    return { error: "You don't have permission to endorse brands" };
  }

  const serviceClient = await createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
  );

  // Check if the brand email already exists
  const { data: existingUser } = await serviceClient
    .from("accounts")
    .select("id, name, account_status")
    .eq("email", brand_profile.brand_email)
    .single();

  if (existingUser) {
    const status = existingUser.account_status;
    return {
      error: `${existingUser.name} has already been endorsed. Status: ${status}`,
      code: "23505",
      existingUser,
    };
  }

  // Create the user
  const {
    data: { user },
    error: authError,
  } = await serviceClient.auth.admin.createUser({
    email: brand_profile.brand_email,
  });

  if (authError) {
    console.error("Auth error:", authError);
    return {
      error: authError.message || "Failed to create user account",
      code: authError.status?.toString(),
    };
  }

  if (!user) return { error: "Unable to create user account" };

  const validData: Partial<AccountDBO> = {
    id: user.id,
    name: brand_profile?.name || "",
    username: brand_profile?.username || "",
    avatar_url: brand_profile?.avatar_url || "",
    email: brand_profile?.brand_email || "",
    state: brand_profile?.state || "",
    county: brand_profile?.county || "",
    phone: brand_profile?.phone_number || "",
    bio: brand_profile?.endorsement_message || "",
    is_private: false,
    invited_by: profile.id,
    account_status: "pending",
    account_role: "brand",
    is_brand: true,
  };

  const { data, error } = await serviceClient
    .from("accounts")
    .insert([validData])
    .select("*")
    .single();

  if (error) {
    console.error("Database error:", error);

    // Handle specific database errors
    if (error.code === "23505") {
      // Unique violation
      return {
        error: "This brand has already been endorsed",
        code: error.code,
      };
    }

    return {
      error: error.message || "Failed to create brand profile",
      code: error.code,
    };
  }

  if (!data) {
    return { error: "Failed to create brand profile" };
  }

  clearCachedData("endorsedCakeShops");

  // Insert a log story and create connections (in background)
  try {
    await Promise.all([
      (async () => {
        const content =
          LOG_STORY_ECS[Math.floor(Math.random() * LOG_STORY_ECS.length)];

        const validContent: CreateLogStoryDBO = {
          ...content,
          description: validData.bio || content.description || "",
          start_date: new Date("01-01-2025").toISOString(),
          end_date: new Date("12-31-2029").toISOString(),
          start_time: "00:00",
          end_time: "23:59",
          is_brand_log: true,
          post_by: user.id,
          is_repost: false,
          repost_of: null,
        };

        const { error: logStoryError } = await serviceClient
          .from("log_stories")
          .insert([validContent]);

        if (logStoryError) {
          console.error("Log story error:", logStoryError);
        }
      })(),

      (async () => {
        const { error } = await serviceClient.from("connections").insert([
          {
            sender_id: profile.id,
            receiver_id: user.id,
            connection_type: "cake_shop",
            connection_status: "accepted",
          },
          {
            sender_id: user.id,
            receiver_id: profile.id,
            connection_type: "cake_shop",
            connection_status: "accepted",
          },
        ]);

        if (error) {
          console.error("Connections error:", error);
        }
      })(),
    ]);
  } catch (backgroundError) {
    console.error("Background operations error:", backgroundError);
  }

  return { data, message: "Brand successfully endorsed" };
};

export const getSelfEndorsedBrands = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: err,
  } = await supabase.auth.getUser();
  if (!user) return { error: "User not found" };

  if (err) {
    console.error(err);
    return { error: "encountered an error" };
  }

  const { data, error } = await supabase
    .from("accounts")
    .select()
    .eq("invited_by", user.id)
    .eq("is_brand", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  return { data };
};

const CACHE_KEY = "endorsedCakeShops";
const CACHE_EXPIRY = 5 * 60 * 1000;

export const getPublicEndorsedBrands = async (
  offset: number,
  limit: number
): Promise<{ data: PublicAccountDBO[] }> => {
  const cachedData = getCachedData<{
    data: PublicAccountDBO[];
    timestamp: number;
  }>(CACHE_KEY);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRY) {
    console.log("Using cached data");
    return { data: cachedData.data };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("accounts_public_view")
    .select()
    .eq("is_brand", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error(error);
    return { data: [] };
  }

  setCachedData(CACHE_KEY, { data, timestamp: Date.now() });

  return { data };
};

export const getTotalCakeShopsCount = async () => {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("accounts_public_view")
    .select("*", { count: "exact", head: true }) // Using `head: true` to only get the count
    .eq("is_brand", true);

  if (error) {
    console.error(error);
    return { error: "Encountered an error fetching count" };
  }

  return { count: count || 0 };
};

export const getBrandProfile = async (
  username: string
): Promise<BrandProfileResult> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("bhc")
    .from("brands")
    .select(
      "id, name, username, avatar_url, state, county, endorsement_message"
    )
    .eq("username", username)
    .single();

  if (error) {
    console.error(error);
    return { error: "Could not fetch profile" };
  }

  return { data: data as BrandProps };
};

export const getPublicBrandProfile = async (username: string) => {
  const supabase = await createClient();

  if (!username) {
    console.error("Username is required");
    return { error: "Username is required" };
  }

  const { data, error } = await supabase
    .schema("bhc")
    .from("brands")
    .select("*")
    .eq("username", username)
    .single();

  if (error) {
    console.error("Could not fetch profile");
    return { error: "Could not fetch profile" };
  }

  return { data };
};

export async function updateBrandProfile(brandData: Partial<BrandProfile>) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("brands")
    .update({
      name: brandData.name,
      username: brandData.username,
      avatar_url: brandData.avatar_url,
      endorsement_message: brandData.endorsement_message,
      updated_at: new Date().toISOString(),
    })
    .eq("id", brandData.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating brand profile: ${error.message}`);
  }

  return { data, error: null };
}
