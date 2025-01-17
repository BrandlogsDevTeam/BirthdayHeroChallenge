"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "../components/auth/login-modal";
import { useAuth } from "@/app/actions/AuthContext";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsOpen(true);

    if (!isLoading && profile) {
      router.replace("/");
    }
  }, [isLoading, profile, router]);

  const handleCloseModal = () => {
    setIsOpen(false);
    if (profile) {
      router.replace("/");
    }
  };

  return <LoginModal isOpen={isOpen} onClose={handleCloseModal} />;
};

export default Login;
