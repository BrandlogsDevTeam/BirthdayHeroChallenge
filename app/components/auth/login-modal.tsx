"use client";

import { signIn } from "@/app/actions/auth";
import { LoginForm } from "./login-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/app/actions/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {

  const { revalidate } = useAuth()

  const handleSignIn = async (formData: FormData) => {
    const result = await signIn(formData);
    if (result.success) {
      await revalidate();
      onClose();
    }
    return result;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <LoginForm signIn={handleSignIn} />
      </DialogContent>
    </Dialog>
  );
}