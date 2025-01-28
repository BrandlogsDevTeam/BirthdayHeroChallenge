"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import WelcomeModal from "./welcome-modal";
import PasswordModal from "./password-modal";
import TermsModal from "./terms-modal";

export default function AcceptEndorsementPage() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      // Here you would validate the token on the server
      // For this example, we'll just show the welcome modal
      setShowWelcomeModal(true);
    } else {
      // If there's no token, redirect to the home page
      router.push("/");
    }
  }, [searchParams, router]);

  const handleWelcomeClosed = () => {
    setShowWelcomeModal(false);
    setShowPasswordModal(true);
  };

  const handlePasswordCreated = () => {
    setShowPasswordModal(false);
    setShowTermsModal(true);
  };

  const handleTermsAccepted = () => {
    // Here you would update the user's status on the server
    // For this example, we'll just redirect to login
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <WelcomeModal open={showWelcomeModal} onClose={handleWelcomeClosed} />
      <PasswordModal
        open={showPasswordModal}
        onPasswordCreated={handlePasswordCreated}
      />
      <TermsModal open={showTermsModal} onTermsAccepted={handleTermsAccepted} />
      {!showWelcomeModal && !showPasswordModal && !showTermsModal && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Processing your endorsement...
          </h1>
          <p>Please wait while we verify your information.</p>
        </div>
      )}
    </div>
  );
}
