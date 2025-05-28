"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AcceptNomination } from "./AcceptInvitationModals";

export function WelcomeButton({ currentPage }: { currentPage: string }) {
  const router = useRouter();

  return (
    <div className="w-full px-4 py-6 md:py-8 lg:py-10">
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-3 md:mb-4">
          Be a Hero, Make a Difference!
        </h1>
        <h3 className="text-lg md:text-xl lg:text-xl text-gray-800 mb-4 md:mb-6 px-4 md:px-8">
          Get a $250 gift bonus to make birthday gifting effortless - without
          spending a dime. Your kindness ensures no child goes to bed hungry
        </h3>
        <div className="flex flex-col items-center justify-center space-y-3 md:space-y-4">
          <p className="text-base md:text-lg text-gray-800">It's free!</p>
          <AcceptNomination />
        </div>
        <p className="text-lg my-3">To view your {currentPage}</p>
      </div>
    </div>
  );
}
