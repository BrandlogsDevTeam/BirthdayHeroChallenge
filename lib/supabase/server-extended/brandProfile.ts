"use server";

import { createClient } from "@/lib/supabase/server";
import { BrandProfile } from "@/lib/types";

export const endorseBrand = async (brand_profile: Partial<BrandProfile>) => {
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

  let validData = {
    name: brand_profile?.name || "",
    username: brand_profile?.username || "",
    avatar_url: brand_profile?.avatar_url || "",
    brand_email: brand_profile?.brand_email || "",
    location: brand_profile?.location || "",
    phone_number: brand_profile?.phone_number || "",
    endorsement_message: brand_profile?.endorsement_message || "",
    is_accepted: false,
    is_public: false,
  };

  const { data, error } = await supabase
    .schema("bhc")
    .from("brands")
    .insert([validData]);

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  console.log(data, error);

  if (!data) {
    return { error: "Failed to create brand profile" };
  }

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

  const { data, error } = await supabase.schema("bhc").from("brands").select();

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
    .select("id, name, username, avatar_url, location, endorsement_message");

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  return { data };
};
