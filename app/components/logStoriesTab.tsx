import Post from "./Post";
import { LogStoryDetailsDBO } from "@/lib/types";

interface LogStoriesTabProps {
  logStories: LogStoryDetailsDBO[];
}

export function LogStoriesTab({ logStories }: LogStoriesTabProps) {
  return (
    <div className="container mx-auto py-8 space-y-6">
      {logStories &&
        logStories.map((post) => (
          <Post
            key={post.id}
            {...post}
            avatars={[]}
            is_post_page={false}
          />
        ))}
    </div>
  );
}
