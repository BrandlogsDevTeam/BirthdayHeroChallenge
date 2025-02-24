"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Book } from "lucide-react";
import { blogs } from "./lib/blogs";
import { AcceptNomination } from "../components/AcceptInvitationModals";

const ITEMS_PER_PAGE = 3;

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);

  return (
    <section id="blogs" className="container mx-auto px-4 py-16">
      <div className="flex gap-2">
        <h2 className="text-3xl font-bold text-green-600 mb-6">News & Press</h2>
        <Book className="text-green-600 w-8 h-8 mb-2 font-bold" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {currentItems.map((blog) => (
          <div
            key={blog.id}
            className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl w-full max-w-sm"
          >
            <div className="relative h-48">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">
                {formatDate(blog.createdAt)}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                {blog.title}
              </h3>
              <p className="text-gray-600 line-clamp-3 mb-4">{blog.subtitle}</p>
              <Link
                href={`/blogs/${blog.slug}`}
                className="inline-flex items-center text-green-500 font-medium hover:text-green-800 transition-colors"
              >
                Read More
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-gray-100 disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-full ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              } transition-colors`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-gray-100 disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}
