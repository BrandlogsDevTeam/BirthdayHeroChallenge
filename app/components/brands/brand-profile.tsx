"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, Share2, Send, Instagram, Copy, Link, BookOpen } from "lucide-react";
import { EditBrandModal } from "./edit-brand";
import { NavTabs } from "../NavTab";
import { getBrandLogStories } from "@/lib/supabase/server-extended/log-stories";
import { LogStory } from "@/lib/types";
import Post from "../Post";
import ProfileCard from "../connects-card";

interface BrandProps {
  id: string;
  name: string;
  username: string;
  avatar_url: string;
  location: string;
  endorsement_message: string;
}

interface BrandProfileViewProps {
  brand: BrandProps;
  isOwner: boolean;
}

export const BrandProfileView = ({ brand, isOwner }: BrandProfileViewProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [logstories, setLogStories] = useState<LogStory[]>([]);

  useEffect(() => {

      // fetch brand profile data
      (async () => {
        getBrandLogStories(brand.id).then(({ data, error }) => {
          if (error) {
            console.error(error);
            return;
          }
          if (!data) return;
          setLogStories(data);
        });
      })();
    
  }, []);
  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}`,
      instagram: `https://instagram.com`,
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-6">
        <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
          <AvatarImage src={brand.avatar_url} alt={`${brand.name}`} />
          <AvatarFallback>{getInitials(brand.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl font-bold text-custom-blue">
                {brand.name}
              </h2>
              <p className="text-sm text-gray-600">@{brand.username}</p>
            </div>
            <div className="flex space-x-2 self-end sm:self-auto">
              {isOwner && (
                <Button
                  className="hover:border-green-100 hover:bg-green-100"
                  variant="outline"
                  size="icon"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit profile</span>
                </Button>
              )}
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
              <span className="text-lg font-bold text-gray-900">0</span>
              <span className="text-sm text-gray-600">log stories</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-gray-900">0</span>
              <span className="text-sm text-gray-600">connects</span>
            </div>
          </div>
          <p className="mt-4 text-gray-600 text-sm">
            {brand.endorsement_message}
          </p>
        </div>
      </div>
      <NavTabs
        tabs={[
          {
            label: "Log Stories",
            value: "log-stories",
            icon: BookOpen,
            content: logstories?.map((post) => (
              <Post
                key={post.id}
                {...{
                  profilePhoto: brand.avatar_url || "",
                  name: brand.name || "",
                  username: brand.username || "",
                  content: post.description,
                  images: post.image_urls,
                  likes: post.like_count,
                  chats: post.chat_count,
                  shares: post.share_count,
                  title: post.title,
                  date: post.created_at,
                  avatars: [],
                  id: post.id,
                  is_brand_origin: true,
                  post: post,
                  brand_origin: post.brand_origin || "",
                  original_post_by: post.original_post_by,
                }}
                // onEdit={() => console.log("Edit post")}
                // onDelete={() => console.log("Delete post")}
              />
            )),
          },
          {
            label: "Connects",
            value: "connects",
            icon: Link,
            content: (
              <ProfileCard
                avatarUrl={brand.avatar_url}
                name={brand.name || ""}
                username={brand.username || ""}
                connectionType="Assistant"
                buttonText="Connect"
                onConnect={() => console.log("Connected!")}
              />
            ),
          },
        ]}
      />
      <EditBrandModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        brand={brand}
      />
    </div>
  );
};
