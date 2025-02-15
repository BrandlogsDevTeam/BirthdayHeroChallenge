import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";

interface SectionProp {
  title: string;
  data: string;
  description?: string;
}

interface CardPreviewProps {
  title: string;
  sections: SectionProp[];
}

export function CardPreview({ title, sections }: CardPreviewProps) {
  return (
    <Card className="w-full max-w-5xl mx-auto bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-green-600 text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className="relative p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="space-y-2 text-center">
                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  {section.title}
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {section.data}
                </p>
                {section.description && (
                  <p className="text-sm text-gray-500">{section.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
