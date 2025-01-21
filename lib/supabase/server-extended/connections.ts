"use server";

import { createClient } from "@/lib/supabase/server";

type ConnectionType = "friend" | "colleague" | "folk" | "spouse";
type ConnectionStatus = "pending" | "accepted" | "rejected";

export interface ConnectionRequest {
  receiverId: string;
  connectionType: ConnectionType;
}

export interface Connection {
  id: string;
  requesterId: string;
  receiverId: string;
  connectionType: ConnectionType;
  status: ConnectionStatus;
  createdAt: string;
  updatedAt: string;
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
  };
}

export async function createConnection(request: ConnectionRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.error("User authentication failed");
    throw new Error("Authentication is required");
  }

  console.log("Request payload:", request);
  console.log("Authenticated user:", user);

  const { data, error } = await supabase
    .schema("bhc")
    .from("connections")
    .insert({
      requester_id: user.id,
      receiver_id: request.receiverId,
      connection_type: request.connectionType,
      status: "pending",
    })
    .select(
      `*, requester:user_profiles!requester_id(*),
        receiver:user_profiles!receiver_id(*)`
    )
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    throw error;
  }
  return data;
}

export async function updateConnectionStatus(
  connectionId: string,
  status: "accepted" | "rejected"
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Authentication is required");

  const { data, error } = await supabase
    .schema("bhc")
    .from("connections")
    .update({ status })
    .eq("id", connectionId)
    .eq("receiver_id", user.id)
    .select(
      `*, requester:user_profiles!requester_id(*),
        receiver:user_profiles!receiver_id(*)`
    )
    .single();

  if (error) throw new Error();
  return data;
}

export async function getConnectionStatus(userId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Authentication is required");

  const { data, error } = await supabase
    .schema("bhc")
    .from("connections")
    .select()
    .or(`requester_id.eq.${user.id}, receiver_id.eq.${user.id}`)
    .eq(user.id === user.id ? "receiver_id" : "requester_id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function getPendingConnections() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Authentication is required");

  const { data, error } = await supabase
    .schema("bhc")
    .from("connections")
    .select(
      `*, requester:user_profiles!requester_id(*), receiver:user_profiles!receiver_id(*)`
    )
    .eq("receiver_id", user.id)
    .eq("status", "pending");

  if (error) throw error;
  return data;
}
