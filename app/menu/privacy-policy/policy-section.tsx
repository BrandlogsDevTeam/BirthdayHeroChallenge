import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PolicySectionProps {
  title: string;
  content: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function PolicySection({
  title,
  content,
  isExpanded,
  onToggle,
}: PolicySectionProps) {
  return (
    <div className="mb-4 border rounded-lg overflow-hidden">
      <Button
        onClick={onToggle}
        className="w-full justify-between text-left font-semibold p-4"
        variant="ghost"
      >
        {title}
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>
      {isExpanded && <div className="p-4 bg-muted/50">{content}</div>}
    </div>
  );
}
