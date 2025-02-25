"use client";

import NotificationCard from "../components/notification/notification-card";
import type { Notification } from "../components/notification/types";
import { readUserNotifications } from "@/lib/supabase/server-extended/userProfile";
import { Bell } from "lucide-react";

export default function NotificationsView({
  notifications,
}: {
  notifications: Notification[];
}) {
  const handleMarkAsRead = (id: string) => {
    readUserNotifications(id);
  };

  return (
    <div className="p-4 space-y-4">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onMarkAsRead={handleMarkAsRead}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
          <Bell className="w-12 h-12 mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">No Notifications</h3>
          <p className="max-w-md">
            You don’t have any notifications right now. Stay tuned for updates!
          </p>
        </div>
      )}
    </div>
  );
}
