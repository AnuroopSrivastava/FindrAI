"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Search, Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const isHome = pathname === "/";

  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const lastScrollY = useRef(0);

  // Mount guard (for theme + window usage)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Intelligent sticky behavior (hide on scroll down, show on scroll up)
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const current = window.scrollY;
      const diff = current - lastScrollY.current;

      if (current < 10) {
        setShowNav(true);
      } else if (diff > 4) {
        // scrolling down
        setShowNav(false);
      } else if (diff < -4) {
        // scrolling up
        setShowNav(true);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  // Keyboard shortcuts: Ctrl/Cmd+K for search, Esc to close
  useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted]);

  return (
    <>
      {/* Smart sticky nav with glass + motion */}
      <header
        className={[
          "sticky top-0 z-40 border-b border-slate-800/70",
          "bg-slate-950/60 backdrop-blur-2xl",
          "shadow-lg shadow-black/25",
          "transform transition-transform duration-500",
          showNav ? "translate-y-0" : "-translate-y-full",
        ].join(" ")}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold tracking-tight text-slate-100 hover:scale-[1.02] transition-transform"
          >
            {/* New FindrAI SVG Logo — mix of monogram + neural + soft minimal */}
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900/80 ring-1 ring-sky-500/40 shadow-md shadow-sky-900/40">
              <svg
                viewBox="0 0 32 32"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="findrAIGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>
                {/* Soft glow ring */}
                <circle
                  cx="16"
                  cy="16"
                  r="11"
                  fill="url(#findrAIGradient)"
                  opacity="0.18"
                />
                {/* Finder-like outer ring */}
                <circle
                  cx="16"
                  cy="16"
                  r="8.5"
                  fill="none"
                  stroke="url(#findrAIGradient)"
                  strokeWidth="1.4"
                />
                {/* Neural node */}
                <circle
                  cx="22"
                  cy="12"
                  r="2"
                  fill="url(#findrAIGradient)"
                />
                {/* Connective line */}
                <path
                  d="M16 16 L21 12.5"
                  stroke="url(#findrAIGradient)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                {/* Subtle AI monogram-ish cut */}
                <path
                  d="M12 20 C12 17.5 13.5 16 16 16"
                  stroke="#e5f2ff"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                FindrAI
              </span>
              <span className="text-sm sm:text-base font-semibold">
                <span className="text-slate-50">AI Tools</span>{" "}
                <span className="text-sky-400">Directory</span>
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">

            {/* Navigation Links (Desktop) */}
            <div className="hidden items-center gap-1 rounded-full border border-slate-800/90 bg-slate-950/80 px-1 py-1 text-xs shadow-inner shadow-black/20 sm:flex">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "group relative rounded-full px-3 py-1.5 font-medium transition-all duration-300",
                      "text-[11px] sm:text-xs",
                      active
                        ? "text-slate-100"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 hover:shadow-md hover:shadow-black/20",
                    ].join(" ")}
                  >
                    {active && (
                      <span className="absolute inset-0 -z-10 rounded-full bg-sky-500/20 shadow-sm shadow-sky-700/40" />
                    )}
                    <span className="relative z-10 flex items-center gap-1">
                      {item.label}
                      {/* Animated underline */}
                      <span className="pointer-events-none absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-sky-400/90 transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Search trigger (desktop) */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-[11px] text-slate-300 shadow-sm shadow-black/30 transition-all hover:border-sky-500/60 hover:text-sky-100 hover:bg-slate-900/90 sm:inline-flex"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search tools</span>
              <span className="ml-1 rounded-md border border-slate-700 bg-slate-900 px-1.5 py-0.5 text-[10px] text-slate-400">
                ⌘K / Ctrl+K
              </span>
            </button>

            {/* Back to Home */}
            {!isHome && (
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-sky-500/60 bg-sky-500/10 px-3 py-1.5 text-[11px] font-medium text-sky-100 shadow-sm shadow-sky-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-500/20"
              >
                <span className="text-xs">←</span>
                <span>Back to Home</span>
              </Link>
            )}

            {/* 🌙 Dark Mode Toggle — Enhanced */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-600 bg-slate-900 text-slate-200 hover:border-sky-400 transition-all duration-300 shadow-sm shadow-slate-900/50 hover:shadow-sky-900/40 active:scale-90"
              >
                <div
                  className={`transform transition-transform duration-500 ${
                    theme === "dark" ? "rotate-180" : "rotate-0"
                  }`}
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </div>
              </button>
            )}

            {/* Mobile Search Icon */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-700 bg-slate-950/80 text-slate-300 shadow-sm shadow-black/40 transition-all hover:border-sky-400 hover:text-sky-100 sm:hidden"
              aria-label="Search tools"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-700 bg-slate-950/80 text-slate-200 shadow-sm shadow-black/40 transition-all hover:border-sky-400 hover:text-sky-100 sm:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile slide-out menu */}
        {mobileOpen && (
          <div className="sm:hidden fixed inset-x-0 top-[3.25rem] z-30 px-3 pb-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur-2xl shadow-2xl shadow-black/50 p-3 space-y-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
                      "transition-all duration-200",
                      active
                        ? "bg-sky-500/15 text-sky-100 border border-sky-600/60"
                        : "text-slate-300 hover:bg-slate-800/70 hover:text-slate-50",
                    ].join(" ")}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span className="h-1 w-1 rounded-full bg-sky-400" />
                    )}
                  </Link>
                );
              })}
              {!isHome && (
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="mt-1 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-sky-500/60 bg-sky-500/10 px-3 py-2 text-xs font-medium text-sky-100 shadow-sm shadow-sky-900/40 transition-all hover:bg-sky-500/20"
                >
                  <span className="text-xs">←</span>
                  <span>Back to Home</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Spotlight-style Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 backdrop-blur-md px-4 pt-24">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700/80 bg-slate-900/95 shadow-2xl shadow-black/60">
            <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-100">
                  Search AI tools
                </p>
                <p className="text-xs text-slate-400">
                  Type a tool name, category, or keyword
                </p>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-slate-400 hover:text-slate-100 hover:border-slate-500 transition-colors"
              >
                Esc
              </button>
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-700/90 bg-slate-900/90 px-3 py-2 shadow-inner shadow-black/50">
                <Search className="h-4 w-4 text-slate-500" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search tools… (UI only, wire to logic later)"
                  className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                />
                <span className="hidden rounded-md border border-slate-700 bg-slate-950 px-1.5 py-0.5 text-[10px] text-slate-400 sm:inline-block">
                  ⌘K / Ctrl+K
                </span>
              </div>
            </div>
            <div className="px-4 pb-4 pt-1">
              <p className="text-[11px] text-slate-500">
                Tip: You can connect this search to your actual tools data later
                for instant filtering.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
