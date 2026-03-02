import Link from "next/link";
import { Mail, Linkedin, Twitter } from "lucide-react";
import GlassdoorLogo from "./glassdoor-logo";

export default function Footer() {
  return (
    <footer className="bg-white text-neutral-600">
      <div className="max-w-340 mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo + Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-neutral-900">
              DigiPlus IT
            </h2>
            <p className="mt-4 text-sm leading-relaxed max-w-sm text-neutral-500">
              Transforming enterprises through AI-driven digital solutions and
              scalable technology innovation.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-6">
              Solutions
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/services"
                  className="hover:text-neutral-900 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#ai-products"
                  className="hover:text-neutral-900 transition-colors"
                >
                  AI Products
                </Link>
              </li>
              <li>
                <Link
                  href="/expertise"
                  className="hover:text-neutral-900 transition-colors"
                >
                  Expertise
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-6">
              Company
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-neutral-900 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-neutral-900 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-neutral-900 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-6">
              Resources
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/insights"
                  className="hover:text-neutral-900 transition-colors"
                >
                  Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="hover:text-neutral-900 transition-colors"
                >
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Connect Section */}
        <div className="mt-16">
          <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-6">
            Connect
          </h3>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <Link
              href="https://linkedin.com/company/digiplus-it"
              target="_blank"
              className="flex items-center gap-2 hover:text-neutral-900 transition-colors"
            >
              <Linkedin size={16} /> LinkedIn
            </Link>

            <Link
              href="https://www.glassdoor.co.in/Overview/Working-at-DigiPlus-IT-EI_IE1661442.11,22.htm"
              target="_blank"
              className="flex items-center gap-2 hover:text-neutral-900 transition-colors"
            >
              <GlassdoorLogo className="size-7"/> Glassdoor
            </Link>

            <Link
              href="mailto:salesman@digiplusit.com"
              className="flex items-center gap-2 hover:text-neutral-900 transition-colors"
            >
              <Mail size={16} /> Email
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-neutral-500">
            © {new Date().getFullYear()} DigiPlus IT. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-neutral-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-neutral-900 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/security"
              className="hover:text-neutral-900 transition-colors"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
