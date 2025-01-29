"use server";

import { createClient } from "@/lib/supabase/server";

type ConnectionType = "friend" | "colleague" | "folk" | "spouse";
type ConnectionStatus = "pending" | "accepted" | "rejected";

export interface ConnectionRequest {
  receiverId: string;
  connectionType: ConnectionType;
}

export interface Connection {
  id?: string;
  requesterId: string;
  receiverId: string;
  connectionType: ConnectionType;
  status?: ConnectionStatus;
  requester: {
    id: string;
    username: string;
    name: string;
    avatar_url: string;
  };
  receiver: {
    id: string;
    username: string;
    name: string;
    avatar_url: string;
    is_brand: boolean;
  };
}

export async function createConnection(
  receiverId: string,
  requesterId: string,
  connection_type: ConnectionType
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.id !== requesterId) {
    return { error: "User not found" };
  }

  const { data, error } = await supabase
    .schema("bhc")
    .from("connections")
    .insert({
      requester_id: requesterId,
      receiver_id: receiverId,
      connection_type: connection_type,
      status: "pending",
    })
    .single();

  if (error) {
    return { error: error.message };
  }
  return { data };
}

export async function updateConnectionStatus(
  requesterId: string,
  receiverId: string,
  status: "accepted" | "rejected",
  notification_id?: string
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.id !== receiverId) return { error: "User not found" };

  const { data, error } = await supabase
    .schema("bhc")
    .from("connections")
    .update({ status })
    .eq("requester_id", requesterId)
    .eq("receiver_id", receiverId)
    .single();

  if (error) return { error: error.message };

  if (notification_id) {
    const { error } = await supabase
      .schema("bhc")
      .from("notifications")
      .update({
        additional_meta: { status },
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq("id", notification_id)
      .single();

    if (error) return { error: error.message };
  }

  return { data };
}

export async function getConnectionStatus(userId: string) {
  throw "Not Implemented";

  // const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // if (!user) return { error: "User not found" }

  // const { data, error } = await supabase
  //   .schema("bhc")
  //   .from("connections")
  //   .select()
  //   .or(`requester_id.eq.${user.id}, receiver_id.eq.${user.id}`)
  //   .eq(user.id === user.id ? "receiver_id" : "requester_id", userId)
  //   .single();

  // if (error && error.code !== "PGRST116") throw error;
  // return data;
}

export async function getPendingConnections() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "User not found" };

  const { data, error } = await supabase
    .schema("bhc")
    .from("connections")
    .select()
    .eq("receiver_id", user.id)
    .eq("status", "pending");

  if (error) return { error: error.message };
  return { data };
}

export async function getUserBrandConnects(userId: string) {
  const supabase = await createClient();

  if (!userId) {
    const {
      data: { user },
      error: err,
    } = await supabase.auth.getUser();
    if (!user) return { error: "User not found" };

    if (err) {
      console.error(err);
      return { error: "encountered an error" };
    }

    userId = user.id;
  }

  const { data, error } = await supabase
    .schema("bhc")
    .from("brands")
    .select("id, name, username, avatar_url")
    .eq("primary_owner_user_id", userId);

  if (error) return { error: error.message };
  return { data };
}

export async function getDefaultBrandConnect(brandId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("bhc")
    .from("brands")
    .select("*")
    .eq("id", brandId)
    .single();

  if (error || !data) return { error: error?.message };

  const assistantId = data.primary_owner_user_id;

  const { data: assistant, error: assistantError } = await supabase
    .schema("bhc")
    .from("user_profiles")
    .select("id, name, username, avatar_url")
    .eq("id", assistantId)
    .single();

  if (assistantError || !assistant) {
    return { error: assistantError?.message || "Assistant not found" };
  }

  return { assistant };
}
