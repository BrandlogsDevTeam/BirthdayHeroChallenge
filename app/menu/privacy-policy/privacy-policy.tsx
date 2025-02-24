"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import PolicySection from "./policy-section";
import { policyData } from "./policy-data";

export default function PrivacyPolicy() {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleAll = () => {
    setExpandedSections(
      expandedSections.length === policyData.length
        ? []
        : policyData.map((_, index) => index)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-600 text-center mb-8">
        Privacy Policy
      </h1>
      <div className="max-w-3xl mx-auto">
        <Button onClick={toggleAll} className="mb-4" variant="outline">
          {expandedSections.length === policyData.length ? (
            <>
              Collapse All <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Expand All <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {policyData.map((section, index) => (
            <PolicySection
              key={index}
              title={section.title}
              content={section.content}
              isExpanded={expandedSections.includes(index)}
              onToggle={() => toggleSection(index)}
            />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
