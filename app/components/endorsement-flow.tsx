"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Loader, Plus } from "lucide-react";
import { v4 as uuid } from "uuid";
import { uploadImage } from "@/lib/supabase/server-extended/userProfile";
import { endorseBrand } from "@/lib/supabase/server-extended/brandProfile";
import { BrandProfile, AccountDBO } from "@/lib/types";
import ErrorMessage from "./error";

interface EndorsementFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onNewEndorsement: (data: AccountDBO) => void;
}

interface ExistingBrand {
  id: string;
  name: string;
  account_status: string;
}

export function EndorsementFlow({
  isOpen,
  onClose,
  onNewEndorsement,
}: EndorsementFlowProps) {
  const [imageUploading, setImageUploading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [edited, setEdited] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [duplicateBrandData, setDuplicateBrandData] =
    useState<ExistingBrand | null>(null);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<BrandProfile>>({
    name: "",
    username: "",
    avatar_url: "",
    brand_email: "",
    phone_number: "",
    state: "",
    county: "",
    endorsement_message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEdited(true);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadAvatar = async (e: any) => {
    e.preventDefault();
    setEdited(true);
    setImageUploading(true);
    const file: any = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuid()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await uploadImage(filePath, file);
    if (error || !data) {
      console.error(error || "Failed to upload avatar");
      setImageUploading(false);
      return;
    }
    setFormData((f) => ({ ...f, avatar_url: data }));
    setImageUploading(false);
  };

  const handleClose = () => {
    if (step === 4 || !edited || confirm("Are you sure you want to close?")) {
      setFormData({
        name: "",
        username: "",
        avatar_url: "",
        brand_email: "",
        phone_number: "",
        state: "",
        county: "",
        endorsement_message: "",
      });
      setStep(1);
      setErrorMessage(null);
      setEdited(false);
      onClose();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose(); // Allow closing via X button or explicit triggers
    }
  };

  // Prevent closing on Ctrl + V or other unwanted key combos
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey && e.key === "v") {
      e.stopPropagation(); // Prevent the event from bubbling up to Radix
      return; // Allow paste without closing
    }
    // Optionally prevent Escape key closing if desired
    // if (e.key === "Escape") {
    //   e.preventDefault();
    // }
  };

  const validateErrors = (step?: number): boolean => {
    if (step === 1) {
      if (!formData.avatar_url) {
        setErrorMessage("Brand photo is required");
        return false;
      }
      if (!formData.name || !formData.name?.trim()) {
        setErrorMessage("Brand name is required");
        return false;
      }
      if (!formData.username || !formData.username?.trim()) {
        setErrorMessage("Instagram handle is required");
        return false;
      }
      setErrorMessage(null);
      return true;
    } else if (step === 2) {
      if (!formData.brand_email || !formData.brand_email?.trim()) {
        setErrorMessage("Brand email is required");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.brand_email)) {
        setErrorMessage("Please enter a valid email address");
        return false;
      }
      if (!formData.state || !formData.state?.trim()) {
        setErrorMessage("Brand outlet state is required");
        return false;
      }
      if (!formData.county || !formData.county?.trim()) {
        setErrorMessage("Brand outlet county is required");
        return false;
      }
      setErrorMessage(null);
      return true;
    } else if (step === 3) {
      if (
        !formData.endorsement_message ||
        !formData.endorsement_message?.trim()
      ) {
        setErrorMessage("Brand endorsement message is required");
        return false;
      }
      setErrorMessage(null);
      return true;
    } else {
      return validateErrors(1) && validateErrors(2) && validateErrors(3);
    }
  };

  const handleNext = (step?: number) => {
    if (validateErrors(step)) setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setErrorMessage(null);
    setStep((prev) => prev - 1);
  };

  const handleCreateEndorsement = async () => {
    setSubmitLoading(true);
    setErrorMessage("");

    try {
      if (!validateErrors()) {
        throw new Error("Please fix all validation errors");
      }

      const { data, error, code, message, existingUser } = await endorseBrand(
        formData
      );

      if (error) {
        // Handle duplicate brand case specially
        if (code === "23505" && existingUser) {
          setErrorMessage(error);

          // You could display additional info or options here
          setDuplicateBrandData(existingUser);
          return;
        }

        setErrorMessage(error);
        return;
      }

      if (data?.id) {
        onNewEndorsement(data);
        // Show success message if provided
        if (message) {
          setSuccessMessage(message);
        }
        handleNext();
      } else {
        setErrorMessage("Failed to create endorsement");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={formData.avatar_url} />
                  <AvatarFallback>
                    {imageUploading ? (
                      <Loader className="w-8 h-8 text-muted-foreground animate-spin" />
                    ) : (
                      <Plus className="w-8 h-8 text-muted-foreground" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <Label
                  htmlFor="avatar_url"
                  className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Upload profile photo
                </Label>
                <Input
                  id="avatar_url"
                  type="file"
                  multiple={false}
                  accept="image/*"
                  className="hidden"
                  onChange={handleUploadAvatar}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">
                  Brand Name<span className="text-red-400">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter brand name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center">
                  <Instagram className="w-4 h-4 text-pink-500 mr-2" />
                  Instagram Handle<span className="text-red-400">*</span>
                </Label>
                <Input
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="@username"
                />
              </div>
            </div>
            {errorMessage ? (
              <ErrorMessage
                message={errorMessage}
                onDismiss={() => setErrorMessage("")}
              />
            ) : (
              <></>
            )}
            <div className="flex justify-end mt-6">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleNext(1)}
              >
                Continue
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brand_email">
                  Email Address<span className="text-red-400">*</span>
                </Label>
                <Input
                  id="brand_email"
                  name="brand_email"
                  type="email"
                  required
                  value={formData.brand_email}
                  onChange={handleInputChange}
                  placeholder="Enter brand's email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone_number">
                  Phone <span className="text-sm">(optional)</span>
                </Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +1
                  </span>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="rounded-l-none"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">
                  State<span className="text-red-400">*</span>
                </Label>
                <Input
                  id="state"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State (e.g., California, New York)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="county">
                  County<span className="text-red-400">*</span>
                </Label>
                <Input
                  id="county"
                  name="county"
                  required
                  value={formData.county}
                  onChange={handleInputChange}
                  placeholder="County (e.g., Los Angeles, Manhattan)"
                />
              </div>
            </div>
            {errorMessage ? (
              <ErrorMessage
                message={errorMessage}
                onDismiss={() => setErrorMessage("")}
              />
            ) : (
              <></>
            )}
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleNext(2)}
              >
                Continue
              </Button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="endorsement_message">Endorsement Message</Label>
                <Textarea
                  id="endorsement_message"
                  name="endorsement_message"
                  required
                  value={formData.endorsement_message}
                  onChange={handleInputChange}
                  placeholder="Type your endorsement message here"
                  rows={4}
                  maxLength={240}
                />
                <p className="text-sm text-gray-500 mt-2">
                  {formData.endorsement_message?.length}/240 characters
                </p>
              </div>
            </div>
            {errorMessage ? (
              <ErrorMessage
                message={errorMessage}
                onDismiss={() => setErrorMessage("")}
              />
            ) : (
              <></>
            )}
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleCreateEndorsement}
                disabled={submitLoading}
              >
                {submitLoading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </>
        );
      case 4:
        return (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Cake Shop Endorsement Success!
            </h3>
            <p className="text-muted-foreground mb-6">
              Your cake shop endorsement has been successfully submitted!
            </p>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()} // Prevent closing on overlay clicks
        onKeyDown={handleKeyDown} // Handle Ctrl + V
      >
        <DialogHeader>
          <DialogTitle>
            {step === 4 ? "Success" : "Endorse Cake Shop"}
          </DialogTitle>
        </DialogHeader>
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}
