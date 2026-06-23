"use client";

import React from "react";
import * as Icons from "lucide-react";
import { m } from "framer-motion";
import { ADMISSIONS_STEPS } from "@/lib/constants";
import SectionHeader from "../ui/SectionHeader";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function AdmissionsSection() {
  const eligibilityCriteria = [
    "Admission is offered to students entering Grade 6 or Grade 7 after completing Grade 5 for the Hifz program, and to students seeking admission to Grade 11 with an interest in Commerce studies.",
    "Basic proficiency or interest in learning Quran recitation and Arabic.",
    "Willingness to adhere to Badrulhuda Academy conduct and ethical guidelines.",
    "Parental commitment to support the student's learning and spiritual journey.",
    "Submission of academic records and transfer certificate from the previous school.",
    "Clearance of the diagnostic entry assessment and family interview.",
  ];

  return (
    <section id="admissions" className="relative py-24 px-6 overflow-hidden bg-surface-alt">
      {/* Visual gradients */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <SectionHeader
          title="Admissions Process"
          arabicTitle="القبول والتسجيل"
          subtitle="Enrolling at Badrulhuda is a simple, structured journey. Follow these three steps to secure your student's place."
        />

        {/* Timeline container */}
        <div className="relative w-full max-w-5xl mx-auto mb-20">
          {/* Horizontal connecting line (Desktop only) */}
          <div className="absolute top-10 left-[12%] right-[12%] h-[2px] bg-border dark:bg-border/60 z-0 hidden md:block" />

          {/* Vertical connecting line (Mobile only) */}
          <div className="absolute top-10 bottom-10 left-10 w-[2px] bg-border dark:bg-border/60 z-0 md:hidden" />

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative z-10"
          >
            {ADMISSIONS_STEPS.map((step, index) => {
              const LucideIcon = (Icons as any)[step.icon] || Icons.HelpCircle;

              return (
                <m.div 
                  key={index} 
                  variants={fadeInUp}
                  className="flex md:flex-col items-start md:items-center text-left md:text-center gap-6 md:gap-4 group"
                >
                  {/* Timeline Circle with Icon */}
                  <div className="w-20 h-20 rounded-full border-2 border-accent bg-surface flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 group-hover:border-primary dark:group-hover:border-accent-light transition-all duration-300">
                    <LucideIcon className="w-8 h-8 text-primary dark:text-accent" />
                  </div>

                  {/* Step Description */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                      Step {index + 1}: {step.step}
                    </span>
                    <h3 className="font-amiri text-body-lg font-bold text-textColor-primary">
                      {step.title}
                    </h3>
                    <p className="text-body-sm text-textColor-secondary dark:text-textColor-muted font-inter leading-relaxed max-w-xs md:mx-auto">
                      {step.description}
                    </p>
                  </div>
                </m.div>
              );
            })}
          </m.div>
        </div>

        {/* Eligibility Criteria Panel */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-surface border border-border rounded-3xl p-8 shadow-sm"
        >
          <h4 className="font-amiri text-display-md text-primary dark:text-accent font-bold mb-6 text-center">
            Eligibility & Guidelines
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-body-sm font-inter text-textColor-secondary dark:text-textColor-muted">
            {eligibilityCriteria.map((criteria, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <Icons.Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed text-left">{criteria}</span>
              </div>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-10 text-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd38C7oqp1B4TFMp5DyyqWIiNF2AAs1gFlj3FDUAwqWYvbNWw/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-bold text-body-sm py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-primary/20 active:scale-95 duration-200"
            >
              <span>Begin Your Application</span>
              <Icons.ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-caption text-textColor-muted mt-3 font-medium">
              Have questions? Email badrulhudawyd@gmail.com or visit Panamaram campus.
            </p>
          </div>
        </m.div>
      </div>
    </section>
  );
}
