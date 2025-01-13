import { Layout } from "./components/Layout";
import { ClientNavTabs } from "./components/NavTabs/clientNavTabs";
import { getAllLogStories } from "@/lib/supabase/server-extended/log-stories";
import { fetchUser } from "@/lib/supabase/server";

export default async function Home() {
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
