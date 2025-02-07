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
  CalendarHeart,
  MessageCircle,
  Loader,
  Gift,
  Bell,
  X,
  UserPlus,
  ChevronRight,
  ChevronLeft,
  Forward,
  Send,
  Share2,
  Copy,
  Link as LinkIcon,
  Instagram,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`brandlogs.com/stories/${id}`);
    toast("Copied!", "default", {
      description: "Link copied to clipboard.",
    });
  };

  const ShareDropdown = ({
    count,
    label,
  }: {
    count: number;
    label: string;
  }) => (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="border-none shadow-none hover:border-green-100 hover:bg-green-100"
            variant="outline"
            size="icon"
          >
            <Forward className="h-5 w-5" />
            <span className="sr-only">Share profile</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem
            onClick={() => handleShare("whatsapp")}
            className="flex items-center"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 mr-2"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleShare("telegram")}
            className="flex items-center"
          >
            <Send className="h-4 w-4 mr-2" />
            Telegram
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleShare("instagram")}
            className="flex items-center"
          >
            <Instagram className="h-4 w-4 mr-2" />
            Instagram
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleCopyLink}
            className="flex items-center"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex flex-col items-center mt-1">
        <span className="text-xs font-medium">{count}</span>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    </div>
  );

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${name}'s profile!`);

    const shareUrls = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      instagram: `https://instagram.com/share?url=${url}`,
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank");
  };

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
      <style jsx>{`
        @keyframes heartBeat {
          0% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.3);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.3);
          }
          70% {
            transform: scale(1);
          }
        }
        .heart-beat {
          animation: heartBeat 1s ease-in-out;
        }
      `}</style>
      <div className="max-w-[560px] w-full mx-auto rounded-md bg-white shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
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
                <h3>{name}</h3>
              </Link>
              <h4 className="text-xs text-gray-500">@{username}</h4>
            </div>
          </div>
          <Button
            variant="outline"
            className="bg-white text-green-600 hover:text-white border border-green-600 hover:bg-green-600 transition-colors"
            onClick={handleConnect}
          >
            <UserPlus className="mr-1 h-4 w-4" />
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
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 transition-opacity hover:bg-black/70"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 transition-opacity hover:bg-black/70"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {images.map((_, index) => (
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
            {/* Solid details section */}
            <div className="bg-gray-50 p-4 border-b border-green-100">
              <div className="flex justify-between items-center">
                <div className="text-gray-800">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-sm text-gray-600">
                    {formatDateOrdinal(post.start_date)}{" "}
                    {post.start_date !== post.end_date
                      ? "- " + formatDateOrdinal(post.end_date)
                      : ""}
                  </p>
                </div>
                {!is_brand_origin && (
                  <Link href="/gift">
                    <div className="bg-red-500 rounded-full p-2 flex items-center justify-center cursor-pointer">
                      <span className="text-white text-xl font-bold mr-1">
                        +
                      </span>
                      <Gift className="text-white" size={24} />
                      <span className="text-white text-xs font-bold ml-1">
                        $250
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {!chatOpen && (
          <div className="p-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex space-x-6">
                <InteractionButton
                  icon={CalendarHeart}
                  count={logCount}
                  label="logs"
                  isActive={isLogged === true}
                  onClick={handleLog}
                  animateOnClick={true}
                />
                <InteractionButton
                  icon={MessageCircle}
                  count={chats}
                  label="chats"
                  onClick={handleChat}
                />
                <ShareDropdown count={shareCount} label="shares" />
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

interface InteractionButtonProps {
  icon: React.ElementType;
  count: number;
  label: string;
  isActive?: boolean;
  isLoading?: boolean;
  onClick: () => void;
  animateOnClick?: boolean;
}

function InteractionButton({
  icon: Icon,
  count,
  label,
  isActive = false,
  isLoading = false,
  onClick,
  animateOnClick = false,
}: InteractionButtonProps) {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    if (animateOnClick) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000);
    }
    onClick();
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        variant="ghost"
        size="sm"
        className={`p-2 ${
          isActive ? "text-green-600" : "text-gray-600"
        } hover:text-green-700 hover:bg-green-50 transition-colors`}
        onClick={handleClick}
      >
        <Icon
          className={`h-5 w-5 ${isActive ? "text-red-500 fill-red-500" : ""} ${
            animate ? "heart-beat" : ""
          }`}
        />
      </Button>
      <div className="flex flex-col items-center mt-1">
        <span className="text-xs font-medium">{count}</span>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    </div>
  );
}
