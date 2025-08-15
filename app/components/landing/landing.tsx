"use client";

import { Mail, Sparkles, Globe, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentColor((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const colors = [
    "text-blue-600",
    "text-green-600",
    "text-orange-600",
    "text-red-600",
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-orange-400/40 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl animate-bounce"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute -bottom-32 right-1/4 w-72 h-72 bg-green-400/35 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/4 right-1/4 w-48 h-48 bg-red-400/25 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div> */}

      {/* Header */}
      <header className="relative z-10 border-b border-blue-200 bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div
            className={`flex items-center gap-3 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-8 opacity-0"
            }`}
          >
            <img
              src="/logo.jpg"
              alt="Brandlogs Logo"
              className="w-10 h-10 rounded-lg object-cover shadow-md"
            />
            <h1 className="text-2xl font-bold text-blue-600">Brandlogs</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-md border border-blue-200">
            <Sparkles className="w-4 h-4 animate-pulse" />
            New beginnings
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 leading-tight text-green-600`}
          >
            Brandlogs — We're Joining Forces
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We've been acquired. Our full website is temporarily offline while
            we transition to our new home. Thank you for your support — exciting
            things are ahead.
          </p>
        </div>

        {/* Status Cards */}
        <div
          className={`grid md:grid-cols-3 gap-6 mb-16 transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <Card className="border-0 bg-orange-100 hover:bg-orange-200 transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
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

          <Card className="border-0 bg-green-100 hover:bg-green-200 transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <Sparkles
                  className="w-6 h-6 text-white animate-spin"
                  style={{ animationDuration: "4s" }}
                />
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

          <Card className="border-0 bg-blue-100 hover:bg-blue-200 transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
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
        <div
          className={`bg-red-100 rounded-2xl p-8 mb-16 border border-red-200 shadow-xl transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse">
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
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              info@brandlogs.com
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div
          className={`max-w-2xl mx-auto transition-all duration-1000 delay-900 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-green-600">
            Frequently Asked Questions
          </h3>

          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem
              value="item-1"
              className="bg-blue-50 border border-blue-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <AccordionTrigger className="text-left px-6 py-4 transition-all duration-300 font-semibold">
                Will my account data be preserved?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-700">
                Yes — accounts and subscriptions will be migrated. Contact
                support for urgent issues.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="bg-blue-50 border border-blue-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <AccordionTrigger className="text-left px-6 py-4 transition-all duration-300 font-semibold">
                When will the new site be live?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-700">
                We expect the transition to finish shortly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-blue-100 mt-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center gap-3 text-gray-500">
            <img
              src="/logo.jpg"
              alt="Brandlogs Logo"
              className="w-6 h-6 rounded object-cover"
            />
            <span className="text-sm">
              © 2024 Brandlogs. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Action Elements */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 pointer-events-none">
        <div
          className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="w-3 h-3 bg-red-500 rounded-full animate-bounce"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>
    </div>
  );
}
