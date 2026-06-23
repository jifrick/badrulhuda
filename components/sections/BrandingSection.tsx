"use client";

import React from "react";
import { Palette, Type, Shield, BookOpen, Clock } from "lucide-react";
import { m } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function BrandingSection() {
  const brandCards = [
    {
      title: "Color Palette",
      desc: "Primary brand colors, secondary highlights, and accent tones are subject to refinement based on committee feedback.",
      icon: Palette,
    },
    {
      title: "Typography System",
      desc: "Amiri serif and Inter sans-serif type systems will be certified against local printing and reading criteria.",
      icon: Type,
    },
    {
      title: "Visual Identity",
      desc: "The symbolic dome/crescent crest and customized Islamic star tessellation graphics are pending administrative approval.",
      icon: Shield,
    },
    {
      title: "Brand Guidelines",
      desc: "A comprehensive brand book, website styling rules, and editorial principles will be released post-approval.",
      icon: BookOpen,
    },
  ];

  return (
    <section id="branding" className="relative py-24 px-6 overflow-hidden bg-surface-alt">
      <div className="max-w-7xl mx-auto z-10 relative">
        <SectionHeader
          title="Brand & Design System"
          arabicTitle="الهوية البصرية"
          subtitle="Pending management approval — The following design system components are currently drafted and will be finalized soon."
        />

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6"
        >
          {brandCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <m.div
                key={idx}
                variants={fadeInUp}
                className="relative overflow-hidden border-2 border-dashed border-accent/40 rounded-2xl p-6 bg-surface hover:border-accent hover:bg-surface-alt transition-all duration-300 flex flex-col justify-between min-h-[220px]"
              >
                {/* Pending Approval Badge */}
                <div className="absolute top-4 right-4 bg-accent/15 border border-accent/30 text-accent font-bold text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 font-inter">
                  <Clock className="w-2.5 h-2.5" />
                  <span>Pending Approval</span>
                </div>

                <div>
                  <div className="p-3 bg-primary-light/5 text-accent rounded-xl w-fit mb-5">
                    <Icon className="w-5.5 h-5.5" />
                  </div>

                  <h3 className="font-amiri text-body-lg font-bold text-textColor-primary mb-2">
                    {card.title}
                  </h3>
                  <p className="text-body-sm text-textColor-secondary dark:text-textColor-muted leading-relaxed font-inter">
                    {card.desc}
                  </p>
                </div>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
