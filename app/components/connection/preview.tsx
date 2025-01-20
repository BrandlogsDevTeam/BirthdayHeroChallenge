import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Heart, BellRing } from "lucide-react";
import { useConnectionFlow } from "@/app/actions/connectionContext";

type ConnectionType = "friend" | "colleague" | "folk" | "spouse";

const connectionIcons: Record<ConnectionType, React.ReactNode> = {
  friend: <Users className="h-5 w-5" />,
  colleague: <UserPlus className="h-5 w-5" />,
  folk: <Heart className="h-5 w-5" />,
  spouse: <BellRing className="h-5 w-5" />,
};

export function ConnectionPreview() {
  const { selectedType, goToSuccess } = useConnectionFlow();

  if (!selectedType) return null;

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Connection Value Preview</DialogTitle>
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
      <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          {connectionIcons[selectedType]}
          <span>
            My {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
          </span>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={goToSuccess}>Request Connection</Button>
      </div>
    </div>
  );
}
