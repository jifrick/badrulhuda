"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import IslamicPattern from "../ui/IslamicPattern";

export default function AdmissionsCTA() {
  return (
    <section className="relative py-20 px-6 overflow-hidden bg-surface text-center border-t border-border/40 dark:border-border/10">
      {/* Subtle background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
      {/* 4% opacity soft gold Islamic pattern */}
      <IslamicPattern opacity={0.04} className="z-0 animate-pattern-float text-accent/20" />

      <div className="max-w-4xl mx-auto z-10 relative space-y-6">
        <span className="font-tajawal text-xs font-bold uppercase tracking-widest text-accent dark:text-accent-light block">
          Join Badrulhuda Academy
        </span>
        
        <h2 className="font-amiri text-4xl md:text-5xl font-bold text-textColor-primary leading-tight">
          Admissions are Open
        </h2>
        
        {/* Elegant Islamic Star Divider (Rub el Hizb) */}
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-accent/50" />
          <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1.5l3.1 3.1 4.4 0 0 4.4 3.1 3.1-3.1 3.1 0 4.4-4.4 0-3.1 3.1-3.1-3.1-4.4 0 0-4.4-3.1-3.1 3.1-3.1 0-4.4 4.4 0zM12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
          </svg>
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-accent/50" />
        </div>

        <p className="font-inter text-textColor-secondary dark:text-textColor-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Embark on a transformative educational and spiritual journey. Learn from esteemed scholars, master the Arabic language, and integrate Quranic memorization with modern secondary and higher education.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd38C7oqp1B4TFMp5DyyqWIiNF2AAs1gFlj3FDUAwqWYvbNWw/viewform?usp=publish-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-bold text-body-sm py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-primary/20 active:scale-95 duration-200"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border bg-surface hover:bg-surface-alt text-textColor-primary font-semibold text-body-sm py-4 px-8 rounded-xl transition-all active:scale-95 duration-200"
          >
            <PhoneCall className="w-4 h-4 text-accent" />
            <span>Contact Admissions</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
