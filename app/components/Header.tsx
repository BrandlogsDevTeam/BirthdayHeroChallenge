"use client";

import { useEffect, useState } from "react";
import { Search, Plus, MessageSquareMore, Repeat, Menu } from "lucide-react";
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
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // This useEffect should be added to fetch the user data on component mount
  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    fetchUser();
  }, []);

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

        <div className="flex-1 flex justify-center px-4">
          <div className={`relative ${isSearchExpanded ? "w-full" : "w-auto"}`}>
            {(!isSearchExpanded || !user) && (
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            )}
            <Input
              placeholder="Search"
              className={`pl-8 transition-all duration-300 ease-in-out ${
                isSearchExpanded
                  ? "w-full"
                  : "md:w-[300px] lg:w-[300px] hidden md:inline-flex"
              }`}
            />
          </div>
        </div>

        <nav className="flex items-center space-x-2">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-5 w-5" />
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
              <Button variant="ghost" size="icon">
                <MessageSquareMore className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/login">Log in</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <AcceptNomination />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {user && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
