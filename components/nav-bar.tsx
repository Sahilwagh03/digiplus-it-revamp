"use client";

import { useState, useEffect, JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactDialog from "./ContactDialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Expertise", href: "/expertise" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "About Us", href: "/about" },
];

const BRAND_BG =
  "bg-[linear-gradient(135deg,#FF6B6B_0%,#E84393_33%,#6C5CE7_66%,#4A90E2_100%)]";

export default function Navbar(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActiveRoute = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={cn(
          "sticky top-0 left-0 right-0 z-50 h-16 flex items-center",
          "bg-white/90 backdrop-blur-xl transition-all duration-500",
          scrolled ? "border-b shadow-sm" : "border-b border-black/5",
        )}
      >
        <div className="w-[90%] max-w-360 mx-auto flex items-center justify-between">
          <Link
            href="/"
            aria-label="DigiPlus Home"
            className="flex items-center"
          >
            <Image
              src="/logo.png"
              alt="DigiPlus IT Logo"
              width={160}
              height={40}
              priority
              className="h-8 w-auto md:h-9 lg:h-10 object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <DesktopNavLink href={href} isActive={isActiveRoute(href)}>
                  {label}
                </DesktopNavLink>
              </li>
            ))}

            <li>
              <ContactDialog>
                <button
                  className={cn(
                    BRAND_BG,
                    "relative inline-flex items-center",
                    "px-6 py-2.5 rounded-xl",
                    "text-sm font-semibold text-white",
                    "transition-all duration-300",
                    "hover:-translate-y-0.5",
                    "hover:shadow-lg",
                  )}
                >
                  Contact
                </button>
              </ContactDialog>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="lg:hidden flex flex-col gap-1.5 p-2"
          >
            <HamburgerBar
              extra={menuOpen ? "rotate-45 translate-y-[8px]" : ""}
            />
            <HamburgerBar extra={menuOpen ? "opacity-0 scale-x-0" : ""} />
            <HamburgerBar
              extra={menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}
            />
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          "flex flex-col items-center justify-center",
          "bg-white/80 backdrop-blur-2xl",
          "transition-all duration-300 ease-out",
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none",
        )}
      >
        <ul className="text-center space-y-4">
          {NAV_LINKS.map(({ label, href }, i) => (
            <MobileNavItem
              key={label}
              href={href}
              label={label}
              index={i}
              visible={menuOpen}
              onClick={() => setMenuOpen(false)}
              isActive={isActiveRoute(href)}
            />
          ))}

          {/* CTA */}
          <li
            className={cn(
              "pt-6 transition-all duration-300 ease-out",
              menuOpen
                ? "opacity-100 translate-y-0 delay-500"
                : "opacity-0 translate-y-4",
            )}
          >
            <ContactDialog>
              <button
                onClick={() => setMenuOpen(false)}
                className={cn(
                  BRAND_BG,
                  "px-10 py-3 rounded-xl",
                  "text-white font-semibold",
                  "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
                )}
              >
                Contact
              </button>
            </ContactDialog>
          </li>
        </ul>
      </div>
    </>
  );
}

/* ================= Desktop Nav Link ================= */

function DesktopNavLink({
  href,
  children,
  isActive = false,
}: NavLinkProps): JSX.Element {
  return (
    <Link
      href={href}
      className={cn(
        "relative py-1 text-sm font-medium transition-colors duration-200",
        isActive ? "text-[#0A2540]" : "text-gray-600 hover:text-[#0A2540]",
      )}
    >
      {children}
      <span
        className={cn(
          BRAND_BG,
          "absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300",
          isActive ? "w-full" : "w-0 group-hover:w-full",
        )}
      />
    </Link>
  );
}

/* ================= Hamburger Bar ================= */

function HamburgerBar({ extra = "" }: { extra?: string }): JSX.Element {
  return (
    <span
      className={cn(
        "w-6 h-0.5 bg-[#0A2540] rounded transition-all duration-300",
        extra,
      )}
    />
  );
}

/* ================= Mobile Nav Item ================= */

interface MobileNavItemProps {
  href: string;
  label: string;
  index: number;
  visible: boolean;
  onClick: () => void;
  isActive?: boolean;
}

function MobileNavItem({
  href,
  label,
  index,
  visible,
  onClick,
  isActive = false,
}: MobileNavItemProps): JSX.Element {
  const delayClass = `delay-[${index * 75}ms]`;

  return (
    <li
      className={cn(
        "transition-all duration-300 ease-out",
        delayClass,
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
    >
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "block text-2xl font-semibold py-2 px-6 rounded-lg transition-colors duration-200",
          isActive
            ? "text-[#0A2540] bg-black/5"
            : "text-gray-600 hover:text-[#0A2540]",
        )}
      >
        {label}
      </Link>
    </li>
  );
}
