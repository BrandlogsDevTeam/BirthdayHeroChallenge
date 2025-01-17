import React from "react";
import { Chat } from "./chat";

type ChatBackThreadProps = {
  commentId: string;
};

const ChatBackThread = ({ commentId }: ChatBackThreadProps) => {
  const chatBacks = [
    {
      id: "3",
      author: {
        name: "Alice Johnson",
        username: "alicej",
        avatar_url: "/placeholder.svg?height=40&width=40",
        isOwner: false,
      },
      content: "Great point!",
      timestamp: new Date().toISOString(),
      chatBacks: 0,
    },
  ];
  return (
    <div className="mt-4 ml-8 space-y-4 border-l-2 border-gray-200 pl-4">
      {chatBacks.map((chatBack) => (
        <Chat key={chatBack.id} comment={chatBack} />
      ))}
    </div>
  );
};

export default ChatBackThread;
