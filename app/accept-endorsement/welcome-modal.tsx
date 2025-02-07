"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ open, onClose }: WelcomeModalProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Welcome to Our Platform
          </DialogTitle>
          <DialogDescription>
            We're excited to have you join our brand endorsement program.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          <p>You're just a few steps away from getting started:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Create a secure password</li>
            <li>Review and accept our terms</li>
            <li>Start exploring our platform</li>
          </ol>
        </div>
        <Button onClick={onClose} className="w-full mt-6">
          Let's Get Started
        </Button>
      </DialogContent>
    </Dialog>
  );
}
