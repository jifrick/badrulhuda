"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "framer-motion";
import { HeartHandshake, Quote } from "lucide-react";
import { useSiteData } from "@/lib/context/SiteDataContext";
import IslamicPattern from "../ui/IslamicPattern";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// Inline lightweight animated counter component
function AnimatedCounter({ target, suffix = "", duration = 1500 }: { target: number | string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const numericTarget = typeof target === "number" ? target : parseInt(target.replace(/\D/g, ""), 10) || 0;
  const isNumeric = !isNaN(numericTarget) && numericTarget > 0;
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted || !isNumeric) return;

    let start = 0;
    const end = numericTarget;
    const totalSteps = 50;
    const stepTime = duration / totalSteps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      const easedProgress = progress * (2 - progress); // Ease out quad
      const val = Math.floor(easedProgress * end);
      
      if (currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(val);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, numericTarget, isNumeric, duration]);

  if (!isNumeric) {
    return <span ref={elementRef} className="font-semibold">{target}</span>;
  }

  const formattedCount = numericTarget === 2000 ? count.toLocaleString("en-IN") : count;

  return (
    <span ref={elementRef} className="font-semibold">
      {formattedCount}
      {suffix}
    </span>
  );
}

export default function OrphanCareSection() {
  const { orphanBeneficiaries } = useSiteData();
  const activeCount = orphanBeneficiaries.filter(b => b.supportStatus === "Active").length;
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax / Zoom effect on scroll for the main image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.15]);
  const imageTranslateY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section 
      ref={containerRef}
      id="orphan-care" 
      className="relative py-24 md:py-32 px-6 md:px-8 overflow-hidden bg-[#FAF8F5] text-textColor-primary border-t border-b border-accent/10 dark:border-accent/5 dark:bg-[#0c0f14]"
    >
      {/* Background pattern */}
      <IslamicPattern opacity={0.02} className="text-accent/30 absolute inset-0 pointer-events-none" />
      
      {/* Soft gradient blobs for premium visual polish */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-accent/5 blur-[100px] rounded-full pointer-events-none z-0 dark:bg-accent/2" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-emerald-800/5 blur-[100px] rounded-full pointer-events-none z-0 dark:bg-emerald-800/2" />

      {/* Decorative top section divider decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2 bg-[#FAF8F5] dark:bg-[#0c0f14] px-4 pointer-events-none">
        <span className="w-1.5 h-1.5 rotate-45 bg-accent/30" />
        <span className="w-3.5 h-3.5 rotate-45 border border-accent/30 bg-[#FAF8F5] dark:bg-[#0c0f14]" />
        <span className="w-1.5 h-1.5 rotate-45 bg-accent/30" />
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">
        <m.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* ==========================================
              LEFT SIDE: documentary-style image
             ========================================== */}
          <m.div 
            variants={fadeInUp}
            className="lg:col-span-6 relative space-y-6"
          >
            {/* Moved Heading to left column */}
            <div className="space-y-3 text-start">
              <span className="font-tajawal text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-accent block">
                COMMUNITY WELFARE INITIATIVE
              </span>
              <h2 className="font-amiri text-3xl md:text-4xl lg:text-5xl font-bold text-textColor-primary leading-tight">
                Supporting Orphaned Children With Dignity & Hope
              </h2>
              <div className="h-[2px] w-20 bg-accent/40 rounded mt-4" />
            </div>

            <div className="relative">
              <div className="relative aspect-[2.61/1] rounded-3xl overflow-hidden shadow-2xl border border-accent/15 group">
                {/* Parallax zooming image */}
                <m.div 
                  className="relative w-full h-full"
                  style={{ scale: imageScale, translateY: imageTranslateY }}
                >
                  <Image
                    src="/images/gallery/orphan_collage_v2.webp"
                    alt="Badrulhuda Academy Orphan Home Care Program collage"
                    fill
                    sizes="(max-w-1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300"
                    priority
                  />
                </m.div>

                {/* Warm gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/65 via-emerald-950/20 to-transparent mix-blend-multiply transition-opacity duration-500 group-hover:opacity-90" />
                
                {/* Subtle gold decorative frame inside the image */}
                <div className="absolute inset-4 border border-white/20 rounded-[20px] pointer-events-none transition-all duration-500 group-hover:inset-3 group-hover:border-accent/40">
                  <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-white/50 group-hover:border-accent" />
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-white/50 group-hover:border-accent" />
                  <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-white/50 group-hover:border-accent" />
                  <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-white/50 group-hover:border-accent" />
                </div>
              </div>

              {/* Float badge for visual interest inside wrapper */}
              <div className="absolute -bottom-6 -right-3 md:right-6 bg-white dark:bg-stone-900 border border-accent/25 py-3 px-6 rounded-2xl shadow-xl flex items-center gap-3.5 z-20">
                <div className="p-2 rounded-xl bg-accent/10 text-accent">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div className="text-start">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-textColor-muted">Initiative Status</span>
                  <span className="block text-sm font-extrabold text-emerald-800 dark:text-emerald-500">Active & Ongoing</span>
                </div>
              </div>
            </div>
          </m.div>

          {/* ==========================================
              RIGHT SIDE: description, stats, feature card
             ========================================== */}
          <m.div 
            variants={fadeInUp}
            className="lg:col-span-6 text-start space-y-8 lg:pt-8"
          >
            <p className="font-inter text-textColor-secondary dark:text-textColor-muted text-sm md:text-base leading-relaxed max-w-2xl">
              For years, Badrulhuda Academy has continued its <span className="text-emerald-850 dark:text-emerald-400 font-extrabold underline decoration-accent decoration-2 underline-offset-4">Orphan Home Care Program</span>, providing monthly financial support to children who have lost their fathers. Assistance is delivered directly to families, helping ensure educational continuity, essential care, and a stronger future for every child.
            </p>

            {/* Impact Statistics */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 pt-2">
              <div className="p-4 bg-white/40 dark:bg-stone-950/20 border border-accent/10 rounded-2xl text-start shadow-sm">
                <span className="block font-amiri text-2xl md:text-3xl font-extrabold text-emerald-800 dark:text-emerald-500">
                  <AnimatedCounter target={2000} suffix="₹+" />
                </span>
                <span className="block font-inter text-[11px] md:text-xs text-textColor-muted mt-1 font-medium">
                  Monthly Support Per Child
                </span>
              </div>

              <div className="p-4 bg-white/40 dark:bg-stone-950/20 border border-accent/10 rounded-2xl text-start shadow-sm">
                <span className="block font-amiri text-2xl md:text-3xl font-extrabold text-emerald-800 dark:text-emerald-500">
                  <AnimatedCounter target={14} suffix=" Years" />
                </span>
                <span className="block font-inter text-[11px] md:text-xs text-textColor-muted mt-1 font-medium">
                  Eligibility Age
                </span>
              </div>

              <div className="p-4 bg-white/40 dark:bg-stone-950/20 border border-accent/10 rounded-2xl text-start shadow-sm">
                <span className="block font-amiri text-2xl md:text-3xl font-extrabold text-emerald-800 dark:text-emerald-500">
                  <AnimatedCounter target={activeCount > 0 ? activeCount : 20} suffix="+" />
                </span>
                <span className="block font-inter text-[11px] md:text-xs text-textColor-muted mt-1 font-medium">
                  Beneficiary Children
                </span>
              </div>

              <div className="p-4 bg-white/40 dark:bg-stone-950/20 border border-accent/10 rounded-2xl text-start shadow-sm">
                <span className="block font-amiri text-2xl md:text-3xl font-extrabold text-emerald-800 dark:text-emerald-500">
                  Ongoing
                </span>
                <span className="block font-inter text-[11px] md:text-xs text-textColor-muted mt-1 font-medium">
                  Community Care Program
                </span>
              </div>
            </div>

            {/* Feature Card: Glassmorphic */}
            <div className="relative p-5 md:p-6 bg-white/60 dark:bg-stone-900/40 backdrop-blur-md border border-accent/15 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              {/* Premium inset gold border frame */}
              <div className="absolute inset-1.5 border border-accent/5 rounded-xl pointer-events-none" />
              
              <div className="flex gap-4 items-start relative z-10">
                <div className="p-2.5 rounded-xl bg-emerald-800/10 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 text-start">
                  <h4 className="font-amiri text-lg font-bold text-textColor-primary leading-tight">
                    Delivered Directly To Homes
                  </h4>
                  <p className="font-inter text-xs text-textColor-muted leading-relaxed">
                    Support reaches families through a trusted community network, ensuring transparency, dignity, and meaningful impact where it is needed most.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <div className="border-l-2 border-accent/50 pl-5 space-y-2 py-1 text-start">
              <p className="font-amiri text-xl italic font-medium text-emerald-950/80 dark:text-white/80 leading-relaxed">
                "The best among people are those who bring benefit to others."
              </p>
              <p className="font-tajawal text-[10px] font-bold uppercase tracking-widest text-accent-light block">
                Badrulhuda Academy Community Welfare Initiative
              </p>
            </div>

            <div className="pt-4 text-start">
              <Link
                href="/charity"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary hover:bg-primary-light text-white font-bold text-body-sm shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <span>Support This Initiative</span>
                <HeartHandshake className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-110" />
              </Link>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
