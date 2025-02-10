"use server";

import { createClient } from "@/lib/supabase/server";
import { AccountDBO, ConnectionDBO, ConnectionType, ConnectionViewDBO } from "@/lib/types";
import { getSelfProfile } from "./userProfile";

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
  const { data: requester } = await getSelfProfile();

  if (!requester || requester.id !== requesterId) return { error: "User not found" };

  const { data: receiver } = await supabase
    .rpc("rpc_get_account_info", {
      account_id: receiverId,
    });

  const status = receiver.is_brand ? "accepted" : "pending";

  // Insert the connection
  const { data, error } = await supabase
    .from("connections")
    .insert([{
      sender_id: requesterId,
      receiver_id: receiverId,
      connection_type: connection_type,
      connection_status: status,
    }])
    .select();

  if (error) {
    return { error: error.message };
  }

  return { data: data[0] as ConnectionDBO };
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

  if (status === "accepted") {
    const { data, error } = await supabase
      .from("connections")
      .update({ connection_status: status })
      .eq("sender_id", requesterId)
      .eq("receiver_id", receiverId)
      .single();

    if (error) return { error: error.message };
  } else {
    const { error } = await supabase
      .from("connections")
      .delete()
      .eq("sender_id", requesterId)
      .eq("receiver_id", receiverId);

    if (error) return { error: error.message };
  }

  if (notification_id) {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true, read_at: new Date().toISOString(), additional_meta: { connection_status: status } })
      .eq("id", notification_id)

    if (error) return { error: error.message };
  }

  return { message: "Connection status updated" };
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

// returns a list of brands that are invited by user
export async function getUserConnects(userId?: string) {
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
    .from('connections_view')
    .select()
    .eq('sender_id', userId);

  if (error) return { error: error.message };
  return { data: data as ConnectionViewDBO[] };
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
