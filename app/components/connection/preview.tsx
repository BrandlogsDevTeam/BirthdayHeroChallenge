import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Heart, BellRing } from "lucide-react";
import { useConnectionFlow } from "@/app/actions/connectionContext";
import { useState } from "react";

type ConnectionType = "friend" | "colleague" | "folk" | "spouse";

const connectionIcons: Record<ConnectionType, React.ReactNode> = {
  friend: <Users className="h-5 w-5" />,
  colleague: <UserPlus className="h-5 w-5" />,
  folk: <Heart className="h-5 w-5" />,
  spouse: <BellRing className="h-5 w-5" />,
};

export function ConnectionPreview() {
  const { selectedType, receiverId, receiverProfile, goToSuccess } =
    useConnectionFlow();
  const [isLoading, setIsLoading] = useState(false);

  if (!selectedType || !receiverProfile || !receiverId) return null;

  const handleRequestConnection = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/connections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverId,
          connectionType: selectedType,
        }),
      });

      console.log({ receiverId, selectedType });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send connection request");
      }

      goToSuccess();
    } catch (error) {
      console.error("Error sending connection request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Connection Value Preview</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={receiverProfile.avatar_url}
            alt={receiverProfile.name}
          />
          <AvatarFallback>
            {receiverProfile.name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h4 className="text-lg font-semibold">{receiverProfile.name}</h4>
        <p className="text-sm text-gray-500">@{receiverProfile.username}</p>
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
        <Button
          className="bg-green-600 text-white hover:bg-green-700 hover:text-white transition-colors"
          onClick={handleRequestConnection}
          disabled={isLoading}
        >
          {isLoading ? "Sending Request..." : "Request Connection"}
        </Button>
      </div>
    </div>
  );
}
