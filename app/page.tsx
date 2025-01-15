import { Layout } from "./components/Layout";
import { ClientNavTabs } from "./components/NavTabs/clientNavTabs";
import { getAllLogStories } from "@/lib/supabase/server-extended/log-stories";
import { fetchUser } from "@/lib/supabase/server";

export default async function Home() {

  const { data: logStories } = await getAllLogStories()
  const { data: user } = await fetchUser()

  return (
    <Layout>
      {/* <div>HI</div> */}
      <ClientNavTabs isLoggedIn={!!user.user} logStories={logStories ? logStories : []} />
    </Layout>
  );
}
