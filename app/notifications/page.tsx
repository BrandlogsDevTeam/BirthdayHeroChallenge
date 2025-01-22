"use client";

import NotificationsView from "./notification-page";
import { WelcomeButton } from "../components/welcom-button";
import { useAuth } from "../actions/AuthContext";
import Public from "./public-view";

export default function NotificationsPage() {
  const { profile } = useAuth();

  return (
    <>
      <div className="container mx-auto px-4">
        {profile ? <NotificationsView /> : <Public />}
      </div>
    </>
  );
}
