"use client";

import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";


//! Always sync this type with the connection_type in the database connection_type enum
type ConnectionType =
  | "friend"
  | "colleague"
  | "folk"
  | "spouse"
  | "shoe"
  | "clothing"
  | "cake_shop"
  | "cologne";

interface ConnectionFlowContextType {
  isOpen: boolean;
  step: "request" | "preview" | "success";
  selectedType: ConnectionType | null;
  receiverId: string | null;
  receiverProfile: {
    avatar_url: string;
    name: string;
    username: string;
    is_brand: boolean;
  } | null;
  openFlow: (
    receiverId: string,
    receiverProfile: {
      avatar_url: string;
      name: string;
      username: string;
      is_brand: boolean;
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
    is_brand: boolean;
  } | null>(null);

  const openFlow = (
    newReceiverId: string,
    newReceiverProfile: {
      avatar_url: string;
      name: string;
      username: string;
      is_brand: boolean;
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
