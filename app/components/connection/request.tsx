import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Heart, BellRing, Plus } from "lucide-react";
import { useConnectionFlow } from "@/app/actions/connectionContext";
import { useAuth } from "@/app/actions/AuthContext";
import { getInitials } from "@/lib/utils";
import { ConnectionType } from "@/lib/types";

const userConnectionTypes: {
  type: ConnectionType;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    type: "friend",
    label: "My Friend",
    icon: <Users className="h-5 w-5" />,
  },
  {
    type: "colleague",
    label: "My Colleague",
    icon: <UserPlus className="h-5 w-5" />,
  },
  { 
    type: "folk",
    label: "My Folk",
    icon: <Heart className="h-5 w-5" />,
  },
  {
    type: "spouse",
    label: "My Spouse",
    icon: <BellRing className="h-5 w-5" />,
  },
];

const brandConnectionTypes: {
  type: ConnectionType;
  label: string;
  icon: React.ReactNode;
}[] = [
  { 
    type: "shoe",
    label: "Shoe Brand",
    icon: <Users className="h-5 w-5" />,
  },
  {
    type: "clothing",
    label: "Clothing Brand",
    icon: <UserPlus className="h-5 w-5" />,
  },
  {
    type: "cake_shop",
    label: "Cake Shop",
    icon: <Heart className="h-5 w-5" />,
  },
  {
    type: "cologne",
    label: "Cologne Brand",
    icon: <BellRing className="h-5 w-5" />,
  },
];

interface ConnectionRequestProps {
  receiverId: string;
  avatar_url: string;
  name: string;
  username: string;
}

export function ConnectionRequest({
  receiverId,
  avatar_url,
  name,
  username,
}: ConnectionRequestProps) {
  const { goToPreview, receiverProfile } = useConnectionFlow();

  const connectionTypes = receiverProfile?.is_brand
    ? brandConnectionTypes
    : userConnectionTypes;

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Connection Value</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={avatar_url} alt={name} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <h4 className="text-lg font-semibold">{name}</h4>
        <p className="text-sm text-gray-500">@{username}</p>
      </div>
      <div className="space-y-4">
        {connectionTypes.map(({ type, label, icon }) => (
          <div
            key={type}
            className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-3">
              {icon}
              <span>{label}</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPreview({ type, receiverId })}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
