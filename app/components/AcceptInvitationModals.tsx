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
import { X, Check, Instagram } from "lucide-react";
import Image from "next/image";

type ModalStep =
  | "closed"
  | "welcome"
  | "profile"
  | "email"
  | "personalInfo"
  | "terms"
  | "createPassword"
  | "success";

export function AcceptNomination() {
  const [currentStep, setCurrentStep] = useState<ModalStep>("closed");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNext = () => {
    switch (currentStep) {
      case "welcome":
        setCurrentStep("profile");
        break;
      case "profile":
        setCurrentStep("email");
        break;
      case "email":
        setCurrentStep("personalInfo");
        break;
      case "personalInfo":
        setCurrentStep("terms");
        break;
      case "terms":
        setCurrentStep("createPassword");
        break;
      case "createPassword":
        if (password === confirmPassword && password !== "") {
          setCurrentStep("success");
        } else {
          alert("Passwords do not match or are empty");
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
    setCurrentStep("closed");
    // Reset all form fields
    setInstagramHandle("");
    setEmail("");
    setGender("");
    setBirthDate("");
    setTermsAccepted(false);
    setPassword("");
    setConfirmPassword("");
  };

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
                <div className="w-24 h-24 rounded-full ring-1 ring-blue-500 overflow-hidden">
                  <Image
                    src="https://randomuser.me/api/portraits/men/2.jpg"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <span className="text-gray-800">Charlie Chaplain</span>
                <span className="text-gray-500 text-sm">@charliechap</span>
                <div className="flex flex-col text-lg font-semibold">
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
                    onChange={(e) => setPassword(e.target.value)}
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
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
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
                  onClick={handleNext}
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
