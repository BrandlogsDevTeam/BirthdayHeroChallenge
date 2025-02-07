"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Instagram, Loader } from "lucide-react";
import { Nominee } from "./types/nominee";
import { checkUsernameConfilct } from "@/lib/supabase/server-extended/serviceRole";

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
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateNominee({ [name]: value });
  };

  const handleNext = async () => {
    if (loading) return;
    try {
      setLoading(true)
      if (!nominee.name?.trim())
        throw ("Nominee Name is required")
      if (!nominee.instagramHandle?.trim())
        throw ("Instagram Handle is required");

      const {data, error } = await checkUsernameConfilct(nominee.instagramHandle.trim())
      if (error)
        throw error;

      if (data === 'OK') 
        onNext();

      throw "Unknown error"
    } catch (error) {
      if (typeof error === 'string')
        setError(error);
      else
        setError('Error occured')
      console.error(error)
    } finally {
      setLoading(false)
    }
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
          disabled={loading}
        >
          {loading ? <Loader className="w-4 h-4 animate-spin" />  : 'Proceed'}
        </Button>
      </div>
    </div>
  );
}
