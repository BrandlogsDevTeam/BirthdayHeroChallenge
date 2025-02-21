"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AcceptNomination } from "./AcceptInvitationModals";

export function WelcomeButton({ currentPage }: { currentPage: string }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Birthday Hero Community
      </h2>
      <div className="flex flex-col items-center">
        It's free!
        <AcceptNomination />
      </div>

      <p className="text-sm text-muted-foreground">
        To view your {currentPage}
      </p>
    </div>
  );
}
