"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronsRight, ChevronsLeft } from "lucide-react";
import { fetchBlogs } from "@/lib/supabase/server-extended/blogs";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  sub_title: string;
  image_url: string;
  created_at: string;
}

interface BlogsProps {
  initialBlogs: BlogPost[];
}

const ITEMS_PER_PAGE = 4;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};

export default function Blogs({ initialBlogs = [] }: BlogsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useQuery<BlogPost[], Error>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await fetchBlogs();
      if (error) throw new Error(error);
      if (!data) throw new Error("No data received");
      console.log("Blogs: ", data);
      return data;
    },
    initialData: initialBlogs,
    staleTime: 10 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 mb-12">
        <h2 className="text-3xl font-bold text-gray-600 mb-6">
          News and Press
        </h2>
        <div className="flex justify-center items-center my-12">
          <span className="loading loading-dots loading-sm bg-blue-600"></span>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="container mx-auto p-4 mb-12">
        <h2 className="text-3xl font-bold text-gray-600 mb-6">
          News and Press
        </h2>
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  // Ensure blogs is always an array
  const safeBlogs = blogs || [];
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = safeBlogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(safeBlogs.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div id="blogs" className="container mx-auto p-4 mb-12">
      <h2 className="text-3xl font-bold text-gray-600 mb-6">News and Press</h2>
      {safeBlogs.length === 0 ? (
        <div className="text-center text-gray-500">No blogs found</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((blog) => (
              <Card
                key={blog.id}
                className="flex flex-col h-full shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={blog.image_url}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                    priority={indexOfFirstItem === 0}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <CardContent className="flex-grow p-4">
                  <h2 className="text-xl font-bold line-clamp-2 mb-2 capitalize">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-2">
                    {blog.sub_title}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <time dateTime={blog.created_at}>
                      {formatDate(blog.created_at)}
                    </time>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm py-2 px-4 bg-gray-100 hover:bg-white hover:underline rounded-2xl"
                  >
                    Read
                    <ChevronsRight size={16} />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center my-4">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="mr-2 flex items-center"
                >
                  <ChevronsLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`mx-1 text-sm px-2 rounded-sm font-semibold ${
                      currentPage === i + 1
                        ? "bg-blue-400 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="ml-2 flex items-center gap-1"
                >
                  <ChevronsRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
