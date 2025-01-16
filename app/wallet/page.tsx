import { createClient } from "@/lib/supabase/server";
import { WelcomeButton } from "../components/welcom-button";
import { Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WalletPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      {user ? (
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Wallet className="h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-4xl font-bold mb-4">
              Wallet Feature Coming Soon
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-md">
              We're working hard to bring you a seamless wallet experience. Stay
              tuned for updates!
            </p>
            <div className="mt-8 p-4 bg-secondary rounded-lg">
              <p className="text-sm font-medium">Expected Release: Q3 2025</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <WelcomeButton currentPage="wallet" />
      )}
    </>
  );
};

export default WalletPage;
