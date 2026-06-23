"use client";

import React from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { FACILITIES } from "@/lib/constants";
import SectionHeader from "../ui/SectionHeader";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function FacilitiesSection() {
  return (
    <section id="facilities" className="relative py-24 px-6 overflow-hidden bg-surface">
      {/* Visual background details */}
      <div className="absolute top-0 left-1/4 w-60 h-60 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <SectionHeader
          title="Campus Facilities"
          arabicTitle="مرافق الأكاديمية"
          subtitle="Explore the state-of-the-art facilities designed to foster academic diligence, spiritual serenity, and student growth."
        />

        {/* Scrollable Container on Mobile, Grid on Tablet/Desktop */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex overflow-x-auto pb-4 gap-6 snap-x-mandatory scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0"
        >
          {FACILITIES.map((facility, index) => (
            <m.div
              key={index}
              variants={fadeInUp}
              className="min-w-[285px] sm:min-w-[320px] md:min-w-0 flex-shrink-0 snap-start relative overflow-hidden bg-surface-alt border border-border rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Large Facility Image (16:10 aspect ratio) */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-alt/50 border-b border-border/50">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card Details Block */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-amiri text-xl font-bold text-textColor-primary mb-2 transition-colors duration-300 group-hover:text-primary dark:group-hover:text-accent-light">
                    {facility.title}
                  </h3>
                  <p className="text-body-sm text-textColor-secondary dark:text-textColor-muted leading-relaxed font-inter line-clamp-2">
                    {facility.description}
                  </p>
                </div>

                {/* Subtle Gold Accent Line */}
                <div className="mt-5 h-[2px] w-10 bg-accent rounded-full group-hover:w-full transition-all duration-500" />
              </div>
            </m.div>
          ))}
        </m.div>

        {/* Mobile Swipe Cue */}
        <p className="text-center text-[11px] text-textColor-muted mt-4 md:hidden font-inter animate-pulse">
          ← Swipe left/right to view all facilities →
        </p>
      </div>
    </section>
  );
}
