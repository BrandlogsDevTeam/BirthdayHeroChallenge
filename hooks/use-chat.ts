import { useAuth } from "@/app/actions/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { getRecentChats } from "@/lib/supabase/server-extended/log-stories";
import { getPublicProfileByID } from "@/lib/supabase/server-extended/userProfile";
import { ChatMessagesDTO, ChatType } from "@/lib/types";
import { type RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

export const useChat = (
  channel_id: string,
  channel_type: ChatType,
  preDate: Date,
  postDate: Date
) => {
  const channel = useRef<RealtimeChannel | null>(null);
  const [messages, setMessages] = useState<ChatMessagesDTO[]>([]);
  const [messageLoading, setMessagesLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    if (!channel.current) {
      const client = createClient();
      channel.current = client.channel("supabase_realtime");
      channel.current
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "ls_comments",
            filter: `log_story_id=eq.${channel_id}`,
          },
          async (payload) => {
            const msg = payload.new;
            try {
              if (profile && msg.user_id === profile?.id) {
                msg["user_info"] = profile;
              } else {
                const { data, error } = await getPublicProfileByID(msg.user_id);
                if (error) throw error;
                if (data && data?.username) msg["user_info"] = data;
              }
            } catch (error) {
              console.error(error);
            } finally {
              if (msg.parent_id === null) {
                setMessages((m) => [...m, msg as ChatMessagesDTO]);
              } else {
                setMessages((m) => {
                  const parent = m.find((m) => m.id === msg.parent_id);
                  if (parent) {
                    if (!parent.chat_backs) parent.chat_backs = [];
                    parent.chat_backs.push(msg as ChatMessagesDTO);
                  }
                  return [...m];
                });
              }
            }
          }
        )
        .subscribe();
      console.log("listening to chats");
    }

    getRecentChats(channel_id, channel_type, preDate, postDate, null, 20, 0).then(
      ({ data, error }) => {
        if (error) console.error(error);
        console.log({ data });
        setMessagesLoading(false);
        setMessages(data as ChatMessagesDTO[] || []);
      }
    );

    return () => {
      channel.current?.unsubscribe();
      channel.current = null;
    };
  }, []);

  return {
    messages,
    messageLoading,
  };
};
