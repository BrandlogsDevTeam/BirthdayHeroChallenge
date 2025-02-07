"use server";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../server";
import { getSelfProfile } from "./userProfile";

export async function createNomination(data: {
  username: string;
  name: string;
  avatar_url: string;
  inviting_brand: string;
  metadata: any;
}) {
  const supabase = await createClient();

  const { data: user } = await getSelfProfile();
  if (!user) return { error: "User not found" };

  if (user.account_role !== "assistant") return { error: "Operation not permitted" };

  const serviceClient = await createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
  );

  const uniqueEmail = `unauthenticated-${data.username}-${Date.now()}@example.com`
  const { data: { user: newUser }, error: newUserError } = await serviceClient.auth.admin.createUser({
    email: uniqueEmail,
  })
  if (newUserError) return { error: newUserError.message }
  if (!newUser) return { error: "Unable to create user" }

  try {
    const { error } = await supabase
      .from("accounts")
      .insert([
        {
          id: newUser.id,
          username: data.username,
          is_brand: false,
          name: data.name,
          avatar_url: data.avatar_url,
          invited_by: user.id,
          invited_for: data.inviting_brand,
          metadata: data.metadata,
        }
      ])

    if (error) throw error.message
  } catch (error) {
    const deleteError = await serviceClient.auth.admin.deleteUser(newUser.id)
    if (deleteError) console.error(deleteError)
    return { error }
  }
  return { message: "Nomination created successfully" };
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
