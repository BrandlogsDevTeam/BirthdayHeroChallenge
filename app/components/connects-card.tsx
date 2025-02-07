import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";
import Link from "next/link";

interface ProfileCardProps {
  name: string;
  username: string;
  connectionType: string;
  avatar_url?: string;
  onConnect: () => void;
  isUser: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  username,
  connectionType,
  avatar_url,
  onConnect,
  isUser,
}) => {
  const handleConnect = () => {
    onConnect();
  };

  const getConnectionColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "My Friend": "bg-blue-100 text-blue-800",
      "My Folk": "bg-purple-100 text-purple-800",
      "My Colleague": "bg-yellow-100 text-yellow-800",
      "My Spouse": "bg-pink-100 text-pink-800",
      "My Cake Shop": "bg-green-100 text-green-800",
      "My Clothing Brand": "bg-indigo-100 text-indigo-800",
      "My Shoe Brand": "bg-red-100 text-red-800",
      "My Cologne Brand": "bg-teal-100 text-teal-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="w-full max-w-lg hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <Link href={`/brand/${username}`}>
              <Avatar className="h-16 w-16">
                <AvatarImage src={avatar_url} alt={name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>
            </Link>

            {/* User Info */}
            <Link href={`/brand/${username}`} className="mt-1">
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
                <span className="text-sm text-gray-500">@{username}</span>
                <div className="mt-2">
                  <Badge
                    variant="secondary"
                    className={`${getConnectionColor(
                      connectionType
                    )} font-medium rounded-lg text-xs sm:text-sm`}
                  >
                    {connectionType}
                  </Badge>
                </div>
              </div>
            </Link>
          </div>

          {/* Connect Button */}
          {!isUser && (
            <div className="flex-shrink-0">
              <Button
                variant="outline"
                className="bg-white text-green-600 hover:text-white border border-green-600 hover:bg-green-600 transition-colors text-xs sm:text-sm"
                onClick={handleConnect}
              >
                <UserPlus className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Connect</span>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
