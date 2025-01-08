"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { EditProfileModal } from "./edit-profile";
import { type UserProfile } from "@/lib/types";
import { useState } from "react";
import { getInitials } from "@/lib/utils";

interface AdminProfileProps {
  name: string;
  username: string;
  id: string;
  imageUrl?: string;
  can_edit?: boolean;
  user_data?: UserProfile;
}

export default function AdminProfile({
  name,
  username,
  id,
  imageUrl,
  can_edit = false,
  user_data = undefined,
}: AdminProfileProps) {
    const [isOpen, setIsOpen] = useState(false);
    const onCloseModal = () => {
      console.log('onclose')
      setIsOpen(false);
    }

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto mb-6 relative">
        {can_edit ?
          <Button variant="ghost" className="absolute top-2 right-2" onClick={() => setIsOpen(true)}>
            <Edit className="h-4 w-4" />
          </Button>
          : <></>
        }
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <Avatar className="h-16 w-16">
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
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
      {
        user_data
          ? <EditProfileModal isOpen={isOpen} onClose={onCloseModal} onUpdate={() => {}} profileData={user_data} />
          :  <></>
      }
    </>
  );
}
