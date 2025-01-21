import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Nominee } from "./types/nominee";

interface ProfileDisplayProps {
  nominee: Partial<Nominee>;
  onNext: () => void;
  onBack: () => void;
}

export function ProfileDisplay({
  nominee,
  onNext,
  onBack,
}: ProfileDisplayProps) {
  return (
    <div className="space-y-4 text-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <Avatar className="w-24 h-24">
          <AvatarImage src={nominee.photoUrl} />
          <AvatarFallback>{nominee.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-gray-800">{nominee.name}</span>
        <span className="text-gray-500 text-sm">{nominee.instagramHandle}</span>
      </div>
      <p className="text-sm text-gray-800">
        "It's been a beautiful year and transitioning to another new age feels
        good. Can't wait for my birthday, it will be amazing!"
      </p>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} className="bg-custom-green hover:bg-green-700">
          Complete
        </Button>
      </div>
    </div>
  );
}
