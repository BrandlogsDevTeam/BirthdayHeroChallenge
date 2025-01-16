"use server";
import {
  generateUniqueUsername,
  getNextOccurrence,
  validateEmail,
} from "@/lib/utils";
import { createClient } from "@supabase/supabase-js";

export const checkEmailExists = async (
  email: string
): Promise<{ exists?: boolean; error?: string }> => {
  if (!validateEmail(email)) {
    return { error: "Please enter a valid email id" };
  }

  const serviceClient = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
  );

  const { data, error } = await serviceClient
    .schema("bhc")
    .rpc("check_user_exists", { mail_id: email });

  return { exists: !data, error: error?.message };
};

export const signUpRequest = async (
  email: string,
  password: string,
  termsAccepted: boolean,
  user_meta: {
    instagramHandle: string;
    gender: string;
    birthDate: string;
  }
) => {
  if (!termsAccepted) return { error: "Terms not accepted" };

  const serviceClient = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
  );

  const { data: inv, error: err } = await serviceClient
    .schema("bhc")
    .from("invitations")
    .select("*")
    .eq("username", user_meta.instagramHandle);

  if (err) {
    console.error(err);
    return { error: "encountered an error" };
  }

  if (
    !inv ||
    !inv.length ||
    !inv[0]?.metadata?.email ||
    inv[0]?.metadata?.email !== email
  ) {
    return { error: "Invitation not found" };
  }

  const { data, error } = await serviceClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        termsAcceptedAt: new Date().toISOString(),
        user_meta,
      },
    },
  });

  return { data, error: error?.message };
};

export const signUpOTPRequest = async (email: string, otp: string) => {
  const serviceClient = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
  );

  const { data, error } = await serviceClient.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });

  if (!data.user || !data.session || error) {
    console.error(data, error);
    return { data, error: error?.message };
  }
  populateUserProfile(data.user.id);
  return { data };
};

const populateUserProfile = async (id: string) => {
  const serviceClient = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
  );

  const { data, error } = await serviceClient.auth.admin.getUserById(id);

  if (!data?.user) return;

  const user_metadata = data.user.user_metadata;
  const username = user_metadata?.user_meta?.instagramHandle || "";

  if (!username) return;

  let role = "user";
  let avatar_url = "";
  let name = "";

  const { data: inv, error: err } = await serviceClient
    .schema("bhc")
    .from("invitations")
    .select("*")
    .eq("username", username);

  if (err) {
    console.error(error);
  }

  if (inv && inv.length) {
    if (inv[0]?.metadata?.email === data.user.email)
      role = inv[0]?.invitation_role || "user";

    avatar_url = inv[0]?.metadata?.avatar_url || "";
    name = inv[0]?.metadata?.name || username;
  }

  (async () => {
    await serviceClient
      .schema("bhc")
      .from("user_profiles")
      .insert({
        avatar_url,
        name,
        username,
        bio: "",
        can_invite_users: false,
        id: data.user.id,
        is_private: false,
        terms_accepted_at:
          user_metadata.termsAcceptedAt || new Date().toISOString(),
        public_metadata: user_metadata,
      });
  })();

  (async () => {
    // Assign the user_role from invitations
    const { data: res, error } = await serviceClient
      .schema("bhc")
      .rpc("update_user_role", {
        uid: data.user.id,
        u_role: role,
      });

    console.log("update role", res, error);
    if (error) {
      console.error(error);
      return;
    }
  })();

  (async () => {
    if (inv && inv.length && inv[0]?.id) {
      const res = await serviceClient
        .schema("bhc")
        .from("invitations")
        .delete()
        .eq("id", inv[0].id);

      console.log("delete", res);
      return;
    }
  })();

  (async () => {
    const dob = getNextOccurrence(
      new Date(user_metadata?.user_meta?.birthDate || new Date())
    );
    const { data: d, error } = await serviceClient
      .schema("bhc")
      .from("log_stories")
      .insert([
        {
          title: "Birthday Log Story",
          description: `Hey guys! I can't wait for my birthday this year as I impact lives through Birthday Hero Challenge.`,
          image_urls: [
            "https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday1.jpg",
          ],
          story_type: "single_day",
          start_date: dob.toISOString(),
          end_date: dob.toISOString(),
          start_time: "00:00",
          end_time: "23:59",
          original_post_by: data.user.id,
        },
      ]);
    console.log("log story", d, error);
    return;
  })();

  return;
};

export const getProfile = async (username: string) => {
  const serviceClient = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
  );
  const { data, error } = await serviceClient
    .schema("public")
    .rpc("get_user_profile", { user_name: username });

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  return { data };
};

export const validateInvitation = async (username: string) => {
  const serviceClient = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
  );

  const { data, error } = await serviceClient
    .schema("bhc")
    .from("invitations")
    .select("*")
    .eq("username", username);

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  if (!data || !data.length) {
    return { error: "Invitation not found" };
  }

  return {
    data: {
      username: data[0]?.username || "",
      avatar_url: data[0]?.metadata?.avatar_url || "",
      name: data[0]?.metadata?.name || "",
    },
  };
};

export const getUserRole = async (uid: string) => {
  const serviceClient = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
  );

  const { data, error } = await serviceClient
    .schema("bhc")
    .rpc("get_user_role", { uid });

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  return { data };
};
