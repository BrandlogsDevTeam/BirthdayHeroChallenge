"use client";

import { useRef, useState } from "react";
import { Modal } from "./modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { type UserProfile } from "@/lib/types";
import { getInitials } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid"
import { updateProfile, uploadAvatar } from "@/lib/supabase/server-extended/userProfile";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: UserProfile;
  onUpdate: (data: Partial<UserProfile>) => void;
}

export function EditProfileModal({
  isOpen,
  onClose,
  profileData,
  onUpdate,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState(profileData);
  const changed = useRef(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    changed.current = true;
  };

  const handleClose = () => {
    if (changed.current && !confirm("You have unsaved changes. Are you sure you want to close?")) {
      return;
    } else {
      changed.current = false;
      setFormData(profileData);
      onClose();
    }
  }

  const handleUploadAvatar = async (e: any) => {
    e.preventDefault()
    const file: any = e.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = `${fileName}`

    const { data, error } = await uploadAvatar(filePath, file)
    if (error || !data) {
      console.error(error || "Failed to upload avatar")
      return
    }
    changed.current = true;
    setFormData(f => ({ ...f, avatar_url: data }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('onsubmit')
    e.preventDefault();
    if (!changed.current) {
      onClose();
      return;
    }

    await updateProfile(formData);
    changed.current = false;
    onClose();
    // use better way to refresh the page
    window.location.reload();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={formData.avatar_url} />
              <AvatarFallback>{getInitials(profileData.name)}</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault()
                fileInput.current?.click()
              }}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Input type="file" className="hidden" name="avatar" id="avatar" onChange={handleUploadAvatar} ref={fileInput} />
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
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
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
}
