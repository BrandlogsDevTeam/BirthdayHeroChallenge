"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Mail, Phone, MapPin } from "lucide-react";
import FAQs from "../faqs/faqs";

interface HelpSection {
  title: string;
  items: { title: string; href: string }[];
}

const helpSections: HelpSection[] = [
  {
    title: "Quick Links",
    items: [
      { title: "How It Works", href: "/how-it-works" },
      { title: "Benefits", href: "/benefits" },
      { title: "Community", href: "/community" },
    ],
  },
  {
    title: "Blogs & FAQs",
    items: [
      { title: "Blogs", href: "/blogs" },
      {
        title: "Birthday Hero Challenge",
        href: "/faqs#birthday-hero-challenge",
      },
      { title: "Log Stories", href: "/faqs#log-stories" },
      { title: "Connect", href: "/faqs#connect" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms of Use", href: "/privacy-policy" },
    ],
  },
];

const contactInfo = [
  { icon: MapPin, text: "94306, Palo Alto, CA" },
  { icon: Mail, text: "info@brandlogs.com" },
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
          <Input
            type="text"
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredSections.map((section) => (
          <Card
            key={section.title}
            className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-green-600">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-green-600 transition-colors duration-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-100 rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactInfo.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center space-x-2">
              <Icon className="text-green-600" size={20} />
              <span className="text-gray-600">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <FAQs />
    </div>
  );
}
