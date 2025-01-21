"use client";

import { useState, useEffect } from "react";
import { Layout } from "@/app/components/Layout";
import Post from "@/app/components/Post";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, X, Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { getUserLogStories } from "@/lib/supabase/server-extended/log-stories";

interface RepostContentProps {
  // Add any additional fields your log story might have
  id: string;
  title: string;
  content: string;
  images: string[];
  profilePhoto: string;
  name: string;
  username: string;
  likes: number;
  chats: number;
  shares: number;
  date: string;
  avatars: { src: string; alt: string }[];
  is_brand_origin: boolean;
}

export default function RepostContent() {
  const params = useParams();
  const [logStory, setLogStory] = useState<RepostContentProps | null>(null);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLogStory = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await getUserLogStories(params.id as string);
        if (error || !data) {
          setError(error || "Failed to fetch log story");
          return;
        }

        const story = data[0];
        setLogStory(story);
      } catch (error) {
        setError("An error occurred while fetching log story");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchLogStory();
    }
  }, [params.id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setNewImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newImages.length === 0) {
      setError("Please upload at least one image for repost");
      return;
    }

    try {
      setIsSubmitting(true);
      //submit logic
      setNewImages([]);
      setImagePreviews([]);
      setMessage("");
    } catch (error) {
      setError("Failed to create repost");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
        </div>
      </Layout>
    );
  }

  if (error || !logStory) {
    return (
      <Layout>
        <div className="text-red-600 text-center p-4">
          {error || "Log story not found"}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Original Post</h2>
          <Post {...{ ...logStory, post: logStory }} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Create Your Post</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images
              </label>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={preview}
                      alt={`Upload preview ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
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
              {isSubmitting ? "Creating Post..." : "Create Post"}
            </Button>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </Layout>
  );
}
