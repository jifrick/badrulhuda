"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m, useScroll, useTransform } from "framer-motion";
import { useSiteData } from "@/lib/context/SiteDataContext";

export default function HeroSection() {
  const { homepageHero } = useSiteData();
  const { scrollY } = useScroll();

  // Slow parallax maps
  const yBg = useTransform(scrollY, [0, 800], [0, 160]);
  const yText = useTransform(scrollY, [0, 800], [0, 80]);
  const yArch = useTransform(scrollY, [0, 800], [0, 60]);
  const opacityText = useTransform(scrollY, [0, 600], [1, 0]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
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
  };

  // Staggered child variants
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    }),
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + i * 0.12,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const titleWords = homepageHero.title.split(/\s+/).filter(Boolean);
  const highlightStartIndex = Math.ceil(titleWords.length / 2);

  return (
    <section
      id="home"
      className="relative min-h-svh w-full flex items-center justify-center overflow-hidden bg-surface-alt pt-20 px-6"
    >
      {/* Compressed video background with muted loop autoplay and slow parallax */}
      <m.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-25 dark:opacity-15 transition-opacity duration-1000"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Subtle overlay to ensure high readability of text content */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface-alt/70 via-surface-alt/60 to-surface-alt/90 dark:from-surface/75 dark:via-surface/70 dark:to-surface" />
      </m.div>
 
      {/* Centered Hero content */}
      <div className="max-w-4xl mx-auto w-full z-10 py-12 flex flex-col items-center justify-center text-center">
        <m.div
          style={{ y: yText, opacity: opacityText }}
          className="space-y-6 flex flex-col items-center"
        >
          
          {/* Eyebrow calligraphy tag */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent font-medium"
          >
            <span className="font-tajawal text-[15px] font-bold leading-none mt-0.5" style={{ wordSpacing: "-0.05em" }}>بدر الهدى</span>
            <span className="text-[3px] fill-current text-accent">•</span>
            <span className="text-[10px] font-bold tracking-widest uppercase font-inter leading-none">
              Badrulhuda
            </span>
          </m.div>
 
          {/* Staggered Heading */}
          <h1 className="text-textColor-primary leading-none tracking-tight">
            <span className="sr-only">{homepageHero.title}</span>
            <span className="flex flex-wrap justify-center gap-x-4 gap-y-1 font-amiri text-5xl md:text-7xl font-bold">
              {titleWords.map((word, index) => (
                <m.span
                  key={index}
                  custom={index}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className={index >= highlightStartIndex ? "text-primary dark:text-primary-light" : ""}
                >
                  {word}
                </m.span>
              ))}
            </span>
          </h1>
 
          {/* Subheadline description */}
          <m.p
            custom={0.8}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-body-lg text-textColor-secondary dark:text-textColor-muted font-inter leading-relaxed max-w-2xl text-center"
          >
            {homepageHero.subtitle}
          </m.p>

          {/* Action CTAs */}
          <m.div
            custom={1.0}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo("programs")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-bold text-body-sm py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-primary/20 active:scale-95 duration-200"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border bg-surface hover:bg-surface-alt text-textColor-primary font-semibold text-body-sm py-4 px-8 rounded-xl transition-all active:scale-95 duration-200"
            >
              <span>Get in Touch</span>
            </Link>
          </m.div>
        </m.div>
      </div>

      {/* Scroll indicator footer chevron */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-textColor-muted animate-bounce hidden md:block">
        <svg
          className="w-6 h-6 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          onClick={() => handleScrollTo("founder")}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
