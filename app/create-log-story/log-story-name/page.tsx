"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateStory() {
  const [storyName, setStoryName] = useState("");
  const router = useRouter();

  const handlePreview = () => {
    if (storyName) {
      router.push(
        `/create-log-story/log-story-name/preview?name=${encodeURIComponent(
          storyName
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
          value={storyName}
          placeholder="Enter log story name..."
          onChange={(e) => setStoryName(e.target.value)}
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
