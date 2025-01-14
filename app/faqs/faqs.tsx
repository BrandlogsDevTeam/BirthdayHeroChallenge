"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SafeHTML } from "../components/SafeHTML";
import { FAQData } from "./faq-data";

export default function FAQs() {
  const [openCategory, setOpenCategory] = useState<string>("");

  interface FAQ {
    id: string;
    question: string;
    answer: string;
  }

  interface FAQCategory {
    id: string;
    name: string;
    faqs: FAQ[];
  }

  const faqCategories: FAQCategory[] = [
    {
      id: "birthday-hero-challenge",
      name: "Birthday Hero Challenge",
      faqs: FAQData.birthdayHeroChallenge,
    },
    {
      id: "log-stories",
      name: "Log Stories",
      faqs: FAQData.logStories,
    },
    {
      id: "connect",
      name: "Connect",
      faqs: FAQData.connect,
    },
  ];

  return (
    <div id="faqs" className="w-full max-w-4xl mx-auto space-y-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Frequently Asked Questions
      </h2>

      <Accordion
        type="single"
        collapsible
        value={openCategory}
        onValueChange={setOpenCategory}
        className="w-full"
      >
        {faqCategories.map((category) => (
          <AccordionItem
            key={category.name}
            value={category.name}
            className="border-b border-gray-200 mb-2"
          >
            <AccordionTrigger className="text-xl text-gray-600 hover:underline transition-colors">
              {category.name}
            </AccordionTrigger>

            <AccordionContent className="px-4 py-2">
              <Accordion type="single" collapsible>
                {category.faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="border-b border-gray-100"
                  >
                    <AccordionTrigger className="text-lg text-gray-700 hover:text-blue-600 transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-warmGray-600 pb-4">
                      <SafeHTML html={faq.answer} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
