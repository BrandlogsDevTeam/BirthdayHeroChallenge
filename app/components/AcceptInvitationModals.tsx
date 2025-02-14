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
import { Check, Loader, LoaderCircle } from "lucide-react";
import {
  signUpRequest,
  validateInvitation,
  validateOTPRequest,
} from "@/lib/supabase/server-extended/serviceRole";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import LoginModal from "./auth/login-modal";
type ModalStep =
  | "closed"
  | "welcome"
  | "profile"
  | "signup"
  | "loading"
  | "success";

export function AcceptNomination() {
  const [currentStep, setCurrentStep] = useState<ModalStep>("closed");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [birthday, setBirthday] = useState({ month: "", day: "", year: "" });
  const [password, setPassword] = useState("");
  const [inviteData, setInviteData] = useState<any>({});
  const [code, setCode] = useState("");
  const [signUpStatus, setSignUpStatus] = useState<
    "pending" | "otp" | "success" | "error"
  >("pending");
  const [otpLoading, setOTPLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setCurrentStep("closed");
    router.push("/login");
  };

  const handleNext = async () => {
    switch (currentStep) {
      case "welcome":
        try {
          setError("");
          setIsLoading(true);
          if (!instagramHandle.trim()) {
            setError("Instagram handle is required");
            setIsLoading(false);
            return;
          }
          const { data, error } = await validateInvitation(instagramHandle);
          if (error) {
            setCurrentStep("welcome");
            setError(error);
            setIsLoading(false);
            return;
          }
          if (data) {
            setError("");
            setInviteData(data);
            setIsLoading(false);
            setCurrentStep("profile");
          }
        } catch (error) {
          console.error(error);
          setError("Unhandled error");
          setIsLoading(false);
        }
        break;
      case "profile":
        setCurrentStep("signup");
        break;
      case "signup":
        setCurrentStep("success");
        break;
      case "success":
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
      case "signup":
        setCurrentStep("profile");
        break;
    }
  };

  const handleSignUp = async () => {
    setOTPLoading(true);
    try {
      const { message, error } = await signUpRequest(
        inviteData.username,
        email,
        password,
        new Date(
          `${birthday.year}-${birthday.month}-${birthday.day}`
        ).toISOString(),
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        true
      );
      if (error) throw error;

      setSignUpStatus("otp");
      setOTPLoading(false);
    } catch (error) {
      console.error(error);
      setOTPLoading(false);
    }
  };

  const handleOTP = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await validateOTPRequest(email, code);
      if (error) throw error;

      setIsLoading(false);
      handleNext();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (currentStep === "loading" || currentStep === "signup") return;
    setCurrentStep("closed");
    setInstagramHandle("");
    setEmail("");
    setBirthday({ month: "", day: "", year: "" });
    setPassword("");
  };

  return (
    <>
      <Button
        className="bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
        onClick={() => setCurrentStep("welcome")}
      >
        Accept Nomination / Login
      </Button>

      <Dialog open={currentStep !== "closed"} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentStep !== "success" ? "" : "Success"}
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
                <p className="text-center mb-4 text-xl text-gray-800">
                  To get rewarded $250 Gift Bonus to ensure no child goes to bed
                  hungry
                </p>
                <label>
                  <Input
                    id="instagramHandle"
                    placeholder="Enter your nomination code..."
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                  />
                </label>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <div className="flex flex-col gap-4 items-center justify-center w-full">
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={handleNext}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Get Started
                </Button>
                <p>
                  Already have an account?{" "}
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                    className="text-green-600 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </>
          )}

          {currentStep === "profile" && (
            <>
              <div className="flex flex-col items-center justify-center gap-2">
                <span className="text-gray-800 text-lg mb-4">
                  Congratulations!
                </span>
                <div className="w-24 h-24 rounded-full ring-4 ring-blue-500 overflow-hidden">
                  <Avatar className="w-24 h-24 rounded-full">
                    <AvatarImage
                      src={inviteData?.avatar_url}
                      alt={inviteData?.name}
                    />
                    <AvatarFallback>
                      {getInitials(inviteData?.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <span className="font-semibold text-gray-800">
                  {inviteData?.name}
                </span>
                <span className="text-gray-500 text-sm">
                  @{inviteData?.username}
                </span>
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
                  Continue
                </Button>
              </DialogFooter>
            </>
          )}

          {currentStep === "signup" && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="birthday"
                    className="block text-sm font-medium text-gray-700"
                  >
                    When's your birthday?
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="month"
                      name="month"
                      value={birthday.month}
                      onChange={(e) =>
                        setBirthday({ ...birthday, month: e.target.value })
                      }
                      defaultValue={""}
                      className="flex-1 text-sm rounded-md px-2 py-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    >
                      <option value="">Select Month</option>
                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                    <select
                      id="day"
                      name="day"
                      value={birthday.day}
                      onChange={(e) =>
                        setBirthday({ ...birthday, day: e.target.value })
                      }
                      defaultValue={""}
                      className="flex-1 rounded-md text-sm px-2 py-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    >
                      <option value="">Select Day</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <select
                      id="year"
                      name="year"
                      value={birthday.year}
                      onChange={(e) =>
                        setBirthday({ ...birthday, year: e.target.value })
                      }
                      defaultValue={""}
                      className="flex-1 text-sm rounded-md px-2 py-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 70 }, (_, i) => (
                        <option
                          key={i}
                          value={new Date().getFullYear() - 10 - i}
                        >
                          {new Date().getFullYear() - 10 - i}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Verification code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      id="code"
                      name="code"
                      placeholder="Enter 6-digit code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    />
                    <button
                      disabled={otpLoading}
                      type="button"
                      onClick={handleSignUp}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      {otpLoading ? (
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        "Send code"
                      )}
                    </button>
                  </div>
                </div>
                <p className="text-xs text-center text-gray-500 mt-4">
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-green-500 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and acknowledge that you have read our{" "}
                  <a href="#" className="text-green-500 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
                <button
                  disabled={signUpStatus !== "otp" || isLoading}
                  onClick={handleOTP}
                  className="w-full px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  {isLoading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    "Accept Nomination"
                  )}
                </button>
              </div>
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
                    handleClose();
                    setTimeout(() => setIsLoginModalOpen(true), 700);
                  }}
                >
                  Proceed to Login
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setTimeout(() => setIsLoginModalOpen(false), 0);
        }}
      />
    </>
  );
}
