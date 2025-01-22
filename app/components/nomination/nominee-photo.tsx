"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Nominee } from "./types/nominee";
import { Plus, Loader } from "lucide-react";
import { uploadAvatar } from "@/lib/supabase/server-extended/userProfile";
import { v4 as uuid } from "uuid";

interface NomineePhotoProps {
  nominee: Partial<Nominee>;
  updateNominee: (data: Partial<Nominee>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function NomineePhoto({
  nominee,
  updateNominee,
  onNext,
  onBack,
}: NomineePhotoProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const fileExt = file.name.split(".").pop();
    const fileName = `${uuid()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { data, error } = await uploadAvatar(filePath, file);
      if (error || !data) {
        throw error || new Error("Failed to upload avatar");
      }
      updateNominee({ photoUrl: data });
    } catch (err) {
      console.error(err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleNext = () => {
    if (!nominee.photoUrl) {
      setError("Please upload a profile photo");
      return;
    }
    setError(null);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={nominee.photoUrl} />
          <AvatarFallback>
            {uploading ? (
              <Loader className="w-8 h-8 text-muted-foreground animate-spin" />
            ) : (
              <Plus className="w-8 h-8 text-muted-foreground" />
            )}
          </AvatarFallback>
        </Avatar>
        <Label
          htmlFor="photo"
          className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Upload profile photo
        </Label>
        <Input
          id="photo"
          type="file"
          className="hidden"
          onChange={handleUpload}
          accept="image/*"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="bg-custom-green hover:bg-green-700"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
