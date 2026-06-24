"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X,
  Home,
  Info,
  BookOpen,
  Building2,
  Image as ImageIcon,
  GraduationCap,
  Calendar,
  Heart,
  Phone
} from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import IslamicPattern from "../ui/IslamicPattern";
const linkIcons: Record<string, React.ComponentType<any>> = {
  "/": Home,
  "/about": Info,
  "/programs": BookOpen,
  "/facilities": Building2,
  "/gallery": ImageIcon,
  "/admissions": GraduationCap,
  "/events": Calendar,
  "/charity": Heart,
  "/contact": Phone,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky style based on offset
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleSupportClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById("orphan-care");
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed z-50 transition-all duration-300 ${
          scrolled
            ? "top-0 left-0 w-full py-0 lg:top-3 lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100%-2.5rem)] lg:max-w-7xl"
            : "top-0 left-0 w-full py-0 lg:top-6 lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100%-2rem)] lg:max-w-7xl"
        }`}
      >
        <div
          className={`mx-auto flex justify-between items-center transition-all duration-300 ${
            scrolled
              ? "w-full px-6 py-3 bg-surface/90 backdrop-blur-md border-b border-border shadow-sm lg:bg-surface/80 lg:dark:bg-surface/85 lg:backdrop-blur-md lg:rounded-full lg:border lg:border-border/80 lg:shadow-md lg:px-6 lg:py-2"
              : "w-full px-6 py-5 bg-transparent lg:bg-white/70 lg:dark:bg-surface/75 lg:backdrop-blur-md lg:rounded-full lg:border lg:border-border/60 lg:shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:lg:shadow-[0_8px_32px_rgba(0,0,0,0.35)] lg:px-8 lg:py-2.5"
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 text-textColor-primary hover:opacity-90 transition-opacity group flex-shrink-0"
            aria-label="Badrulhuda Academy Home"
          >
            {/* Logo Image */}
            <Image
              src="/images/badr-logo.webp"
              alt="Badrulhuda Academy Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="flex flex-col">
              <span 
                className="font-tajawal text-[18px] font-bold leading-none text-textColor-primary block mt-0.5"
                style={{ wordSpacing: "-0.05em" }}
              >
                بدر الهدى
              </span>
              <span className="text-[9px] font-bold tracking-widest text-textColor-muted uppercase mt-1">
                Badrulhuda Academy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 mx-auto">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`relative text-body-sm font-semibold tracking-wide py-1.5 transition-colors ${
                    isActive
                      ? "text-accent font-bold"
                      : "text-textColor-secondary hover:text-textColor-primary dark:hover:text-accent-light"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <m.span
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Support a Child desktop CTA button */}
          <div className="hidden lg:block flex-shrink-0">
            <Link
              href="/#orphan-care"
              onClick={handleSupportClick}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-primary-dark font-bold px-5 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-accent/20 active:scale-95 text-body-sm font-inter shrink-0"
            >
              <Heart className="w-4 h-4 fill-current animate-pulse" />
              <span>Support a Child</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl border border-border/80 bg-surface-alt hover:bg-surface transition-all duration-200 active:scale-95 text-textColor-primary"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Slide Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Tap-to-close Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleLinkClick}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            />

            {/* Sliding Drawer Container */}
            <m.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-[85vw] max-w-[360px] z-50 bg-surface shadow-2xl flex flex-col lg:hidden border-l border-border/50 overflow-hidden"
            >
              {/* Subtle background Islamic Pattern */}
              <IslamicPattern opacity={0.06} className="z-0 text-accent/20" />

              {/* Top: Logo + Arabic Name + Close Button */}
              <div className="flex items-center justify-between p-5 border-b border-border/50 bg-surface-alt/30 relative z-10">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/images/badr-logo.webp"
                    alt="Badrulhuda Academy Logo"
                    width={38}
                    height={38}
                    className="w-9 h-9 object-contain"
                  />
                  <div className="flex flex-col">
                    <span 
                      className="font-tajawal text-[18px] font-bold leading-none text-textColor-primary mt-0.5"
                      style={{ wordSpacing: "-0.05em" }}
                    >
                      بدر الهدى
                    </span>
                    <span className="text-[8px] font-bold tracking-widest text-textColor-muted uppercase mt-0.5">
                      Badrulhuda Academy
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg border border-border/60 bg-surface hover:bg-surface-alt transition-colors text-textColor-secondary active:scale-95"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tagline Banner */}
              <div className="px-5 py-2.5 bg-primary/5 dark:bg-accent/5 border-b border-border/40 text-center relative z-10">
                <p className="text-[10px] font-bold tracking-wide text-primary dark:text-accent-light uppercase">
                  Rooted in Faith. Rising Through Knowledge.
                </p>
              </div>

              {/* Middle: Grid of Rounded Cards */}
              <div className="flex-1 overflow-y-auto p-5 relative z-10">
                <div className="grid grid-cols-3 gap-3">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    const IconComponent = linkIcons[link.href] || Info;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={handleLinkClick}
                        className={`flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all duration-200 active:scale-95 text-center ${
                          isActive
                            ? "bg-primary/10 dark:bg-accent/15 border-primary/30 dark:border-accent/40 text-primary dark:text-accent"
                            : "bg-surface-alt/70 dark:bg-surface-alt/45 border-border/50 hover:bg-surface-alt dark:hover:bg-surface-alt/70 text-textColor-secondary"
                        }`}
                      >
                        <div className={`p-2 rounded-lg mb-2 transition-colors ${
                          isActive 
                            ? "bg-primary/20 dark:bg-accent/20 text-primary dark:text-accent" 
                            : "bg-white dark:bg-surface border border-border/40 text-textColor-muted"
                        }`}>
                          <IconComponent className="w-4.5 h-4.5" />
                        </div>
                        <span className={`text-[10.5px] tracking-wide leading-tight ${
                          isActive ? "font-bold" : "font-semibold"
                        }`}>
                          {link.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom: Donate Now & Admissions Open Buttons */}
              <div className="p-5 border-t border-border/50 bg-surface-alt/30 flex flex-col gap-2.5 relative z-10">
                <Link
                  href="/charity"
                  onClick={handleLinkClick}
                  className="w-full bg-accent hover:bg-accent-light text-primary-dark font-bold py-2.5 px-4 rounded-lg transition-all duration-200 text-center text-body-sm shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-current animate-pulse" />
                  Donate Now
                </Link>
                <Link
                  href="/admissions"
                  onClick={handleLinkClick}
                  className="w-full bg-primary hover:bg-primary-light text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-200 text-center text-body-sm shadow-sm active:scale-[0.98] border border-transparent dark:border-white/10 flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  Admissions Open
                </Link>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
