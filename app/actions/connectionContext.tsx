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
  receiverId: string | null;
  receiverProfile: {
    avatar_url: string;
    name: string;
    username: string;
  } | null;
  openFlow: (
    receiverId: string,
    receiverProfile: {
      avatar_url: string;
      name: string;
      username: string;
    }
  ) => void;
  closeFlow: () => void;
  goToPreview: (params: { type: ConnectionType; receiverId: string }) => void;
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
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [receiverProfile, setReceiverProfile] = useState<{
    avatar_url: string;
    name: string;
    username: string;
  } | null>(null);

  const openFlow = (
    newReceiverId: string,
    newReceiverProfile: {
      avatar_url: string;
      name: string;
      username: string;
    }
  ) => {
    console.log("Opening flow with:", { newReceiverId, newReceiverProfile });
    setIsOpen(true);
    setStep("request");
    setSelectedType(null);
    setReceiverId(newReceiverId);
    setReceiverProfile(newReceiverProfile);
  };

  const closeFlow = () => {
    setIsOpen(false);
    setStep("request");
    setSelectedType(null);
    setReceiverId(null);
    setReceiverProfile(null);
  };

  const goToPreview = ({
    type,
    receiverId,
  }: {
    type: ConnectionType;
    receiverId: string;
  }) => {
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
        receiverId,
        receiverProfile,
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
