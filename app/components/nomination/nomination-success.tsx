import React from "react";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  onClose: () => void;
}

export function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-custom-green"
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
      <h3 className="text-xl font-semibold mb-2">Nomination Successful</h3>
      <p className="text-gray-600 mb-6">
        Nomination completed successfully! Your nominee is now one step closer
        to becoming a Birthday Hero!
      </p>
      <Button onClick={onClose} className="bg-green-500 hover:bg-green-700">
        Close
      </Button>
    </div>
  );
}
