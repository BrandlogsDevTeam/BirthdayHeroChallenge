"use client";

import { useState } from "react";
import { Search, Plus, MessageSquareMore, Repeat, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AcceptNomination } from "./AcceptInvitationModals";
import { useRouter } from "next/navigation";
import LoginModal from "./auth/login-modal";
import { useAuth } from "../actions/AuthContext";
import { GlobalSearch } from "./search";

export function Header() {
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();
  const { profile, isLoading } = useAuth();

  const toggleMobileSearch = () => {
    setIsMobileSearchVisible(!isMobileSearchVisible);
  };

  // Don't render authentication-dependent content until loading is complete
  // This prevents the flicker effect
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="h-14 flex items-center">
          <nav className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </Link>
            </div>

            {!isLoading ? (
              profile ? (
                <div className="hidden sm:flex flex-1 justify-center">
                  <div className="max-w-lg w-full">
                    <GlobalSearch />
                  </div>
                </div>
              ) : null
            ) : null}

            {/* Only render auth-dependent content when not loading */}
            <div className="flex items-center space-x-2">
              {!isLoading ? (
                profile ? (
                  <>
                    {profile?.account_role === "assistant" && (
                      <Button
                        onClick={() => router.push("/cause-assistant")}
                        variant="ghost"
                        size="icon"
                        className="bg-green-200 hover:bg-green-600 text-green-600 hover:text-white font-semibold transition-colors"
                      >
                        <MessageSquareMore className="h-5 w-5" />
                        <span className="sr-only">Cause Assistant</span>
                      </Button>
                    )}
                  </>
                ) : (
                  <AcceptNomination />
                )
              ) : (
                // Show a minimal placeholder during loading to prevent layout shift
                <div className="w-10 h-10"></div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {isMobileSearchVisible && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-background/95 backdrop-blur">
          <div className="relative w-full max-w-md px-4">
            <GlobalSearch />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-0"
              onClick={toggleMobileSearch}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
