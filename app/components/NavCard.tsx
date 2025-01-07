import Link from "next/link";
import { type LucideIcon } from "lucide-react";

interface NavCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  link: string;
}

export function NavCard({ icon: Icon, title, subtitle, link }: NavCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Icon className="w-12 h-12 text-blue-500 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{subtitle}</p>
      <Link
        href={link}
        className="text-blue-500 hover:text-blue-700 font-medium transition-colors duration-300"
      >
        Learn More
      </Link>
    </div>
  );
}
