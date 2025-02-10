import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Copy, Edit, Check } from "lucide-react";
import { EditProfileModal } from "./edit-profile";
import { type AccountDBO } from "@/lib/types";
import { getInitials } from "@/lib/utils";

interface AdminProfileProps {
  name: string;
  username: string;
  id: string;
  imageUrl?: string;
  can_edit?: boolean;
  [key: string]: any;
}

const AdminProfile = (props: AdminProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props?.admin_id || "NA");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto bg-white/50 backdrop-blur-sm border-neutral-200/80">
        <CardHeader className="relative pb-6">
          {props.can_edit && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 rounded-full hover:bg-neutral-100"
              onClick={() => setIsOpen(true)}
            >
              <Edit className="h-4 w-4 text-neutral-600" />
            </Button>
          )}

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <Avatar className="h-20 w-20 ring-2 ring-neutral-100">
              <AvatarImage
                src={props.imageUrl}
                alt={props.name}
                className="object-cover"
              />
              <AvatarFallback className="text-lg bg-neutral-100">
                {getInitials(props.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-center sm:items-start gap-4 flex-grow">
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold text-neutral-900 mb-1">
                  {props.name}
                </h2>
                <p className="text-sm text-neutral-500">@{props.username}</p>
              </div>

              <div className="flex items-center gap-2 bg-neutral-50 px-4 py-2 rounded-lg">
                <span className="text-sm text-neutral-600">
                  Assistant ID: {props.admin_id || "NA"}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-neutral-200"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 text-neutral-600" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-6">
          {/* Additional content can go here */}
        </CardContent>
      </Card>

      {props && (
        <EditProfileModal
          isOpen={isOpen}
          onClose={onCloseModal}
          onUpdate={() => {}}
          profileData={props as any as AccountDBO}
        />
      )}
    </>
  );
};

export default AdminProfile;
