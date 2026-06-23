"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function CampusHighlights() {
  return (
    <section id="highlights" className="relative py-24 px-6 overflow-hidden bg-surface">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <SectionHeader
          title="Campus Highlights"
          arabicTitle="جولة في الحرم الأكاديمي"
          subtitle="Explore the serene environment and standard infrastructure where students build knowledge, character, and leadership."
        />

        {/* Asymmetric layout: 7-col for Conference Hall, 5-col for Mosque & Hostel stack */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mt-12"
        >
          {/* Conference Hall (7 columns on desktop) */}
          <m.div
            variants={fadeInUp}
            className="lg:col-span-7 relative flex flex-col justify-between overflow-hidden bg-surface-alt border border-border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group min-h-[400px] md:min-h-[480px]"
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden bg-surface-alt/30">
              <Image
                src="/images/facilities/bdrhall.png"
                alt="Conference Hall"
                fill
                sizes="(max-w-768px) 100vw, (max-w-1200px) 60vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                priority
              />
              {/* Premium dark gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 p-6 md:p-8 mt-auto flex flex-col justify-end text-white">
              <span className="font-tajawal text-[10px] md:text-xs font-bold uppercase tracking-widest text-accent-light mb-2 block">
                Academic Infrastructure
              </span>
              <h3 className="font-amiri text-2xl md:text-3xl font-bold mb-2 text-white">
                Conference Hall
              </h3>
              <p className="text-body-sm text-white/80 max-w-lg leading-relaxed font-inter">
                A premier facility hosting scholarly seminars, guest lectures, student leadership summits, and workshops.
              </p>
              {/* Subtle gold line */}
              <div className="mt-5 h-[2px] w-12 bg-accent rounded-full group-hover:w-32 transition-all duration-500" />
            </div>
          </m.div>

          {/* Stacked Side (5 columns on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8 justify-between">
            {/* Central Mosque */}
            <m.div
              variants={fadeInUp}
              className="relative flex flex-col justify-between overflow-hidden bg-surface-alt border border-border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group h-[220px] md:h-[224px]"
            >
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-surface-alt/30">
                <Image
                  src="/images/facilities/bdrmosque.png"
                  alt="Central Mosque"
                  fill
                  sizes="(max-w-768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="relative z-10 p-6 mt-auto flex flex-col justify-end text-white">
                <span className="font-tajawal text-[9px] font-bold uppercase tracking-widest text-accent-light mb-1.5 block">
                  Spiritual Heart
                </span>
                <h3 className="font-amiri text-xl font-bold mb-1 text-white">
                  Central Mosque
                </h3>
                <p className="text-[12px] text-white/80 line-clamp-2 leading-relaxed font-inter max-w-md">
                  The spiritual heart of Badrulhuda campus hosting daily congregational prayers, spiritual retreats, and halaqas.
                </p>
                <div className="mt-4 h-[2px] w-10 bg-accent rounded-full group-hover:w-20 transition-all duration-500" />
              </div>
            </m.div>

            {/* Residential Hostel */}
            <m.div
              variants={fadeInUp}
              className="relative flex flex-col justify-between overflow-hidden bg-surface-alt border border-border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group h-[220px] md:h-[224px]"
            >
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-surface-alt/30">
                <Image
                  src="/images/facilities/bdrhstl.png"
                  alt="Residential Hostel"
                  fill
                  sizes="(max-w-768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="relative z-10 p-6 mt-auto flex flex-col justify-end text-white">
                <span className="font-tajawal text-[9px] font-bold uppercase tracking-widest text-accent-light mb-1.5 block">
                  Student Living
                </span>
                <h3 className="font-amiri text-xl font-bold mb-1 text-white">
                  Residential Hostel
                </h3>
                <p className="text-[12px] text-white/80 line-clamp-2 leading-relaxed font-inter max-w-md">
                  A nurturing and disciplined boarding environment designed to foster brotherhood, study routines, and spiritual character.
                </p>
                <div className="mt-4 h-[2px] w-10 bg-accent rounded-full group-hover:w-20 transition-all duration-500" />
              </div>
            </m.div>
          </div>
        </m.div>

        {/* View all facilities & gallery CTA */}
        <div className="text-center mt-14 flex flex-col sm:flex-row gap-4 items-center justify-center z-10 relative">
          <Link
            href="/facilities"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-light text-white font-bold text-body-sm transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            <span>Explore All Facilities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-surface-alt hover:bg-surface text-textColor-primary font-bold text-body-sm transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <span>View Campus Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
