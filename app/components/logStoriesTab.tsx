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
            profilePhoto: post?.brand_info
              ? post?.brand_info?.avatar_url || ""
              : post?.user_info?.avatar_url || "",
            name: post?.brand_info
              ? post?.brand_info?.name || ""
              : post?.user_info?.name || "",
            username: post?.brand_info
              ? post?.brand_info?.username || ""
              : post?.user_info?.username || "",
            content: post.description,
            images: post.image_urls,
            likes: post.like_count,
            chats: post.chat_count,
            shares: post.share_count,
            title: post.title,
            date: post.created_at,
            avatars: [],
            is_brand_origin: post.is_brand_origin,
            is_liked: post.has_liked,
            post, id: post.id
          }}
        />
      ))}
    </div>
  );
}
