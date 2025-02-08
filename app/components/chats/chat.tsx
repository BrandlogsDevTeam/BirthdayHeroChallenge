"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ChatBackThread from "./chat-back-thread";
import { formatDateRelative } from "@/lib/utils";
import { fetchChatBacks } from "@/lib/supabase/server-extended/log-stories";
import { ChatInput } from "./chat-input";
import { ChatMessagesDTO, ChatType } from "@/lib/types";
import { LucideReply } from "lucide-react";
import { useAuth } from "@/app/actions/AuthContext";

type ChatProps = {
  comment: ChatMessagesDTO;
  isReply?: boolean;
  chatType: ChatType;
};

export function Chat({ comment, isReply = false, chatType }: ChatProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replies, setReplies] = useState<ChatMessagesDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    if (showReplies && "chatBacks" in comment) {
      setIsLoading(true);
      fetchChatBacks(comment.id).then(({ data, error }) => {
        if (data) {
          setReplies(data);
        }
        setIsLoading(false);
      });
    }
  }, [showReplies, comment.id]);

  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
    if (!showReplies && "chat_backs" in comment && comment.chat_backs.length > 0) {
      setShowReplies(true);
    }
  };

  return (
    <div
      className={`p-4 rounded-lg ${
        comment.user_id === profile?.id ? "bg-blue-50" : "bg-gray-50"
      } ${isReply ? "ml-8 border-l-2 border-gray-200" : ""}`}
    >
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage
            src={comment.user_info.avatar_url || ""}
            alt={comment.user_info.name || ""}
          />
          <AvatarFallback>
            {comment.user_info.name?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{comment.user_info.name}</span>
            <span className="text-sm text-gray-500">
              @{comment.user_info.username}
            </span>
            <span className="text-sm text-gray-500">
              {formatDateRelative(comment.created_at)}
            </span>
          </div>
          <p className="mt-1">{comment.content}</p>

          {!isReply && (
            <div className="mt-2">
              {/* {"chatBacks" in comment && (
                <div className="text-sm text-gray-500 mb-2">
                  {comment.chatBacks} Chat Back
                  {comment.chatBacks !== 1 ? "s" : ""}
                </div>
              )} */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReplyClick}
                  className="flex items-center space-x-2"
                >
                  <span className="flex items-center justify-center gap-1">
                    <LucideReply className="w-3 h-3 text-gray-700" /> Chat back
                  </span>
                </Button>
                {"chat_backs" in comment && comment.chat_backs.length > 0 && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setShowReplies(!showReplies)}
                    className="text-gray-500"
                  >
                    {showReplies ? "Hide" : "Show"} {comment.chat_backs.length}{" "}
                    {comment.chat_backs.length === 1 ? "Reply" : "Replies"}
                  </Button>
                )}
              </div>

              {showReplyInput && (
                <div className="mt-2">
                  <ChatInput
                    chatType={chatType}
                    log_story_id={
                      "log_story_id" in comment ? comment.log_story_id : ""
                    }
                    canSendMessage={true}
                    parent_id={comment.id}
                  />
                </div>
              )}

              {isLoading && (
                <div className="mt-4 text-center text-gray-500">
                  Loading replies...
                </div>
              )}

              {showReplies && !isLoading && (
                <div className="mt-4">
                  <ChatBackThread chatBacks={replies as ChatMessagesDTO[]} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function SystemChat({ comment, chatType }: Partial<ChatProps>) {
  return (
    <div className="px-4 py-2 rounded-lg bg-yellow-100 border border-1 border-yellow-300 text-center">
      <p className="mt-1">{comment?.content}</p>
    </div>
  );
}
