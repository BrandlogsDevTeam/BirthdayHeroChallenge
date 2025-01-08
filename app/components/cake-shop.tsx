import Image from "next/image";
import { MapPin, Plus, User } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { getInitials } from "@/lib/utils";

interface CakeShopCardProps {
  name: string;
  location: string;
  status: "Accepted" | "Endorsed";
  testimonial: string;
  profilePhoto: string;
  onImageUpload?: (file: File) => void;
}

export function CakeShopCard({
  name,
  location,
  status,
  testimonial,
  profilePhoto,
  onImageUpload,
}: CakeShopCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between space-x-4">
          <div className="flex space-x-4">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="w-16 h-16 cursor-pointer">
                <AvatarImage src={profilePhoto} alt={name} />
                <AvatarFallback>
                  <User className="w-6 h-6 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
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
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              {status}
            </span>
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
  );
}
