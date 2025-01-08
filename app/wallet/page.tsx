import { Layout } from "@/app/components/Layout";
import { createClient } from "@/lib/supabase/server";

const Wallet = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-4">Wallet</h1>
      <p className="text-lg">Content goes here.</p>
      {user && <p className="text-lg">Welcome, {user.email}!</p>}
    </Layout>
  );
};

export default Wallet;
