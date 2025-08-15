import { ClientNavTabs } from "./components/NavTabs/clientNavTabs";
import { getAllLogStories } from "@/lib/supabase/server-extended/log-stories";
import { fetchUser } from "@/lib/supabase/server";
import LandingPage from "./components/landing/landing";

export default async function Home() {
  return <LandingPage />;
}
