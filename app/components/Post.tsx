"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarGroup } from "@/components/ui/avatar-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Heart,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  Loader,
} from "lucide-react";
import { getInitials } from "@/lib/utils";
import Link from "next/link";
import { fetchUser } from "@/lib/supabase/server";
import { AcceptNomination } from "./AcceptInvitationModals";
import useFormattedDate from "../hooks/useFormattedDate";
import { likeLogStory, shareLogStory } from "@/lib/supabase/server-extended/log-stories";

const AuthModal = () => {
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
  is_liked?: boolean
  id: string
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
  is_liked = false
}: PostProps) {
  const [isConnected, setisConnected] = useState(false);
  const [logCount, setLogCount] = useState(likes);
  const [isLogged, setIsLogged] = useState<boolean | 'loading'>(is_liked);
  const [shareCount, setShareCount] = useState(shares);
  const [isShareLoading, setIsShareLoading] = useState<boolean | string>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const formattedDate = useFormattedDate(date);


  const handleConnect = () => {

  };

  const handleLog = async () => {
    if (isLogged === true) {
      setIsLogged('loading')
      const { data, error } = await likeLogStory(id, false)
      if (data === 'OK') {
        setIsLogged(false)
        setLogCount(c => c - 1)
        return;
      }
      setIsLogged(false)
      console.error(error)
      return
    } else if (isLogged === false) {
      setIsLogged('loading')
      const { data, error } = await likeLogStory(id, true)
      if (data === 'OK') {
        setIsLogged(true)
        setLogCount(c => c + 1)
        return;
      }
      setIsLogged(false)
      console.error(error)
      return
    } else {
      return
    }
  };

  const handleInteraction = () => {

  };

  const handleNewShare = async () => {
    if (isShareLoading === false) {
      setIsShareLoading(true)
      let shareToken = ''
      const { data } = await shareLogStory(id)
      if (data && data?.share_token)
        shareToken = data?.share_token
      if (data && data?.share_count)
        setShareCount(data?.share_count)

      navigator.clipboard.writeText(`https://www.brandlogs.com/logs/${id}${shareToken ? ('?i=' + shareToken) : ''}`)
      setIsShareLoading(`https://www.brandlogs.com/logs/${id}${shareToken ? ('?i=' + shareToken) : ''}`)
      return
    } else if (isShareLoading !== true) {
      navigator.clipboard.writeText(isShareLoading)
      return
    } else {
      return
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
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Link href={is_brand_origin ? "#" : `/user-profile/${username}`}>
                <Avatar className="w-14 h-14">
                  <AvatarImage src={profilePhoto} alt={name} />
                  <AvatarFallback>{getInitials(name)}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex flex-col">
                <Link
                  href={is_brand_origin ? "#" : `/user-profile/${username}`}
                  className="text-lg font-semibold hover:underline"
                >
                  {name}
                </Link>
                <Link
                  href={is_brand_origin ? "#" : `/user-profile/${username}`}
                  className="text-gray-500 text-sm hover:underline"
                >
                  @{username}
                </Link>
              </div>
            </div>
            <Button
              variant={isConnected ? "outline" : "default"}
              size="sm"
              onClick={handleConnect}
              className="bg-white text-base border border-green-600 rounded-md hover:bg-green-600 text-green-600 hover:text-white transition-colors"
            >
              {isConnected ? "Connected" : "Connect"}
            </Button>
          </div>
          <p className="text-gray-700 mb-4">{content}</p>
        </div>
        <div className="relative w-full h-96">
          <div className="absolute inset-0">
            <Image
              src={images[currentImageIndex]}
              alt={`Post image ${currentImageIndex + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          {images.length > 1 && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full bg-white/80 text-gray-800 z-10"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full bg-white/80 text-gray-800 z-10"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex justify-between items-end z-20">
            <div className="text-white">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm">{formattedDate}</p>
            </div>
            <AvatarGroup avatars={avatars} />
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className={`flex items-center space-x-1 ${isLogged ? "text-red-500" : "text-gray-500"
                  }`}
                onClick={handleLog}
              >
                {(isLogged === 'loading') ? <Loader
                  className={`h-5 w-5 animate-spin`}
                />
                  : <Heart
                    className={`h-5 w-5 ${isLogged ? "fill-current" : ""}`}
                  />}
                <span>{logCount}</span>
              </button>
              <button
                className="flex items-center space-x-1 text-gray-500"
                onClick={handleInteraction}
              >
                <MessageCircle className="h-5 w-5" />
                <span>{chats}</span>
              </button>
              <button
                className="flex items-center space-x-1 text-gray-500"
                onClick={handleNewShare}
              >
                {
                  isShareLoading === true ?
                    <Loader className="h-5 w-5 animate-spin" /> :
                    <Share2 className="h-5 w-5" />
                }
                <span>{shareCount}</span>
              </button>
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
