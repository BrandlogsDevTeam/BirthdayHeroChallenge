import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

export default function InfoFooter() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-800">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#how-it-works"
                    className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">→</span> How it works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#benefits"
                    className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">→</span> Benefits
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">→</span> Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-800">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">→</span> Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-use"
                    className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">→</span> Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              About us
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about-us#team"
                  className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2">→</span> Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us#our-community"
                  className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2">→</span> Our Community
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us#our-purpose"
                  className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2">→</span> Our Purpose
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us#our-vision"
                  className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2">→</span> Our Vision
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-800">
                News and Press
              </h3>
              <Link
                href="/blogs"
                className="hover:text-gray-900 transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">→</span> Read our news releases
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-800">FAQs</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/faqs#birthday-hero-challenge"
                    className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">→</span> Birthday Hero Challenge
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs#log-stories"
                    className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">→</span> Log Stories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs#connect"
                    className="hover:text-gray-900 transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">→</span> Connect
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-gray-400" />
                <span>94306, Palo Alto, CA</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-gray-400" />
                <a
                  href="mailto:info@brandlogs.com"
                  className="hover:text-gray-900 transition-colors duration-200"
                >
                  info@brandlogs.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link
              href="#"
              className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </Link>
          </div>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Brandlogs Inc. | All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
