import { Layout } from "@/app/components/Layout";
import { createClient } from "@/lib/supabase/server";
import { WelcomeButton } from "../components/welcom-button";

const Wallet = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <Layout>
      {user ? (
        <div>
          <h1 className="text-4xl font-bold mb-4">Wallet</h1>
          <p className="text-lg">Content goes here.</p>
        </div>
      ) : (
        <WelcomeButton currentPage="wallet" />
      )}
    </Layout>
  );
};

export default Wallet;
