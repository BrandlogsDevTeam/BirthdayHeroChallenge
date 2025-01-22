"use client";

import { useState } from "react";
import NotificationCard from "../components/notification/notification-card";
import type { Notification } from "../components/notification/types";

export default function NotificationsView({
  notifications: initialNotifications,
}: {
  notifications: Notification[];
}) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id
          ? { ...notif, is_read: true, read_at: new Date().toISOString() }
          : notif
      )
    );
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
