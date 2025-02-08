"use server";
import { notFound } from "next/navigation";
import ProfileSection from "../profile";

export default async function ProfilePage({ params }: { params?: any }) {
  const { username } = await params;
  if (!username) {
    notFound();
  }
  return <ProfileSection username={username} />;
}
