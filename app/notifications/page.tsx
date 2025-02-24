"use client";

import NotificationsView from "./notification-page";
import { useAuth } from "../actions/AuthContext";
import { generateMockNotification } from "@/lib/supabase/server-extended/userProfile";
import { Button } from "@/components/ui/button";
import { WelcomeButton } from "../components/welcom-button";
import Spinner from "../components/spinner";

export default function NotificationsPage() {
  const { isLoading, profile, notifications } = useAuth();

  return (
    <>
      <div className="container min-h-full mx-auto px-4">
        {isLoading ? (
          <Spinner />
        ) : profile ? (
          <NotificationsView notifications={notifications} />
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">
              Welcome to your notifications
            </h1>
            <p className="text-gray-500 mb-4">
              Sign in to see your notifications
            </p>
            <WelcomeButton currentPage="notifications" />
          </div>
        )}
      </div>
    </>
  );
}
