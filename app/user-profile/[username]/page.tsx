"use server";
import { notFound } from "next/navigation";
import ProfileSection from "../profile";

export default async function ProfilePage({ params }: { params?: any }) {
  if (!params?.username) {
    notFound();
  }
  return <ProfileSection username={(await params)?.username} />;
}
