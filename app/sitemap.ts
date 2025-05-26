import { getAllBlogs, BlogPost } from "./blogs/lib/blogs";

export default async function Sitemap() {
  const baseUrl = "https://brandlogs.com";

  const response = await getAllBlogs();

  const blogPosts = response?.map((blog: BlogPost) => {
    return {
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: blog.createdAt,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/wallet`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
    },
    ...blogPosts,
  ];
}
