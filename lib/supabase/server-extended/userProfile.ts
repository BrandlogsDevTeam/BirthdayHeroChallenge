"use server";

import {
  AccountDBO,
  AccountSettingsDBO,
  PublicAccountDBO,
  UserProfile,
} from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import { SearchHistoryItem } from "@/app/components/search";

export const getSelfProfile = async (): Promise<{
  data?: AccountDBO;
  error?: string;
}> => {
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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "User not found" };

  const { data, error } = await supabase
    .from("account_settings")
    .select()
    .eq("id", user.id)
    .single();

  if (error) return { error: error.message };
  return { data: data as AccountSettingsDBO };
};

export const updateSettings = async ({
  timezone,
  ln,
}: {
  timezone?: string;
  ln?: string;
}) => {
  const validData: any = {};

  if (timezone) validData["timezone"] = timezone;
  if (ln !== undefined) validData["log_notification"] = ln;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "User not found" };

  const { data, error } = await supabase
    .from("account_settings")
    .update(validData)
    .eq("id", user.id)
    .select()
    .single();

  if (error) return { error: error.message };
  return { data };
};

export const fetchSearchHistory = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "User not found" };

  const { data, error } = await supabase
    .from("account_settings")
    .select("search_history")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error(error);
    console.log("Could not fetch search history");
  }

  const searchHistory = data?.search_history || [];
  const sortedHistory = searchHistory.sort(
    (a: { timestamp: string }, b: { timestamp: string }) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return { sortedHistory };
};

export const saveSearchHistory = async (searchQuery: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "User not found" };

  const { data: currentSettings, error: fetchError } = await supabase
    .from("account_settings")
    .select("search_history")
    .eq("id", user.id)
    .single();

  if (fetchError) {
    console.error(fetchError);
    return { error: "Could not save search history" };
  }

  const currentHistory = currentSettings?.search_history || [];
  const newHistoryItem: SearchHistoryItem = {
    query: searchQuery,
    timestamp: new Date().toISOString(),
  };

  const updatedHistory = [newHistoryItem, ...currentHistory]
    .filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.query === item.query)
    )
    .slice(0, 20);

  // Update the settings
  const { error: updateError } = await supabase
    .from("account_settings")
    .upsert({
      id: user.id,
      search_history: updatedHistory,
    })
    .eq("id", user.id);

  return { updatedHistory, error: updateError };
};

export const getPublicProfile = async (username: string) => {
  const supabase = await createClient();

  if (!username) {
    console.error("username is required");
    return { error: "username is required" };
  }

  const { data, error } = await supabase
    .from("accounts")
    .select("id")
    .eq("username", username)
    .single();

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  if (!data || !data.id) {
    console.error("account not found");
    return { error: "account not found" };
  }

  const { data: accountData, error: accountError } = await supabase.rpc(
    "rpc_get_account_info",
    {
      account_id: data.id,
    }
  );

  if (accountError) {
    console.error(accountError);
    return { error: "encountered an error" };
  }

  return { data: accountData as PublicAccountDBO };
};

export const getPublicProfileByID = async (user_id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("rpc_get_account_info", {
    account_id: user_id,
  });

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  return { data: data as PublicAccountDBO };
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

export const uploadImage = async (filePath: string, file: File) => {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("uploads")
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
  } = await supabase.storage.from("uploads").getPublicUrl(data?.path);

  if (!publicUrl) {
    console.error(data);
    return { error: "encountered an error" };
  }

  return { data: publicUrl };
};

export const updateProfile = async (data: Partial<AccountDBO>) => {
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

  let newData: any = {
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
    .from("accounts")
    .update(newData)
    .eq("id", user.id)
    .select();

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  return { data: profileData };
};

export const getBirthdayHeroIndex = async (
  viewer_id: string | null = null,
  limit: number = 1000,
  offset: number = 0
) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("rpc_get_birthday_heroes_index", {
    viewer_id: viewer_id,
    limit_count: limit,
    offset_count: offset,
  });

  if (error) return { error: error.message };

  return { data: data as PublicAccountDBO[] };
};

export const getUserNotifications = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return { error: error.message };
  return { data };
};

export const generateMockNotification = async (user_id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("notifications").insert([
    {
      user_id,
      content: { message: "Lorem Ipsum" },
      type: "text",
    },
  ]);

  if (error) return { error: error.message };
  return { data };
};

export const readUserNotifications = async (notification_id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notifications")
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq("id", notification_id);
  if (error) return { error: error.message };
  return { data };
};

export const requestOTP = async (email: string) => {
  const supabase = await createClient();
  return supabase.auth.resetPasswordForEmail(email);
};

export const verifyOTP = async (email: string, otp: string) => {
  const supabase = await createClient();
  return supabase.auth.verifyOtp({ email, token: otp, type: "email" });
};

export const updatePassword = async (new_password: string) => {
  const supabase = await createClient();
  return supabase.auth.updateUser({
    password: new_password,
  });
};

export const getAssistantProfile = async () => {
  const supabase = await createClient();

  try {
    const { data: user, error: authError } = await getSelfProfile();
    if (authError || !user) {
      console.error("Auth Error:", authError || "No user found");
      return { error: "Authentication required" };
    }

    const { data: profile, error: Error } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", user.id)
      .single();

    if (Error) {
      console.error("Profile Error:", Error);
      return { error: "User account not found" };
    }

    if (!profile.invited_by) {
      return { error: "No assistant assigned" };
    }

    const { data, error } = await supabase
      .from("accounts")
      .select("id, name, avatar_url, username, admin_id")
      .eq("id", profile.invited_by)
      .single();

    if (error) {
      console.error("Assistant Profile Error:", error);
      return { error: "Assistant Profile not found" };
    }

    return { data };
  } catch (err) {
    console.error(err);
    return { error: "Unexpected error occurred" };
  }
};

export type DonationsTotalResponse = {
  total: number;
  error?: string;
};

export const getTotalPromissoryDonations =
  async (): Promise<DonationsTotalResponse> => {
    const supabase = await createClient();

    // Notice the corrected column name (permissory not permissiory) and proper syntax
    const { data, error } = await supabase
      .from("accounts")
      .select("permissiory_donations")
      .then((result) => {
        if (result.error) throw result.error;

        // Sum the values manually since we're getting all rows
        const total = result.data.reduce(
          (sum, row) => sum + (row.permissiory_donations || 0),
          0
        );

        return { data: { total }, error: null };
      });

    if (error) {
      console.error("Error fetching lifetime donations:", error);
      return { total: 0, error: "Failed to fetch lifetime donations" };
    }

    return { total: Number(data.total) || 0 };
  };
