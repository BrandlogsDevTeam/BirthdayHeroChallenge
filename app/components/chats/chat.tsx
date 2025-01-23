"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ChatBackThread from "./chat-back-thread";
import { formatDateRelative } from "@/lib/utils";

type CommentProps = {
  comment: {
    id: string;
    author: {
      name: string;
      username: string;
      avatar_url: string;
      isOwner: boolean;
    };
    content: string;
    timestamp: string;
    chatBacks: number;
  };
};

export function Chat({ comment }: CommentProps) {
  const [showChatBacks, setShowChatBacks] = useState(false);

  return (
    <div
      className={`p-4 rounded-lg ${comment.author.isOwner ? "bg-blue-50" : "bg-gray-50"
        }`}
    >
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage
            src={comment.author.avatar_url}
            alt={comment.author.name}
          >
          </AvatarImage>
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{comment.author.name}</span>
            <span className="text-sm text-gray-500">
              @{comment.author.username}
            </span>
            <span className="text-sm text-gray-500">
              {formatDateRelative(comment.timestamp)}
            </span>
          </div>
          <p className="mt-1">{comment.content}</p>
          <div className="mt-2 flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Chat Back
            </Button>
            {comment.chatBacks ? <Button
              variant="link"
              size="sm"
              onClick={() => setShowChatBacks(!showChatBacks)}
            >
              {comment.chatBacks} Chat Backs
            </Button> : <></>}
          </div>
        </div>
      </div>
      {showChatBacks && <ChatBackThread commentId={comment.id} />}
    </div>
  );
}

export function SystemChat({ comment }: Partial<CommentProps>) {

  return (
    <div className={`px-4 py-2 rounded-lg bg-yellow-100 border border-1 border-yellow-300 text-center`}>
      <p className="mt-1">{comment?.content}</p>
    </div>
  );
}
