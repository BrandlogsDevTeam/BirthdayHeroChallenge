"use client";

import { useState } from "react";
import { ConnectionType } from "@/lib/types";
export function useConnectionFlow() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"request" | "preview" | "success">(
    "request"
  );
  const [selectedType, setSelectedType] = useState<ConnectionType | null>(null);

  const openFlow = () => {
    setIsOpen(true);
    setStep("request");
    setSelectedType(null);
  };

  const closeFlow = () => {
    setIsOpen(false);
    setStep("request");
    setSelectedType(null);
  };

  const goToPreview = (type: ConnectionType) => {
    setSelectedType(type);
    setStep("preview");
  };

  const goToSuccess = () => {
    setStep("success");
  };

  return {
    isOpen,
    step,
    selectedType,
    openFlow,
    closeFlow,
    goToPreview,
    goToSuccess,
  };
}
