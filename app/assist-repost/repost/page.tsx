"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  CakeIcon,
  ChevronLeft,
  ChevronRight,
  Heart,
  Lightbulb,
  Loader,
  Moon,
  Pencil,
  Plus,
  TreePine,
  Upload,
  X,
} from "lucide-react";
import { useAuth } from "@/app/actions/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { formatDateOrdinal, getNextOccurrence } from "@/lib/utils";
import Image from "next/image";
import { Spinner } from "@/app/components/ui/spinner";
import {
  getSelfSettings,
  uploadImage,
} from "@/lib/supabase/server-extended/userProfile";
import {
  createLogStory,
  createRepostAssist,
  getLogStory,
} from "@/lib/supabase/server-extended/log-stories";
import { v4 as uuid } from "uuid";
import { useRouter, useSearchParams } from "next/navigation";
import { AvatarImage } from "@/components/ui/avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogStoryDBO } from "@/lib/types";
import { getPublicProfileByID } from "@/lib/supabase/server-extended/userProfile";
import { PublicAccountDBO } from "@/lib/types";

interface IStoryCreationObj {
  title: string;
  start_date: Date | null;
  end_date: Date | null;
  start_time: string | null;
  end_time: string | null;
  description: string;
  image_urls: string[];

  error?: string;
}

export default function Home() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id")!;
  const nominee = searchParams.get("nominee")!;
  const { profile } = useAuth();
  const [story, setStory] = useState<LogStoryDBO | null>(null);
  const router = useRouter();
  const [userTimeZone, setUserTimeZone] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [customDescriptionInputToggle, setCustomDescriptionInputToggle] =
    useState(false);
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string>();
  const [formData, setFormData] = useState<IStoryCreationObj>({
    title: "",
    start_date: null,
    end_date: null,
    start_time: null,
    end_time: null,
    image_urls: [],
    description: "",
  });
  const [account, setAccount] = useState<PublicAccountDBO | null>(null);

  const [dateTimeSelection, setDateTimeSelection] = useState<{
    start_month?: string;
    start_day?: string;
    start_year?: string;

    start_hour?: string;
    start_minute?: string;

    end_month?: string;
    end_day?: string;
    end_year?: string;

    end_hour?: string;
    end_minute?: string;
  }>({});

  const DEFAULT_DATE_STORY_MESSAGES = [
    "Looking for recommendations! What's your favorite local restaurant for a special occasion? 🍽️ #FoodieFinds #LocalEats",
    `Just finished reading an amazing book! Has anyone else read "The Midnight Library"? Would love to hear your thoughts! 📚 #BookLovers #ReadingCommunity`,
    `Weekend hiking adventure! Anyone know some hidden gems for hiking trails nearby? 🏃‍♂️🌲 #OutdoorLife #WeekendVibes`,
    `Tech enthusiasts! What's your must-have productivity app in 2025? Share your recommendations! 📱 #ProductivityTips #TechLife`,
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "description") {
      if (value.length > 280) {
        return;
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    else {
      const newImageFiles = Array.from(files);

      if (imageFiles.length + newImageFiles.length > 5) {
        alert("Maximum 5 images allowed");
        return;
      }

      for (const file of newImageFiles) {
        if (file.size > 5 * 1024 * 1024) {
          alert("Maximum image size is 5MB");
          return;
        }
      }

      setImageFiles([...imageFiles, ...newImageFiles]);
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

      const { data, error } = await createRepostAssist({
        post_by: account!.id,
        is_brand_log: account!.is_brand,
        title: formData.title,
        image_urls,
        start_date: formData.start_date!.toISOString(),
        end_date: formData.end_date!.toISOString(),
        start_time: formData.start_time || "00:00",
        end_time: formData.end_time || "23:59",
        description: formData.description,
        is_repost: true,
        repost_of: id,
      });

      if (error) setFormData((fd) => ({ ...fd, error: error }));

      if (data) router.replace(`/stories/${data.id}`);
    } catch (error) {
      setFormData((fd) => ({ ...fd, error: `${error}` }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      (async () => {
        const { data, error } = await getSelfSettings();
        if (!data) {
          // use local timezone
          setUserTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
        } else {
          setUserTimeZone(data?.timezone || "");
        }
      })();
    }

    (async () => {
      const { data, error } = await getPublicProfileByID(nominee);
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        setAccount(data);
      }
    })();
  }, [profile]);

  useEffect(() => {
    if (id) {
      (async () => {
        const { data, error } = await getLogStory(id);
        if (error) {
          console.error(error);
          return;
        }
        if (data) {
          setStory(data);
          const start_date = new Date(data.start_date);
          const end_date = new Date(data.end_date);

          setFormData({
            title: data.title,
            start_date: start_date,
            end_date: end_date,
            start_time: data.start_time,
            end_time: data.end_time,
            description: "",
            image_urls: [],
          });
          setDateTimeSelection({
            start_month: `${start_date.getMonth() + 1}`,
            start_day: `${start_date.getDate()}`,
            start_year: `${start_date.getFullYear()}`,
            end_month: `${end_date.getMonth() + 1}`,
            end_day: `${end_date.getDate()}`,
            end_year: `${end_date.getFullYear()}`,
          });

          setStep(4);
        }
      })();
    }
  }, [id]);

  if (!profile || !story)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner className="h-6 w-6" />
      </div>
    );

  return (
    <>
      <div className="px-6">
        {/* Step 4: Suggested Date Story Messages */}
        {step === 4 ? (
          <div className="flex flex-col pt-16 gap-6">
            <div className="flex flex-row justify-between gap-2">
              <h2 className="text-2xl font-bold mb-6 text-green-600">
                Suggested Date Story Messages
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant={customDescriptionInputToggle ? "outline" : "default"}
                className={`${
                  customDescriptionInputToggle
                    ? "bg-white text-green-600 border-green-600"
                    : "bg-green-600 hover:bg-green-700 text-white"
                } w-fit`}
                onClick={() =>
                  setCustomDescriptionInputToggle(!customDescriptionInputToggle)
                }
              >
                Customise
              </Button>

              {customDescriptionInputToggle && (
                <div className="flex flex-col gap-2">
                  <textarea
                    name="description"
                    rows={3}
                    onChange={handleInputChange}
                    value={formData.description}
                    placeholder="Enter your custom description..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-green focus:border-transparent outline-none transition-all duration-200"
                  />
                  <p className="text-sm text-gray-500 mt-2 ml-auto">
                    {formData.description.length}/280 characters
                  </p>
                  {errors && (
                    <div className="text-red-500 bg-red-50 p-3 rounded-md">
                      {errors}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (
                        !formData?.description ||
                        formData?.description?.trim().length === 0
                      ) {
                        setErrors("Description is required");
                        return;
                      }
                      setStep(5);
                      setErrors(undefined);
                    }}
                    className="px-4 py-2 ml-auto w-fit bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>

            {!customDescriptionInputToggle &&
              DEFAULT_DATE_STORY_MESSAGES.map((message) => {
                return (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg shadow p-4">
                      <div className="flex justify-between items-start">
                        <p className="text-gray-800">{message}</p>
                        <button
                          onClick={() => {
                            setFormData((fd) => ({
                              ...fd,
                              description: message,
                            }));
                            setStep(5);
                          }}
                          className="ml-4"
                        >
                          <Plus className="w-6 h-6 text-green-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <></>
        )}

        {/* Step 5: Image Upload */}
        {step === 5 ? (
          <div className="flex flex-col pt-16 gap-6">
            <div className="flex flex-row justify-between gap-2">
              <h2 className="text-2xl font-bold mb-6 text-green-600">
                Upload Images
              </h2>
              <Button
                variant="outline"
                onClick={() => {
                  setStep(4);
                  setErrors(undefined);
                }}
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Back
              </Button>
            </div>

            <div className="space-y-6">
              <div className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center">
                  {imageFiles.length ? (
                    <>
                      <div className="flex gap-2">
                        {imageFiles.map((file, index) => (
                          <div key={index} className="relative shadow-md">
                            <Image
                              src={
                                URL.createObjectURL(file) || "/placeholder.svg"
                              }
                              alt={`Uploaded ${index + 1}`}
                              width={100}
                              height={100}
                              className="rounded-lg object-cover w-24 h-24"
                            />
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="mb-2 text-lg font-semibold text-gray-700">
                        Click to upload an image
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG or GIF (MAX. 5MB)
                      </p>
                    </>
                  )}

                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    multiple
                    max={5}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Select Images
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-end">
                {errors && (
                  <div className="text-red-500 bg-red-50 p-3 rounded-md">
                    {errors}
                  </div>
                )}
                <Button
                  className="bg-green-600 text-white w-fit ml-auto hover:bg-green-700"
                  onClick={() => {
                    if (imageFiles.length === 0) {
                      setErrors("Please upload at least one image");
                      return;
                    }
                    setStep(6);
                    setErrors(undefined);
                  }}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* Step 6: Confirmation */}
        {step === 6 ? (
          <div className="flex flex-col pt-16 gap-6">
            <div className="flex flex-row justify-between gap-2">
              <h2 className="text-2xl font-bold mb-6 text-green-600">
                Preview Date Story
              </h2>
              <div className="flex flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(5);
                    setErrors(undefined);
                  }}
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  Back
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-green-600 text-white hover:text-white hover:bg-green-700 px-6"
                >
                  {isLoading ? (
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    "Post"
                  )}
                </Button>
              </div>
            </div>
            <div className="max-w-[560px] w-full mx-auto rounded-md bg-white shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={account?.avatar_url || ""}
                        alt={account?.name || ""}
                      />
                      <AvatarFallback>{account?.name}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold">{account?.name}</h3>
                      <h4 className="text-xs text-gray-500">
                        @{account?.username}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="px-3 pb-3 text-sm text-gray-700">
                  <p>{formData.description}</p>
                </div>
                <div className="relative">
                  <Image
                    src={
                      URL.createObjectURL(imageFiles[currentImageIndex]) ||
                      "/placeholder.svg"
                    }
                    alt={`Post by ${profile?.name}`}
                    width={470}
                    height={470}
                    className="w-full h-auto"
                  />
                  {imageFiles.length > 1 && (
                    <>
                      <button
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 transition-opacity hover:bg-black/70"
                        onClick={() =>
                          setCurrentImageIndex((c) => Math.max(c - 1, 0))
                        }
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 transition-opacity hover:bg-black/70"
                        onClick={() =>
                          setCurrentImageIndex((c) =>
                            Math.min(c + 1, imageFiles.length - 1)
                          )
                        }
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {imageFiles.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  <div className="p-4 bg-gradient-to-t from-black/70 to-transparent absolute bottom-0 left-0 right-0">
                    <div className="flex justify-between items-center">
                      <div className="text-white">
                        <h3 className="text-lg font-semibold">
                          {formData.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {formatDateOrdinal(formData.start_date!)}{" "}
                          {Math.abs(
                            +(formData.start_date || 0) -
                              +(formData.end_date || 0)
                          ) > 86400000
                            ? "- " + formatDateOrdinal(formData.end_date!)
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
