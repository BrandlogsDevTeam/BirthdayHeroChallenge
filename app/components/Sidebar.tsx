"use client";

import { Home, Users, Wallet, Bell, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../actions/AuthContext";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Community", href: "/community", icon: Users },
  { name: "Wallet", href: "/wallet", icon: Wallet },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile, isLoading } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-slate-100">
        <nav className="flex-1 px-2 py-16">
          <div className="px-1 relative w-full h-14 sm:h-16 md:h-20 overflow-clip">
            {profile ?
              <Link href={`/user-profile`} className="flex w-full gap-4 overflow-clip">
                <Avatar className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full my-auto">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.name} />
                  <AvatarFallback>{getInitials(profile?.name)}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col flex-1 my-auto">
                  <h3 className="text-lg font-semibold hover:underline text-ellipsis w-full">{profile?.name}</h3>
                  <h3 className="text-gray-500 text-sm hover:underline">@{profile?.username}</h3>
                </div>
              </Link>
              : <></>
            }
          </div>

          <div className="">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-2 py-2 mt-1 text-sm font-medium rounded-md",
                  isActive(item.href)
                    ? "bg-green-100 text-green-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon
                  className={cn(
                    "w-6 h-6 mr-3",
                    isActive(item.href) ? "text-green-600" : "text-gray-700"
                  )}
                />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Bottom navigation for mobile */}
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "inline-flex flex-col items-center justify-center px-5",
                isActive(item.href)
                  ? "text-green-600"
                  : "text-gray-500 hover:bg-gray-50"
              )}
            >
              <item.icon
                className={cn(
                  "w-6 h-6 mb-1",
                  isActive(item.href) ? "text-green-600" : "text-gray-500"
                )}
              />
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
