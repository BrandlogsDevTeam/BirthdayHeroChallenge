"use client";

import { useState, useEffect } from "react";
import Post from "@/app/components/Post";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, X, Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  createRepost,
  getSelectedLogStory,
  uploadRepostImages,
} from "@/lib/supabase/server-extended/log-stories";
import Link from "next/link";

interface RepostContentProps {
  profilePhoto: string;
  name: string;
  username: string;
  content: string;
  images: string[];
  likes: number;
  chats: number;
  shares: number;
  title: string;
  date: string;
  avatars: { src: string; alt: string }[];
  is_brand_origin: boolean;
  is_liked?: boolean;
  is_repost?: boolean;
  post: any;
  id: string;
  is_post_page?: boolean;
  original_post_by: string;
  brand_origin: string;
}

export default function RepostContent() {
  const params = useParams();
  const router = useRouter();
  const [logStory, setLogStory] = useState<RepostContentProps | null>(null);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLogStory = async () => {
      if (!params.id) {
        setError("No story ID provided");
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await getSelectedLogStory(params.id as string);

        if (error || !data) {
          console.error("Fetch error:", error);
          setError(error || "Failed to fetch log story");
          setLogStory(null);
          return;
        }

        // Set initial message to original description
        setMessage(data.content);
        setLogStory(data);
        console.log("Selected log story:", data);
        setError(null);
      } catch (error) {
        console.error("Error in fetchLogStory:", error);
        setError("An error occurred while fetching log story");
        setLogStory(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogStory();
  }, [params.id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit total images to 4
    const remainingSlots = 4 - imagePreviews.length;
    const filesToAdd = files.slice(0, remainingSlots);

    const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setNewImages((prev) => [...prev, ...filesToAdd]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logStory) return;

    if (newImages.length === 0) {
      setError("Please upload at least one image for repost");
      return;
    }

    try {
      setIsSubmitting(true);

      // Upload images first
      const { data: imageUrls, error: uploadError } = await uploadRepostImages(
        newImages
      );

      if (uploadError || !imageUrls) {
        throw new Error(uploadError || "Failed to upload images");
      }

      // Create the repost
      const repostData = {
        title: logStory.title,
        description: message,
        image_urls: imageUrls,
        original_story_id: logStory.id,
        start_date: logStory.post.start_date,
        end_date: logStory.post.end_date,
        start_time: logStory.post.start_time,
        end_time: logStory.post.end_time,
      };

      const { data: newPost, error: repostError } = await createRepost(
        repostData
      );

      if (repostError || !newPost) {
        throw new Error(repostError || "Failed to create repost");
      }

      // Reset form
      setNewImages([]);
      setImagePreviews([]);
      setMessage("");

      // Navigate to the new post
      router.push(`/stories/${newPost.id}`);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create repost"
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
      </div>
    );
  }

  if (error || !logStory) {
    return (
      <div className="text-red-600 text-center p-4">
        <p>{error || "Log story not found"}</p>
        <Link
          href="/repost/select-log-story"
          className="mt-4 inline-block text-white bg-green-600 px-4 py-2 rounded-lg"
        >
          Back to Stories
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8 px-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Original Post</h2>
        <Post {...logStory} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Create Your Repost</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images (Maximum 4)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={preview}
                    alt={`Upload preview ${index + 1}`}
                    fill
                    className="rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {imagePreviews.length < 4 && (
                <label className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:border-green-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <ImagePlus className="h-8 w-8 text-gray-400" />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              className="min-h-[100px]"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              <Loader className="h-5 w-5 animate-spin mr-2" />
            ) : null}
            {isSubmitting ? "Creating Repost..." : "Create Repost"}
          </Button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
