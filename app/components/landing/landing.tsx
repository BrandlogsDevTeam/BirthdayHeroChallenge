"use client";

import { Mail, Sparkles, Globe, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Brandlogs Logo"
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
            <h1 className="text-2xl font-bold text-gray-900">Brandlogs</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            New beginnings
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            We're Joining Forces
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We've been acquired. Our full website is temporarily offline while
            we transition to our new home. Thank you for your support — exciting
            things are ahead.
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Transition underway
              </h3>
              <p className="text-sm text-gray-600">
                We're working behind the scenes to move Brandlogs into our
                partner's platform.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                New site coming soon
              </h3>
              <p className="text-sm text-gray-600">
                We expect the transition to finish shortly with enhanced
                features.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                User accounts preserved
              </h3>
              <p className="text-sm text-gray-600">
                All your data and subscriptions will be safely migrated.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-6">
              If you have any inquiries, contact us and include your account
              email.
            </p>
            <a
              href="mailto:info@brandlogs.com"
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Mail className="w-5 h-5" />
              info@brandlogs.com
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h3>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                Will my account data be preserved?
              </AccordionTrigger>
              <AccordionContent>
                Yes — accounts and subscriptions will be migrated. Contact
                support for urgent issues.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                When will the new site be live?
              </AccordionTrigger>
              <AccordionContent>
                We expect the transition to finish shortly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center gap-3 text-gray-500">
            <Image
              src="/logo.jpg"
              alt="Brandlogs Logo"
              width={24}
              height={24}
              className="rounded object-cover"
            />
            <span className="text-sm">
              © 2024 Brandlogs. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
