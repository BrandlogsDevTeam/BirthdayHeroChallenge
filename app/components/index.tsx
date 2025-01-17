"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getBirthdayHeroIndex } from "@/lib/supabase/server-extended/userProfile";
import { useAuth } from "../actions/AuthContext";
import { Spinner } from "./ui/spinner";
import { AuthModal } from "./Post";
import { Dialog } from "@/components/ui/dialog";

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
}

const UserCard: React.FC<UserCardProps> = ({ profileUser, isCurrentUser }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { profile } = useAuth();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleConnect = () => {
    if (!profile) {
      setShowAuthModal(true);
      return;
    }
    console.log("Connect button clicked!");
  };

  return (
    <>
      <div
        className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 max-w-2xl w-full ${
          isCurrentUser ? "ring-2 ring-blue-500" : ""
        }`}
      >
        {
          <div className="bg-blue-50 px-6 py-2">
            <span className="text-blue-600 text-sm font-semibold">
              #{profileUser.index}
            </span>
          </div>
        }

        <div className="p-6">
          <div className="flex gap-4">
            {/* Main Content Container */}
            <div className="flex-grow min-w-0 flex gap-4 items-start justify-between">
              <div className="flex gap-4 min-w-0 flex-grow">
                {/* Avatar */}
                <a
                  href={`/cause-assistant/${profileUser.username}`}
                  className="flex-shrink-0"
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
                    <Avatar className="w-full h-full rounded-full">
                      <AvatarImage
                        src={profileUser?.avatar_url}
                        alt={profileUser?.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-lg">
                        {getInitials(profileUser?.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </a>

                {/* User Info */}
                <div className="min-w-0 flex-grow">
                  <div className="space-y-1 mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                      {profileUser.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      @{profileUser.username}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                        <span className="text-sm text-gray-600 whitespace-nowrap">
                          Promissory Food Donations:
                        </span>
                        <span className="text-sm font-semibold text-green-600">
                          {formatCurrency(profileUser.totalDonation || 0)}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                        <span className="text-sm text-gray-600 whitespace-nowrap">
                          Birthday Gift Bonus:
                        </span>
                        <span className="text-sm font-semibold text-green-600">
                          $250
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connect Button */}
              {!isCurrentUser && (
                <div className="flex-shrink-0">
                  <Button
                    onClick={handleConnect}
                    variant="outline"
                    className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors whitespace-nowrap"
                  >
                    Connect
                  </Button>
                </div>
              )}
            </div>
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
    const fetchAndCacheData = async () => {
      setIsLoading(true);

      const cached = getCache<any>();

      if (cached) {
        setOtherUsers(cached.data);
        if (profile) {
          setUserRank(
            `${
              (cached.data?.findIndex((usr: any) => usr.id === profile?.id) ||
                0) + 1
            }` || ""
          );
        }
      } else {
        try {
          const { data } = await getBirthdayHeroIndex();
          if (data) {
            setOtherUsers(data);
            setCache(data);

            if (profile) {
              setUserRank(
                `${
                  (data?.findIndex((usr: any) => usr.id === profile?.id) || 0) +
                  1
                }` || ""
              );
            }
          }
        } catch (error) {
          console.error("Error fetching birthday hero index:", error);
        }
      }

      setIsLoading(false);
    };

    fetchAndCacheData();
  }, [profile]);

  if (isLoading) {
    return <Spinner className="text-green-700" />;
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
                isCurrentUser={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
