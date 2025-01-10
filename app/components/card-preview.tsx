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
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="flex items-center justify-center">
        <CardTitle className="text-xl text-green-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-4 relative`} style={{ gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))` }} >
          {sections.length > 0 ?
            <>
              {sections.map((section: SectionProp, index: number) => (
                <React.Fragment key={section.title} >
                  <div
                    key={section.title}
                    className="flex flex-col items-center justify-center"
                  >
                    <h3 className="font-bold">{section.title}</h3>
                    <p className="text-lg font-semibold text-gray-600 mt-2">
                      {section.data}
                    </p>
                  </div>
                  {
                    (sections.length > 1 && index < sections.length - 1) ?
                      <div className={`absolute inset-y-0 -ml-px flex items-center`} style={{ left: `${(index + 1) * 100 / sections.length}%` }}>
                        <Separator orientation="vertical" className="h-12" />
                      </div>
                      : <></>
                  }
                </React.Fragment>
              ))}
            </> : <></>
          }

          {/* Separators positioned absolutely */}
          {/* <div className="absolute inset-y-0 left-1/3 -ml-px flex items-center">
            <Separator orientation="vertical" className="h-12" />
          </div>
          <div className="absolute inset-y-0 left-2/3 -ml-px flex items-center">
            <Separator orientation="vertical" className="h-12" />
          </div> */}
        </div>
      </CardContent>
    </Card >
  );
}
