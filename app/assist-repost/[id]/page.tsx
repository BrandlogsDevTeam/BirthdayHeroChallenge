import Post from "@/app/components/Post";
import { getLogStory } from "@/lib/supabase/server-extended/log-stories";
import Link from "next/link";
import { Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: { id: string };
  searchParams: { nominee: string };
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ nominee: string }>;
}) {
  const { id } = await params;
  const { nominee } = await searchParams;
  const { data: post } = await getLogStory(id);

  if (!post) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        Not Found
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="w-full max-w-4xl">
        <Link href={`/assist-repost/repost?id=${id}&nominee=${nominee}`}>
          <Button
            variant="outline"
            className="bg-white text-green-600 hover:text-white border border-green-600 hover:bg-green-600 transition-colors"
          >
            <Repeat className="mr-1 h-4 w-4" />
            Repost
          </Button>
        </Link>
      </div>
      <div className="flex w-full max-w-4xl justify-center mt-4">
        <Post {...post} is_post_page={true} avatars={[]} />
      </div>
    </div>
  );
}
