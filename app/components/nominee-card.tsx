"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "../actions/AuthContext";

interface Nominee {
  id: string;
  username: string;
  name: string;
  avatar_url: string;
  account_status: string;
  permissiory_donations: number;
  gift_bonus: number;
}

interface NomineeCardProps {
  nominee: Nominee;
}

export default function NomineeCard({ nominee }: NomineeCardProps) {
  const {
    username,
    name,
    avatar_url,
    account_status,
    permissiory_donations,
    gift_bonus,
  } = nominee;

  const { profile } = useAuth();

  return (
    <div className="bg-white rounded-xl max-w-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative">
      {/* Main Content */}
      <div className="p-6 pt-10">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <Link href={`/user-profile/${username}`}>
              <Avatar className="w-20 h-20 ring-2 ring-blue-500">
                <AvatarImage src={avatar_url} />
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
              </Avatar>
            </Link>
          </div>

          {/* User Info */}
          <div className="text-center sm:text-left flex-grow">
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">@{username}</p>
            <div className="mt-3">
              <p className="text-sm text-gray-600">Promissory Food Donation:</p>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(permissiory_donations || 0)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4 sm:mt-0">
            <Button
              variant="outline"
              className="bg-green-600 hover:bg-green-700 text-white hover:text-white"
            >
              Assist
            </Button>
            {account_status === "accepted" ? (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 capitalize">
                {account_status}
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 capitalize">
                {account_status}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
