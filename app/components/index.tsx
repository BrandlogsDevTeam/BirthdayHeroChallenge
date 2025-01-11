"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { promissoryDonations } from "@/lib/supabase/server-extended/birthdayIndex";
import { fetchUser } from "@/lib/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleConnect = () => {
    console.log(`Connecting with ${profileUser.name}`);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 max-w-2xl w-full ${
        isCurrentUser ? "ring-2 ring-blue-500" : ""
      }`}
    >
      {isCurrentUser && (
        <div className="bg-blue-50 px-6 py-2">
          <span className="text-blue-600 text-sm font-medium">
            Your Profile
          </span>
        </div>
      )}

      <div className="p-6">
        <div className="flex gap-4">
          {/* Rank Number */}
          <div className="flex-shrink-0">
            <div className="bg-gradient-to-br from-green-50 to-green-100 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-lg font-bold bg-gradient-to-br from-green-600 to-green-800 bg-clip-text text-transparent">
                #{profileUser.index}
              </span>
            </div>
          </div>

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
                        Total Promissory Donations:
                      </span>
                      <span className="text-sm font-semibold text-green-600">
                        {formatCurrency(profileUser.totalDonation || 0)}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        Total Birthday Gift Bonus:
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
  );
};

export const BirthdayIndex = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [otherUsers, setOtherUsers] = useState<User[]>([]);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const {
        data: { user },
      } = await fetchUser();
      if (user) {
        setLoggedInUserId(user.id);
      }
    };

    const fetchAndSortUsers = async () => {
      const result = await promissoryDonations();

      if (result.data) {
        const sortedUsers = result.data
          .filter(
            (user): user is typeof user & { totalDonation: number } =>
              !("error" in user) && typeof user.totalDonation === "number"
          )
          .sort((a, b) => b.totalDonation - a.totalDonation)
          .map((user, index) => ({
            index: index + 1,
            id: user.userId,
            name: user.name,
            username: user.username,
            avatar_url: user.avatar_url,
            age: user.age,
            remainingLife: user.remainingLife,
            totalDonation: user.totalDonation,
            birthDate: user.birthDate,
          }));

        // Find current user and separate them from other users
        const currentUserData = sortedUsers.find(
          (u) => u.id === loggedInUserId
        );
        const filteredOtherUsers = sortedUsers.filter(
          (u) => u.id !== loggedInUserId
        );

        setCurrentUser(currentUserData || null);
        setOtherUsers(filteredOtherUsers);
      }
    };

    fetchLoggedInUser();
    fetchAndSortUsers();

    const realTimeSubscription = async () => {
      const supabase = await createClient();
      const subscription = supabase
        .channel("db-index-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "bhc",
            table: "user_profiles",
          },
          async () => {
            await fetchAndSortUsers();
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    };

    realTimeSubscription();
  }, [loggedInUserId]);

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold mb-4">Our Heroes</h2>
      {/* Current User Card */}
      {currentUser && (
        <div className="border-b pb-8">
          <UserCard profileUser={currentUser} isCurrentUser={true} />
        </div>
      )}

      {/* Other Users */}
      <div>
        <div className="space-y-4">
          {otherUsers.map((user) => (
            <UserCard key={user.id} profileUser={user} isCurrentUser={false} />
          ))}
        </div>
      </div>
    </div>
  );
};
