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
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const { revalidate } = useAuth();
  const router = useRouter();

  const handleSignIn = async (formData: FormData) => {
    const result = await signIn(formData);
    if (result.success) {
      await revalidate();
      
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        router.refresh();
        router.push("/");
      }
      
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