"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarGroup } from "@/components/ui/avatar-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { AcceptNomination } from "./AcceptInvitationModals";
import useFormattedDate from "../hooks/useFormattedDate";
import {
  likeLogStory,
  shareLogStory,
} from "@/lib/supabase/server-extended/log-stories";
import { useAuth } from "../actions/AuthContext";
import { useConnectionFlow } from "../actions/connectionContext";

export const AuthModal = () => {
  const router = useRouter();

  return (
    <DialogContent className="sm:max-w-md">
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <DialogHeader>
          <DialogTitle>Birthday Hero Community</DialogTitle>
        </DialogHeader>
        <AcceptNomination />
        <div className="flex items-center justify-center w-full">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="px-4 text-sm text-gray-500">Or</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        <Button
          onClick={() => router.push("/login")}
          variant="outline"
          className="w-full max-w-xs border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
        >
          Login
        </Button>
      </div>
    </DialogContent>
  );
};

interface PostProps {
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
  id: string;
}

export default function Post({
  id,
  profilePhoto,
  name,
  username,
  content,
  images,
  likes,
  chats,
  shares,
  title,
  date,
  avatars,
  is_brand_origin,
  is_liked = false,
}: PostProps) {
  const [isConnected, setisConnected] = useState(false);
  const [logCount, setLogCount] = useState(likes);
  const [isLogged, setIsLogged] = useState<boolean | "loading">(is_liked);
  const [shareCount, setShareCount] = useState(shares);
  const [isShareLoading, setIsShareLoading] = useState<boolean | string>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { profile } = useAuth();
  const { openFlow } = useConnectionFlow();

  const formattedDate = useFormattedDate(date);

  const handleConnect = () => {
    if (!profile) {
      setShowAuthModal(true);
      return;
    }
    openFlow();
  };

  const handleChat = () => {
    if (!profile) {
      setShowAuthModal(true);
      return;
    }
    console.log("Chat button clicked!");
  };

  const handleLog = async () => {
    if (!profile) {
      setShowAuthModal(true);
      return;
    }

    if (isLogged === true) {
      setIsLogged("loading");
      const { data, error } = await likeLogStory(id, false);
      if (data === "OK") {
        setIsLogged(false);
        setLogCount((c) => c - 1);
        return;
      }
      setIsLogged(false);
      console.error(error);
      return;
    } else if (isLogged === false) {
      setIsLogged("loading");
      const { data, error } = await likeLogStory(id, true);
      if (data === "OK") {
        setIsLogged(true);
        setLogCount((c) => c + 1);
        return;
      }
      setIsLogged(false);
      console.error(error);
      return;
    } else {
      return;
    }
  };

  const handleNewShare = async () => {
    if (!profile) {
      setShowAuthModal(true);
      return;
    }

    if (isShareLoading === false) {
      setIsShareLoading(true);
      let shareToken = "";
      const { data } = await shareLogStory(id);
      if (data && data?.share_token) shareToken = data?.share_token;
      if (data && data?.share_count) setShareCount(data?.share_count);

      navigator.clipboard.writeText(
        `https://www.brandlogs.com/logs/${id}${
          shareToken ? "?i=" + shareToken : ""
        }`
      );
      setIsShareLoading(
        `https://www.brandlogs.com/logs/${id}${
          shareToken ? "?i=" + shareToken : ""
        }`
      );
      return;
    } else if (isShareLoading !== true) {
      navigator.clipboard.writeText(isShareLoading);
      return;
    } else {
      return;
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="max-w-[500px] mx-auto rounded-md bg-white border border-gray-300 mb-4">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-3">
            <Link
              href={
                is_brand_origin
                  ? `/brand/${username}`
                  : `/user-profile/${username}`
              }
            >
              <Avatar className="w-16 h-16">
                <AvatarImage src={profilePhoto} alt={name} />
                <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link
                href={
                  is_brand_origin
                    ? `/brand/${username}`
                    : `/user-profile/${username}`
                }
                className="font-semibold text-sm"
              >
                {name}
              </Link>
              <div className="text-xs text-gray-500">@{username}</div>
            </div>
          </div>
          <Button
            className="bg-white text-green-600 border border-green-600 hover:bg-green-600 hover:text-white transition-colors"
            onClick={handleConnect}
          >
            Connect
          </Button>
        </div>

        <div className="px-3 pb-3 text-sm text-gray-700">
          <p>{content}</p>
        </div>

        <div className="relative">
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={`Post by ${name}`}
            width={470}
            height={470}
            className="w-full h-auto"
          />
          {images.length > 1 && (
            <>
              <button
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1"
                onClick={handlePrevImage}
              >
                ◀
              </button>
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1"
                onClick={handleNextImage}
              >
                ▶
              </button>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex justify-between items-end">
            <div className="text-white">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm">{useFormattedDate(date)}</p>
            </div>
            <AvatarGroup avatars={avatars} />
          </div>
        </div>

        <div className="p-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex space-x-4">
              <div className="flex flex-col items-center">
                <Button variant="ghost" size="icon" onClick={handleLog}>
                  <Heart
                    className={`h-6 w-6 ${
                      isLogged ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
                <div className="flex flex-col items-center">
                  <span className="text-xs mt-1">{logCount}</span>
                  <span className="text-xs">logs</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-6 w-6" />
                </Button>
                <div className="flex flex-col items-center">
                  <span className="text-xs mt-1">{chats}</span>
                  <span className="text-xs">chats</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Button variant="ghost" size="icon">
                  <Send className="h-6 w-6" />
                </Button>
                <div className="flex flex-col items-center">
                  <span className="text-xs mt-1">{shares}</span>
                  <span className="text-xs">shares</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <AuthModal />
      </Dialog>
    </>
  );
}
