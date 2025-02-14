import Blogs from "./blogs";
import { fetchBlogs } from "@/lib/supabase/server-extended/blogs";

export default async function BlogsPage() {
  const { data: blogs, error } = await fetchBlogs();
  console.log("Blogs: ", blogs);

  if (error) {
    console.error(error);
    return <div>Error: {error}</div>;
  }

  return <Blogs initialBlogs={blogs ?? []} />;
}
