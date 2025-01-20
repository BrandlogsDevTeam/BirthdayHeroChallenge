"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CalendarDays } from "lucide-react";
import { useLogStory } from "@/app/actions/logStoryContext";

export default function DurationSelection() {
  const router = useRouter();
  const { updateLogStoryData } = useLogStory();

  const handleSelection = (isMultiDay: boolean) => {
    updateLogStoryData({ isMultiDay });
    router.push(
      isMultiDay
        ? "/create-log-story/duration/multiple-days"
        : "/create-log-story/duration/single-day"
    );
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Choose Event Duration
      </h2>
      <div className="grid grid-cols-1 gap-6">
        <Card
          className="cursor-pointer hover:border-green-600 transition-colors shadow-none hover:shadow-md"
          onClick={() => handleSelection(false)}
        >
          <CardContent className="flex items-start space-x-4 p-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Single Day Event
              </h3>
              <p className="text-gray-600 mb-4">
                Perfect for birthdays, anniversaries, or one-time celebrations
              </p>
              <div className="inline-flex items-center text-green-600 font-medium">
                Select
                <svg
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:border-green-600 transition-colors"
          onClick={() => handleSelection(true)}
        >
          <CardContent className="flex items-start space-x-4 p-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <CalendarDays className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Multiple Day Event
              </h3>
              <p className="text-gray-600 mb-4">
                Ideal for festivals, multi-day celebrations, or extended events
              </p>
              <div className="inline-flex items-center text-green-600 font-medium">
                Select
                <svg
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
