"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { Nominee } from "./types/nominee";

interface NomineeDetailsProps {
  nominee: Partial<Nominee>;
  updateNominee: (data: Partial<Nominee>) => void;
  onNext: () => void;
}

export function NomineeDetails({
  nominee,
  updateNominee,
  onNext,
}: NomineeDetailsProps) {
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateNominee({ [name]: value });
  };

  const handleNext = () => {
    if (!nominee.name?.trim()) {
      setError("Nominee Name is required");
      return;
    }
    if (!nominee.instagramHandle?.trim()) {
      setError("Instagram Handle is required");
      return;
    }
    setError(null);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="name">Nominee Name</Label>
        <Input
          id="name"
          name="name"
          value={nominee.name || ""}
          onChange={handleInputChange}
          placeholder="Enter name"
        />
      </div>
      <div className="space-y-3">
        <Label htmlFor="instagramHandle" className="flex items-center gap-2">
          <Instagram className="w-4 h-4 text-pink-500" />
          Instagram Handle
        </Label>
        <Input
          id="instagramHandle"
          name="instagramHandle"
          value={nominee.instagramHandle || ""}
          onChange={handleInputChange}
          placeholder="@username"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          className="bg-green-600 text-white hover:text-white hover:bg-green-700"
        >
          Proceed
        </Button>
      </div>
    </div>
  );
}
