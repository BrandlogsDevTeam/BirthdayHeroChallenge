"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarGroup } from "@/components/ui/avatar-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Heart,
  MessageCircle,
  Loader,
  Send,
  Bell,
  X,
  UserPlus,
} from "lucide-react";
import { formatDateOrdinal, getInitials, mergeDateTime } from "@/lib/utils";
import Link from "next/link";
import { AcceptNomination } from "./AcceptInvitationModals";
import {
  addChat,
  likeLogStory,
  shareLogStory,
} from "@/lib/supabase/server-extended/log-stories";
import { useAuth } from "../actions/AuthContext";
import { NavTabs } from "./NavTab";
import { ChatType } from "@/lib/types";
import { useChat } from "@/hooks/use-chat";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { ChatInput } from "./chats/chat-input";
import { Chat as ChatBubble, SystemChat } from "./chats/chat";
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
  is_repost?: boolean;
  post: any;
  id: string;
  is_post_page?: boolean;
  original_post_by: string;
  brand_origin: string;
}

export default function Post({
  id,
  original_post_by,
  brand_origin,
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
  post,
  is_brand_origin,
  is_liked = false,
  is_repost = false,
  is_post_page = false,
}: PostProps) {
  const params = useSearchParams();
  const router = useRouter();
  const [isConnected, setisConnected] = useState(false);
  const [logCount, setLogCount] = useState(likes);
  const [isLogged, setIsLogged] = useState<boolean | "loading">(is_liked);
  const [shareCount, setShareCount] = useState(shares);
  const [isShareLoading, setIsShareLoading] = useState<boolean | string>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [chatOpen, setChatOpen] = useState<boolean>(
    params.get("chat") !== null && is_post_page ? true : false
  );
  const { profile } = useAuth();
  const { openFlow } = useConnectionFlow();

  const handleConnect = () => {
    if (!profile) {
      setShowAuthModal(true);
      return;
    }
    const recipientId = post.is_brand_origin
      ? post.brand_origin
      : post.original_post_by;

    openFlow(recipientId, {
      avatar_url: profilePhoto,
      name,
      username,
      is_brand: post.is_brand_origin,
    });
  };

  const handleChat = () => {
    if (chatOpen) {
      setChatOpen(false);
      return;
    }

    if (!profile) {
      setShowAuthModal(true);
      return;
    }
    if (!is_post_page) {
      router.push(`/stories/${id}?chat`);
      return;
    }
    setChatOpen(true);
  };

  const handleLog = async () => {
    if (!profile) {
      setShowAuthModal(true);
      return;
    }

    if (isLogged === true || isLogged === false) {
      setIsLogged("loading");
      try {
        const liked = isLogged;
        const { data, error } = await likeLogStory(id, liked);
        if (error) throw error;

        if (data?.has_liked !== undefined) setIsLogged(data.has_liked);
        if (data?.like_count !== undefined) setLogCount(data.like_count);
      } catch (error) {
        console.error(error);
        setIsLogged(false);
      }
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
        `https://www.brandlogs.com/stories/${id}${
          shareToken ? "?i=" + shareToken : ""
        }`
      );
      setIsShareLoading(
        `https://www.brandlogs.com/stories/${id}${
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
      <div className="max-w-[500px] w-[500px] mx-auto rounded-md bg-white border border-gray-300 mb-4">
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
                <AvatarFallback>{name}</AvatarFallback>
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
            variant="outline"
            className="bg-white text-green-600 hover:text-white border border-green-600 hover:bg-green-600 transition-colors"
            onClick={handleConnect}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Connect
          </Button>
        </div>

        <div className="px-3 pb-3 text-sm text-gray-700">
          <p>{content}</p>
        </div>

        {chatOpen ? (
          <></>
        ) : (
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
                <p className="text-sm">
                  {formatDateOrdinal(post.start_date)}{" "}
                  {post.start_date !== post.end_date
                    ? "- " + formatDateOrdinal(post.end_date)
                    : ""}
                </p>
              </div>
              <AvatarGroup avatars={avatars} />
            </div>
          </div>
        )}

        {chatOpen ? (
          <></>
        ) : (
          <div className="p-3">
            <div className="flex justify-between items-center mb-2">
              <div className="flex space-x-4">
                <div className="flex flex-col items-center">
                  <Button variant="ghost" size="icon" onClick={handleLog}>
                    {isLogged === "loading" ? (
                      <Loader className="h-6 w-6 animate-spin" />
                    ) : (
                      <Heart
                        className={`h-6 w-6 ${
                          isLogged ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    )}
                  </Button>
                  <div className="flex flex-col items-center">
                    <span className="text-xs mt-1">{logCount}</span>
                    <span className="text-xs">logs</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Button variant="ghost" size="icon" onClick={handleChat}>
                    <MessageCircle className="h-6 w-6" />
                  </Button>
                  <div className="flex flex-col items-center">
                    <span className="text-xs mt-1">{chats}</span>
                    <span className="text-xs">chats</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Button variant="ghost" size="icon" onClick={handleNewShare}>
                    {isShareLoading === true ? (
                      <Loader className="h-6 w-6 animate-spin" />
                    ) : (
                      <Send className="h-6 w-6" />
                    )}
                  </Button>
                  <div className="flex flex-col items-center">
                    <span className="text-xs mt-1">{shareCount}</span>
                    <span className="text-xs">shares</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {chatOpen ? (
          <div className="p-3 text-sm">
            <NavTabs
              tabs={[
                {
                  value: "Pre Chat",
                  label: "Pre Chat",
                  icon: Bell,
                  content: (
                    <Chat
                      key="pre"
                      chatType="pre"
                      log_story_id={id}
                      userId={profile?.id}
                      preDate={mergeDateTime(post.start_date, post.start_time)}
                      postDate={mergeDateTime(post.end_date, post.end_time)}
                    />
                  ),
                },
                {
                  value: "Live Chat",
                  label: "Live Chat",
                  icon: Bell,
                  content: (
                    <Chat
                      key="live"
                      chatType="live"
                      log_story_id={id}
                      userId={profile?.id}
                      preDate={mergeDateTime(post.start_date, post.start_time)}
                      postDate={mergeDateTime(post.end_date, post.end_time)}
                    />
                  ),
                },
                {
                  value: "Post Chat",
                  label: "Post Chat",
                  icon: Bell,
                  content: (
                    <Chat
                      key="post"
                      chatType="post"
                      log_story_id={id}
                      userId={profile?.id}
                      preDate={mergeDateTime(post.start_date, post.start_time)}
                      postDate={mergeDateTime(post.end_date, post.end_time)}
                    />
                  ),
                },
                {
                  value: " ",
                  label: " ",
                  icon: () => {
                    return <X className="text-red-500 " />;
                  },
                  onClick: handleChat,
                  content: <React.Fragment></React.Fragment>,
                },
              ]}
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <AuthModal />
      </Dialog>
    </>
  );
}

const Chat = ({
  log_story_id,
  preDate,
  postDate,
  chatType,
  userId,
}: {
  log_story_id: string;
  preDate: Date;
  postDate: Date;
  chatType: ChatType;
  userId?: string;
}) => {
  if (!userId) return <>Please login to access this future...</>;

  const { messages, messageLoading } = useChat(
    log_story_id,
    chatType,
    preDate,
    postDate
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const canSendMessages = (() => {
    const now = Number(new Date());
    if (chatType === "pre" && now < Number(preDate)) return true;
    else if (
      chatType === "live" &&
      now > Number(preDate) &&
      now < Number(postDate)
    )
      return true;
    else if (chatType === "post" && now > Number(postDate)) return true;
    else return false;
  })();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-2">
      <div className="space-y-4 pb-4 max-h-96 overflow-y-auto" ref={scrollRef}>
        {messageLoading ? (
          <div>
            <Loader className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <>
            {" "}
            {messages && messages.length ? (
              messages.map((msg, i) => {
                return msg.user_id === null ? (
                  <SystemChat key={msg.id} comment={{ ...msg }} />
                ) : (
                  <ChatBubble
                    key={msg.id}
                    comment={{
                      id: msg.id,
                      log_story_id: log_story_id,
                      author: {
                        isOwner: !!userId && msg.user_id === userId,
                        avatar_url: msg?.user_info?.avatar_url
                          ? msg?.user_info?.avatar_url
                          : "",
                        name: msg?.user_info?.name
                          ? msg?.user_info?.name
                          : msg.user_id,
                        username: msg?.user_info?.username
                          ? msg?.user_info?.username
                          : msg.user_id,
                        id: "",
                      },
                      timestamp: msg.created_at,
                      chatBacks: 0,
                      content: msg.content,
                    }}
                    chatType={"pre"}
                  />
                );
              })
            ) : (
              <>No messages</>
            )}
          </>
        )}
      </div>
      <ChatInput
        log_story_id={log_story_id}
        chatType={chatType}
        canSendMessage={canSendMessages}
      />
    </div>
  );
};
