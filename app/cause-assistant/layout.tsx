"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function CauseAssistantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: {user}, error } = await supabase.auth.getUser();

  // @ts-ignore
  if (user && user['user_role'] && user['user_role'] === "assistant") {
    return <main className="min-h-scren">{children}</main>;
  }

  return redirect("/");

}
