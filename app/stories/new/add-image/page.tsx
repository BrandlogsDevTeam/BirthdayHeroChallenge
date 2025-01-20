"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useLogStory } from "@/app/actions/logStoryContext";
import { createLogStory } from "@/lib/supabase/server-extended/log-stories";
import { Spinner } from "@/app/components/ui/spinner";
import { uploadAvatar } from "@/lib/supabase/server-extended/userProfile";

export default function AddImage() {
  const { logStoryData, updateLogStoryData } = useLogStory();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [image_urls, setImage_urls] = useState<string[]>(
    logStoryData.image_urls
  );
  const [description, setDescription] = useState(logStoryData.description);
  const router = useRouter();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImageFiles = Array.from(files);
      const totalImages = imageFiles.length + newImageFiles.length;
      if (totalImages > 5) {
        alert("Maximum 5 images allowed");
        return;
      }

      setImageFiles([...imageFiles, ...newImageFiles].slice(0, 5));

      const newImages = newImageFiles.map((file) => URL.createObjectURL(file));
      const updateImages = [...image_urls, ...newImages].slice(0, 5);
      setImage_urls(updateImages);
      updateLogStoryData({ image_urls: updateImages });
    }
  };

  const handleRemoveImage = (index: number) => {
    const updateImages = image_urls.filter((_, i) => i !== index);
    setImage_urls(updateImages);
    updateLogStoryData({ image_urls: updateImages });
  };

  const uploadImages = async () => {
    const uploadedUrls: string[] = [];
    for (const file of imageFiles) {
      const filePath = `${Date.now()}-${file.name}`;
      const result = await uploadAvatar(filePath, file);
      if (result.error) {
        throw new Error(`Failed to upload image: ${file.name}`);
      }
      if (result.data) {
        uploadedUrls.push(result.data);
      }
    }
    return uploadedUrls;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Current form state:", {
        description,
        imageFiles,
        logStoryData,
      });

      console.log("Starting image upload...");
      const uploadedImageUrls = await uploadImages();
      console.log("Uploaded image URLs:", uploadedImageUrls);

      const updatedStoryData = {
        ...logStoryData,
        description,
        image_urls: uploadedImageUrls,
      };

      console.log("Submitting story data:", updatedStoryData);

      const result = await createLogStory(updatedStoryData);

      if (result.error) {
        console.error("Create log story failed:", {
          error: result.error,
          details: result.details,
        });

        setError(
          result.error === "undefined"
            ? "Failed to create log story. Please check all required fields."
            : result.error
        );
        return;
      }

      console.log("Log story created successfully:", result.data);
      router.push("/");
      router.refresh();
    } catch (err) {
      const error = err as Error;
      console.error("Submission error:", {
        message: error.message,
        stack: error.stack,
      });
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-green-600">Add Log Story Image</h2>
      {error && (
        <div className="text-red-500 bg-red-50 p-3 rounded-md">{error}</div>
      )}
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            disabled={image_urls.length >= 5}
          />
          <label
            htmlFor="imageUpload"
            className={`cursor-pointer ${
              image_urls.length >= 5 ? "opacity-50" : ""
            }`}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-500">
              Click to upload images ({image_urls.length}/5)
            </p>
          </label>
        </div>
        {image_urls.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {image_urls.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Uploaded ${index + 1}`}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover w-full h-24"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Create your log story
          </label>
          <Textarea
            placeholder="Write your log story here..."
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={280}
          />
          <p className="text-sm text-gray-500 mt-2">
            {description.length}/280 characters
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <span className="loading-button-content flex items-center gap-2">
              {isLoading ? "Posting..." : "Post"}
              {isLoading && <Spinner size="sm" />}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
