"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-surface/90 backdrop-blur-md border-b border-border shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 text-textColor-primary hover:opacity-90 transition-opacity group"
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
                className="font-noto-kufi text-[18px] font-bold leading-none text-textColor-primary block mt-0.5"
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
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`relative text-body-sm font-semibold tracking-wide py-1.5 transition-colors ${
                    isActive
                      ? "text-primary dark:text-accent font-bold"
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
          <m.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-surface/98 backdrop-blur-lg lg:hidden pt-24 pb-8 px-6 flex flex-col justify-between"
          >
            <nav className="flex flex-col gap-5 items-center text-center mt-6">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`text-display-md font-amiri font-bold ${
                      isActive ? "text-primary dark:text-accent" : "text-textColor-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex flex-col items-center text-center gap-3 mt-auto">
              <span 
                className="font-noto-kufi text-accent text-3xl font-bold block"
                style={{ wordSpacing: "-0.05em" }}
              >
                بدر الهدى
              </span>
              <p className="text-caption text-textColor-muted max-w-[250px] leading-relaxed">
                Panamaram, Wayanad, Kerala, India — PIN 670721
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
