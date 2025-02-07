"use server";

import { getSelfProfile } from "@/lib/supabase/server-extended/userProfile";
import { redirect } from "next/navigation";
import React from "react";

export default async function CauseAssistantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await getSelfProfile()

  if (data && data?.account_role && data.account_role === 'assistant')
      return <main className="min-h-screen">{children}</main>;

  return redirect('/')
}
