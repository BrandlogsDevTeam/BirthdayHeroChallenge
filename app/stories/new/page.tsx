"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CakeIcon,
  Calendar,
  CalendarDays,
  Clock,
  Heart,
  Lightbulb,
  Moon,
  PlusCircle,
  TreePine,
  Upload,
} from "lucide-react";
import { useAuth } from "@/app/actions/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { getNextOccurrence, removeDate, toTimeString } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/app/components/ui/spinner";
import { uploadImage } from "@/lib/supabase/server-extended/userProfile";
import { createLogStory } from "@/lib/supabase/server-extended/log-stories";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";

interface IStoryCreationObj {
  title: string;
  event_duration: "all_day" | "specific_time" | "";
  start_date: Date | null;
  end_date: Date | null;
  start_time: Date | null;
  end_time: Date | null;
  description: string;
  image_urls: string[];

  error?: string;
}

export default function Home() {
  const { profile } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<IStoryCreationObj>({
    title: "",
    event_duration: "",
    start_date: null,
    end_date: null,
    start_time: null,
    end_time: null,
    image_urls: [],
    description: "",
  });

  const LOG_STORY_TEMPLATES: {
    [key: string]: {
      template: IStoryCreationObj;
      detail: {
        icon: any;
        content: string;
      };
    };
  } = {
    birthday: {
      template: {
        title: "My Birthday Celebration",
        event_duration: "all_day",
        image_urls: [],
        description: "",
        start_date: getNextOccurrence(new Date(profile?.birth_date || '')),
        end_date: getNextOccurrence(new Date(profile?.birth_date || '')),
        start_time: removeDate(new Date(0, 0, 0, 0, 0)),
        end_time: removeDate(new Date(0, 0, 0, 23, 59)),
      },
      detail: {
        icon: <CakeIcon className="w-6 h-6 text-custom-green" />,
        content: "My Birthday Celebration",
      },
    },
    christmas: {
      template: {
        title: "My Christmas Celebration",
        event_duration: "all_day",
        image_urls: [],
        description: "",
        start_date: getNextOccurrence(new Date("12-25-2000")),
        end_date: getNextOccurrence(new Date("12-25-2000")),
        start_time: removeDate(new Date(0, 0, 0, 0, 0)),
        end_time: removeDate(new Date(0, 0, 0, 23, 59)),
      },
      detail: {
        icon: <TreePine className="w-6 h-6 text-custom-green" />,
        content: "My Christmas Celebration",
      },
    },
    eid: {
      template: {
        title: "My Eid Celebration",
        event_duration: "all_day",
        image_urls: [],
        description: "",
        start_date: new Date(),
        end_date: new Date(),
        start_time: removeDate(new Date(0, 0, 0, 0, 0)),
        end_time: removeDate(new Date(0, 0, 0, 23, 59)),
      },
      detail: {
        icon: <Moon className="w-6 h-6 text-custom-green" />,
        content: "My Eid Celebration",
      },
    },
    diwali: {
      template: {
        title: "My Diwali Celebration",
        event_duration: "all_day",
        image_urls: [],
        description: "",
        start_date: new Date(),
        end_date: new Date(),
        start_time: removeDate(new Date(0, 0, 0, 0, 0)),
        end_time: removeDate(new Date(0, 0, 0, 23, 59)),
      },
      detail: {
        icon: <Lightbulb className="w-6 h-6 text-custom-green" />,
        content: "My Diwali Celebration",
      },
    },
    valentine: {
      template: {
        title: "My Valentine Celebration",
        event_duration: "all_day",
        image_urls: [],
        description: "",
        start_date: getNextOccurrence(new Date("02-14-2000")),
        end_date: getNextOccurrence(new Date("02-14-2000")),
        start_time: removeDate(new Date(0, 0, 0, 0, 0)),
        end_time: removeDate(new Date(0, 0, 0, 23, 59)),
      },
      detail: {
        icon: <Heart className="w-6 h-6 text-custom-green" />,
        content: "My Valentine Celebration",
      },
    },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAllDayEvent = () => {
    setFormData((fd) => ({
      ...fd,
      event_duration: "all_day",
      start_time: removeDate(new Date("0 00:00")),
      end_time: removeDate(new Date("0 23:59")),
    }));
    setStep(7);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImageFiles = Array.from(files);
      if (newImageFiles.length > 5) {
        alert("Maximum 5 images allowed");
        return;
      }

      setImageFiles(newImageFiles.slice(0, 5));
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((fl) => fl.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    const image_urls: string[] = [];
    setIsLoading(true);
    try {
      await Promise.all(
        imageFiles.map(async (file) => {
          const fileExt = file.name.split(".").pop();
          const fileName = `${uuid()}.${fileExt}`;
          const filePath = `${fileName}`;

          console.log("Uploading ", filePath);

          const { data, error } = await uploadImage(filePath, file);

          if (error) {
            console.error(error);
            return Promise.reject(error);
          }

          if (!data) return Promise.reject("No Data");
          image_urls.push(data);
          return Promise.resolve();
        })
      );

      const { data, error } = await createLogStory({
        is_brand_origin: false,
        title: formData.title,
        image_urls,
        story_type: formData.event_duration,
        start_date: formData.start_date!.toISOString(),
        end_date: formData.end_date!.toISOString(),
        start_time: toTimeString(formData.start_time!),
        end_time: toTimeString(formData.end_time!),
        description: formData.description,
      });

      if (error) setFormData((fd) => ({ ...fd, error: error }));

      if (data) router.push(`/stories/${data.id}`);
    } catch (error) {
      setFormData((fd) => ({ ...fd, error: `${error}` }));
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) return <div className="w-full h-full flex items-center justify-center">
    <Spinner className="h-6 w-6" />
  </div>;

  return (
    <>

      <div className="px-6">
        {/* Step 0: Template selection */}
        {step === 0 ? (
          <div className="flex flex-col gap-3">
            {Object.keys(LOG_STORY_TEMPLATES).map((key) => {
              const data = LOG_STORY_TEMPLATES[key];
              return (
                <Card
                  key={key}
                  className="w-full max-w-md cursor-pointer hover:border-custom-green transition-all duration-200"
                  onClick={() => {
                    setFormData(data.template);
                    console.log(data.template);
                    setStep(8);
                  }}
                >
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-6 border border-green-600 rounded-full">
                      {data.detail.icon}
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-custom-green transition-colors duration-200">
                      {data.detail.content}
                    </h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <></>
        )}

        {/* Step 1: Title */}
        {step === 1 ? (
          <div className="flex flex-col">
            <div className="space-y-4">
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                placeholder="Enter log story name..."
                onChange={handleInputChange}
              />
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData({} as IStoryCreationObj);
                    setStep(0);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Preview
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* Step 2: Title Preview */}
        {step === 2 ? (
          <div className="flex flex-col">
            <div className="space-y-4">
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                placeholder="Enter log story name..."
                onChange={handleInputChange}
                readOnly
              />
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* Step 3: Event Duration */}
        {step === 3 ? (
          <>


          </>
        ) : (<></>)}

        {/* Step 1: Title */}
        {step === 8 ? (
          <div className="flex flex-col">
            {formData.error ? (
              <div className="text-red-500 bg-red-50 p-3 rounded-md">
                {formData.error}
              </div>
            ) : (
              <></>
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
                  disabled={imageFiles.length >= 5}
                />
                <label
                  htmlFor="imageUpload"
                  className={`cursor-pointer ${imageFiles.length >= 5 ? "opacity-50" : ""
                    }`}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-500">
                    Click to upload images ({imageFiles.length}/5)
                  </p>
                </label>
              </div>
              {imageFiles.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {imageFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                        alt={`Uploaded ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover w-full h-24"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6"
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
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  maxLength={280}
                />
                <p className="text-sm text-gray-500 mt-2">
                  {formData.description.length}/280 characters
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
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
