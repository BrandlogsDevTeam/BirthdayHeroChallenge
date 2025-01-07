import DOMPurify from "dompurify";

interface SafeHTMLProps {
  html: string;
}

export function SafeHTML({ html }: SafeHTMLProps) {
  return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
}
