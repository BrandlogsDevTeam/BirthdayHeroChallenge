"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validations, setValidations] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecial: false,
    hasUppercase: false,
    hasLowercase: false,
    matches: false,
  });
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    setValidations({
      minLength: newPassword.length >= 8,
      hasNumber: /\d/.test(newPassword),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      hasUppercase: /[A-Z]/.test(newPassword),
      hasLowercase: /[a-z]/.test(newPassword),
      matches: newPassword === confirmPassword && newPassword !== "",
    });
  }, [newPassword, confirmPassword]);

  const isPasswordValid = Object.values(validations).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast({
        title: "Invalid password",
        description: "Please ensure all password requirements are met.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: "Check your email",
        description: "We've sent you a password reset link.",
        className: "bg-green-50 border-green-200 text-green-600",
      });
      router.push("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const ValidationItem = ({
    isValid,
    text,
  }: {
    isValid: boolean;
    text: string;
  }) => (
    <div className="flex items-center space-x-2">
      {isValid ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-red-500" />
      )}
      <span
        className={`text-sm ${isValid ? "text-green-500" : "text-red-500"}`}
      >
        {text}
      </span>
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-2xl font-bold text-center text-green-600">
            Reset Your Password
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className={`${
                newPassword && !isPasswordValid ? "border-red-500" : ""
              }`}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`${
                confirmPassword && !validations.matches ? "border-red-500" : ""
              }`}
            />
          </div>

          <div className="space-y-2 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium text-sm text-gray-700 mb-2">
              Password Requirements:
            </h3>
            <div className="space-y-2">
              <ValidationItem
                isValid={validations.minLength}
                text="At least 8 characters long"
              />
              <ValidationItem
                isValid={validations.hasUppercase}
                text="Contains an uppercase letter"
              />
              <ValidationItem
                isValid={validations.hasLowercase}
                text="Contains a lowercase letter"
              />
              <ValidationItem
                isValid={validations.hasNumber}
                text="Contains a number"
              />
              <ValidationItem
                isValid={validations.hasSpecial}
                text="Contains a special character"
              />
              <ValidationItem
                isValid={validations.matches}
                text="Passwords match"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 text-white hover:bg-green-700 hover:text-white"
            disabled={!isPasswordValid}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
