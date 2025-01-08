import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminProfileProps {
  name: string;
  username: string;
  id: string;
  imageUrl?: string;
}

export default function AdminProfile({
  name,
  username,
  id,
  imageUrl,
}: AdminProfileProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="w-full max-w-3xl mx-auto mb-6">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{name}</CardTitle>
          <p className="text-sm text-muted-foreground">@{username}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Admin ID: {id}</p>
      </CardContent>
    </Card>
  );
}
