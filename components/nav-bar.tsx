"use client";

import { useState, useEffect, useRef, JSX } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

interface IconProps {
  className?: string;
}

const NAV_LINKS: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Partners", href: "/partners" },
  { label: "Careers", href: "/careers" },
  { label: "About Us", href: "/about" },
];

/**
 * Brand gradient reused as a Tailwind arbitrary-value class.
 * No inline style needed anywhere — Tailwind generates the rule.
 */
const BRAND_BG =
  "bg-[linear-gradient(135deg,#FF6B6B_0%,#E84393_33%,#6C5CE7_66%,#4A90E2_100%)]";

export default function Navbar(): JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);

  /* Scroll spy — hide nav on scroll-down, reveal on scroll-up */
  useEffect(() => {
    const onScroll = (): void => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastScrollY.current && y > 200);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Trap body scroll while mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = (): void => setMenuOpen((p) => !p);
  const closeMenu = (): void => setMenuOpen(false);

  return (
    <>
      {/* ═══════════════════════════
          MAIN NAV
      ═══════════════════════════ */}
      <nav
        aria-label="Main navigation"
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "h-16 flex items-center",
          "bg-white/92 backdrop-blur-2xl",
          "transition-all duration-500 ease-in-out",
          scrolled
            ? "border-b border-black/6 shadow-[0_1px_12px_rgba(0,0,0,0.04)]"
            : "border-b border-black/4",
          hidden ? "-translate-y-full" : "translate-y-0",
        ].join(" ")}
      >
        <div className="w-[90%] max-w-360 mx-auto flex items-center justify-between">
          {/* ── Logo ── */}
          <Link
            href="/"
            aria-label="DigiPlus Home"
            className="flex items-center gap-2.5 no-underline group"
          >
            <span
              aria-hidden="true"
              className={[
                BRAND_BG,
                "size-8.5 rounded-[9px]",
                "flex items-center justify-center",
                "text-white font-bold text-sm shrink-0",
                "transition-transform duration-300 group-hover:scale-110",
              ].join(" ")}
            >
              D+
            </span>
            <span className="text-[22px] font-bold tracking-tight text-[#0A2540]">
              DigiPlus
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <ul className="hidden lg:flex items-center gap-9 list-none m-0 p-0">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <DesktopNavLink href={href}>{label}</DesktopNavLink>
              </li>
            ))}

            {/* Contact CTA */}
            <li>
              <Link
                href="/contact"
                className={[
                  BRAND_BG,
                  "relative inline-flex items-center gap-2",
                  "px-6 py-2.5 rounded-xl",
                  "text-sm font-semibold text-white tracking-wide",
                  "overflow-hidden no-underline",
                  "transition-all duration-300",
                  "hover:-translate-y-0.5",
                  "hover:shadow-[0_8px_24px_rgba(108,92,231,0.4)]",
                  "group",
                ].join(" ")}
              >
                {/* Shimmer sweep on hover */}
                <span
                  aria-hidden="true"
                  className={[
                    "absolute inset-0 pointer-events-none",
                    "bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.18)_50%,transparent_60%)]",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  ].join(" ")}
                />
                <span className="relative z-10">Contact</span>
              </Link>
            </li>
          </ul>

          {/* ── Hamburger ── */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
            className="lg:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer z-50 relative"
          >
            <HamburgerBar
              extra={menuOpen ? "rotate-45 translate-y-[8.5px]" : ""}
            />
            <HamburgerBar extra={menuOpen ? "opacity-0 scale-x-0" : ""} />
            <HamburgerBar
              extra={menuOpen ? "-rotate-45 -translate-y-[8.5px]" : ""}
            />
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════
          MOBILE OVERLAY MENU
      ═══════════════════════════ */}
      <div
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        aria-hidden={!menuOpen}
        className={[
          "fixed inset-0 z-40",
          "flex flex-col items-center justify-center",
          /* Dark navy + blur — no inline style */
          "bg-[rgba(10,37,64,0.97)] backdrop-blur-[30px]",
          "transition-all duration-400",
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none",
        ].join(" ")}
      >
        {/* Ambient radial glow */}
        <div
          aria-hidden="true"
          className={[
            "absolute size-125 rounded-full pointer-events-none",
            "bg-[radial-gradient(circle,#6C5CE7_0%,#E84393_50%,transparent_70%)]",
            "opacity-20 blur-[60px]",
            "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          ].join(" ")}
        />

        <ul className="relative z-10 list-none text-center m-0 p-0 space-y-2">
          {NAV_LINKS.map(({ label, href }, i) => (
            <MobileNavItem
              key={label}
              href={href}
              label={label}
              index={i}
              visible={menuOpen}
              onClick={closeMenu}
            />
          ))}

          {/* Mobile CTA */}
          <MobileNavItem
            href="/contact"
            label="—" /* placeholder, overridden below */
            index={NAV_LINKS.length}
            visible={menuOpen}
            onClick={closeMenu}
            isCta
          />
        </ul>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════ */

/** Desktop nav link with animated gradient underline */
function DesktopNavLink({ href, children }: NavLinkProps): JSX.Element {
  return (
    <Link
      href={href}
      className={[
        "relative py-1 no-underline group",
        "text-sm font-medium tracking-wide",
        "text-[#374151] hover:text-[#0A2540]",
        "transition-colors duration-200",
      ].join(" ")}
    >
      {children}
      <span
        aria-hidden="true"
        className={[
          BRAND_BG,
          "absolute -bottom-1.5 left-0",
          "h-0.5 w-0 group-hover:w-full",
          "rounded-full transition-all duration-300 ease-out",
        ].join(" ")}
      />
    </Link>
  );
}

/** Single hamburger line */
function HamburgerBar({ extra = "" }: { extra?: string }): JSX.Element {
  return (
    <span
      className={[
        "w-6 h-0.5 bg-[#0A2540] rounded-sm block",
        "transition-all duration-300 origin-center",
        extra,
      ].join(" ")}
    />
  );
}

/** Mobile menu item — stagger-fades in via Tailwind + inline transitionDelay only */
interface MobileNavItemProps {
  href: string;
  label: string;
  index: number;
  visible: boolean;
  onClick: () => void;
  isCta?: boolean;
}

function MobileNavItem({
  href,
  label,
  index,
  visible,
  onClick,
  isCta = false,
}: MobileNavItemProps): JSX.Element {
  const delay = `${index * 60 + 80}ms`;

  if (isCta) {
    return (
      <li
        className="pt-6 transition-all duration-400"
        style={{
          opacity: visible ? 1 : 0,
          transitionDelay: delay,
          transform: visible ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <Link
          href={href}
          onClick={onClick}
          className={[
            BRAND_BG,
            "inline-flex items-center gap-2",
            "px-10 py-4 rounded-2xl",
            "text-lg font-bold text-white no-underline",
            "transition-all duration-300",
            "hover:-translate-y-0.5",
            "hover:shadow-[0_12px_40px_rgba(108,92,231,0.5)]",
          ].join(" ")}
        >
          Contact
        </Link>
      </li>
    );
  }

  return (
    <li
      className="transition-all duration-400"
      style={{
        opacity: visible ? 1 : 0,
        transitionDelay: delay,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <Link
        href={href}
        onClick={onClick}
        className={[
          "block text-4xl font-semibold tracking-tight no-underline",
          "text-white/90 hover:text-white",
          "py-3 px-8 rounded-xl",
          "transition-all duration-200 hover:bg-white/5",
        ].join(" ")}
      >
        {label}
      </Link>
    </li>
  );
}
