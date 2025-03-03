"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getBirthdayHeroIndex } from "@/lib/supabase/server-extended/userProfile";
import { useAuth } from "../actions/AuthContext";
import { AuthModal } from "./Post";
import { Dialog } from "@/components/ui/dialog";
import { useConnectionFlow } from "../actions/connectionContext";
import { NomineeCardSkeleton } from "./skeleton";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

interface CacheData<T> {
  data: T;
  timestamp: number;
}

const CACHE_KEY = "birthday_heroes_cache";
const CACHE_DURATION = 5 * 60 * 1000;

const getCache = <T,>(): CacheData<T> | null => {
  if (typeof window === "undefined") return null;

  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  try {
    const parsedCache: CacheData<T> = JSON.parse(cached);
    const now = Date.now();

    if (now - parsedCache.timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return parsedCache;
  } catch (error) {
    console.error("Cache parsing error:", error);
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
};

const setCache = <T,>(data: T) => {
  if (typeof window === "undefined") return;

  const cacheData: CacheData<T> = {
    data,
    timestamp: Date.now(),
  };

  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
};

interface User {
  index: number;
  id: string;
  name: string;
  username: string;
  avatar_url: string;
  age?: number;
  remainingLife?: number;
  totalDonation?: number;
  birthDate?: string;
}

interface UserCardProps {
  profileUser: User;
  isCurrentUser?: boolean;
  connection?: {
    type: string;
    status: string;
  };
}

const UserCard: React.FC<UserCardProps> = ({
  profileUser,
  isCurrentUser,
  connection,
}) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { profile } = useAuth();
  const { openFlow } = useConnectionFlow();

  const handleConnect = () => {
    if (!profile) {
      setShowAuthModal(true);
      return;
    }

    console.log("Connection recipient details:", {
      id: profileUser.id,
      profile_details: {
        avatar_url: profileUser.avatar_url,
        name: profileUser.name,
        username: profileUser.username,
      },
    });
    openFlow(profileUser.id, {
      avatar_url: profileUser.avatar_url,
      name: profileUser.name,
      username: profileUser.username,
      is_brand: false,
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl max-w-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative">
        {/* Index Badge */}
        <div
          className={`absolute top-0 left-0 text-gray-700 px-3 py-1 rounded-br-lg font-bold text-lg ${
            isCurrentUser ? "bg-green-500" : "bg-gray-200"
          }`}
        >
          #{profileUser.index}
        </div>

        {/* Main Content */}
        <div className="p-6 pt-10">
          <div className="flex flex-row items-center gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              <Link href={`/user-profile/${profileUser.username}`}>
                <Avatar className="w-20 h-20 ring-2 ring-blue-500">
                  <AvatarImage src={profileUser?.avatar_url} />
                  <AvatarFallback>
                    {getInitials(profileUser?.name)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>

            {/* User Info */}
            <div className="text-left flex-grow min-w-0">
              <h3 className="text-xl font-semibold text-gray-900 truncate">
                {profileUser.name}
              </h3>
              <p className="text-sm text-gray-500">@{profileUser.username}</p>
              <div className="mt-3">
                <p className="text-sm text-gray-600">
                  Lifetime Donation Pledge:
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(profileUser.totalDonation || 0)}
                </p>
              </div>
            </div>

            {/* Connect Button */}
            {!isCurrentUser && (
              <div className="shrink-0">
                {connection ? (
                  <></>
                ) : (
                  <Button
                    variant="outline"
                    className="bg-white text-green-600 hover:text-white border border-green-600 hover:bg-green-600 transition-colors whitespace-nowrap"
                    onClick={handleConnect}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Connect
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <AuthModal />
      </Dialog>
    </>
  );
};

const transformUserProfile = (data: any) => {
  return {
    index: data?.rank || "",
    id: data?.id || "",
    name: data?.name || "",
    username: data?.username || "",
    avatar_url: data?.avatar_url || "",
    age: 0,
    remainingLife: 0,
    totalDonation: data?.permissiory_donations || "",
    birthDate: data?.birth_date || "",
  };
};

export const BirthdayIndex = () => {
  const { profile } = useAuth();
  const [otherUsers, setOtherUsers] = useState<any>([]);
  const [userRank, setUserRank] = useState<string>("#");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getBirthdayHeroIndex(profile?.id).then(({ data, error }) => {
      if (error) {
        console.error(error);
        setIsLoading(false);
        return;
      }
      if (data) {
        const userIndex = data.findIndex((usr: any) => usr.id === profile?.id);
        setUserRank(`${userIndex + 1}`);
        setOtherUsers(data);
        console.log("Users:", data);
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <NomineeCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold mb-4">Our Heroes</h2>

      {/* Current User Card */}
      {profile && (
        <div className="border-b pb-8">
          <UserCard
            profileUser={transformUserProfile({ ...profile, rank: userRank })}
            isCurrentUser={true}
          />
        </div>
      )}

      {/* Other Users */}
      <div>
        <div className="space-y-4">
          {otherUsers.map((user: any, index: number) => {
            return (
              <UserCard
                key={user.id}
                profileUser={transformUserProfile({
                  ...user,
                  rank: `${index + 1}`,
                })}
                connection={user.connection}
                isCurrentUser={profile?.id === user.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
