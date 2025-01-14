"use client";

import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { PageLoading } from "./PageLoading";
import { createClient } from "@/lib/supabase/client";
import { getUserRole } from "@/lib/supabase/server-extended/serviceRole";
import InfoFooter from "./info-footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>("user");
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      setIsLoading(false);

      if (data?.session?.user?.id) {
        setHasSession(true);
        const {
          data: { user_role },
        } = await getUserRole(data.session.user.id);
        setUserRole(user_role);
      } else {
        setHasSession(false);
      }
    }

    checkSession();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header role={userRole} />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 flex flex-col md:ml-64">
            <main className="flex-1 p-6">
              <PageLoading />
            </main>
            {hasSession ? <Footer /> : <InfoFooter />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header role={userRole} />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col md:ml-64">
          <main className="flex-1 p-6">{children}</main>
          {hasSession ? <Footer /> : <InfoFooter />}
        </div>
      </div>
    </div>
  );
}
