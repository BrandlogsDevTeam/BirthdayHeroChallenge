import Link from "next/link";
import { Instagram, Mail, MapPin, Youtube } from "lucide-react";

export default function InfoFooter() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#how-it-works"
                  className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="#benefits"
                  className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                >
                  Benefits
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                >
                  News and Press
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="mr-2 text-gray-600 flex-shrink-0 mt-1"
                />
                <span className="flex-1">
                  4 Palo Alto Square, 3000 El Camino Real Building, 94306, CA
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-gray-600 flex-shrink-0" />
                <Link
                  href="mailto:info@brandlogs.com"
                  className="hover:text-gray-900 transition-colors duration-200 flex-1"
                >
                  info@brandlogs.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
          <div className="text-gray-800">
            &copy; {new Date().getFullYear()} Brandlogs Inc. | All rights
            reserved.
          </div>
          <div className="flex gap-2">
            <Link href="http://www.youtube.com/@MyHungerHero" target="_blank">
              <div className="bg-gray-200 hover:bg-gray-300 w-11 h-11 p-3 flex items-center justify-center rounded-sm cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26px"
                  height="26px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-youtube text-red"
                >
                  <path d="M22.54 6.42a2.99 2.99 0 0 0-2.1-2.1C19.24 4 12 4 12 4s-7.24 0-8.44.32a2.99 2.99 0 0 0-2.1 2.1C1 7.76 1 12 1 12s0 4.24.32 5.58a2.99 2.99 0 0 0 2.1 2.1C4.76 20 12 20 12 20s7.24 0 8.44-.32a2.99 2.99 0 0 0 2.1-2.1C23 16.24 23 12 23 12s0-4.24-.32-5.58z" />
                  <polygon points="9.54 15.54 9.54 8.46 15.09 12" />
                </svg>
              </div>
            </Link>
            <Link
              href="https://instagram.com/@birthdayherochallenge"
              target="_blank"
            >
              <div className="bg-gray-200 hover:bg-gray-300 w-11 h-11 p-3 flex items-center justify-center rounded-sm cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram text-pink-500"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" />
                  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
