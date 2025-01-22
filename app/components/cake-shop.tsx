"use client";

import Image from "next/image";
import { MapPin, Plus, User } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { NominationFlow } from "./nomination/nomination-flow";
import { useState } from "react";
import { Nominee } from "./nomination/types/nominee";
import { Button } from "@/components/ui/button";
import { createNomination } from "@/lib/supabase/server-extended/nomination";

interface CakeShopCardProps {
  name: string;
  username: string;
  location: string;
  status: "Accepted" | "Endorsed";
  testimonial: string;
  profilePhoto: string;
  onImageUpload?: (file: File) => void;
}

const handleNewEndorsement = async (nominee: Nominee) => {
  try {
    const response = await fetch("/api/nominations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nominee.name,
        photoUrl: nominee.photoUrl,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create nomination");
    }
  } catch (error) {
    console.error("Error creating nomination:", error);
  }
};

export function CakeShopCard({
  name,
  username,
  location,
  status,
  testimonial,
  profilePhoto,
}: CakeShopCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Card className="w-full max-w-md shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between space-x-4">
            <div className="flex space-x-4">
              <div className="flex flex-col items-center gap-2">
                <Link href={`/brand/${username}`}>
                  <Avatar className="w-16 h-16 cursor-pointer">
                    <AvatarImage src={profilePhoto} alt={name} />
                    <AvatarFallback>
                      <User className="w-6 h-6 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {name}
                  </h3>
                  <h5 className="text-gray-500">@{username}</h5>
                </div>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {location}
                </p>
              </div>
            </div>
            {status === "Accepted" ? (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {status}
              </span>
            ) : status === "Endorsed" ? (
              <div className="flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                  {status}
                </span>
                <Button
                  onClick={() => setIsOpen(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Assist
                </Button>
              </div>
            ) : (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                {status}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="px-6 py-4 border-t">
          <p className="text-gray-700 text-sm italic">"{testimonial}"</p>
        </CardFooter>
      </Card>
      <NominationFlow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNewEndorsement={handleNewEndorsement}
      />
    </>
  );
}
