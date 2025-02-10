"use server";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../server";
import { getSelfProfile } from "./userProfile";

interface NominationData {
  username: string;
  name: string;
  avatar_url: string;
  inviting_brand: string;
  metadata: any;
}

export async function createNomination(data: NominationData) {
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
    const { data: account, error } = await supabase
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
      ]).select();

    if (error) throw error.message

    if (!account || account.length === 0 || account[0].id !== newUser.id) throw new Error("Unable to create account")

    const { error: connectionError } = await serviceClient
      .from('connections')
      .insert([{
        sender_id: newUser.id,
        receiver_id: user.id,
        connection_type: "co_creator",
        connection_status: "accepted",
      },
      {
        sender_id: newUser.id,
        receiver_id: data.inviting_brand,
        connection_type: "cake_shop",
        connection_status: "accepted",
      }
    ])

    if (connectionError) console.error(connectionError)
  } catch (error) {
    const deleteError = await serviceClient.auth.admin.deleteUser(newUser.id)
    if (deleteError) console.error(deleteError)
    return { error }
  }
  return { message: "Nomination created successfully" };
}

export async function getNominations() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "User not found" };

  const { data, error } = await supabase
    .from("accounts")
    .select("id, username, name, avatar_url, invited_by, account_status, permissiory_donations, gift_bonus")
    .eq("is_brand", false)
    .eq("invited_by", user.id);

  if (error) return { error: error.message }
  return { data };
}