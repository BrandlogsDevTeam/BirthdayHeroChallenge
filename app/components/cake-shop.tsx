"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Plus, User } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { NominationFlow } from "./nomination/nomination-flow";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Add these imports
import { useAuth } from "../actions/AuthContext";
import { getStoryForRepost } from "@/lib/supabase/server-extended/log-stories";

interface CakeShopCardProps {
  id: string;
  name: string;
  username: string;
  state: string;
  county: string;
  status: "Accepted" | "Endorsed";
  testimonial: string;
  profilePhoto: string;
  onImageUpload?: (file: File) => void;
  onSuccess?: () => void;
}

export function CakeShopCard({
  name,
  id,
  username,
  state,
  county,
  status,
  testimonial,
  profilePhoto,
  onSuccess,
}: CakeShopCardProps) {
  const { profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleAssist = async () => {
    setIsRedirecting(true);
    try {
      const { data, error } = await getStoryForRepost(id);

      if (error || !data) {
        console.error("No story found:", error);
        // Add error toast here if needed
        return;
      }

      router.push(`/assist-repost/${data.id}?nominee=${id}`);
    } finally {
      setIsRedirecting(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-md shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between space-x-4">
            <div className="flex space-x-4">
              <div className="flex flex-col items-center gap-2">
                <Link href={"#" /*`/user-profile/${username}` */}>
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
                  {`${county}, ${state}`}
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
                {!!profile && profile.account_role === "assistant" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        disabled={isRedirecting}
                      >
                        {isRedirecting ? "Loading..." : "Assist"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setIsOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Nomination Flow</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleAssist}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Repost Story</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <></>
                )}
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
        brand_id={id}
        onClose={() => setIsOpen(false)}
        onSuccess={onSuccess}
      />
    </>
  );
}
