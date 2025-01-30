"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { requestOTP, updatePassword, verifyOTP } from "@/lib/supabase/server-extended/userProfile";
import { validateEmail } from "@/lib/utils";

export default function ResetPassword() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

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

      const { error } = await updatePassword(confirmPassword)

      if (error)
        throw error

      router.push("/");
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
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

  const handleSubmitOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 'email') {
      if (!email.trim() && validateEmail(email)) {
        toast({
          title: "Error",
          description: "Please check email and again.",
          variant: "destructive",
        });
        return;
      }

      try {
        const { error } = await requestOTP(email)
        if (error)
          throw error

        toast({
          title: "Check your email",
          description: "We've sent you a password reset link.",
          className: "bg-green-50 border-green-200 text-green-600",
        });

        setStep('otp')
      } catch (error) {
        console.error(error)
        toast({
          title: "Error",
          description: "Failed to verifiy Email. Please try again.",
          variant: "destructive",
        });
      }
    } else {

      if (!email.trim() || !otp.trim()) {
        toast({
          title: "Error",
          description: "Please check input again.",
          variant: "destructive",
        });
        return;
      }

      try {
        const { error } = await verifyOTP(email, otp)
        if (error)
          throw error
        setStep('password')
      } catch (error) {
        console.error(error)
        toast({
          title: "Error",
          description: "Failed to verify OTP. Please try again.",
          variant: "destructive",
        });
      }
    }
  };


  return (
    <Dialog open={true} onOpenChange={() => { }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-2xl font-bold text-center text-green-600">
              Reset Your Password
            </h2>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full max-w-md space-y-8 p-8">
          {(step === 'email' || step === 'otp') ?
            <form className="space-y-6" onSubmit={handleSubmitOTP}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(em => step === 'email' ? e.target.value : em)}
                  disabled={step !== 'email'}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otp-input">OTP</Label>
                <Input
                  id="otp-input"
                  type="password"
                  value={otp}
                  onChange={(e) => setOTP(em => step === 'otp' ? e.target.value : em)}
                  disabled={step !== 'otp'}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 text-white hover:bg-green-700 hover:text-white"
              >
                {step === 'email' ? 'Request' : 'Verifiy'} OTP
              </Button>
            </form>
            :
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className={`${newPassword && !isPasswordValid ? "border-red-500" : ""
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
                  className={`${confirmPassword && !validations.matches ? "border-red-500" : ""
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
          }
        </div>
      </DialogContent>
    </Dialog>
  );
}
