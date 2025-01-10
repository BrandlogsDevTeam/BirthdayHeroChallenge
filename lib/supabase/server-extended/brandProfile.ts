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
  };

    const { data, error } = await supabase.schema('bhc').from('brands').insert([validData]).select('id')

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

    console.log(data, error)

    
    if (!data) {
        return { error: "Failed to create brand profile" }
    }

    // create a default log story for the brand
    (async () => {
        const { data: ls, error } = await supabase
            .schema("bhc")
            .from("log_stories")
            .insert([{
                title: "Birthday Hero Challenge",
                description: "Welcome to the age of hunger liberation! Redefining hunger philanthropy for 8 billion people!",
                image_urls: ["https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday1.jpg"],
                story_type: "multi_day",
                start_date: new Date('01-01-2025').toISOString(),
                end_date: new Date('12-31-2029').toISOString(),
                start_time: "00:00",
                end_time: "23:59",
                brand_origin: data[0].id,
                is_brand_origin: true
            }]);
    })()
    
    return { data }
}



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

  const { data, error } = await supabase.schema("bhc").from("brands").select().eq("primary_owner_user_id", user.id);

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
