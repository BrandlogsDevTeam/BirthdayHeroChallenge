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
import { ChatType, LogStoryDetailsDBO } from "@/lib/types";
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

type PostProps = LogStoryDetailsDBO & {
  avatars: { src: string; alt: string }[];
  is_post_page?: boolean;
}

export default function Post(props: PostProps) {
  const params = useSearchParams();
  const router = useRouter();
  const [connectionStatus, setConnectionStatus] = useState(props.user_info.connection || null);
  const [logCount, setLogCount] = useState(props.like_count);
  const [isLogged, setIsLogged] = useState<boolean | "loading">(props.has_liked);
  const [shareCount, setShareCount] = useState(props.share_count);
  const [isShareLoading, setIsShareLoading] = useState<boolean | string>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [chatOpen, setChatOpen] = useState<boolean>(
    params.get("chat") !== null && props.is_post_page ? true : false
  );
  const { profile } = useAuth();
  const { openFlow } = useConnectionFlow();

  const handleConnect = () => {
    if (!profile) {
      setShowAuthModal(true);
      return;
    }
    const recipientId = props.post_by

    openFlow(recipientId, {
      avatar_url: props.user_info.avatar_url || "",
      name: props.user_info.name,
      username: props.user_info.username,
      is_brand: false
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
    if (!props.is_post_page) {
      router.push(`/stories/${props.id}?chat`);
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
        const { data, error } = await likeLogStory(props.id, liked);
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
      const { data } = await shareLogStory(props.id);
      if (data && data?.share_token) shareToken = data?.share_token;
      if (data && data?.share_count) setShareCount(data?.share_count);

      navigator.clipboard.writeText(
        `https://www.brandlogs.com/stories/${props.id}${shareToken ? "?i=" + shareToken : ""
        }`
      );
      setIsShareLoading(
        `https://www.brandlogs.com/stories/${props.id}${shareToken ? "?i=" + shareToken : ""
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
      prevIndex === 0 ? props.image_urls.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === props.image_urls.length - 1 ? 0 : prevIndex + 1
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
              href={`/user-profile/${props.user_info.username}`}
            >
              <Avatar className="w-16 h-16">
                <AvatarImage src={props.user_info.avatar_url || ""} alt={props.user_info.name} />
                <AvatarFallback>{props.user_info.name}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link
                href={`/user-profile/${props.user_info.username}`}
                className="font-semibold text-sm"
              >
                <h3>{props.user_info.name}</h3>
              </Link>
              <h4 className="text-xs text-gray-500">@{props.user_info.username}</h4>
            </div>
          </div>
          {
            connectionStatus ? <></> :
              <Button
                variant="outline"
                className="bg-white text-green-600 hover:text-white border border-green-600 hover:bg-green-600 transition-colors"
                onClick={handleConnect}
              >
                <UserPlus className="mr-1 h-4 w-4" />
                Connect
              </Button>
          }
        </div>

        <div className="px-3 pb-3 text-sm text-gray-700">
          <p>{props.description}</p>
        </div>

        {chatOpen ? (
          <></>
        ) : (
          <div className="relative">
            <Image
              src={props.image_urls[currentImageIndex] || "/placeholder.svg"}
              alt={`Post by ${props.user_info.name}`}
              width={470}
              height={470}
              className="w-full h-auto"
            />
            {props.image_urls.length > 1 && (
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
                  {props.image_urls.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex
                        ? "bg-green-500"
                        : "bg-gray-300"
                        }`}
                    />
                  ))}
                </div>
              </>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex justify-between items-end">
              <div className="text-white">
                <h3 className="text-lg font-semibold">{props.title}</h3>
                <p className="text-sm">
                  {formatDateOrdinal(props.start_date)}{" "}
                  {props.start_date !== props.end_date
                    ? "- " + formatDateOrdinal(props.end_date)
                    : ""}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-bold text-white">+ Gift</div>
                <div className="bg-red-500 rounded-full p-2 flex items-center justify-center">
                  <Gift className="text-white" size={24} />
                  <span className="text-white text-xs font-bold ml-1">
                    $250
                  </span>
                </div>
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
                  count={props.chat_count}
                  label="chats"
                  onClick={handleChat}
                />
                <InteractionButton
                  icon={Forward}
                  count={shareCount}
                  label="shares"
                  isLoading={isShareLoading === true}
                  onClick={handleNewShare}
                />
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
                      log_story_id={props.id}
                      userId={profile?.id}
                      preDate={mergeDateTime(props.start_date, props.start_time)}
                      postDate={mergeDateTime(props.end_date, props.end_time)}
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
                      log_story_id={props.id}
                      userId={profile?.id}
                      preDate={mergeDateTime(props.start_date, props.start_time)}
                      postDate={mergeDateTime(props.end_date, props.end_time)}
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
                      log_story_id={props.id}
                      userId={profile?.id}
                      preDate={mergeDateTime(props.start_date, props.start_time)}
                      postDate={mergeDateTime(props.end_date, props.end_time)}
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
                    comment={msg}
                    chatType={chatType}
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
        className={`p-2 ${isActive ? "text-green-600" : "text-gray-600"
          } hover:text-green-700 hover:bg-green-50 transition-colors`}
        onClick={handleClick}
      >
        <Icon
          className={`h-5 w-5 ${isActive ? "text-red-500 fill-red-500" : ""} ${animate ? "heart-beat" : ""
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
