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

        const filteredStories = data?.filter((story) =>
          story.title.toLowerCase().includes("birthday")
        );

        setBirthdayStories(filteredStories ?? []);
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
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-red-600 text-center p-4">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-4">
        {birthdayStories.length === 0 ? (
          <p className="text-center text-gray-600">
            No birthday log stories found
          </p>
        ) : (
          birthdayStories.map((story) => (
            <Link
              key={story.id}
              href={`/repost/${story.id}/content`}
              className="group flex flex-col items-center gap-4 max-w-xl bg-white border border-gray-300 hover:bg-green-600 hover:text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white p-2 transition-transform group-hover:scale-110 duration-300">
                <Image
                  src={story.image_url[0] || "/placeholder-image.png"}
                  alt={story.title}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg text-black group-hover:text-white transition-colors duration-300">
                {story.title}
              </h3>
            </Link>
          ))
        )}
      </div>
    </Layout>
  );
};

export default SelectLogStory;
