import Image from "next/image";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";

interface CakeShopCardProps {
  name: string;
  location: string;
  status: "Accepted" | "Endorsed";
  testimonial: string;
  profilePhoto: string;
}

export function CakeShopCard({
  name,
  location,
  status,
  testimonial,
  profilePhoto,
}: CakeShopCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between space-x-4">
          <div className="flex space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={profilePhoto} alt={name} />
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-600 flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {location}
              </p>
            </div>
          </div>
          <Badge
            variant={
              status === "Accepted"
                ? "default"
                : status === "Endorsed"
                ? "secondary"
                : "destructive"
            }
          >
            {status}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t">
        <p className="text-gray-700 text-sm italic">"{testimonial}"</p>
      </CardFooter>
    </Card>
  );
}
