import { Suspense } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Layout } from "./components/Layout";
import { ClientNavTabs } from "./components/NavTabs/clientNavTabs";
import { SkeletonCard } from "./components/ui/skeleton-card";
import { getAllLogStories } from "@/lib/supabase/server-extended/log-stories";
import { LogStoriesTab } from "./components/logStoriesTab";
import { BirthdayIndex } from "./components";
import InfoTab from "./info/info";
import { fetchUser } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await fetchUser();
  const { data: logStories } = await getAllLogStories();

  console.log("Server side - user authenticated:", !!user);

  return (
    <Layout>
      <ClientNavTabs isLoggedIn={!!user} logStories={logStories ?? []} />
    </Layout>
  );
}
