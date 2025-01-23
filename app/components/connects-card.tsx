import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

interface ProfileCardProps {
  name: string;
  username: string;
  connectionType: string;
  avatar_url?: string;
  buttonText: string;
  onConnect: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  username,
  connectionType,
  avatar_url,
  onConnect,
}) => {
  const handleConnect = () => {
    onConnect();
  };

  return (
    <Card className="w-full max-w-lg p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {avatar_url ? (
              <img
                src={avatar_url}
                alt={name}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <UserCircle className="h-12 w-12 text-gray-400" />
            )}
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">{name}</h3>
            <span className="text-gray-500">{username}</span>
            <div className="mt-1">
              <span className="font-medium text-gray-600">Connection:</span>
              <span className="text-sm ml-1 text-gray-700">
                {connectionType}
              </span>
            </div>
          </div>
        </div>

        {/* Connect Button */}
        <div className="flex-shrink-0">
          <Button
            className="bg-white text-green-600 hover:text-white border border-green-600 hover:bg-green-600 transition-colors"
            onClick={handleConnect}
          >
            Connect
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
