import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

interface SectionProp {
  title: string;
  data: string;
}

interface CardPreviewProps {
  title: string;
  sections: SectionProp[];
}

export function CardPreview({ title, sections }: CardPreviewProps) {
  return (
    <Card className="max-w-lg mx-auto bg-white/50 backdrop-blur-sm border-neutral-200/80 overflow-hidden">
      <CardHeader className="pb-6 text-center">
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-8">
        <div className="relative flex items-stretch justify-between px-4">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className="flex-1 text-center relative"
            >
              {/* Stats Content */}
              <div className="flex flex-col items-center gap-3 px-2">
                <p className="text-3xl font-bold text-neutral-800 transition-colors">
                  {section.data}
                </p>
                <h3 className="text-sm font-medium text-neutral-600 max-w-[120px]">
                  {section.title}
                </h3>
              </div>

              {/* Separator */}
              {index < sections.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-12">
                  <Separator 
                    orientation="vertical" 
                    className="bg-neutral-200"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
