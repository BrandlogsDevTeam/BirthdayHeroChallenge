import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface ProfileCardProps {
  name?: string;
  username?: string;
  avatar_url?: string;
  assistantId?: string;
}

export default function ProfileCard({
  name,
  username,
  avatar_url,
  assistantId,
}: ProfileCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-6 flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          {avatar_url ? (
            <AvatarImage src={avatar_url} alt={name} />
          ) : (
            <AvatarFallback>
              <User className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-sm text-muted-foreground">@{username}</p>
          <p className="text-xs text-muted-foreground mt-1">
            ID: {assistantId || "N/A"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
