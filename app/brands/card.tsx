"use client";

import Image from "next/image";
import { MapPin, Plus, User } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createNomination } from "@/lib/supabase/server-extended/nomination";
import { useAuth } from "../actions/AuthContext";

interface CakeShopCardProps {
  name: string;
  username: string;
  location: string;
  status: "Accepted" | "Endorsed";
  testimonial: string;
  profilePhoto: string;
  onImageUpload?: (file: File) => void;
}

export function CakeShopCard({
  name,
  username,
  location,
  status,
  testimonial,
  profilePhoto,
}: CakeShopCardProps) {
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
                  <h5 className="text-gray-500 text-sm">@{username}</h5>
                </div>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {location}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-6 py-4 border-t">
          <p className="text-gray-700 text-sm italic">"{testimonial}"</p>
        </CardFooter>
      </Card>
    </>
  );
}
