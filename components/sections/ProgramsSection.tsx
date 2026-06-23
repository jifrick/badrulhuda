"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import { useSiteData } from "@/lib/context/SiteDataContext";
import ProgramCard from "../ui/ProgramCard";
import IslamicPattern from "../ui/IslamicPattern";

interface ProgramsSectionProps {
  isHome?: boolean;
}

export default function ProgramsSection({ isHome = false }: ProgramsSectionProps) {
  const { programs } = useSiteData();
  const primaryPrograms = programs.filter((p) => p.type === "primary");
  const additionalPrograms = programs.filter((p) => p.type === "additional");

  // Scroll reveal variants
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const subHeaderVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="programs"
      className="relative py-12 md:py-16 px-6 overflow-hidden bg-surface-alt transition-colors duration-300"
    >
      {/* Subtle background radial gold glow */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Soft gold Islamic tessellation background pattern */}
      <IslamicPattern opacity={0.03} className="z-0 animate-pattern-float text-accent/20" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Custom Premium Islamic Header */}
        <div className="relative text-center max-w-3xl mx-auto mb-10">
          {/* Mosque Arch / Mihrab silhouette behind header */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[320px] h-[220px] pointer-events-none opacity-[0.03] dark:opacity-[0.015] z-0">
            <svg className="w-full h-full text-accent" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="0.6">
              <path d="M50,4 C33,4 23,15 23,37 L23,75 L77,75 L77,37 C77,15 67,4 50,4 Z" />
              <path d="M50,8 C37,8 28,18 28,38 L28,75 L72,75 L72,38 C72,18 63,8 50,8 Z" />
              <path d="M50,12 C41,12 33,21 33,39 L33,75 L67,75 L67,39 C67,21 59,12 50,12 Z" />
              <path d="M50,12 L50,4 M23,37 L28,38 M77,37 L72,38 M23,75 L77,75" />
            </svg>
          </div>

          <m.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative z-10 space-y-2.5"
          >
            <span className="font-tajawal text-xs font-bold uppercase tracking-widest text-accent dark:text-accent-light block">
              {isHome ? "مناهج التعليم" : "البرامج الأكاديمية"}
            </span>
            <h2 className="font-amiri text-4xl md:text-5xl font-bold text-textColor-primary leading-tight">
              {isHome ? "Academic Pathways" : "Academic Departments"}
            </h2>
            
            {/* Elegant Islamic Star Divider (Rub el Hizb) */}
            <div className="flex items-center justify-center gap-3 my-3">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-accent/50" />
              <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1.5l3.1 3.1 4.4 0 0 4.4 3.1 3.1-3.1 3.1 0 4.4-4.4 0-3.1 3.1-3.1-3.1-4.4 0 0-4.4-3.1-3.1 3.1-3.1 0-4.4 4.4 0zM12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
              </svg>
              <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-accent/50" />
            </div>

            <p className="font-inter text-textColor-secondary dark:text-textColor-muted text-sm md:text-base max-w-xl mx-auto italic font-medium tracking-wide leading-relaxed">
              “Structured pathways of knowledge, character, and service designed to nurture future scholars and community leaders.”
            </p>
          </m.div>
        </div>

        {/* SECTION 1: Primary Programs */}
        <div className="space-y-6">
          <m.div
            variants={subHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center gap-4 border-b border-accent/15 pb-3 justify-start"
          >
            <div className="flex flex-col text-start">
              <span className="font-tajawal text-[10px] font-bold uppercase tracking-widest text-accent">المناهج الرئيسية</span>
              <h3 className="font-amiri text-2xl md:text-3xl font-bold text-primary dark:text-primary-light">
                Primary Academic Pathways
              </h3>
            </div>
          </m.div>

          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-6"
          >
            {primaryPrograms.map((program) => (
              <m.div key={program.id} variants={cardVariants} className="h-full">
                <ProgramCard program={program} />
              </m.div>
            ))}
          </m.div>

          {isHome && (
            <div className="text-center pt-10">
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-light dark:text-accent dark:hover:text-accent-light font-bold text-body-sm hover:underline transition-all duration-200"
              >
                <span>View All Departments & Programs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* SECTION 2: Additional Programs */}
        {!isHome && (
          <div className="mt-12 space-y-6">
            <m.div
              variants={subHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center gap-4 border-b border-accent/15 pb-3 justify-start"
            >
              <div className="flex flex-col text-start">
                <span className="font-tajawal text-[10px] font-bold uppercase tracking-widest text-accent">الأقسام الإضافية</span>
                <h3 className="font-amiri text-2xl md:text-3xl font-bold text-primary dark:text-primary-light">
                  Additional Departments & Community Services
                </h3>
              </div>
            </m.div>

            <m.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
            >
              {additionalPrograms.map((program) => (
                <m.div key={program.id} variants={cardVariants} className="h-full">
                  <ProgramCard program={program} />
                </m.div>
              ))}
            </m.div>
          </div>
        )}

      </div>
    </section>
  );
}
