import Post from "@/app/components/Post";
import { getLogStory } from "@/lib/supabase/server-extended/log-stories";

export default async function Page({
    params,
}: {
    params: any
}) {
    const id = (await params).id
    const { data: post } = await getLogStory(id);

    if (!post)
        return <div className="flex w-full h-full items-center justify-center">Not Found</div>
    return <div className="flex w-full h-full items-center justify-center">
        <Post {...{
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
            id: post.id
        }} />
    </div>;
}