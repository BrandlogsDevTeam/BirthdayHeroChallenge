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
    // Add your connect functionality here
    console.log(`Connecting with ${profileUser.name}`);
  };

  return (
    <div
      className={`bg-white max-w-2xl w-full rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
        isCurrentUser ? "ring-2 ring-blue-500" : ""
      }`}
    >
      {isCurrentUser && (
        <div className="bg-blue-50 px-4 py-2">
          <span className="text-blue-600 text-sm font-medium">
            Your Profile
          </span>
        </div>
      )}
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-grow">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center min-w-[2.5rem] h-10 bg-gray-50 rounded-lg">
                <span className="text-xl font-bold text-gray-400">
                  #{profileUser.index}
                </span>
              </div>
              <div className="relative">
                <a href={`/cause-assistant/${profileUser.username}`}>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full ring-2 ring-blue-500 overflow-hidden">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={profileUser?.avatar_url}
                        alt={`${profileUser?.name}`}
                      />
                      <AvatarFallback>{getInitials(profileUser?.name)}</AvatarFallback>
                    </Avatar>
                  </div>
                </a>
              </div>
            </div>
            <div className="space-y-2 flex-grow">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {profileUser.name}
                </h3>
                <p className="text-sm text-gray-500">@{profileUser.username}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm">
                  <span className="text-gray-600">
                    Total Promissory Donations:
                  </span>{" "}
                  <span className="font-semibold text-green-600">
                    {formatCurrency(profileUser.totalDonation || 0)}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">
                    Total Birthday Gift Bonus:
                  </span>{" "}
                  <span className="font-semibold text-green-600">$250</span>
                </p>
              </div>
            </div>
          </div>
          {!isCurrentUser && (
            <div className="flex-shrink-0">
              <Button
                onClick={handleConnect}
                variant="outline"
                className="text-green-600 hover:text-white border-green-600 bg-white hover:bg-green-600 transition-colors"
              >
                Connect
              </Button>
            </div>
          )}
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
