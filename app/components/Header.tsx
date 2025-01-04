import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import { AcceptNomination } from "./AcceptInvitationModals";

export async function Header() {
  let supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={54}
              height={54}
              className="rounded-lg"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-8 md:w-[300px] lg:w-[300px]"
              />
            </div>
          </div>
          <nav className="flex items-center">
            {(!user || user?.is_anonymous) && (
              <div className="space-x-3">
                <Link
                  href="/login"
                  className="hidden md:inline-flex border p-1 px-4 border-green-600 rounded-md hover:bg-green-600 text-green-600 hover:text-white transition-colors"
                >
                  Log in
                </Link>
                <AcceptNomination />
              </div>
            )}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
