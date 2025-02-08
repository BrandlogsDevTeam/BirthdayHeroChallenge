import BackButton from "@/app/components/back-button";
import Post from "@/app/components/Post";
import { getLogStory } from "@/lib/supabase/server-extended/log-stories";

export default async function Page({ params }: { params: any }) {
  const id = (await params).id;
  const { data: post } = await getLogStory(id);

  if (!post)
    return (
      <div className="flex w-full h-full items-center justify-center">
        Not Found
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="w-full max-w-4xl">
        <BackButton />
      </div>
      <div className="flex w-full max-w-4xl justify-center mt-4">
        <Post
          {...post}
          is_post_page={true}
          avatars={[]}
        />
      </div>
    </div>
  );
}
