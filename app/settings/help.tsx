"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { FAQs } from "../info/faq";

interface HelpSection {
  title: string;
  items: { title: string; href: string }[];
}

const helpSections: HelpSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "How It Works", href: "/#how-it-works" },
      { title: "Benefits", href: "/#benefits" },
      { title: "About Us", href: "/about-us" },
    ],
  },
  {
    title: "Policies & Legal",
    items: [
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms of Use", href: "/terms-of-use" },
      { title: "Cookie Policy", href: "/privacy-policy" },
      { title: "Cake Giveaway Policy", href: "/terms-of-use" },
    ],
  },
  {
    title: "Support",
    items: [
      { title: "Contact Us", href: "mailto:info@brandlogs.com" },
      { title: "News and Press", href: "/#news-and-press" },
    ],
  },
];

export default function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSections = helpSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">
        Help Center
      </h1>
      <FAQs />
    </div>
  );
}
