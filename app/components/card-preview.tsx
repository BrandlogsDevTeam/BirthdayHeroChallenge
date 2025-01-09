import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
        <div className="flex justify-center">
          <div className="flex flex-row items-stretch w-full">
            {sections.map((section: SectionProp, index: number) => (
              <div key={section.title} className="flex-1 flex items-center">
                <div className="w-full flex flex-col items-center justify-center py-4">
                  <h3 className="font-bold text-sm sm:text-base text-center">
                    {section.title}
                  </h3>
                  <p className="text-base sm:text-lg font-semibold text-gray-600 mt-2 text-center">
                    {section.data}
                  </p>
                </div>
                {index < sections.length - 1 && (
                  <div className="flex items-center self-stretch">
                    <Separator
                      orientation="vertical"
                      className="h-12 mx-2 sm:mx-4"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
