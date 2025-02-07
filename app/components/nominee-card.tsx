"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { useEffect, useState } from "react";
import { CardPreview } from "./card-preview";

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
  const { username, name, avatar_url, account_status, permissiory_donations, gift_bonus } = nominee;

  return (
    <div className="p-6 max-w-2xl shadow-md rounded-md">
      <div className="flex gap-4">
        <div className="flex-grow min-w-0 flex gap-4 items-start justify-between">
          <div className="flex gap-4 min-w-0 flex-grow">
            <a href={`/user-profile/${username}`} className="flex-shrink-0">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
                <Avatar className="w-full h-full rounded-full">
                  <AvatarImage
                    src={avatar_url}
                    alt={name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-lg">
                    {getInitials(name)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </a>

            <div className="min-w-0 flex-grow">
              <div className="space-y-1 mb-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                  {name}
                </h3>
                <p className="text-sm text-gray-500">@{username}</p>
              </div>

              <div className="space-y-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      Promissory Food Donations:
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      ${permissiory_donations}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      Birthday Gift Bonus:
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      ${gift_bonus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
