"use server";

import { fetchSession } from "@/lib/supabase/server";
import { Layout } from "@/app/components/Layout";
import ProfileSection from "../profile";

export default async function ProfilePage({ params }: { params?: any }) {
  const {
    data: { session },
  } = await fetchSession();

  const currentUserId = session?.user?.id;

  // if (!currentUserId) {
  //   return <Layout>User not found</Layout>;
  // }

  const username = (await params)?.username;

  return <ProfileSection username={username} />;
}
