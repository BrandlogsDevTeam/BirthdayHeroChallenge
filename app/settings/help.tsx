"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

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

      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for help..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-green-600">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={item.href}
                      className="text-primary hover:underline block py-2 transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
