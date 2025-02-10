"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConnectionType, ConnectionTypeMap } from "@/lib/types";
import { useAuth } from "../actions/AuthContext";
import { getConnectionColor } from "@/lib/utils";
interface ProfileCardProps {
  name: string;
  username: string;
  connectionType: string;
  avatar_url?: string;
  onConnect: () => void;
  isUser: boolean;
  url: string;
  id: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  username,
  connectionType,
  avatar_url,
  onConnect,
  isUser,
  url,
  id,
}) => {
  const handleConnect = () => {
    onConnect();
  };

  const { profile } = useAuth();

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
            <Link href={url}>
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
                    {ConnectionTypeMap[connectionType]}
                  </Badge>
                </div>
              </div>
            </Link>
          </div>

          {/* Connect Button */}
          {!isUser && profile?.id !== id && (
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
