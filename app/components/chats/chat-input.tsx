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

type CommentInputProps = {
  chatType: ChatType;
  log_story_id: string,
  canSendMessage: boolean,
};

export function ChatInput({ chatType, canSendMessage,log_story_id }: CommentInputProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async () => {
    if (input.trim() && !loading) {
      try {
        setLoading(true)
        const messageStr = `${input}`
        const { data, error } = await addChat(log_story_id, messageStr)
        if (error)
          throw error

        setInput('')
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }
  const handleEmojiSelect = (emoji: string) => {
    setInput((prev) => prev + emoji);
  };

  return (
    <div className="mt-4 flex items-end space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Smile className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <EmojiPicker onEmojiSelect={handleEmojiSelect} />
        </PopoverContent>
      </Popover>
      <Textarea
        placeholder={`Add a ${chatType} chat...`}
        className="min-h-[40px] flex-grow"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          console.log(e.code)
          if (e.shiftKey && e.code.toLowerCase() === 'enter') {
            e.preventDefault()
            e.stopPropagation()

            handleSendMessage()
            return
          } 
          // if (e.ctrlKey && e.code.toLowerCase() === 'semicolon') {
          //   e.preventDefault()
          //   e.stopPropagation()

          //   openEmojiSelect();
          //   return
          // } 
        }}
      />
      <Button size="icon" className="h-10 w-10" onClick={handleSendMessage} disabled={!canSendMessage}>
        {
          loading ?
          <Loader className="h-5 w-5 animate-spin" /> :
          <Send className="h-5 w-5" />
        }
      </Button>
    </div>
  );
}
