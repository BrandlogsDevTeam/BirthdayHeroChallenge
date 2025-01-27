"use server";

import { LOG_STORY_ECS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { BrandProfile } from "@/lib/types";

interface BrandProps {
  id: string;
  name: string;
  username: string;
  avatar_url: string;
  location: string;
  endorsement_message: string;
}

export type BrandProfileResult =
  | { data: BrandProps; error?: undefined }
  | { data?: undefined; error: string };

export const endorseBrand = async (brand_profile: Partial<BrandProfile>) => {
  const supabase = await createClient();

  // Get the current authenticated user
  const {
    data: { user },
    error: err,
  } = await supabase.auth.getUser();
  if (!user) return { error: "User not found" };

  if (err) {
    console.error(err);
    return { error: "encountered an error" };
  }

  // Prepare the data for insertion
  const validData = {
    name: brand_profile?.name || "",
    username: brand_profile?.username || "",
    avatar_url: brand_profile?.avatar_url || "",
    brand_email: brand_profile?.brand_email || "",
    location: brand_profile?.location || "",
    phone_number: brand_profile?.phone_number || "",
    endorsement_message: brand_profile?.endorsement_message || "",
    is_accepted: false,
    is_public: false,
    primary_owner_user_id: user.id,
  };

  // Insert the brand endorsement data into Supabase
  const { data, error } = await supabase
    .schema("bhc")
    .from("brands")
    .insert([validData])
    .select("*")
    .single();

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  if (!data) {
    return { error: "Failed to create brand profile" };
  }

  // Send an email to the endorsed brand using the Lambda function
  try {
    const lambdaResponse = await fetch(process.env.NEXT_LAMBDA_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        brandName: validData.name,
        brandEmail: validData.brand_email,
        endorsementMessage: validData.endorsement_message,
      }),
    });

    if (!lambdaResponse.ok) {
      throw new Error("Failed to send email");
    }

    const lambdaData = await lambdaResponse.json();
    console.log("Email sent successfully:", lambdaData);
  } catch (emailError) {
    console.error("Error sending email:", emailError);
  }

  // Insert a log story into Supabase
  (async () => {
    const default_content =
      LOG_STORY_ECS[Math.floor(Math.random() * LOG_STORY_ECS.length)];

    await supabase
      .schema("bhc")
      .from("log_stories")
      .insert([
        {
          ...default_content,
          description:
            validData.endorsement_message || default_content.description,
          start_date: new Date("01-01-2025").toISOString(),
          end_date: new Date("12-31-2029").toISOString(),
          start_time: "00:00",
          end_time: "23:59",
          brand_origin: data.id,
          is_brand_origin: true,
        },
      ]);
  })();

  return { data };
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
    .schema("bhc")
    .from("brands")
    .select()
    .order("created_at", { ascending: false })
    .eq("primary_owner_user_id", user.id);

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  return { data };
};

export const getPublicEndorsedBrands = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("bhc")
    .from("brands")
    .select("id, name, username, avatar_url, location, endorsement_message")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  return { data };
};

export const getBrandProfile = async (
  username: string
): Promise<BrandProfileResult> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("bhc")
    .from("brands")
    .select("id, name, username, avatar_url, location, endorsement_message")
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
