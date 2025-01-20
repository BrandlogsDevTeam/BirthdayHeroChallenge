"use client";

import { useRef, useState } from "react";
import { Modal } from "../modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { BrandProfile } from "@/lib/types";
import { uploadAvatar } from "@/lib/supabase/server-extended/userProfile";
import { v4 as uuidv4 } from "uuid";
import { updateBrandProfile } from "@/lib/supabase/server-extended/brandProfile";
import { useRouter } from "next/navigation";

interface BrandProps {
  id: string;
  name: string;
  username: string;
  avatar_url: string;
  location: string;
  endorsement_message: string;
}

interface EditBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: BrandProps;
}

export const EditBrandModal = ({
  isOpen,
  onClose,
  brand,
}: EditBrandModalProps) => {
  const [formData, setFormData] = useState(brand);
  const fileInput = useRef<HTMLInputElement>(null);
  const changed = useRef(false);
  const router = useRouter();

  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await uploadAvatar(filePath, file);
    if (error || !data) {
      console.error(error || "Failed to upload avatar");
      return;
    }
    changed.current = true;
    setFormData((f) => ({ ...f, avatar_url: data }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!changed.current) {
      onClose();
      return;
    }
    await updateBrandProfile(formData);
    changed.current = false;
    onClose();
    router.refresh();
  };

  const handleClose = () => {
    if (
      changed.current &&
      !confirm("You have unsaved changes. Are you sure you want to close?")
    ) {
      return;
    } else {
      changed.current = false;
      setFormData(brand);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={formData.avatar_url} />
              <AvatarFallback>{getInitials(formData.name)}</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                fileInput.current?.click();
              }}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Input
          type="file"
          className="hidden"
          name="avatar"
          multiple={false}
          accept="image/*"
          id="avatar"
          onChange={handleUploadAvatar}
          ref={fileInput}
        />
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endorsement_message">Bio</Label>
          <Textarea
            id="endorsement_message"
            name="endorsement_message"
            value={formData.endorsement_message}
            onChange={handleInputChange}
            rows={3}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
};
