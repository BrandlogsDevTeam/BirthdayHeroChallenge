import Image from "next/image";
import Link from "next/link";

interface LogStorySelectionProps {
  title: string;
  avatar: string;
  href: string;
}

export default function LogStorySelection({
  title,
  avatar,
  href,
}: LogStorySelectionProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 max-w-xl bg-white border border-gray-300 hover:bg-green-600 hover:text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="w-16 h-16 rounded-full overflow-hidden bg-white p-2 transition-transform group-hover:scale-110 duration-300">
        <Image
          src={avatar}
          alt={title}
          width={64}
          height={64}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-lg text-black group-hover:text-white transition-colors duration-300">
        {title}
      </h3>
    </Link>
  );
}
