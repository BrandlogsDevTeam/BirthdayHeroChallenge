"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatList } from "./chat-list";
import { ChatInput } from "./chat-input";

type ChatType = "pre" | "live" | "post";

export function LogStoryChatUI() {
  const [activeTab, setActiveTab] = useState<ChatType>("pre");

  return (
    <div className="w-full max-w-3xl mx-auto p-4 flex flex-col h-[600px]">
      <Tabs
        defaultValue="pre"
        onValueChange={(value) => setActiveTab(value as ChatType)}
        className="flex-grow flex flex-col"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pre">Pre-Chats</TabsTrigger>
          <TabsTrigger value="live">Live Chats</TabsTrigger>
          <TabsTrigger value="post">Post Chats</TabsTrigger>
        </TabsList>
        <TabsContent value="pre">
          <ChatList chatType="pre" />
        </TabsContent>
        <TabsContent value="pre">
          <ChatList chatType="live" />
        </TabsContent>
        <TabsContent value="post">
          <ChatList chatType="post" />
        </TabsContent>
      </Tabs>
      <ChatInput chatType={activeTab} />
    </div>
  );
}
