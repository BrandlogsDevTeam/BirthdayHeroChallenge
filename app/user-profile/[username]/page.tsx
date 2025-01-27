"use server";

import { fetchSession } from "@/lib/supabase/server";
import { Layout } from "@/app/components/Layout";
import ProfileSection from "../profile";

export default async function ProfilePage({ params }: { params?: any }) {

  const username = (await params)?.username;

  return <ProfileSection username={username} />;
}
