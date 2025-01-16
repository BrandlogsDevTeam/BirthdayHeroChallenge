import Link from "next/link";
import { Instagram, Mail, MapPin } from "lucide-react";

export default function InfoFooter() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 text-xs">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
          <Link href="#how-it-works" className="hover:underline">
            How it works
          </Link>
          <Link href="#benefits" className="hover:underline">
            Benefits
          </Link>
          <Link href="/blogs" className="hover:underline">
            News and Press
          </Link>
          <Link href="/about-us" className="hover:underline">
            About Us
          </Link>
          <Link href="/faqs" className="hover:underline">
            FAQs
          </Link>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-use" className="hover:underline">
            Terms of Use
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center gap-4 mb-4">
          <div className="flex items-center">
            <MapPin size={16} className="mr-2 text-gray-600 flex-shrink-0" />
            <span>
              4 Palo Alto Square, 3000 El Camino Real Building, 94306, CA
            </span>
          </div>
          <div className="flex justify-center items-center">
            <Mail size={16} className="mr-2 text-gray-600 flex-shrink-0" />
            <Link
              href="mailto:info@brandlogs.com"
              target="_blank"
              className="hover:underline"
            >
              info@brandlogs.com
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-4">
          <span>
            &copy; {new Date().getFullYear()} Brandlogs Inc. | All rights
            reserved.
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/birthdayherochallenge?igsh=MWJnMWY1b3hzZnhj"
              target="_blank"
              className="hover:text-gray-900 transition-colors duration-200"
            >
              <Instagram size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
