"use server";

import { createClient } from "@/lib/supabase/server";
import { getUserRole } from "@/lib/supabase/server-extended/serviceRole";
import { redirect } from "next/navigation";
import React from "react";

export default async function CauseAssistantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { data: { user_role } } = await getUserRole(user.id);
    if (user_role === "assistant") {
      return <main className="min-h-screen">{children}</main>;
    }
  }

  return redirect("/");

}
