import Post from "./Post";
import { PublicLogStory } from "@/lib/types";

interface LogStoriesTabProps {
  logStories: PublicLogStory[];
}

export function LogStoriesTab({ logStories }: LogStoriesTabProps) {
  return (
    <div className="container mx-auto py-8 space-y-6">
      {logStories && logStories.map((post) => (
        <Post
          key={post.id}
          {...{
            profilePhoto: post.is_brand_origin
              ? post?.bb_avatar || ""
              : post?.up_avatar || "",
            name: post.is_brand_origin
              ? post?.bb_name || ""
              : post?.up_name || "",
            username: post.is_brand_origin
              ? post?.bb_username || ""
              : post?.up_username || "",
            content: post.description,
            images: post.image_urls,
            logs: 0,
            chats: post.chat_count,
            shares: post.share_count,
            title: post.title,
            date: post.created_at,
            avatars: [],
            is_brand_origin: post.is_brand_origin,
          }}
        />
      ))}
    </div>
  );
}
