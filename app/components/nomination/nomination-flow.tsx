"use client";

import React, { useState } from "react";
import { Nominee } from "./types/nominee";
import { NomineePhoto } from "./nominee-photo";
import { NomineeDetails } from "./nominee-details";
import { Modal } from "../modal";
import { ProfileDisplay } from "./profile-display";
import { SuccessModal } from "./nomination-success";

interface EndorsementFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onNewEndorsement: (data: Nominee) => void;
}

export function NominationFlow({
  isOpen,
  onClose,
  onNewEndorsement,
}: EndorsementFlowProps) {
  const [step, setStep] = useState(1);
  const [nominee, setNominee] = useState<Partial<Nominee>>({});

  const handleClose = () => {
    if (step === 4 || confirm("Are you sure you want to close?")) {
      setNominee({});
      setStep(1);
      onClose();
    }
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const updateNominee = (data: Partial<Nominee>) => {
    setNominee((prev) => ({ ...prev, ...data }));
  };

  const handleComplete = () => {
    onNewEndorsement(nominee as Nominee);
    handleNext();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <NomineeDetails
            nominee={nominee}
            updateNominee={updateNominee}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <NomineePhoto
            nominee={nominee}
            updateNominee={updateNominee}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <ProfileDisplay
            nominee={nominee}
            onNext={handleComplete}
            onBack={handleBack}
          />
        );
      case 4:
        return <SuccessModal onClose={handleClose} />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={step === 4 ? "Success" : "Accept Nomination"}
    >
      {renderStep()}
    </Modal>
  );
}
