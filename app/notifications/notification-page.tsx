"use client";

import { useState } from "react";
import NotificationCard from "../components/notification/notification-card";
import type { Notification } from "../components/notification/types";
import { readUserNotifications } from "@/lib/supabase/server-extended/userProfile";

export default function NotificationsView({
  notifications
}: {
  notifications: Notification[];
}) {

  const handleMarkAsRead = (id: string) => {
    readUserNotifications(id)
  };


  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onMarkAsRead={handleMarkAsRead}
        />
      ))}
    </div>
  );
}
