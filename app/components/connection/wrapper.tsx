"use client";

import { ConnectionFlowProvider } from "@/app/actions/connectionContext";
import { ConnectionFlow } from "./flow";

export function ConnectionFlowWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConnectionFlowProvider>
      {children}
      <ConnectionFlow />
    </ConnectionFlowProvider>
  );
}
