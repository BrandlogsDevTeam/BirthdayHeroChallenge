import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

interface SectionProp {
  title: string;
  data: string;
  description?: string
}

interface CardPreviewProps {
  title: string;
  sections: SectionProp[];
}

export function CardPreview({ title, sections }: CardPreviewProps) {
  return (
    <div className="bg-white p-6 max-w-lg sm:max-w-xl mx-auto rounded-lg shadow">
      {/* Card Header */}
      <div className="text-center mb-6">
        <h2 className="font-bold text-xl text-green-600">{title}</h2>
      </div>

      {/* Card Content */}
      <div
        className={`grid grid-cols-${sections.length} gap-6 p-6 bg-white rounded-lg shadow-md`}
      >
        {sections.map((section, index) => (
          <div key={section.title} className="text-center relative">
            {/* Vertical Dividers */}
            {index !== 0 && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gray-200"></div>
            )}
            {index !== sections.length - 1 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gray-200"></div>
            )}

            {/* Stats Content */}
            <h2 className="text-lg font-semibold text-gray-600 mb-3">
              {section.title}
            </h2>
            <p className="text-3xl font-bold text-green-600">
              {section.data}
            </p>
            <p className="text-sm text-gray-500 mt-1">{section?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
