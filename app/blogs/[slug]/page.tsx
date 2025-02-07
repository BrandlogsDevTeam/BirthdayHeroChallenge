"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import DOMPurify from "dompurify";
import { ArrowLeft, Calendar } from "lucide-react";
import { Spinner } from "@/app/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { AcceptNomination } from "@/app/components/AcceptInvitationModals";

interface FullBlogPost {
  id: string;
  title: string;
  subTitle: string;
  article: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const fetchBlogPost = async (slug: string): Promise<FullBlogPost> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/getBlog/${slug}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`);
  }
  return response.json();
};

const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const ordinalDay = `${day}${getOrdinalSuffix(day)}`;

  return `${ordinalDay} ${month}, ${year}`;
};

export default function FullBlogPost() {
  return <></>;
  const { slug } = useParams<{ slug: string }>();

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery<FullBlogPost, Error>({
    queryKey: ["blogPost", slug],
    queryFn: () => fetchBlogPost(slug as string),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Error loading blog post</h1>
        <p className="text-red-500 mb-4">{error.message}</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Return to homepage
        </Link>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <article className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_BUCKET_URL}/${post.image}`}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
            {post.title}
          </h1>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-4xl">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="mb-8 flex items-center text-gray-600">
              <Calendar className="mr-2" size={20} />
              <time dateTime={post.updatedAt}>
                {formatDate(post.updatedAt)}
              </time>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {post.subTitle}
            </h2>

            <div
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.article),
              }}
            />

            <div className="mt-12 flex justify-center">
              <AcceptNomination />
            </div>

            <div className="mt-12 flex justify-center">
              <Link href="/#news-and-press" passHref>
                <Button variant="outline" className="flex items-center">
                  <ArrowLeft className="mr-2" size={20} />
                  Read More Blogs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
