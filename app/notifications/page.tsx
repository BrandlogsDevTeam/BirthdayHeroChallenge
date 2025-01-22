"use client";

import NotificationsView from "./notification-page";
import { useAuth } from "../actions/AuthContext";
import { generateMockNotification } from "@/lib/supabase/server-extended/userProfile";
import Public from "./public-view";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const { profile, notifications } = useAuth();

  console.log(notifications);
  return (
    <>
      <div className="container mx-auto px-4">
        {profile ? (
          <>
            <NotificationsView />
            <Button onClick={() => generateMockNotification(profile?.id)}>
              Generate Notification
            </Button>
          </>
        ) : (
          <Public />
        )}
      </div>
    </>
  );
}
