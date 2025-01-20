"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CakeIcon, PlusCircle } from "lucide-react";
import LogStorySelection from "../../components/log-story-selection";
import { useAuth } from "@/app/actions/AuthContext";
import { useRouter } from "next/router";
import { useLogStory } from "@/app/actions/logStoryContext";
import { Card, CardContent } from "@/components/ui/card";

const celebrations = [
  {
    title: "My Birthday Celebration",
    icon: "/icons/birthday-cake.svg",
    href: "/create-log-story/add-image",
  },
  {
    title: "My Christmas Celebration",
    icon: "/icons/christmas-tree.svg",
    href: "/create-log-story/add-image",
  },
  {
    title: "My Eid Mubarak Celebration",
    icon: "/icons/crescent-moon.svg",
    href: "/create-log-story/add-image",
  },
  {
    title: "My Diwali Celebration",
    icon: "/icons/diya-lamp.svg",
    href: "/create-log-story/add-image",
  },
  {
    title: "My Valentine's Day Celebration",
    icon: "/icons/heart.svg",
    href: "/create-log-story/add-image",
  },
];

export default function Home() {
  const { logStoryData, updateLogStoryData } = useLogStory();
  const { profile } = useAuth();
  const router = useRouter();

  const handleBirthdayClick = async () => {
    if (profile) {
      try {
        const birthday = profile?.birth_date;
        updateLogStoryData({
          title: "My Birthday Celebration",
          isMultiDay: false,
          start_date: birthday,
          end_date: birthday,
          isAllDay: true,
          start_time: "",
          end_time: "",
        });
        console.log(`Birthday: ${birthday}`);
        router.push("/create-log-story/add-image");
      } catch (error) {
        console.error("Failed to fetch birthday:", error);
      }
    }
  };

  return (
    <div className="space-y-8 p-6">
      <h3 className="text-2xl font-semibold text-green-600">
        Select your log story category
      </h3>

      <Card
        className="w-full max-w-md cursor-pointer hover:border-custom-green transition-all duration-200"
        onClick={handleBirthdayClick}
      >
        <CardContent className="flex items-center gap-4 p-6">
          <div className="p-6 border border-green-600 rounded-full">
            <CakeIcon className="w-6 h-6 text-custom-green" />
          </div>
          <h3 className="text-lg font-semibold group-hover:text-custom-green transition-colors duration-200">
            My Birthday Celebration
          </h3>
        </CardContent>
      </Card>

      <div className="flex justify-start">
        <Button asChild className="bg-green-600 text-white hover:bg-green-700">
          <Link
            href="/create-log-story/log-story-name"
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-8 h-8" />
            Create Other
          </Link>
        </Button>
      </div>
    </div>
  );
}
