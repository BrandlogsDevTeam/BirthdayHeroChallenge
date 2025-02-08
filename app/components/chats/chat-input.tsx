"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader, Send, Smile } from "lucide-react";
import EmojiPicker from "../emoji-picker";
import { ChatType } from "@/lib/types";
import { addChat } from "@/lib/supabase/server-extended/log-stories";

type ChatInputProps = {
  chatType: ChatType;
  log_story_id: string;
  canSendMessage: boolean;
  parent_id?: string | null; // Optional parent_id for replies
};

export function ChatInput({
  chatType,
  canSendMessage,
  log_story_id,
  parent_id = null,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() && !loading) {
      try {
        setLoading(true);
        const messageStr = `${input}`;
        const { data, error } = await addChat(log_story_id, messageStr, parent_id);
        if (error) throw error;

        setInput("");
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
    <div className="mt-4 flex border border-gray-200 rounded-lg items-center justify-between space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="p-6 text-gray-500 h-10 w-10">
            <Smile className="h-10 w-10" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <EmojiPicker onEmojiSelect={handleEmojiSelect} />
        </PopoverContent>
      </Popover>
      <textarea
        placeholder={`Add a ${chatType} chat...`}
        className="flex-grow resize-none focus:outline-none focus:ring-0 focus:border-none text-gray-500"
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.shiftKey && e.code.toLowerCase() === "enter") {
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
  );
}