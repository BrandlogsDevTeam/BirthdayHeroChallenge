"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AcceptNomination } from "./AcceptInvitationModals";

export function WelcomeButton({ currentPage }: { currentPage: string }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 rounded-lg">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 mb-3 md:mb-4">
        BIRTHDAY HERO CHALLENGE
      </h1>
      <h3 className="text-lg md:text-xl lg:text-2xl text-gray-500 mb-4 md:mb-6 px-4 md:px-8">
        Rewards you $250 Gift Bonus to ensure no child goes to bed hungry.
      </h3>
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
