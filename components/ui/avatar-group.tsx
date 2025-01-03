import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarGroupProps {
  avatars: { src: string; alt: string }[];
  max?: number;
}

export function AvatarGroup({ avatars, max = 3 }: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remainingAvatars = avatars.length - max;

  return (
    <div className="flex -space-x-2">
      {visibleAvatars.map((avatar, index) => (
        <Avatar key={index} className="w-8 h-8 border-2 border-white">
          <AvatarImage src={avatar.src} alt={avatar.alt} />
          <AvatarFallback>{avatar.alt[0]}</AvatarFallback>
        </Avatar>
      ))}
      {remainingAvatars > 0 && (
        <Avatar className="w-8 h-8 border-2 border-white bg-gray-300">
          <AvatarFallback>+{remainingAvatars}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
