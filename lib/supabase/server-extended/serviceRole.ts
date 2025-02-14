"use server";
import { LOG_STORY_BHC } from "@/lib/constants";
import { getBHI, getNextOccurrence, validateEmail } from "@/lib/utils";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../server";
import { createConnection } from "./connections";
import { CreateLogStoryDBO } from "@/lib/types";

export const checkEmailExists = async (
  email: string,
  username: string
): Promise<{ exists?: boolean; error?: string }> => {
  if (!validateEmail(email)) {
    return { error: "Please enter a valid email id" };
  }

  const client = await createClient();

  const { data, error } = await client
    .from("accounts")
    .select("email, account_role, username, account_status")
    .eq("username", username)
    .single();

  if (error) return { error: error.message };
  if (!data) return { error: "User not found" };
  if (data.account_status !== "pending")
    return { error: "User already registered" };

  let exists = false;
  if (data.email && data.email === email) exists = true;
  else if (!data.email && data.account_role === "user") {
    const { data: emailData } = await client
      .from("accounts")
      .select("email")
      .eq("email", email);
    if (emailData && emailData.length > 0)
      return { error: "Email already registered" };
    else exists = true;
  }

  return { exists };
};

export const signUpRequest = async (
  username: string,
  email: string,
  password: string,
  dob: string | null,
  userTimezone: string,
  termsAccepted: boolean
) => {
  if (!termsAccepted) return { error: "Terms not accepted" };

  const client = await createClient();

  const { data, error } = await client
    .from("accounts")
    .select()
    .eq("username", username)
    .single();

  if (!data || error) {
    console.error({ data, error });
    return { error: "Unable to signup" };
  }

  if (data.account_status !== "pending")
    return { error: "User already registered" };

  if (data.email && data.email !== email) {
    return { error: "Please use the nominated email to sign up." };
  }

  try {
    const serviceClient = await createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
    );

    const {
      data: { user },
      error,
    } = await serviceClient.auth.admin.updateUserById(data.id, {
      email: email,
      password: password,
    });

    if (error || !user) {
      console.error(error);
      return { error: "Unable to associate user, please contact admin." };
    }

    const { error: signInError } = await serviceClient.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: false,
      },
    });

    if (signInError) {
      console.error(signInError);
      return { error: "Unable to sign in, please contact admin." };
    }

    const dobDate = dob
      ? new Date(
          new Date(dob).toLocaleString("en-US", { timeZone: userTimezone })
        )
      : null;
    const { permissiory_donations, gift_bonus } =
      data.account_role !== "brand"
        ? getBHI(dobDate)
        : { permissiory_donations: 0, gift_bonus: 0 };

    const { error: updateError } = await serviceClient
      .from("accounts")
      .update({
        account_status: "accepted",
        email: email,
        birth_date: dobDate ? dobDate.toISOString() : null,
        terms_accepted_at: new Date().toISOString(),
        permissiory_donations: permissiory_donations,
        gift_bonus: gift_bonus,
        bio: LOG_STORY_BHC[0].description
      })
      .eq("id", data.id)
      .select();

    if (updateError) {
      console.error(updateError);
      return { error: "Unable to update user, please contact admin." };
    }

    (async () => {
      if (data.account_role === "brand" || !dobDate) return;
      const content =
        LOG_STORY_BHC[Math.floor(Math.random() * LOG_STORY_BHC.length)];

      const currentYear = new Date().getFullYear();
      const birthdayThisYear = new Date(dobDate);
      birthdayThisYear.setFullYear(currentYear);

      const validContent: CreateLogStoryDBO = {
        ...content,
        start_date: birthdayThisYear.toISOString(),
        end_date: birthdayThisYear.toISOString(),
        start_time: "00:00",
        end_time: "23:59",
        is_brand_log: false,
        post_by: data.id,
        is_repost: false,
        repost_of: null,
      };

      const { error: logStoryError } = await serviceClient
        .from("log_stories")
        .insert([validContent]);

      if (logStoryError) {
        console.error("Database error:", logStoryError);
      }
    })();

    return { message: "OK" };
  } catch (error) {
    console.error(error);
    return { error: "Unable to sign up, please contact admin." };
  }
};

export const validateOTPRequest = async (
  email: string,
  otp: string,
  loginWithOTP: boolean = false
) => {
  const client = loginWithOTP // useful for reset password or password less login
    ? await createClient()
    : await createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

  const { data, error } = await client.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });

  if (!data.user || !data.session || error) {
    console.error(data, error);
    return { data, error: error?.message };
  }

  return { data };
};

export const checkUsernameConfilct = async (username: string) => {
  const client = await createClient();

  const { data, error } = await client
    .from("accounts")
    .select("username")
    .eq("username", username)
    .single();

  if (error && !error.details.includes("0 rows"))
    return { error: error.message };

  if (!data) return { data: "OK" };

  return { error: "User with username already registered." };
};

export const validateInvitation = async (username: string) => {
  const client = await createClient();

  const { data, error } = await client
    .from("accounts")
    .select()
    .eq("account_status", "pending")
    .eq("username", username)
    .single();

  if (error) {
    console.error(error);
    return { error: "encountered an error" };
  }

  if (!data) return { error: "Invitation not found" };

  return {
    data: {
      username: data.username || "",
      avatar_url: data.avatar_url || "",
      name: data.name || "",
    },
  };
};
