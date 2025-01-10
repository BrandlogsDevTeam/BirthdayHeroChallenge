"use server";
import { Layout } from "@/app/components/Layout";
import ProfileSection from "../profile";

export default async function ProfilePage({
  params,
}: {
  params?: any;
}) {
  return (
    <Layout>
      <ProfileSection username={(await params)?.username} />
    </Layout>
  );
}
