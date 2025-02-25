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
          <WelcomeButton currentPage="notifications" />
        )}
      </div>
    </>
  );
}
