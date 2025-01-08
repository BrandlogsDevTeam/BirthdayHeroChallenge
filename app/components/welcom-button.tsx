"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AcceptNomination } from "./AcceptInvitationModals";

export function WelcomeButton({ currentPage }: { currentPage: string }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-gradient-to-b from-background to-muted rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Birthday Hero Community
      </h2>
      <AcceptNomination />
      <div className="flex items-center justify-center w-full">
        <div className="border-t border-gray-300 flex-grow"></div>
        <span className="px-4 text-sm text-gray-500">Or</span>
        <div className="border-t border-gray-300 flex-grow"></div>
      </div>
      <Button
        onClick={() => router.push("/login")}
        variant="outline"
        className="max-w-xs border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
      >
        Login
      </Button>
      <p className="text-sm text-muted-foreground">
        To view your {currentPage}
      </p>
    </div>
  );
}
