"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, User, Quote } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "../actions/AuthContext";
import { AuthModal } from "../components/Post";
import { Dialog } from "@/components/ui/dialog";
import { useConnectionFlow } from "../actions/connectionContext";
import { UserPlus } from "lucide-react";

interface CakeShopCardProps {
  id: string;
  name: string;
  index: number;
  username: string;
  state: string;
  county: string;
  status: "Accepted" | "Endorsed";
  testimonial: string;
  profilePhoto: string;
  onImageUpload?: (file: File) => void;
  connection?: any;
}

export function CakeShopCard({
  id,
  name,
  username,
  index,
  state,
  county,
  status,
  testimonial,
  profilePhoto,
  connection,
}: CakeShopCardProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { profile, isLoading } = useAuth();
  const { openFlow } = useConnectionFlow();

  const handleConnect = (id: string) => {
    console.log("Connecting to:", name);
    if (!profile) {
      setShowAuthModal(true);
      return;
    }
    const avatar_url = profilePhoto;
    console.log("Connection attempt for profile: ", profile);
    openFlow(id, {
      avatar_url,
      name,
      username,
      is_brand: true,
    });
  };

  return (
    <>
      <Card className="relative w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
        <div className="absolute top-0 left-0 bg-green-600 text-white px-3 py-1 rounded-br-xl font-bold text-sm z-10">
          #{index}
        </div>
        <CardContent className="p-6 pb-0">
          <div className="flex flex-row items-center justify-start space-x-4">
            <Link
              href={profile ? `/user-profile/${username}` : "#"}
              className="shrink-0"
            >
              <Avatar className="w-24 h-24 border-4 border-transparent group-hover:border-green-500 transition-all duration-300">
                <AvatarImage
                  src={profilePhoto}
                  alt={name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-green-100 text-green-600">
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
            </Link>

            <div className="flex-grow min-w-0 text-left space-y-2">
              <div>
                <h3 className="text-sm sm:text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                  {name}
                </h3>
                <Link
                  href={`/user-profile/${username}`}
                  className="flex items-center space-x-2 text-gray-500 hover:underline"
                >
                  <span className="text-xs">@{username}</span>
                </Link>
              </div>

              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-green-600 shrink-0" />
                <span className="truncate">
                  {county ? `${county}, ${state}` : state}
                </span>
              </p>

              <span className="inline-block text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                {status}
              </span>
            </div>

            {(!connection || !connection.type) && (
              <div className="shrink-0">
                <Button
                  variant="outline"
                  className="bg-white text-green-600 hover:text-white border border-green-600 hover:bg-green-600 transition-colors whitespace-nowrap"
                  onClick={() => handleConnect(id)}
                >
                  <UserPlus className="mr-1 h-4 w-4" />
                  Connect
                </Button>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="px-6 py-4 border-t bg-green-50/50 mt-4">
          <div className="flex items-start space-x-2">
            <Quote className="w-5 h-5 text-green-600 shrink-0 mt-1" />
            <p className="text-gray-700 text-sm italic flex-grow">
              "{testimonial}"
            </p>
          </div>
        </CardFooter>
      </Card>
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <AuthModal />
      </Dialog>
    </>
  );
}
