"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { NAV_LINKS, CONTACT_INFO } from "@/lib/constants";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="bg-primary-dark text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/badr-logo.webp"
                alt="Badrulhuda Academy Logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
              <div className="flex flex-col">
                <span 
                  className="font-tajawal text-[17px] font-bold leading-none text-white block mt-0.5"
                  style={{ wordSpacing: "-0.05em" }}
                >
                  بدر الهدى
                </span>
                <span className="text-[8px] font-bold tracking-widest text-white/60 uppercase mt-0.5">
                  Badrulhuda Academy
                </span>
              </div>
            </div>
            <p className="text-body-sm text-white/70 leading-relaxed font-inter max-w-[280px]">
              Dedicated to reviving authentic Islamic scholarship and character, nurturing guidance and knowledge for the community of Wayanad, Kerala, and beyond.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-amiri text-body-lg font-bold text-accent tracking-wide">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-body-sm font-inter text-white/70">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Summary */}
          <div className="space-y-4 font-inter text-body-sm text-white/70">
            <h4 className="font-amiri text-body-lg font-bold text-accent tracking-wide">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" />
                <a 
                  href={CONTACT_INFO.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent hover:underline transition-colors duration-200"
                >
                  {CONTACT_INFO.address}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a 
                    href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
                    className="hover:text-accent hover:underline transition-colors duration-200"
                  >
                    Ph: {CONTACT_INFO.phone}
                  </a>
                  <a 
                    href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent hover:underline transition-colors duration-200"
                  >
                    Mob: {CONTACT_INFO.mobile} (WhatsApp)
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-accent shrink-0" />
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-accent hover:underline transition-colors duration-200 break-all"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Social */}
          <div className="space-y-4 font-inter">
            <h4 className="font-amiri text-body-lg font-bold text-accent tracking-wide">
              Support Our Mission
            </h4>
            <p className="text-body-sm text-white/70 leading-relaxed">
              Join us in illuminating minds. Your Sadaqah supports scholarships, Quran studies, and campus expansion.
            </p>
            <div className="pt-2">
              <Link
                href="/charity"
                className="inline-block bg-accent hover:bg-accent-light text-primary-dark font-bold text-caption py-2.5 px-5 rounded-lg transition-colors duration-200 uppercase tracking-wider"
              >
                Donate Sadaqah
              </Link>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-4 text-white/60">
              <a href="#" className="hover:text-accent transition-colors duration-200" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors duration-200" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors duration-200" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors duration-200" aria-label="Youtube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-white/50 gap-4 font-inter text-center md:text-left">
          <span>
            © {new Date().getFullYear()} Badrulhuda Academy Panamaram. All Rights Reserved.
          </span>
          <span className="text-accent/75 font-semibold">
            ⚠️ Website design pending brand guidelines & management approval
          </span>
        </div>
      </div>
    </footer>
  );
}
