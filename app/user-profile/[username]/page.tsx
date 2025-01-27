"use server";
import ProfileSection from "../profile";

export default async function ProfilePage({ params }: { params?: any }) {
  return <ProfileSection username={(await params)?.username} />;
}
