import { useState } from "react";
import {
  UserCircle,
  Heart,
  UserPlus,
  Bell,
  Check,
  X,
  Trash,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Notification } from "./types";
import { formatDateRelative, getConnectionColor } from "@/lib/utils";
import ConnectionNotificationCTA from "./notification-connection";
import { useAuth } from "@/app/actions/AuthContext";
import { Badge } from "@/components/ui/badge";
import { ConnectionTypeMap } from "@/lib/types";
import Link from "next/link";

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
        return <UserPlus className={`h-5 w-5 ${getIconColor()}`} />;
      case "like":
        return <Heart className={`h-5 w-5 ${getIconColor()}`} />;
      default:
        return <Bell className={`h-5 w-5 ${getIconColor()}`} />;
    }
  };

  const getIconColor = () => {
    switch (notification.type) {
      case "connection":
        return "text-blue-500";
      case "like":
        return "text-red-500";
      default:
        return "text-yellow-500";
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
        <div className="flex items-start space-x-4 relative">
          <div className={`w-10 h-10 flex items-center justify-center`}>
            {getIcon()}
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center">
                {getUsername() ? (
                  <Link href={`user-profile/${getUsername()}`}>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={getAvatar()} alt={getName()} />
                      <AvatarFallback>{getName().charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Link>
                ) : (
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={getAvatar()} alt={getName()} />
                    <AvatarFallback>{getName().charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
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
            <p className="text-sm text-gray-600 my-2">
              <p className="">{notification.content.message}</p>
              {notification.type === "connection" &&
                notification.content.connection_type && (
                  <>
                    <br />
                    <Badge
                      variant="secondary"
                      className={`${getConnectionColor(
                        notification.content.connection_type
                      )} font-medium rounded-lg text-xs sm:text-sm`}
                    >
                      {ConnectionTypeMap[notification.content.connection_type]}
                    </Badge>
                  </>
                )}
            </p>
            <div className="flex justify-between items-center">
              {notification.type === "connection" &&
                !notification?.additional_meta?.connection_status && (
                  <ConnectionNotificationCTA
                    receiverID={profile!.id}
                    requesterId={notification.content.user_id!}
                    id={notification.id}
                    markAsReadCB={handleMarkAsRead}
                    status={
                      notification?.additional_meta?.connection_status || ""
                    }
                  />
                )}
              {!isRead && (
                <Button
                  onClick={handleMarkAsRead}
                  variant="outline"
                  className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-white  ml-auto"
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
