"use server";

import { createClient } from "@/lib/supabase/server";

interface UserCalculation {
  userId: string;
  age?: number;
  remainingLife?: number;
  totalDonation?: number;
  birthDate?: string;
  error?: string;
  name: string;
  username: string;
  avatar_url: string;
}

export const promissoryDonations = async (): Promise<{
  data?: UserCalculation[];
  error?: string;
}> => {
  const supabase = await createClient();
  const LIFE_EXPECTANCY = 80;
  const BASE_DONATION = 280;
  const YEARLY_INCREMENT = 50;
  const INITIAL_YEARS = 4;

  const { data: users, error } = await supabase
    .schema("bhc")
    .from("user_profiles")
    .select("*");

  if (error) {
    console.error("Error fetching users:", error);
    return { error: "Failed to fetch user data" };
  }

  const calculations = users.map((user) => {
    try {
      const publicMetadata =
        typeof user.public_metadata === "string"
          ? JSON.parse(user.public_metadata)
          : user.public_metadata;
      const birthDate = publicMetadata?.user_meta?.birthDate;

      const baseUserData = {
        userId: user.id,
        name: user.name || "",
        username: user.username || "",
        avatar_url: user.avatar_url || "",
      };

      if (!birthDate) {
        return {
          ...baseUserData,
          error: "Birth date not found",
        };
      }

      const birth = new Date(birthDate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();

      const monthDiff = today.getMonth() - birth.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
      ) {
        age--;
      }

      const remainingLife = LIFE_EXPECTANCY - age;
      const totalDonation =
        BASE_DONATION + (remainingLife - INITIAL_YEARS) * YEARLY_INCREMENT;

      return {
        ...baseUserData,
        age,
        remainingLife,
        totalDonation,
        birthDate,
      };
    } catch (err) {
      console.error(`Error processing user ${user.id}:`, err);
      return {
        userId: user.id,
        name: user.name || "",
        username: user.username || "",
        avatar_url: user.avatar_url || "",
        error: "Failed to process user data",
      };
    }
  });

  return {
    data: calculations,
  };
};
