import { metadata } from "@/app/layout";
import { createClient } from "../server";

export async function createNomination(data: {
  username: string;
  invitation_type: "one_time";
  invitation_role: "user";
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
    .insert({
      username: data.username,
      invitation_type: data.invitation_type,
      invitation_role: data.invitation_role,
      metadata: data.metadata,
    })
    .select("*")
    .single();

  if (error) throw error;
  return nomination;
}
