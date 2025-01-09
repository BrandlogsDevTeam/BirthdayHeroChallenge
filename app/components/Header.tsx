"use client";
import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  MessageSquareMore,
  Repeat,
  LogOut,
  MenuIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AcceptNomination } from "./AcceptInvitationModals";
import { User } from "@supabase/supabase-js";
import { fetchUser } from "@/lib/supabase/server";
import { useRouter } from "next/navigation";

export function Header({ role }: { role?: string }) {
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await fetchUser();
      if (user) setUser(user);
    })();
  }, []);

  const toggleMobileSearch = () => {
    setIsMobileSearchVisible(!isMobileSearchVisible);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={54}
              height={54}
              className="rounded-lg"
            />
          </Link>
        </div>

        <div className="flex-1 flex justify-center px-4 max-w-md mx-auto">
          <div className={`relative w-full hidden md:block`}>
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8 w-full" />
          </div>
        </div>

        <nav className="flex items-center space-x-2">
          {user ? (
            <>
              {(role && role === 'assistant') ? <Button
                onClick={() => router.push("/cause-assistant")}
                variant="ghost"
                size="icon"
                className="bg-green-200 hover:bg-green-600 text-green-600 hover:text-white font-semibold transition-colors"
              >
                <MessageSquareMore className="h-5 w-5" />
                <span className="sr-only">Cause Assistant</span>
              </Button> : <></>}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="bg-green-200 hover:bg-green-600 text-green-600 hover:text-white font-semibold transition-colors"
                    variant="ghost"
                    size="icon"
                  >
                    <Plus className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>New log story</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Repeat className="mr-2 h-4 w-4" />
                    <span>Repost</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                onClick={() => router.push("/login")}
                className="bg-white px-4 py-1 text-base border border-green-600 rounded-md hover:bg-green-600 text-green-600 hover:text-white transition-colors"
              >
                Log in
              </Button>
              <AcceptNomination />
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileSearch}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </nav>
      </div>
      {isMobileSearchVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur md:hidden">
          <div className="relative w-full max-w-md px-4">
            <Search className="absolute left-6 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8 w-full" autoFocus />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-0"
              onClick={toggleMobileSearch}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
