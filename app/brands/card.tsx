"use client";

import Image from "next/image";
import { MapPin, User, Quote } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CakeShopCardProps {
  key: string
  name: string;
  index: number;
  username: string;
  location: string;
  status: "Accepted" | "Endorsed";
  testimonial: string;
  profilePhoto: string;
  onImageUpload?: (file: File) => void;
  connection?: any;
  handleConnect: (id: string) => void
}

export function CakeShopCard({
  key,
  name,
  username,
  index,
  location,
  status,
  testimonial,
  profilePhoto,
  connection,
  handleConnect,
}: CakeShopCardProps) {
  return (
    <Card className="relative w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
      <div className="absolute top-0 left-0 bg-green-600 text-white px-3 py-1 rounded-br-xl font-bold text-sm z-10">
        #{index}
      </div>
      <CardContent className="p-6 pb-0">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href={`/user-profile/${username}`} className="shrink-0">
            <Avatar className="w-24 h-24 sm:w-24 sm:h-24 border-4 border-transparent group-hover:border-green-500 transition-all duration-300">
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

          <div className="w-full text-center sm:text-left space-y-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                {name}
              </h3>
              <Link
                href={`/user-profile/${username}`}
                className="flex justify-center sm:justify-start items-center space-x-2 text-gray-500 hover:underline "
              >
                <span className="text-sm">@{username}</span>
              </Link>
            </div>

            <p className="text-sm text-gray-600 flex items-center justify-center sm:justify-start">
              <MapPin className="w-4 h-4 mr-2 text-green-600" />
              {location}
            </p>
            <span className="text-xs text-center bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
              {status}
            </span>
          </div>

          {(!connection || !connection.type) && (
            <div className="">
              <Button onClick={() => handleConnect(key)} variant="outline" className="">
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
  );
}
