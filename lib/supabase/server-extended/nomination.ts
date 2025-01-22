"use server";

import { createClient } from "../server";

export async function createNomination(data: {
  username: string;
  email: "";
  metadata: {
    name: string;
    avatar_url: string;
  };
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error: err,
  } = await supabase.auth.getUser();
  if (!user) return { error: "User not found" };

  const { data: nomination, error } = await supabase
    .schema("bhc")
    .from("invitations")
    .insert([
      {
        username: data.username,
        email: data.email,
        metadata: data.metadata,
        invitation_type: 'one_time',
      },
    ])
    .select("*")
    .single();

  if (error) throw error;
  return nomination;
}
