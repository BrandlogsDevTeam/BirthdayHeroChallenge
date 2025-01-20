"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogStory } from "@/app/actions/logStoryContext";

export default function CreateStory() {
  const { logStoryData, updateLogStoryData } = useLogStory();
  const [title, setTitle] = useState(logStoryData.title);
  const router = useRouter();

  const handlePreview = () => {
    if (title) {
      updateLogStoryData({ title });
      router.push(
        `/create-log-story/log-story-name/preview?name=${encodeURIComponent(
          title
        )}`
      );
    }
  };

  return (
    <div className="max-w-xl space-y-8">
      <h2 className="text-xl font-bold text-green-600">
        Create log story name
      </h2>
      <div className="space-y-4">
        <Input
          type="text"
          id="story-name"
          value={title}
          placeholder="Enter log story name..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.push("/")}>
            Cancel
          </Button>
          <Button
            onClick={handlePreview}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
}
