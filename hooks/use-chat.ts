import { createClient } from "@/lib/supabase/client";
import { getRecentChats } from "@/lib/supabase/server-extended/log-stories";
import { ChatType } from "@/lib/types";
import { type RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

export const useChat = (channel_id: string, channel_type: ChatType, preDate: Date, postDate: Date) => {
    const channel = useRef<RealtimeChannel | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [messageLoading, setMessagesLoading] = useState(true)

    useEffect(() => {
        if (!channel.current) {
            const client = createClient();
            channel.current = client.channel('supabase_realtime')
            channel.current
                .on('postgres_changes',
                    { event: 'INSERT', schema: 'bhc', table: 'ls_comments', filter: `log_story_id=eq.${channel_id}` },
                    (payload) => {
                        setMessages(m => [...m, payload.new])
                    })
                .subscribe();
        }

        getRecentChats(channel_id, channel_type, preDate, postDate).then(({ data, error }) => {
            if (error)
                console.error(error)

            setMessagesLoading(false)
            setMessages(data)
        })

        return () => {
            channel.current?.unsubscribe();
            channel.current = null;
        };


    }, [])

    return {
        messages,
        messageLoading
    }
} 