import React from "react";

export default function CauseAssistantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="min-h-scren">{children}</main>;
}
