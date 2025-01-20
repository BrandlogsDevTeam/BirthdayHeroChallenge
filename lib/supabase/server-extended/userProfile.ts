"use server";

import { UserProfile } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

export const getSelfProfile = async () => {
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
    .from("user_profiles")
    .select()
    .eq("id", user.id)
    .single();

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  return { data };
};

export const getSelfSettings = async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: "User not found" }

  const { data, error } = await supabase.schema('bhc').from('user_settings')
    .select().eq('id', user.id).single();

  if (error) return { error: error.message }
  return { data }
}

export const updateSettings = async ({ timezone, ln }: { timezone?: string, ln?: number }) => {

  let validData: any = {}

  if (timezone) validData['timezone'] = timezone
  if (ln !== undefined) validData['log_notification'] = ln

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: "User not found" }

  const { data, error } = await supabase.schema('bhc').from('user_settings')
    .update(validData).eq('id', user.id).select().single();

  console.log({ data, error })
  if (error) return { error: error.message }
  return { data }
}

export const getPublicProfile = async (username: string) => {
  const supabase = await createClient();

  if (!username) {
    console.error("username is required");
    return { error: "username is required" };
  }

  const { data, error } = await supabase.rpc("get_user_profile", {
    user_name: username,
  });

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  return { data };
};

export const logoutUser = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  return { data: "logged out" };
};

export const uploadAvatar = async (filePath: string, file: File) => {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("public-image")
    .upload(filePath, file);

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  if (!data || !data?.path) {
    console.error(data);
    return { error: "encountered an error" };
  }

  const {
    data: { publicUrl },
  } = await supabase.storage.from("public-image").getPublicUrl(data?.path);

  if (!publicUrl) {
    console.error(data);
    return { error: "encountered an error" };
  }

  return { data: publicUrl };
};

export const updateProfile = async (data: Partial<UserProfile>) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: err,
  } = await supabase.auth.getUser();
  if (!user) {
    console.error("User not found");
    return { error: "User not found" };
  }

  if (err) {
    console.error(err);
    return { error: "encountered an error" };
  }

  let newData: Partial<UserProfile> = {
    id: user.id,
    bio: data.bio,
  };

  if (data.avatar_url && data.avatar_url !== "") {
    newData = { ...newData, avatar_url: data.avatar_url };
  }

  if (data.name && data.name !== "") {
    newData = { ...newData, name: data.name };
  }

  if (data.username && data.username !== "") {
    newData = { ...newData, username: data.username };
  }

  const { data: profileData, error } = await supabase
    .schema("bhc")
    .from("user_profiles")
    .update(newData)
    .eq("id", user.id)
    .select();

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  console.log(profileData);
  return { data: profileData };
};

export const getBirthdayHeroIndex = async (page?: number, offset?: number) => {
  console.log("bhi start", new Date().toTimeString());

  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("bhc")
    .from("user_profiles")
    .select("*")
    .order("permissiory_donations", { ascending: false, nullsFirst: false });

  console.log("bhi end  ", new Date().toTimeString());

  if (error) return { error: error.message };

  if (!data || !data.length) {
    return { error: "Encountered an error" };
  }

  return { data };
};
