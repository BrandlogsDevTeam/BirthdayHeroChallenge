"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";

export default function StoryNamePreview() {
  const [storyName, setStoryName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const name = searchParams.get("name");
    if (name) {
      setStoryName(decodeURIComponent(name));
    }
  }, [searchParams]);

  const handleConfirm = () => {
    router.push("/create-log-story/duration");
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-green-600">
        Create log story name
      </h2>
      <div className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            id="story-name"
            value={storyName}
            onChange={(e) => setStoryName(e.target.value)}
            readOnly={!isEditing}
            className="pr-10"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            onClick={handleConfirm}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
