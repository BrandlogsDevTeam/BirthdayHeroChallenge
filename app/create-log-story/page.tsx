import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import LogStorySelection from "../components/log-story-selection";

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
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold text-green-600">
        Select your log story category
      </h3>

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

      <div className="space-y-6">
        {celebrations.map((celebration) => (
          <LogStorySelection
            key={celebration.title}
            title={celebration.title}
            avatar={celebration.icon}
            href={celebration.href}
          />
        ))}
      </div>
    </div>
  );
}
