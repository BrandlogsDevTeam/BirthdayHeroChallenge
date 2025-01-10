"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Instagram, LoaderCircle } from "lucide-react";
import {
  checkEmailExists,
  signUpOTPRequest,
  signUpRequest,
  validateInvitation,
} from "@/lib/supabase/server-extended/serviceRole";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { useRouter } from "next/navigation";

type ModalStep =
  | "closed"
  | "welcome"
  | "profile"
  | "email"
  | "personalInfo"
  | "terms"
  | "loading"
  | "createPassword"
  | "emailOTP"
  | "success";

export function AcceptNomination() {
  const [currentStep, setCurrentStep] = useState<ModalStep>("closed");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [password, setPassword] = useState("");
  const [otPassword, setOTPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteData, setInviteData] = useState<any>({});
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  const router = useRouter();

  // Password validation function
  const validatePassword = (value: string) => {
    setPasswordValidation({
      minLength: value.length >= 8,
      hasUppercase: /[A-Z]/.test(value),
      hasLowercase: /[a-z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  // Check if password meets all requirements
  const isPasswordValid = () => {
    return Object.values(passwordValidation).every((value) => value === true);
  };

  const handleNext = async () => {
    switch (currentStep) {
      case "welcome":
        if (!instagramHandle.trim()) {
          alert("Please enter your instagram handle");
          return;
        }
        setCurrentStep("loading");
        await (async () => {
          const { data, error } = await validateInvitation(instagramHandle);
          if (error) {
            setCurrentStep("welcome");
            alert(error);
          }
          if (data) {
            setInviteData(data);
            setCurrentStep("profile");
          }
        })();
        break;
      case "profile":
        setCurrentStep("email");
        break;
      case "email":
        setCurrentStep("loading");
        await (async () => {
          const { exists, error } = await checkEmailExists(email);
          if (exists) {
            setCurrentStep("personalInfo");
          } else {
            setCurrentStep("email");
            alert(error || "User with this email already exists. Please log in.");
          }
        })();
        break;
      case "personalInfo":
        setCurrentStep("terms");
        break;
      case "terms":
        setCurrentStep("createPassword");
        break;
      case "createPassword":
        if (password === confirmPassword && password !== "") {
          setCurrentStep("loading");
          const { error } = await signUpRequest(
            email,
            password,
            termsAccepted,
            {
              gender,
              birthDate,
              instagramHandle,
            }
          );

          if (error) {
            alert(error);

            if (error === "Invitation not found") {
              handleClose()
              return;
            }
            setCurrentStep("createPassword");
            return;
          }

          setCurrentStep("emailOTP");
        } else {
          alert("Passwords do not match or are empty");
        }
        break;
      case "emailOTP":
        if (!otPassword || otPassword.trim().length !== 6) {
          alert("Invalid OTP");
          return;
        } else {
          setCurrentStep("loading");
          const { error } = await signUpOTPRequest(email, otPassword);
          if (!error) {
            setCurrentStep("success");
          } else {
            alert("Invalid OTP. Please try again.");
            setCurrentStep("emailOTP");
          }
        }
        break;
      case "success":
        // Here you would typically handle the final submission
        console.log("Sign up process completed");
        setCurrentStep("closed");
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case "profile":
        setCurrentStep("welcome");
        break;
      case "email":
        setCurrentStep("profile");
        break;
      case "personalInfo":
        setCurrentStep("email");
        break;
      case "terms":
        setCurrentStep("personalInfo");
        break;
      case "createPassword":
        setCurrentStep("terms");
        break;
    }
  };

  const handleClose = () => {
    if (currentStep === "loading" || currentStep === "emailOTP") return;
    setCurrentStep("closed");
    setInstagramHandle("");
    setEmail("");
    setGender("");
    setBirthDate("");
    setTermsAccepted(false);
    setPassword("");
    setConfirmPassword("");
    setPasswordValidation({
      minLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecial: false,
    });
  };

  // Password requirement indicator component
  const PasswordRequirement = ({
    met,
    text,
  }: {
    met: boolean;
    text: string;
  }) => (
    <div className="flex items-center gap-2">
      <div
        className={`w-4 h-4 rounded-full flex items-center justify-center ${
          met ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        {met && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className={`text-sm ${met ? "text-green-500" : "text-gray-500"}`}>
        {text}
      </span>
    </div>
  );

  return (
    <>
      <Button
        className="bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
        onClick={() => setCurrentStep("welcome")}
      >
        Accept Nomination
      </Button>

      <Dialog open={currentStep !== "closed"} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentStep !== "success" ? "Accept Nomination" : "Success"}
            </DialogTitle>
          </DialogHeader>

          {currentStep === "loading" && (
            <>
              <div className="space-y-4">
                <div className="text-center">
                  <LoaderCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-spin" />
                </div>
                <p className="text-center text-gray-600">
                  Loading! Please wait...
                </p>
              </div>
            </>
          )}

          {currentStep === "welcome" && (
            <>
              <div className="space-y-4">
                <div className="text-center">
                  <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <span className="text-2xl font-bold text-green-500">
                    Welcome!
                  </span>
                  <p className="font-semibold text-xl text-green-500">
                    To the age of hunger liberation
                  </p>
                </div>
                <p className="text-center text-gray-600">
                  To get started, please provide your nominated Instagram
                  handle:
                </p>
                <Label
                  className="flex items-center gap-2"
                  htmlFor="instagramHandle"
                >
                  Instagram handle
                  <Instagram className="w-5 h-5" />
                </Label>
                <Input
                  id="instagramHandle"
                  placeholder="@username"
                  value={instagramHandle}
                  onChange={(e) => setInstagramHandle(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={handleNext}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </>
          )}

          {currentStep === "profile" && (
            <>
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-24 h-24 rounded-full ring-4 ring-blue-500 overflow-hidden">
                  <Avatar className="w-24 h-24 rounded-full">
                    <AvatarImage src={inviteData?.avatar_url} alt={inviteData?.name} />
                    <AvatarFallback>{getInitials(inviteData?.name)}</AvatarFallback>
                  </Avatar>
                </div>
                <span className="font-semibold text-gray-800">{inviteData?.name}</span>
                <span className="text-gray-500 text-sm">@{inviteData?.username}</span>
                <div className="flex flex-col text-center text-lg font-semibold">
                  <span className="text-gray-800">Birthday Hero Challenge</span>
                  <span className="text-gray-800">
                    Co-creator Award Nominee
                  </span>
                </div>
              </div>
              <DialogFooter className="flex items-center justify-center w-full">
                <Button
                  className="bg-green-600 text-white hover:bg-green-700 mx-auto"
                  onClick={handleNext}
                >
                  Get Started
                </Button>
              </DialogFooter>
              <p className="text-center text-gray-600 text-sm">
                To Get Rewarded $250+ Gift bonus and Cake Giveaway
                <br />
                To ensure no child goes to bed hungry
              </p>
            </>
          )}

          {currentStep === "email" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Enter email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={handleNext}
                >
                  Continue
                </Button>
              </DialogFooter>
            </>
          )}

          {currentStep === "personalInfo" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="gender">Select Gender</Label>
                <Select onValueChange={(value) => setGender(value)}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <div className="mt-4">
                  <Label htmlFor="birthDate">Date of Birth</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={handleNext}
                >
                  Continue
                </Button>
              </DialogFooter>
            </>
          )}

          {currentStep === "terms" && (
            <>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  By clicking proceed, you accept our
                  <a href="#" className="text-green-500">
                    {" "}
                    Terms of Use{" "}
                  </a>{" "}
                  and
                  <a href="#" className="text-green-500">
                    {" "}
                    Privacy Policy
                  </a>
                  .
                </p>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    className="text-blue-500"
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) =>
                      setTermsAccepted(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the terms and conditions
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={handleNext}
                  disabled={!termsAccepted}
                >
                  Accept
                </Button>
              </DialogFooter>
            </>
          )}

          {currentStep === "createPassword" && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Create Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Password must contain:
                  </p>
                  <div className="space-y-2">
                    <PasswordRequirement
                      met={passwordValidation.minLength}
                      text="At least 8 characters"
                    />
                    <PasswordRequirement
                      met={passwordValidation.hasUppercase}
                      text="At least one uppercase letter"
                    />
                    <PasswordRequirement
                      met={passwordValidation.hasLowercase}
                      text="At least one lowercase letter"
                    />
                    <PasswordRequirement
                      met={passwordValidation.hasNumber}
                      text="At least one number"
                    />
                    <PasswordRequirement
                      met={passwordValidation.hasSpecial}
                      text="At least one special character"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={handleNext}
                  disabled={!isPasswordValid() || password !== confirmPassword}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </>
          )}

          {currentStep === "emailOTP" && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-otp">
                    Enter OTP to verify your email
                  </Label>
                  <Input
                    id="email-otp"
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={otPassword}
                    onChange={(e) => setOTPassword(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={handleNext}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </>
          )}

          {currentStep === "success" && (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <DialogTitle className="text-center">
                  Nomination accepted successfully!
                </DialogTitle>
                <p className="mt-2 text-gray-600 text-center">
                  Your account has been created successfully! You can now login
                  to see your profile.
                </p>
              </div>
              <DialogFooter>
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Proceed to Login
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
