"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "../components/auth/login-modal";
import { useAuth } from "@/app/actions/AuthContext";

const Login = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { profile, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && profile) {
      router.replace("/");
    }
  }, [isLoading, profile, router]);

  const handleLoginSuccess = () => {
    router.refresh();

    router.replace("/");
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    if (profile) {
      router.replace("/");
    } else {
      router.back();
    }
  };

  return (
    <LoginModal
      isOpen={isOpen}
      onClose={handleCloseModal}
      onLoginSuccess={handleLoginSuccess}
    />
  );
};

export default Login;
