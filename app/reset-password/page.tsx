"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, Eye, EyeOff, Key, Lock, Mail, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  requestOTP,
  updatePassword,
  verifyOTP,
} from "@/lib/supabase/server-extended/userProfile";
import { useAuth } from "../actions/AuthContext";

export default function ResetPassword() {
  const [step, setStep] = useState<"email" | "otp" | "password">("email");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const { revalidate } = useAuth();

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

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email.trim() && !validateEmail(email)) {
      toast("Error", "destructive", {
        description: "Please check your email address and try again.",
      });
      return;
    }

    try {
      const { error } = await requestOTP(email);
      if (error) throw error;

      toast("Check your email", "default", {
        description: "We've sent you a password reset OTP.",
      });

      setStep("otp");
    } catch (error) {
      console.error(error);
      toast("Error", "destructive", {
        description: "Failed to verify email. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!otp.trim()) {
      toast("Error", "destructive", {
        description: "Please check input again.",
      });
      return;
    }

    try {
      const { error } = await verifyOTP(email, otp);
      if (error) throw error;
      setStep("password");
    } catch (error) {
      console.error(error);
      toast("Error", "destructive", {
        description: "Failed to verity OTP. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isPasswordValid) {
      toast("Invalid password", "destructive", {
        description: "Plese ensure all password requirements are met",
      });
      return;
    }

    try {
      const { error } = await updatePassword(newPassword);
      if (error) throw error;

      toast("Password updated", "default", {
        description: "Your new password has been updated successfully!",
        className: "bg-green-50 border-green-200 text-green-600",
        duration: 3000,
      });

      window.location.replace("/");
    } catch (error) {
      console.error(error);
      toast("Error", "destructive", {
        description: "Failed to reset password. Please try again.",
        duration: 3000,
      });
    } finally {
      setLoading(false);
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

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const hasUnmetRequirements = Object.values(validations).some((v) => !v);

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-2xl font-bold text-center text-green-600">
              Reset Your Password
            </h2>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full space-y-8 p-4">
          {step === "email" && (
            <form onSubmit={handleRequestOTP} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <div className="relative">
                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value.replace(/\D/g, ""))}
                    maxLength={6}
                    required
                    className="pl-10"
                  />
                  <Key
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code sent to {email}
                </p>
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          )}

          {step === "password" && (
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="pl-10 pr-10"
                  />
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pl-10 pr-10"
                  />
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              {hasUnmetRequirements && (
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
              )}

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!isPasswordValid || loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
