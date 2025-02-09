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

  const [forceUpdate, setForceUpdate] = useState(0);

  const appendMessage = (msg: ChatMessagesDTO) => {
    setMessages((m) => {
      if (msg.parent_id === null) {
        return [...m, msg as ChatMessagesDTO];
      } else {
        return m.map(m => m.id === msg.parent_id ? { ...m, chat_backs: [...(m.chat_backs || []), msg], chat_back_count: m.chat_back_count + 1 } : m);
      }
    });
  };

  useEffect(() => {
    if (profile && !channel.current) {
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
            console.log("Message received", msg);
              try {
                if (profile && msg.user_id === profile?.id) {
                  msg["user_info"] = profile;
                } else {
                  const { data, error } = await getPublicProfileByID(msg.user_id);
                  if (error) throw error;
                  if (data && data?.username) msg["user_info"] = data;
                }
                appendMessage(msg as ChatMessagesDTO);
              } catch (error) {
                console.error(error);
              }
          }
        )
        .subscribe((status, err) => {
          console.log("status", status);
          if (status === "CLOSED") {
            // force update the component to re-subscribe
            setTimeout(() => setForceUpdate(1), 1000);
          }
          if (err)
            console.log("err", err);
        });
    }

    if (profile)
      getRecentChats(channel_id, channel_type, preDate, postDate, null, 20, 0).then(
        ({ data, error }) => {
          if (error) console.error(error);
          // console.log({ data });
          setMessagesLoading(false);
          setMessages(data?.sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at)) as ChatMessagesDTO[] || []);
        }
      );

    return () => {
      channel.current?.unsubscribe();
      channel.current = null;
    };
  }, [profile, forceUpdate]);

  const getChatBacks = (id: string) => {
    return getRecentChats(channel_id, channel_type, preDate, postDate, id, 20, 0).then(({ data, error }) => {
      if (data) {
        setMessages(msg => {
          const parent = msg.find(m => m.id === id);
          if (parent) {
            let ids = (parent.chat_backs || []).map(m => m.id);
            let newChatBacks = (data as ChatMessagesDTO[]).filter(m => !ids.includes(m.id));
            parent.chat_backs = [...(parent.chat_backs || []), ...newChatBacks];
            parent.chat_backs.sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at));
          }
          return msg;
        });
      }
    });
  };

  return {
    messages,
    messageLoading,
    getChatBacks,
  };
};
