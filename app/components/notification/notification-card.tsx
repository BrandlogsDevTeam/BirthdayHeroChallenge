import { useState } from "react";
import { UserCircle, Heart, UserPlus, Bell, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Notification } from "./types";
import { formatDateRelative } from "@/lib/utils";
import ConnectionNotificationCTA from "./notification-connection";
import { useAuth } from "@/app/actions/AuthContext";

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationCard({
  notification,
  onMarkAsRead,
}: NotificationCardProps) {
  const { profile } = useAuth();
  const [isRead, setIsRead] = useState(notification.is_read);

  const handleMarkAsRead = () => {
    setIsRead(true);
    onMarkAsRead(notification.id);
  };

  const getIcon = () => {
    switch (notification.type) {
      case "connection":
        return <UserPlus className="h-5 w-5 text-blue-500" />;
      case "like":
        return <Heart className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getName = () => {
    if (
      notification.type === "connection" &&
      notification.content?.user_info?.name
    ) {
      return notification.content.user_info.name;
    } else if (
      notification.type === "like" &&
      notification.content?.user_info?.name
    ) {
      return notification.content.user_info.name;
    }
    return "Brandlogs";
  };

  const getUsername = () => {
    if (
      notification.type === "connection" &&
      notification.content?.user_info?.username
    ) {
      return notification.content?.user_info?.username;
    } else if (
      notification.type === "like" &&
      notification.content?.user_info?.username
    ) {
      return notification.content?.user_info?.username;
    }
    return "";
  };

  const getAvatar = () => {
    if (
      notification.type === "connection" &&
      notification.content?.user_info?.avatar_url
    ) {
      return notification.content?.user_info?.avatar_url;
    } else if (
      notification.type === "like" &&
      notification.content?.user_info?.avatar_url
    ) {
      return notification.content?.user_info?.avatar_url;
    }
    return "";
  };

  return (
    <Card
      className={`w-full max-w-2xl transition-colors duration-200 ${
        isRead ? "bg-white" : "bg-blue-50"
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Avatar className="h-12 w-12">
              <AvatarImage src={getAvatar()} alt={getName()} />
              <AvatarFallback>{getName().charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center">
                {getIcon()}
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-900">
                    {getName()}
                  </p>
                  {getUsername() && (
                    <p className="text-xs text-gray-500">@{getUsername()}</p>
                  )}
                </div>
              </div>
              <p
                className="text-xs text-gray-400"
                title={notification.created_at}
              >
                {formatDateRelative(notification.created_at)}
              </p>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {notification.content.message}
              {notification.content.connection_type && (
                <span className="font-semibold">
                  Connection type:
                  {notification.content.connection_type}
                </span>
              )}
            </p>
            <div className="flex justify-between items-center">
              {notification.type === "connection" && (
                <ConnectionNotificationCTA
                  receiverID={profile!.id}
                  requesterId={notification.content.user_id!}
                  id={notification.id}
                  markAsReadCB={handleMarkAsRead}
                  status={notification?.additional_meta?.status || ""}
                />
              )}
              {!isRead && (
                <Button
                  onClick={handleMarkAsRead}
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                >
                  Mark as read
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
