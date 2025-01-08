"use client";

import { useState } from "react";
import { Modal } from "./modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Plus } from "lucide-react";
import { v4 as uuid } from "uuid";
import { uploadAvatar } from "@/lib/supabase/server-extended/userProfile";
import { endorseBrand, } from "@/lib/supabase/server-extended/brandProfile";
import { BrandProfile } from "@/lib/types";

interface EndorsementFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EndorsementFlow({ isOpen, onClose }: EndorsementFlowProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<BrandProfile>>({
    name: "",
    username: "",
    avatar_url: "",
    brand_email: "",
    phone_number: "",
    location: "",
    endorsement_message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadAvatar = async (e: any) => {
    e.preventDefault()
    const file: any = e.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${uuid()}.${fileExt}`
    const filePath = `${fileName}`

    const { data, error } = await uploadAvatar(filePath, file)
    if (error || !data) {
      console.error(error || "Failed to upload avatar")
      return
    }
    setFormData(f => ({ ...f, avatar_url: data }))
  }
  const handleClose = () => {
    setFormData({
      name: "",
      username: "",
      avatar_url: "",
      brand_email: "",
      phone_number: "",
      location: "",
      endorsement_message: "",
    });
    setStep(1);
    onClose();
  }
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleCreateEndoresement = async () => {
    console.log("Endorsement data", formData);
    await endorseBrand(formData)
    handleNext();
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
                    <Plus className="w-8 h-8 text-muted-foreground" />
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
                <Label htmlFor="name">Brand name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter brand name"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="flex items-center gap-2"
                >
                  Instagram Handle
                  <Instagram className="w-4 h-4 text-pink-500" />
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="@username"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleNext}
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
                <Label htmlFor="brand_email">Email address</Label>
                <Input
                  id="brand_email"
                  name="brand_email"
                  type="email"
                  value={formData.brand_email}
                  onChange={handleInputChange}
                  placeholder="Enter brand's email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone (optional)</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +254
                  </span>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="rounded-l-none"
                    placeholder="712 345 678"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State (e.g., Oakland, CA)"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleNext}
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
                  value={formData.endorsement_message}
                  onChange={handleInputChange}
                  placeholder="Type your endorsement message here"
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleCreateEndoresement}
              >
                Submit
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
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={step === 4 ? "Success" : `Endorse Cake Shop`}
    >
      {renderStep()}
    </Modal>
  );
}
