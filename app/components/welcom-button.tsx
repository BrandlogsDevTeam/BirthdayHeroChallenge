"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AcceptNomination } from "./AcceptInvitationModals";

export function WelcomeButton({ currentPage }: { currentPage: string }) {
  const router = useRouter();

  return (
    <div className="flex flex-col max-w-md items-center justify-center gap-6 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Birthday Hero Community
      </h2>
      <AcceptNomination />

      <p className="text-sm text-muted-foreground">
        To view your {currentPage}
      </p>
    </div>
  );
}
