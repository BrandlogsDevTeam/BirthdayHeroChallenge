import React from "react";
import { Chat } from "./chat";
import { Reply, ChatType } from "@/lib/types";

type ChatBackThreadProps = {
  chatBacks: Reply[];
};

const ChatBackThread = ({ chatBacks }: ChatBackThreadProps) => {
  return (
    <div className="mt-4 ml-8 space-y-4 border-l-2 border-gray-200 pl-4">
      {chatBacks.map((chatBack) => (
        <Chat
          key={chatBack.id}
          comment={chatBack}
          isReply={true}
          chatType="pre"
        />
      ))}
    </div>
  );
};

export default ChatBackThread;
