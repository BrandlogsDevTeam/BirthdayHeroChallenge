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
import PublicNominees from "./public-nominations";

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
  const { openFlow } = useConnectionFlow();

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
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full ring-2 ring-blue-500 overflow-hidden">
                <img
                  src={profileUser?.avatar_url}
                  alt={profileUser?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* User Info */}
            <div className="text-center sm:text-left flex-grow">
              <h3 className="text-xl font-semibold text-gray-900">
                {profileUser.name}
              </h3>
              <p className="text-sm text-gray-500">@{profileUser.username}</p>
              <div className="mt-3">
                <p className="text-sm text-gray-600">
                  Total Promissory Donations:
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(profileUser.totalDonation || 0)}
                </p>
              </div>
            </div>

            {/* Connect Button */}
            {!isCurrentUser && (
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={handleConnect}
                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
                >
                  Connect
                </button>
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
                isCurrentUser={false}
              />
            );
          })}
          <PublicNominees />
        </div>
      </div>
    </div>
  );
};
