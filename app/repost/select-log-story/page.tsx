"use client";

import React, { useState, useEffect } from "react";
import { Layout } from "@/app/components/Layout";
import Image from "next/image";
import Link from "next/link";
import { getUserLogStories } from "@/lib/supabase/server-extended/log-stories";

interface LogStoryProps {
  id: string;
  title: string;
  image_url: string[];
}

const SelectLogStory = () => {
  const [birthdayStories, setBirthdayStories] = useState<LogStoryProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBirthdayStories = async () => {
      try {
        setIsLoading(true);
        const { error, data } = await getUserLogStories();
        if (error) {
          setError(error);
          return;
        }
        console.log("Log stories:", data);
        setBirthdayStories(data || []);
      } catch (error) {
        setError("Failed to fetch stories");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBirthdayStories();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center p-4">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Select a Story to Repost
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {birthdayStories.length === 0 ? (
          <div className="col-span-full text-center text-gray-600 py-8">
            <p className="mb-4">No stories found to repost</p>
            <Link
              href="/create-story"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Create a New Story
            </Link>
          </div>
        ) : (
          birthdayStories.map((story) => (
            <Link
              key={story.id}
              href={`/repost/${story.id}/content`}
              className="group flex flex-col items-center gap-4 bg-white border border-gray-300 hover:border-green-600 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white p-2 transition-transform group-hover:scale-110 duration-300">
                <Image
                  src={
                    Array.isArray(story.image_url)
                      ? story.image_url[0]
                      : story.image_url || "/placeholder-image.png"
                  }
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold group-hover:text-green-600 transition-colors">
                  {story.title}
                </h3>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SelectLogStory;
