"use client";

import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";

type ConnectionType = "friend" | "colleague" | "folk" | "spouse";

interface ConnectionFlowContextType {
  isOpen: boolean;
  step: "request" | "preview" | "success";
  selectedType: ConnectionType | null;
  openFlow: () => void;
  closeFlow: () => void;
  goToPreview: (type: ConnectionType) => void;
  goToSuccess: () => void;
}

const ConnectionFlowContext = createContext<
  ConnectionFlowContextType | undefined
>(undefined);

export function ConnectionFlowProvider({ children }: { children: ReactNode }) {
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

  return (
    <ConnectionFlowContext.Provider
      value={{
        isOpen,
        step,
        selectedType,
        openFlow,
        closeFlow,
        goToPreview,
        goToSuccess,
      }}
    >
      {children}
    </ConnectionFlowContext.Provider>
  );
}

export function useConnectionFlow() {
  const context = useContext(ConnectionFlowContext);
  if (context === undefined) {
    throw new Error(
      "useConnectionFlow must be used within a ConnectionFlowProvider"
    );
  }
  return context;
}
