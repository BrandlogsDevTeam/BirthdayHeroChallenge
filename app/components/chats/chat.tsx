"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ChatBackThread from "./chat-back-thread";
import { formatDateRelative } from "@/lib/utils";
import { fetchChatBacks } from "@/lib/supabase/server-extended/log-stories";
import { ChatInput } from "./chat-input";
import { ChatMessagesDTO, ChatType } from "@/lib/types";
import { Loader, Reply } from "lucide-react";
import { useAuth } from "@/app/actions/AuthContext";
import Link from "next/link";

type ChatProps = {
  comment: ChatMessagesDTO;
  isReply?: boolean;
  chatType: ChatType;
  getChatBacks: (id: string) => Promise<any>;
};

export function Chat({ comment, isReply = false, chatType, getChatBacks }: ChatProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<ChatMessagesDTO[]>(comment.chat_backs || []);
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    if (showReplies && comment.chat_back_count > 0) {
      setIsLoading(true);
      getChatBacks(comment.id).then(() => {
        setIsLoading(false);
      })
    }
  }, [showReplies, comment.id]);

  useEffect(() => {
    if (comment.chat_backs) {
      setReplies(comment.chat_backs);
    }
  }, [comment.chat_backs]);

  const handleReplyClick = () => {
    setShowReplies(s => !s);
  };

  return (
    <>
      <div className={`flex items-start gap-4 `}>
        <Link href={`/user-profile/${comment.user_info.username}`}>
          <Avatar className="w-10 h-10">
            <AvatarImage src={comment.user_info.avatar_url || ""} alt={comment.user_info.name || ""} />
            <AvatarFallback>{comment.user_info.name}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Link href={`/user-profile/${comment.user_info.username}`} className="flex items-center gap-1">
              <span className="font-semibold text-gray-900">{comment.user_info.name}</span>
              <span className="text-sm text-gray-500">@{comment.user_info.username}</span>
            </Link>
            <span className="text-xs text-gray-400">{formatDateRelative(comment.created_at)}</span>
          </div>
          <div className={`${profile?.id === comment.user_id ? 'bg-[#dbeafe]' : 'bg-gray-100'} rounded-2xl rounded-tl-none p-4 max-w-xl mb-2`}>
            <pre className="text-gray-800 max-w-xl break-words whitespace-pre-wrap font-sans">
              {comment.content}
            </pre>
          </div>
          {isReply ? <></> : <div className="flex items-center gap-6 ml-2">
            <button onClick={handleReplyClick} className="flex items-center gap-2 font-bold text-green-600 hover:text-green-700">
              <Reply className="w-4 h-4" />
              {
                showReplies ?
                  <span className="text-sm">Hide Chat backs</span> :
                  <span className="text-sm">Chat back</span>
              }
            </button>
            {comment.chat_back_count > 0 && <span className="text-sm font-bold text-[#f7a01c]"> {comment.chat_back_count} chat backs</span>}
          </div>}
          {isLoading &&
            <div className="w-full h-4">
              <Loader className="w-4 h-4 animate-spin" />
            </div>
          }
        </div>
      </div>
      <div className="pl-12 flex-1">
        {showReplies ? <>
          {
            replies.length > 0 && replies.map(reply => {
              return <Chat key={reply.id} comment={reply} isReply={true} chatType={chatType} getChatBacks={() => Promise.resolve()} />
            })
          }
          <ChatInput
            chatType={chatType}
            log_story_id={comment.log_story_id}
            parent_id={comment.id}
            canSendMessage={true}
          />
        </> : <></>}
      </div>
    </>
  );
}

export function SystemChat({ comment, type }: { comment: Partial<ChatMessagesDTO>, type?: "success" | "warning" | "info" | "error" }) {
  const colors = {
    success: "bg-green-100 border-green-300 text-green-700",
    warning: "bg-yellow-100 border-yellow-300 text-yellow-700",
    info: "bg-blue-100 border-blue-300 text-blue-700",
    error: "bg-red-100 border-red-300 text-red-700",
  }

  return (
    <div className={`px-4 py-2 rounded-lg border border-1 text-center ${colors[type || "info"]}`}>
      <p className="mt-1">{comment?.content}</p>
    </div>
  );
}
