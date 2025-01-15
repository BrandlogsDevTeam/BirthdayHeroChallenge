"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import Image from "next/image";

export default function AddImage() {
  const [images, setImages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...newImages].slice(0, 5));
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log("Submitting images:", { images, message });
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-green-600">Add Log Story Image</h2>
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          <label htmlFor="imageUpload" className="cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-500">
              Click to upload images (max 5)
            </p>
          </label>
        </div>
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {images.map((image, index) => (
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={280}
          />
          <p className="text-sm text-gray-500 mt-2">
            {message.length}/280 characters
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={handleSubmit}
          >
            Post Log Story
          </Button>
        </div>
      </div>
    </div>
  );
}
