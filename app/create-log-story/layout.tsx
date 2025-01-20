"use client";

import { LogStoryProvider } from "@/app/actions/logStoryContext";

export default function CreateLogStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LogStoryProvider>{children}</LogStoryProvider>;
}
