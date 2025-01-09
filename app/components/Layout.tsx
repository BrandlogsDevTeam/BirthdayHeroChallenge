"use client";

import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { PageLoading } from "./PageLoading";
import { createClient } from "@/lib/supabase/client";
import { getUserRole } from "@/lib/supabase/server-extended/serviceRole";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('user');

  useEffect(() => {
    async function checkSession() {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      setIsLoading(false);

      if (data?.session?.user?.id){
        const { data: { user_role } } = await getUserRole(data?.session?.user?.id)
        setUserRole(user_role);
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
          <main className="flex-1 p-6 md:ml-64">
            <PageLoading />
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header role={userRole} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 md:ml-64">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
