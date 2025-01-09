import { Home, Users, Wallet, Bell, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Community", href: "/community", icon: Users },
  { name: "Wallet", href: "/wallet", icon: Wallet },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setUser(user);

      const { data } = await supabase
        .schema("bhc")
        .from("user_profiles")
        .select()
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile(data);
      }
    };

    fetchUserAndProfile();
  }, []);

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
          {user && profile && (
            <div className="mb-6 px-2">
              <Link href={`/user-profile`} className="">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar_url} alt={profile.name} />
                  <AvatarFallback>
                    {getInitials(profile.name) || "OO"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          )}

          <div className="mt-5">
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
