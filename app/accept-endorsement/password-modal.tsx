"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface PasswordModalProps {
  open: boolean;
  onPasswordCreated: () => void;
}

export default function PasswordModal({
  open,
  onPasswordCreated,
}: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (pass: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumbers = /\d/.test(pass);
    const hasNonalphas = /\W/.test(pass);
    return (
      pass.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasNonalphas
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password doesn't meet complexity requirements");
      return;
    }
    // Here you would typically send the password to your server
    onPasswordCreated();
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create Your Password
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-sm space-y-2">
            <p>Password must contain:</p>
            <ul className="space-y-1">
              <PasswordRequirement met={password.length >= 8}>
                At least 8 characters
              </PasswordRequirement>
              <PasswordRequirement met={/[A-Z]/.test(password)}>
                One uppercase letter
              </PasswordRequirement>
              <PasswordRequirement met={/[a-z]/.test(password)}>
                One lowercase letter
              </PasswordRequirement>
              <PasswordRequirement met={/\d/.test(password)}>
                One number
              </PasswordRequirement>
              <PasswordRequirement met={/\W/.test(password)}>
                One special character
              </PasswordRequirement>
            </ul>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            Create Password
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function PasswordRequirement({
  met,
  children,
}: {
  met: boolean;
  children: React.ReactNode;
}) {
  return (
    <li
      className={`flex items-center space-x-2 ${
        met ? "text-green-600" : "text-gray-600"
      }`}
    >
      {met ? (
        <CheckCircle2 className="w-4 h-4" />
      ) : (
        <AlertCircle className="w-4 h-4" />
      )}
      <span>{children}</span>
    </li>
  );
}
