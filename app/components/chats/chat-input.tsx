"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader, Send, Smile, X } from "lucide-react";
import EmojiPicker from "../emoji-picker";
import { ChatType, ChatMessagesDTO } from "@/lib/types";
import { addChat } from "@/lib/supabase/server-extended/log-stories";

type ChatInputProps = {
  chatType: ChatType;
  log_story_id: string;
  canSendMessage: boolean;
  parent_id?: string | null;
  replyTo?: ChatMessagesDTO | null;
  onCancelReply?: () => void;
};

export function ChatInput({
  chatType,
  canSendMessage,
  log_story_id,
  parent_id = null,
  replyTo = null,
  onCancelReply,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() && !loading) {
      try {
        setLoading(true);
        const messageStr = `${input.trim()}`;
        const { data, error } = await addChat(
          log_story_id,
          messageStr,
          replyTo?.id || parent_id
        );
        if (error) throw error;

        setInput("");
        if (onCancelReply) onCancelReply();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setInput((prev) => prev + emoji);
  };

  return (
    <div className="mt-4 flex flex-col border border-gray-200 rounded-lg">
      {replyTo && (
        <div className="flex items-center justify-between p-2 bg-gray-50 border-b border-gray-200">
          <div className="text-sm text-gray-600">
            Replying to{" "}
            <span className="font-semibold">{replyTo.user_info.name}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-500 hover:text-gray-700"
            onClick={onCancelReply}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="flex items-center justify-between space-x-2 p-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="p-6 text-gray-500 h-10 w-10"
            >
              <Smile className="h-10 w-10" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <EmojiPicker onEmojiSelect={handleEmojiSelect} />
          </PopoverContent>
        </Popover>
        <textarea
          placeholder={`Add a ${chatType} chat...`}
          className="flex-grow mt-3 overflow-y-auto resize-none focus:outline-none focus:ring-0 focus:border-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.code.toLowerCase() === "enter" && !e.shiftKey) {
              e.preventDefault();
              e.stopPropagation();
              handleSendMessage();
            }
          }}
        />
        <Button
          variant="ghost"
          size="icon"
          className="p-6 h-10 w-10 text-gray-500"
          onClick={handleSendMessage}
          disabled={!canSendMessage}
        >
          {loading ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
