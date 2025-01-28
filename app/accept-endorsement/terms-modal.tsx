"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface TermsModalProps {
  open: boolean;
  onTermsAccepted: () => void;
}

export default function TermsModal({ open, onTermsAccepted }: TermsModalProps) {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      onTermsAccepted();
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Terms of Use</DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          <p>
            Before you start using our platform, please review and accept our
            terms and conditions:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <Link
                href="/privacy-policy"
                className="text-blue-600 hover:underline"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-use"
                className="text-blue-600 hover:underline"
              >
                Terms of Use
              </Link>
            </li>
          </ul>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
            />
            <Label htmlFor="terms">
              I have read and agree to the Privacy Policy and Terms of Use
            </Label>
          </div>
        </div>
        <Button
          onClick={handleAccept}
          className="w-full mt-6"
          disabled={!accepted}
        >
          Accept and Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}
