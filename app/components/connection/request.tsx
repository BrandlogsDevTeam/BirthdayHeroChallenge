import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Heart, BellRing, Plus } from "lucide-react";
import { useConnectionFlow } from "@/app/actions/connectionContext";

type ConnectionType = "friend" | "colleague" | "folk" | "spouse";

const connectionTypes: {
  type: ConnectionType;
  label: string;
  icon: React.ReactNode;
}[] = [
  { type: "friend", label: "My Friend", icon: <Users className="h-5 w-5" /> },
  {
    type: "colleague",
    label: "My Colleague",
    icon: <UserPlus className="h-5 w-5" />,
  },
  { type: "folk", label: "My Folk", icon: <Heart className="h-5 w-5" /> },
  {
    type: "spouse",
    label: "My Spouse",
    icon: <BellRing className="h-5 w-5" />,
  },
];

export function ConnectionRequest() {
  const { goToPreview } = useConnectionFlow();

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Connection Value</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src="https://randomuser.me/api/portraits/women/99.jpg"
            alt="Winnie Neigh"
          />
          <AvatarFallback>WN</AvatarFallback>
        </Avatar>
        <h4 className="text-lg font-semibold">Winnie Neigh</h4>
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
              onClick={() => goToPreview(type)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
