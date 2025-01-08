"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EditProfileModal } from "../components/edit-profile";
import {
  Pencil,
  Share2,
  BookOpen,
  Cake,
  Link,
  Instagram,
  Copy,
  Send,
} from "lucide-react";
import { NavTabs } from "../components/NavTab";
import CakeShops from "../cause-assistant/cake-shops";
import Post from "../components/Post";
import { postData } from "../data/post-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import ProfileCard from "../components/connects-card";

interface ProfileData {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  logStories: number;
  connects: number;
}

export default function ProfileSection() {
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Winnie Stanford",
    username: "winniestanf_",
    bio: "Digital creator and storyteller. Using my experience and skill for hunger causes.",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    logStories: 156,
    connects: 2400,
  });

  const handleProfileUpdate = (updatedData: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...updatedData }));
    setIsEditModalOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      description: "Profile link copied to clipboard",
      duration: 3000,
    });
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${profileData.name}'s profile!`);

    const shareUrls = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      instagram: `https://instagram.com/share?url=${url}`,
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank");
  };

  const tabs = [
    {
      label: "Log Stories",
      value: "log-stories",
      icon: BookOpen,
      content: (
        <div className="container mx-auto py-8 space-y-6">
          {postData.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      ),
    },
    {
      label: "Connects",
      value: "connects",
      icon: Link,
      content: (
        <ProfileCard
          avatarUrl="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          name="Jane Smith"
          username="@janesmith"
          connectionType="Team Member"
          buttonText="Connect"
          onConnect={() => console.log("Connected!")}
        />
      ),
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-6">
          <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
            <AvatarImage
              src={profileData.avatarUrl}
              alt={`${profileData.name}`}
            />
            <AvatarFallback>{profileData.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-xl font-bold text-custom-blue">
                  {profileData.name}
                </h2>
                <p className="text-sm text-gray-600">@{profileData.username}</p>
              </div>
              <div className="flex space-x-2 self-end sm:self-auto">
                <Button
                  className="hover:border-green-100 hover:bg-green-100"
                  variant="outline"
                  size="icon"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit profile</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="hover:border-green-100 hover:bg-green-100"
                      variant="outline"
                      size="icon"
                    >
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share profile</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 mr-2"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      WhatsApp
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("telegram")}>
                      <Send className="h-4 w-4 mr-2" />
                      Telegram
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("instagram")}>
                      <Instagram className="h-4 w-4 mr-2" />
                      Instagram
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyLink}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex justify-start space-x-6 mt-4">
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-gray-900">
                  {profileData.logStories}
                </span>
                <span className="text-sm text-gray-600">log stories</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-gray-900">
                  {profileData.connects}
                </span>
                <span className="text-sm text-gray-600">connects</span>
              </div>
            </div>
            <p className="mt-4 text-gray-600 text-sm">{profileData.bio}</p>
          </div>
        </div>
      </div>
      {/* <div className="border-b border-gray-200 mt-6"></div> */}
      <NavTabs tabs={tabs} />
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profileData={profileData}
        onUpdate={handleProfileUpdate}
      />
    </div>
  );
}
