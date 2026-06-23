"use client";

import React from "react";
import { History, Target, Eye, ShieldCheck, Sparkles, BookOpen, Users } from "lucide-react";
import { m } from "framer-motion";
import IslamicPattern from "../ui/IslamicPattern";

export default function AboutSection() {
  const values = [
    { name: "Ilm", desc: "Knowledge", icon: BookOpen },
    { name: "Taqwa", desc: "Piety", icon: ShieldCheck },
    { name: "Khidma", desc: "Service", icon: Users },
    { name: "Ihsan", desc: "Excellence", icon: Sparkles },
  ];

  // Stagger Scroll reveals
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const storyVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      id="about"
      className="relative py-12 md:py-16 px-6 overflow-hidden bg-surface transition-colors duration-300"
    >
      {/* Subtle background gold radial glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Soft gold Islamic tessellation background pattern */}
      <IslamicPattern opacity={0.03} className="z-0 animate-pattern-float text-accent/20" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Custom Premium Islamic Header */}
        <div className="relative text-center max-w-2xl mx-auto mb-10">
          {/* Mosque Arch / Mihrab silhouette behind header */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[320px] h-[220px] pointer-events-none opacity-[0.03] dark:opacity-[0.015] z-0">
            <svg className="w-full h-full text-accent" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="0.6">
              <path d="M50,4 C33,4 23,15 23,37 L23,75 L77,75 L77,37 C77,15 67,4 50,4 Z" />
              <path d="M50,8 C37,8 28,18 28,38 L28,75 L72,75 L72,38 C72,18 63,8 50,8 Z" />
              <path d="M50,12 C41,12 33,21 33,39 L33,75 L67,75 L67,39 C67,21 59,12 50,12 Z" />
              <path d="M50,12 L50,4 M23,37 L28,38 M77,37 L72,38 M23,75 L77,75" />
            </svg>
          </div>

          {/* Heading with scroll reveal */}
          <m.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative z-10 space-y-1.5"
          >
            <span className="font-tajawal text-xs font-bold uppercase tracking-widest text-accent dark:text-accent-light block">
              من نحن
            </span>
            <h2 className="font-amiri text-4xl md:text-5xl font-bold text-textColor-primary leading-tight">
              About Badrulhuda Academy
            </h2>
            
            {/* Elegant Islamic Star Divider (Rub el Hizb) */}
            <div className="flex items-center justify-center gap-3 my-3">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-accent/50" />
              <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1.5l3.1 3.1 4.4 0 0 4.4 3.1 3.1-3.1 3.1 0 4.4-4.4 0-3.1 3.1-3.1-3.1-4.4 0 0-4.4-3.1-3.1 3.1-3.1 0-4.4 4.4 0zM12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
              </svg>
              <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-accent/50" />
            </div>

            <p className="font-inter text-textColor-secondary dark:text-textColor-muted text-sm md:text-base max-w-xl mx-auto italic font-medium tracking-wide">
              “Serving Knowledge, Character & Community Since 2004”
            </p>
          </m.div>
        </div>

        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mt-4"
        >
          {/* LEFT Narrative Column */}
          <m.div variants={storyVariants} className="lg:col-span-5 space-y-4 text-start flex flex-col justify-between h-full">
            <div>
              <h3 className="font-amiri text-3xl font-bold text-primary dark:text-primary-light leading-snug mb-3">
                Nurturing Academic & Spiritual Excellence
              </h3>
              
              <div className="font-inter text-[14.5px] text-textColor-secondary dark:text-textColor-muted leading-relaxed space-y-3">
                <p>
                  Established in 2004 in Panamaram, Wayanad, Badrulhuda Academy was founded upon a profound dedication to classical Islamic scholarship and modern academic pathways.
                </p>
                <p>
                  Our sanctuary of learning provides a holistic space where classical Islamic sciences integrate harmoniously with value-based contemporary studies, preparing students to lead and serve.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {/* Institutional Motto callout */}
              <div className="border-s-4 border-accent ps-4 py-2 bg-accent/5 dark:bg-accent/10 rounded-e-xl">
                <p className="font-amiri text-lg italic text-textColor-primary leading-relaxed">
                  “Where character precedes scholarship and knowledge becomes service.”
                </p>
                <span className="text-[9px] font-bold uppercase tracking-widest text-textColor-muted font-inter block mt-1">
                  Institutional Motto
                </span>
              </div>

              {/* Highlight Achievement Badge */}
              <div className="flex items-center gap-4 p-3.5 rounded-xl border border-accent/20 bg-white/50 dark:bg-surface-alt/50 shadow-sm max-w-sm transition-colors duration-300">
                <span className="font-amiri text-4xl font-bold text-accent leading-none">20+</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-textColor-primary font-inter leading-none">
                    Years of legacy
                  </span>
                  <span className="text-[11px] text-textColor-secondary dark:text-textColor-muted font-inter mt-1 leading-tight">
                    Nurturing faith, knowledge, and service in Wayanad since 2004.
                  </span>
                </div>
              </div>
            </div>
          </m.div>

          {/* RIGHT Cards Grid Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 w-full items-stretch">
            
            {/* Our Legacy (History) */}
            <m.div
              variants={cardVariants}
              className="relative overflow-hidden border border-accent/15 dark:border-accent/10 rounded-2xl p-5 bg-white dark:bg-surface-alt shadow-sm hover:shadow-xl hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-start h-full"
            >
              {/* Premium top accent gold bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              <IslamicPattern opacity={0.02} className="z-0 pointer-events-none" />
              
              <div className="relative z-10 flex items-center gap-3.5 mb-3">
                <div className="p-2 bg-accent/10 border border-accent/20 text-accent rounded-xl shrink-0 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <History className="w-5 h-5" />
                </div>
                <h4 className="font-amiri text-xl font-bold text-textColor-primary">
                  Our Legacy
                </h4>
              </div>
              <p className="relative z-10 text-[13px] text-textColor-secondary dark:text-textColor-muted font-inter leading-relaxed text-start">
                Established in 2004 in Wayanad, Badrulhuda Academy began with a vision to build a sanctuary for authentic learning. We have developed into a premier academy combining classical Islamic studies with contemporary academic pathways.
              </p>
            </m.div>

            {/* Our Mission */}
            <m.div
              variants={cardVariants}
              className="relative overflow-hidden border border-accent/15 dark:border-accent/10 rounded-2xl p-5 bg-white dark:bg-surface-alt shadow-sm hover:shadow-xl hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-start h-full"
            >
              {/* Premium top accent gold bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              <IslamicPattern opacity={0.02} className="z-0 pointer-events-none" />
              
              <div className="relative z-10 flex items-center gap-3.5 mb-3">
                <div className="p-2 bg-accent/10 border border-accent/20 text-accent rounded-xl shrink-0 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-amiri text-xl font-bold text-textColor-primary">
                  Our Mission
                </h4>
              </div>
              <p className="relative z-10 text-[13px] text-textColor-secondary dark:text-textColor-muted font-inter leading-relaxed text-start">
                To empower deserving minds with holistic knowledge and character, integrating sacred Islamic sciences with contemporary curricula to prepare students to lead and serve the community.
              </p>
            </m.div>

            {/* Our Vision */}
            <m.div
              variants={cardVariants}
              className="relative overflow-hidden border border-accent/15 dark:border-accent/10 rounded-2xl p-5 bg-white dark:bg-surface-alt shadow-sm hover:shadow-xl hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-start h-full"
            >
              {/* Premium top accent gold bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              <IslamicPattern opacity={0.02} className="z-0 pointer-events-none" />
              
              <div className="relative z-10 flex items-center gap-3.5 mb-3">
                <div className="p-2 bg-accent/10 border border-accent/20 text-accent rounded-xl shrink-0 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Eye className="w-5 h-5" />
                </div>
                <h4 className="font-amiri text-xl font-bold text-textColor-primary">
                  Our Vision
                </h4>
              </div>
              <p className="relative z-10 text-[13px] text-textColor-secondary dark:text-textColor-muted font-inter leading-relaxed text-start">
                To stand as a model Islamic educational institution, where academic scholarship is guided by Taqwa (piety) and Ihsan (excellence), fostering intellectual and moral leadership in India.
              </p>
            </m.div>

            {/* Core Values Card */}
            <m.div
              variants={cardVariants}
              className="relative overflow-hidden border border-accent/15 dark:border-accent/10 rounded-2xl p-5 bg-white dark:bg-surface-alt shadow-sm hover:shadow-xl hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full"
            >
              {/* Premium top accent gold bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              <IslamicPattern opacity={0.02} className="z-0 pointer-events-none" />
              
              <div>
                <div className="relative z-10 flex items-center gap-3.5 mb-3">
                  <div className="p-2 bg-accent/10 border border-accent/20 text-accent rounded-xl shrink-0 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-amiri text-xl font-bold text-textColor-primary">
                    Core Values
                  </h4>
                </div>
                <p className="relative z-10 text-[13px] text-textColor-secondary dark:text-textColor-muted font-inter leading-relaxed text-start">
                  Built on four structural values that guide every seeker on their path to educational and spiritual growth:
                </p>
              </div>
              
              {/* Custom Gold Accent Pills */}
              <div className="grid grid-cols-2 gap-2 mt-3 relative z-10">
                {values.map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <div 
                      key={i} 
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/15 bg-accent/5 dark:bg-accent/10 hover:bg-accent/10 transition-colors duration-300"
                      title={v.desc}
                    >
                      <Icon className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span className="text-[10px] font-bold font-inter text-textColor-primary tracking-wide">
                        {v.name} <span className="text-[8px] text-textColor-muted font-normal font-sans">({v.desc})</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </m.div>

          </div>
        </m.div>
      </div>
    </section>
  );
}
