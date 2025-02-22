import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug, blogs } from "../lib/blogs";
import { ArrowLeft } from "lucide-react";
import parse, { domToReact } from "html-react-parser";
import { AcceptNomination } from "@/app/components/AcceptInvitationModals";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const options = {
    replace: (domNode: any) => {
      if (!domNode) return null;

      // Handle headers
      if (domNode.name === "h3") {
        return (
          <h2 className="text-2xl font-semibold mt-12 mb-6 text-gray-900 border-l-4 border-green-500 pl-4">
            {domToReact(domNode.children, options)}
          </h2>
        );
      }

      // Handle lists
      if (domNode.name === "ul") {
        return (
          <ul className="list-disc pl-8 mb-6 space-y-2 text-gray-700">
            {domToReact(domNode.children, options)}
          </ul>
        );
      }

      // Handle list items
      if (domNode.name === "li") {
        return (
          <li className="mb-2 pl-2 leading-relaxed">
            {domToReact(domNode.children, options)}
          </li>
        );
      }

      // Handle paragraphs
      if (domNode.name === "p") {
        return (
          <p className="text-gray-700 mb-6 leading-relaxed text-lg">
            {domToReact(domNode.children, options)}
          </p>
        );
      }

      // Handle strong tags
      if (domNode.name === "strong") {
        return (
          <strong className="font-semibold text-gray-900">
            {domToReact(domNode.children, options)}
          </strong>
        );
      }

      // Handle divs
      if (domNode.name === "div" && domNode.attribs?.class === "blog-content") {
        return (
          <div className="blog-content">
            {domToReact(domNode.children, options)}
          </div>
        );
      }
    },
  };

  return (
    <article className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-end pb-12">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-gray-200">{post.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center text-gray-500 mb-6 text-sm">
              <span>{formatDate(post.createdAt)}</span>
            </div>

            <div className="blog-content">{parse(post.content, options)}</div>

            <div className="flex flex-col items-center">
              <span className="text-foreground">It's free!</span>
              <AcceptNomination />
            </div>

            <div className="mt-12 pt-8 border-t">
              <Link
                href="/#blogs"
                className="inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Blogs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}
