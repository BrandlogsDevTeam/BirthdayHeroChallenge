"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Send, Smile } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

type CommentInputProps = {
  chatType: "pre" | "live" | "post";
};

export function ChatInput({ chatType }: CommentInputProps) {
  const [input, setInput] = useState("");
  const handleEmojiSelect = (emoji: any) => {
    setInput((prev) => prev + emoji.native);
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
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </PopoverContent>
      </Popover>
      <Textarea
        placeholder={`Add a ${chatType} chat...`}
        className="min-h-[40px] flex-grow"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button size="icon" className="h-10 w-10">
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
}
