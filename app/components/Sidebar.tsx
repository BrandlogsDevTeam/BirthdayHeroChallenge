"use client";

import { Home, Wallet, Bell, Settings, Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../actions/AuthContext";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Brands", href: "/brands", icon: Store },
  { name: "Wallet", href: "/wallet", icon: Wallet },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile, isLoading, notifications } = useAuth();
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const notificationSound = useRef<HTMLAudioElement | null>(null);
  const prevNotificationCount = useRef(notifications.length);

  useEffect(() => {
    notificationSound.current = new Audio("/notification-sound.mp3");
  }, []);

  useEffect(() => {
    if (notifications.length > prevNotificationCount.current) {
      setHasNewNotification(true);
      notificationSound.current?.play().catch((error) => {
        console.log("Error playing sound:", error);
      });
    }
    prevNotificationCount.current = notifications.length;
  }, [notifications]);

  useEffect(() => {
    if (pathname === "/notifications") {
      setHasNewNotification(false);
    }
  }, [pathname]);

  const NotificationIcon = ({ className }: { className?: string }) => (
    <div className="relative">
      <Bell className={className} aria-hidden="true" />
      {hasNewNotification && (
        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-600 rounded-full" />
      )}
    </div>
  );

  return (
    <>
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gray-50">
        <nav className="flex-1 px-2 py-16">
          <div className="px-1 relative w-full h-14 sm:h-16 md:h-20 overflow-clip">
            {profile ? (
              <Link
                href={`/user-profile`}
                className="flex w-full gap-4 overflow-clip"
              >
                <Avatar className="w-16 h-16 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full my-auto">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.name} />
                  <AvatarFallback>{getInitials(profile?.name)}</AvatarFallback>
                </Avatar>
              </Link>
            ) : null}
          </div>

          <div className="space-y-1 mt-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-4 py-3 text-sm font-medium transition-colors duration-150 ease-in-out hover:bg-gray-100 focus:outline-none",
                    isActive ? "bg-gray-50 text-green-600" : "text-gray-800"
                  )}
                >
                  {item.name === "Notifications" ? (
                    <NotificationIcon
                      className={cn(
                        "mr-3 h-5 w-5",
                        isActive ? "text-green-600" : "text-gray-800"
                      )}
                    />
                  ) : (
                    <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                  )}
                  <h4>{item.name}</h4>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Bottom navigation for mobile */}
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-gray-50 border-t border-green-200 md:hidden">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-100 group",
                  isActive ? "bg-gray-50 text-green-600" : "text-gray-800"
                )}
              >
                {item.name === "Notifications" ? (
                  <NotificationIcon
                    className={cn(
                      "w-6 h-6 mb-1 transition-colors duration-150 ease-in-out",
                      isActive ? "text-green-600" : "text-gray-800"
                    )}
                  />
                ) : (
                  <item.icon
                    className={cn(
                      "w-6 h-6 mb-1 transition-colors duration-150 ease-in-out",
                      isActive ? "bg-gray-50 text-green-600" : "text-gray-800"
                    )}
                    aria-hidden="true"
                  />
                )}
                <span className="text-xs">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
