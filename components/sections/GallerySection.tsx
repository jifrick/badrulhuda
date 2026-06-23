"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, m, useScroll, useTransform } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  GraduationCap, 
  Users, 
  BookOpen, 
  Calendar, 
  Heart 
} from "lucide-react";
import IslamicPattern from "../ui/IslamicPattern";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useSiteData } from "@/lib/context/SiteDataContext";

const DEFAULT_PLACEHOLDER = "/images/gellarybgbdr.webp";

// Helper function to resolve image sources cleanly and fallback on empty strings
const getImageSrc = (src?: string) => {
  return src && src.trim() !== "" ? src : DEFAULT_PLACEHOLDER;
};

export default function GallerySection() {
  const { galleryConfig } = useSiteData();
  const GALLERY_CONFIG = galleryConfig;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { scrollY } = useScroll();
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const bgY = useTransform(scrollY, [0, 800], [0, 80]);

  // Flatten the configured images in render order for the interactive lightbox
  const STORY_IMAGES = [
    GALLERY_CONFIG.hero,
    GALLERY_CONFIG.academicLife.featured,
    ...GALLERY_CONFIG.academicLife.supporting,
    ...GALLERY_CONFIG.scholarMoments,
    GALLERY_CONFIG.campusLife.hostel,
    GALLERY_CONFIG.campusLife.peerStudy,
    GALLERY_CONFIG.campusLife.library,
    GALLERY_CONFIG.campusLife.creative,
    GALLERY_CONFIG.eventsConferences.featuredOne,
    GALLERY_CONFIG.eventsConferences.featuredTwo,
    GALLERY_CONFIG.eventsConferences.supportingOne,
    GALLERY_CONFIG.eventsConferences.supportingTwo,
    GALLERY_CONFIG.legacyArchive.featuredPanorama,
    ...GALLERY_CONFIG.legacyArchive.photos,
    ...GALLERY_CONFIG.communityImpact.images
  ].map(img => ({
    ...img,
    src: getImageSrc(img.src)
  }));

  // Lightbox navigation
  const showNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null && prev < STORY_IMAGES.length - 1 ? prev + 1 : 0));
  }, [STORY_IMAGES.length]);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : STORY_IMAGES.length - 1));
  }, [STORY_IMAGES.length]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, showNext, showPrev, closeLightbox]);

  // Disable scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  // Helper to open the clicked image in lightbox
  const openImage = (src: string) => {
    const idx = STORY_IMAGES.findIndex((img) => img.src === getImageSrc(src));
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  return (
    <div className="relative bg-surface pb-24 overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-2/3 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* =========================================================================
          SECTION 1 — Hero Introduction
          ========================================================================= */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col justify-end px-6 py-12 md:py-20 z-10">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <m.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0 w-full h-full">
            <Image
              src={getImageSrc(GALLERY_CONFIG.hero.src)}
              alt="Badrulhuda Academy Campus background"
              fill
              sizes="100vw"
              priority
              className="object-cover opacity-75"
            />
          </m.div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-black/10" />
          <IslamicPattern opacity={0.03} className="text-accent/20 animate-pattern-float" />
        </div>

        <div className="max-w-7xl mx-auto w-full z-10">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-4 text-start"
          >
            <span className="font-tajawal text-xs md:text-sm font-bold uppercase tracking-widest text-accent block">
              معرض الصور والأثر
            </span>
            <h1 className="font-amiri text-5xl md:text-7xl font-bold text-textColor-primary leading-none tracking-tight">
              {GALLERY_CONFIG.hero.title}
            </h1>
            <p className="font-inter text-textColor-secondary dark:text-textColor-muted text-base md:text-lg max-w-2xl leading-relaxed antialiased">
              {GALLERY_CONFIG.hero.description}
            </p>
            <div className="pt-4 flex items-center gap-3">
              <span className="h-[1px] w-12 bg-accent/40" />
              <button 
                onClick={() => openImage(GALLERY_CONFIG.hero.src)}
                className="text-[11px] font-bold uppercase tracking-widest text-accent hover:text-accent-light transition-colors"
              >
                View Cover Story
              </button>
            </div>
          </m.div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 2 — Academic Life
          ========================================================================= */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          
          <m.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-accent/15 pb-6 mb-12"
          >
            <div className="text-start space-y-1">
              <span className="font-tajawal text-[10px] font-bold uppercase tracking-widest text-accent">مناهج التعليم</span>
              <h2 className="font-amiri text-3xl md:text-4xl font-bold text-textColor-primary">
                Academic Life & Scholarship
              </h2>
            </div>
            <p className="font-inter text-xs text-textColor-muted max-w-sm mt-3 md:mt-0 leading-relaxed text-start">
              Through Quranic mastery, traditional Islamic jurisprudence, and modern studies, our students build a holistic foundation of sacred knowledge.
            </p>
          </m.div>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Feature Image (Left) */}
            <m.div
              variants={fadeInUp}
              onClick={() => openImage(GALLERY_CONFIG.academicLife.featured.src)}
              className="lg:col-span-7 relative group cursor-pointer overflow-hidden rounded-2xl border border-border shadow-sm min-h-[350px] md:min-h-[450px]"
            >
              <Image
                src={getImageSrc(GALLERY_CONFIG.academicLife.featured.src)}
                alt={GALLERY_CONFIG.academicLife.featured.title}
                fill
                sizes="(max-w-1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
              
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white text-start">
                <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase text-accent-light mb-2">
                  <BookOpen className="w-3.5 h-3.5" /> {GALLERY_CONFIG.academicLife.featured.category}
                </span>
                <h3 className="font-amiri text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                  {GALLERY_CONFIG.academicLife.featured.title}
                </h3>
                <p className="text-xs text-white/80 font-inter max-w-md leading-relaxed line-clamp-2">
                  {GALLERY_CONFIG.academicLife.featured.description}
                </p>
              </div>
            </m.div>

            {/* Supporting Images (Right grid stack) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              {GALLERY_CONFIG.academicLife.supporting.map((img, i) => (
                <m.div
                  key={i}
                  variants={fadeInUp}
                  onClick={() => openImage(img.src)}
                  className="flex gap-4 p-4 rounded-xl border border-border bg-surface-alt/40 hover:bg-surface-alt/75 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                >
                  <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={getImageSrc(img.src)}
                      alt={img.title}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center text-start space-y-1">
                    <span className="font-tajawal text-[8px] font-bold uppercase tracking-widest text-accent">
                      {img.category}
                    </span>
                    <h4 className="font-amiri text-lg font-bold text-textColor-primary leading-snug group-hover:text-primary dark:group-hover:text-accent-light transition-colors">
                      {img.title}
                    </h4>
                    <p className="font-inter text-[11px] text-textColor-muted leading-relaxed line-clamp-2">
                      {img.description}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3 — Scholar Moments
          ========================================================================= */}
      <section className="relative py-20 px-6 bg-surface-alt/30 border-y border-border z-10">
        <div className="max-w-7xl mx-auto">

          <m.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-accent/15 pb-6 mb-12"
          >
            <div className="text-start space-y-1">
              <span className="font-tajawal text-[10px] font-bold uppercase tracking-widest text-accent">مجالس العلماء</span>
              <h2 className="font-amiri text-3xl md:text-4xl font-bold text-textColor-primary">
                Scholar Moments & Guidance
              </h2>
            </div>
            <p className="font-inter text-xs text-textColor-muted max-w-sm mt-3 md:mt-0 leading-relaxed text-start">
              Portraits of mentorship, guidance, and spiritual transmissions from respected teachers and visiting scholars.
            </p>
          </m.div>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {GALLERY_CONFIG.scholarMoments.map((img, index) => (
              <m.div
                key={index}
                variants={fadeInUp}
                onClick={() => openImage(img.src)}
                className="group cursor-pointer flex flex-col space-y-3 p-3 bg-surface border border-border rounded-2xl hover:shadow-md transition-all duration-300"
              >
                <div className="relative aspect-[3/2] rounded-xl overflow-hidden bg-surface-alt border border-border">
                  <Image
                    src={getImageSrc(img.src)}
                    alt={img.title}
                    fill
                    sizes="(max-w-768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white text-start">
                    <span className="font-tajawal text-[8px] font-bold uppercase tracking-widest text-accent-light block mb-1">
                      {img.category}
                    </span>
                    <h4 className="font-amiri text-base font-bold leading-tight">
                      {img.title}
                    </h4>
                  </div>
                </div>
                <p className="font-inter text-[11px] text-textColor-muted text-start leading-relaxed px-1 line-clamp-2">
                  {img.description}
                </p>
              </m.div>
            ))}
          </m.div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4 — Campus Life
          ========================================================================= */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">

          <m.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-accent/15 pb-6 mb-12"
          >
            <div className="text-start space-y-1">
              <span className="font-tajawal text-[10px] font-bold uppercase tracking-widest text-accent">الحياة الطلابية</span>
              <h2 className="font-amiri text-3xl md:text-4xl font-bold text-textColor-primary">
                Campus Life & Student Living
              </h2>
            </div>
            <p className="font-inter text-xs text-textColor-muted max-w-sm mt-3 md:mt-0 leading-relaxed text-start">
              Documenting residential routines, library studies, peer collaborations, and the brotherhood built within our hostels.
            </p>
          </m.div>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            {/* Hostel */}
            <m.div
              variants={fadeInUp}
              onClick={() => openImage(GALLERY_CONFIG.campusLife.hostel.src)}
              className="md:col-span-5 flex flex-col justify-between p-4 border border-border bg-surface-alt/25 rounded-2xl group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border">
                <Image
                  src={getImageSrc(GALLERY_CONFIG.campusLife.hostel.src)}
                  alt={GALLERY_CONFIG.campusLife.hostel.title}
                  fill
                  sizes="(max-w-768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="text-start mt-4 space-y-1">
                <span className="font-tajawal text-[9px] font-bold uppercase tracking-widest text-accent">
                  {GALLERY_CONFIG.campusLife.hostel.category}
                </span>
                <h3 className="font-amiri text-xl font-bold text-textColor-primary group-hover:text-primary dark:group-hover:text-accent-light transition-colors">
                  {GALLERY_CONFIG.campusLife.hostel.title}
                </h3>
                <p className="font-inter text-xs text-textColor-secondary dark:text-textColor-muted leading-relaxed">
                  {GALLERY_CONFIG.campusLife.hostel.description}
                </p>
              </div>
            </m.div>

            {/* Peer Study */}
            <m.div
              variants={fadeInUp}
              onClick={() => openImage(GALLERY_CONFIG.campusLife.peerStudy.src)}
              className="md:col-span-7 flex flex-col justify-between p-4 border border-border bg-surface-alt/25 rounded-2xl group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border">
                <Image
                  src={getImageSrc(GALLERY_CONFIG.campusLife.peerStudy.src)}
                  alt={GALLERY_CONFIG.campusLife.peerStudy.title}
                  fill
                  sizes="(max-w-768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
              </div>
              <div className="text-start mt-4 space-y-1">
                <span className="font-tajawal text-[9px] font-bold uppercase tracking-widest text-accent">
                  {GALLERY_CONFIG.campusLife.peerStudy.category}
                </span>
                <h3 className="font-amiri text-xl font-bold text-textColor-primary group-hover:text-primary dark:group-hover:text-accent-light transition-colors">
                  {GALLERY_CONFIG.campusLife.peerStudy.title}
                </h3>
                <p className="font-inter text-xs text-textColor-secondary dark:text-textColor-muted leading-relaxed">
                  {GALLERY_CONFIG.campusLife.peerStudy.description}
                </p>
              </div>
            </m.div>

            {/* Library */}
            <m.div
              variants={fadeInUp}
              onClick={() => openImage(GALLERY_CONFIG.campusLife.library.src)}
              className="md:col-span-7 flex flex-col justify-between p-4 border border-border bg-surface-alt/25 rounded-2xl group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border">
                <Image
                  src={getImageSrc(GALLERY_CONFIG.campusLife.library.src)}
                  alt={GALLERY_CONFIG.campusLife.library.title}
                  fill
                  sizes="(max-w-768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
              </div>
              <div className="text-start mt-4 space-y-1">
                <span className="font-tajawal text-[9px] font-bold uppercase tracking-widest text-accent">
                  {GALLERY_CONFIG.campusLife.library.category}
                </span>
                <h3 className="font-amiri text-xl font-bold text-textColor-primary group-hover:text-primary dark:group-hover:text-accent-light transition-colors">
                  {GALLERY_CONFIG.campusLife.library.title}
                </h3>
                <p className="font-inter text-xs text-textColor-secondary dark:text-textColor-muted leading-relaxed">
                  {GALLERY_CONFIG.campusLife.library.description}
                </p>
              </div>
            </m.div>

            {/* Creative Corner */}
            <m.div
              variants={fadeInUp}
              onClick={() => openImage(GALLERY_CONFIG.campusLife.creative.src)}
              className="md:col-span-5 flex flex-col justify-between p-4 border border-border bg-surface-alt/25 rounded-2xl group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border">
                <Image
                  src={getImageSrc(GALLERY_CONFIG.campusLife.creative.src)}
                  alt={GALLERY_CONFIG.campusLife.creative.title}
                  fill
                  sizes="(max-w-768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="text-start mt-4 space-y-1">
                <span className="font-tajawal text-[9px] font-bold uppercase tracking-widest text-accent">
                  {GALLERY_CONFIG.campusLife.creative.category}
                </span>
                <h3 className="font-amiri text-xl font-bold text-textColor-primary group-hover:text-primary dark:group-hover:text-accent-light transition-colors">
                  {GALLERY_CONFIG.campusLife.creative.title}
                </h3>
                <p className="font-inter text-xs text-textColor-secondary dark:text-textColor-muted leading-relaxed">
                  {GALLERY_CONFIG.campusLife.creative.description}
                </p>
              </div>
            </m.div>
          </m.div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 5 — Events & Conferences
          ========================================================================= */}
      <section className="relative py-20 px-6 bg-surface-alt/30 border-y border-border z-10">
        <div className="max-w-7xl mx-auto">

          <m.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-accent/15 pb-6 mb-12"
          >
            <div className="text-start space-y-1">
              <span className="font-tajawal text-[10px] font-bold uppercase tracking-widest text-accent">المؤتمرات والندوات</span>
              <h2 className="font-amiri text-3xl md:text-4xl font-bold text-textColor-primary">
                Events & Scholarly Conferences
              </h2>
            </div>
            <p className="font-inter text-xs text-textColor-muted max-w-sm mt-3 md:mt-0 leading-relaxed text-start">
              From district-wide recitation summits to specialized Fiqh workshops and annual graduations, our conference events host scholars and communities.
            </p>
          </m.div>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {/* Featured One */}
            <m.div
              variants={fadeInUp}
              onClick={() => openImage(GALLERY_CONFIG.eventsConferences.featuredOne.src)}
              className="flex flex-col lg:flex-row items-stretch border border-border bg-surface rounded-3xl overflow-hidden group cursor-pointer"
            >
              <div className="lg:w-2/3 relative min-h-[300px] lg:min-h-[400px]">
                <Image
                  src={getImageSrc(GALLERY_CONFIG.eventsConferences.featuredOne.src)}
                  alt={GALLERY_CONFIG.eventsConferences.featuredOne.title}
                  fill
                  sizes="(max-w-1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
              </div>
              <div className="lg:w-1/3 p-8 flex flex-col justify-center text-start space-y-4">
                <span className="font-tajawal text-[9px] font-bold uppercase tracking-widest text-accent flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Event Highlight
                </span>
                <h3 className="font-amiri text-2xl font-bold text-textColor-primary leading-tight group-hover:text-primary dark:group-hover:text-accent-light transition-colors">
                  {GALLERY_CONFIG.eventsConferences.featuredOne.title}
                </h3>
                <div className="h-[2px] w-12 bg-accent/40" />
                <p className="font-inter text-xs md:text-sm text-textColor-secondary dark:text-textColor-muted leading-relaxed">
                  {GALLERY_CONFIG.eventsConferences.featuredOne.description}
                </p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent group-hover:underline">
                  View full frame details →
                </span>
              </div>
            </m.div>

            {/* Featured Two */}
            <m.div
              variants={fadeInUp}
              onClick={() => openImage(GALLERY_CONFIG.eventsConferences.featuredTwo.src)}
              className="flex flex-col lg:flex-row items-stretch border border-border bg-surface rounded-3xl overflow-hidden group cursor-pointer lg:flex-row-reverse"
            >
              <div className="lg:w-2/3 relative min-h-[300px] lg:min-h-[400px]">
                <Image
                  src={getImageSrc(GALLERY_CONFIG.eventsConferences.featuredTwo.src)}
                  alt={GALLERY_CONFIG.eventsConferences.featuredTwo.title}
                  fill
                  sizes="(max-w-1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
              </div>
              <div className="lg:w-1/3 p-8 flex flex-col justify-center text-start space-y-4">
                <span className="font-tajawal text-[9px] font-bold uppercase tracking-widest text-accent flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Event Highlight
                </span>
                <h3 className="font-amiri text-2xl font-bold text-textColor-primary leading-tight group-hover:text-primary dark:group-hover:text-accent-light transition-colors">
                  {GALLERY_CONFIG.eventsConferences.featuredTwo.title}
                </h3>
                <div className="h-[2px] w-12 bg-accent/40" />
                <p className="font-inter text-xs md:text-sm text-textColor-secondary dark:text-textColor-muted leading-relaxed">
                  {GALLERY_CONFIG.eventsConferences.featuredTwo.description}
                </p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent group-hover:underline">
                  View full frame details →
                </span>
              </div>
            </m.div>

            {/* Supporting Events */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[GALLERY_CONFIG.eventsConferences.supportingOne, GALLERY_CONFIG.eventsConferences.supportingTwo].map((img, idx) => (
                <m.div
                  key={idx}
                  variants={fadeInUp}
                  onClick={() => openImage(img.src)}
                  className="flex flex-col border border-border bg-surface rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={getImageSrc(img.src)}
                      alt={img.title}
                      fill
                      sizes="(max-w-768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />
                  </div>
                  <div className="p-5 text-start space-y-1.5">
                    <span className="font-tajawal text-[8px] font-bold uppercase tracking-widest text-accent">
                      {img.category}
                    </span>
                    <h4 className="font-amiri text-lg font-bold text-textColor-primary leading-snug group-hover:text-primary dark:group-hover:text-accent-light transition-colors">
                      {img.title}
                    </h4>
                    <p className="font-inter text-xs text-textColor-muted leading-relaxed line-clamp-2">
                      {img.description}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 6 — Legacy in Pictures (Historical Photo Archive)
          ========================================================================= */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <m.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-start"
          >
            <span className="font-tajawal text-sm font-bold uppercase tracking-widest text-accent block mb-3">الإرث في الصور</span>
            <h2 className="font-amiri text-4xl md:text-5xl lg:text-6xl font-bold text-textColor-primary leading-none mb-5">
              Legacy in Pictures
            </h2>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-accent/15 pb-8">
              <p className="font-inter text-sm md:text-base text-textColor-secondary dark:text-textColor-muted max-w-2xl leading-relaxed">
                A visual archive preserving the memorable moments, milestones, gatherings, and educational heritage of Badrulhuda Academy through the years.
              </p>
              <span className="shrink-0 font-tajawal text-[10px] font-bold uppercase tracking-widest text-accent/60 whitespace-nowrap">
                {GALLERY_CONFIG.legacyArchive.photos.length + 1} photographs
              </span>
            </div>
          </m.div>

          {/* Featured Panoramic Hero Image */}
          <m.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            onClick={() => openImage(GALLERY_CONFIG.legacyArchive.featuredPanorama.src)}
            className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-3xl overflow-hidden mb-12 cursor-pointer group shadow-2xl border border-border/60"
          >
            <Image
              src={getImageSrc(GALLERY_CONFIG.legacyArchive.featuredPanorama.src)}
              alt={GALLERY_CONFIG.legacyArchive.featuredPanorama.title}
              fill
              sizes="100vw"
              priority
              className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-start">
              <span className="font-tajawal text-[9px] font-bold uppercase tracking-widest text-accent-light block mb-2">
                {GALLERY_CONFIG.legacyArchive.featuredPanorama.category} · Featured Archive
              </span>
              <h3 className="font-amiri text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                {GALLERY_CONFIG.legacyArchive.featuredPanorama.title}
              </h3>
              {GALLERY_CONFIG.legacyArchive.featuredPanorama.caption && (
                <p className="font-inter text-sm md:text-base text-accent-light italic max-w-xl mb-2 leading-relaxed antialiased">
                  "{GALLERY_CONFIG.legacyArchive.featuredPanorama.caption.replace(/^["']|["']$/g, '')}"
                </p>
              )}
              <p className="font-inter text-xs md:text-sm text-white/70 max-w-xl leading-relaxed">
                {GALLERY_CONFIG.legacyArchive.featuredPanorama.description}
              </p>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </m.div>

          {/* Masonry Photo Archive Grid */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-0"
            style={{ columnFill: 'balance' }}
          >
            {GALLERY_CONFIG.legacyArchive.photos.map((photo, index) => (
              <m.div
                key={index}
                variants={fadeInUp}
                onClick={() => openImage(photo.src)}
                className={`
                  break-inside-avoid mb-4 group cursor-pointer
                  rounded-2xl overflow-hidden border border-border bg-surface
                  hover:shadow-xl hover:border-accent/30 transition-all duration-500
                  ${photo.span === 'wide' ? 'sm:col-span-2' : ''}
                `}
              >
                {/* Image container — varied heights for organic masonry feel */}
                <div className={`
                  relative overflow-hidden
                  ${
                    index % 7 === 0 ? 'aspect-[4/5]' :
                    index % 7 === 1 ? 'aspect-[4/3]' :
                    index % 7 === 2 ? 'aspect-square' :
                    index % 7 === 3 ? 'aspect-[3/4]' :
                    index % 7 === 4 ? 'aspect-[16/10]' :
                    index % 7 === 5 ? 'aspect-[4/3]' :
                                     'aspect-[3/2]'
                  }
                `}>
                  <Image
                    src={getImageSrc(photo.src)}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  {/* Hover badge */}
                  <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="font-tajawal text-[8px] font-bold uppercase tracking-widest text-accent-light block mb-0.5">
                      {photo.category}
                    </span>
                    <h4 className="font-amiri text-sm font-bold text-white leading-tight line-clamp-1">
                      {photo.title}
                    </h4>
                  </div>
                </div>
                {/* Below-image caption strip */}
                <div className="px-4 py-3 text-start space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-tajawal text-[8px] font-bold uppercase tracking-widest text-accent">
                      {photo.category}
                    </span>
                    <span className="font-inter text-[8px] text-textColor-muted/50 font-medium">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="font-amiri text-base font-bold text-textColor-primary leading-snug group-hover:text-primary dark:group-hover:text-accent-light transition-colors">
                    {photo.title}
                  </h4>
                  {photo.caption && (
                    <p className="font-inter text-[10.5px] font-medium text-accent italic leading-relaxed line-clamp-2">
                      "{photo.caption.replace(/^["']|["']$/g, '')}"
                    </p>
                  )}
                  <p className="font-inter text-[10px] text-textColor-muted leading-relaxed line-clamp-2">
                    {photo.description}
                  </p>
                </div>
              </m.div>
            ))}
          </m.div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 7 — Community Impact
          ========================================================================= */}
      <section className="relative py-20 px-6 bg-surface-alt/30 border-t border-border z-10">
        <div className="max-w-7xl mx-auto">

          <m.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-accent/15 pb-6 mb-12"
          >
            <div className="text-start space-y-1">
              <span className="font-tajawal text-[10px] font-bold uppercase tracking-widest text-accent">الخدمة المجتمعية</span>
              <h2 className="font-amiri text-3xl md:text-4xl font-bold text-textColor-primary">
                {GALLERY_CONFIG.communityImpact.introTitle}
              </h2>
            </div>
            <p className="font-inter text-xs text-textColor-muted max-w-sm mt-3 md:mt-0 leading-relaxed text-start">
              Through educational outreach, moral leadership guidance, and charity distributions, Badrulhuda is a pillar of community support in Panamaram.
            </p>
          </m.div>

          {/* Section Introduction */}
          <m.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl text-start space-y-4 mb-20 relative z-10"
          >
            <div className="inline-flex p-3 rounded-xl bg-accent/10 border border-accent/20 text-accent">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-amiri text-2xl md:text-3xl font-bold text-textColor-primary leading-tight">
              Guidance, Character, and Community Service
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 font-inter text-xs md:text-sm text-textColor-secondary dark:text-textColor-muted leading-relaxed">
              {GALLERY_CONFIG.communityImpact.introParagraphs.map((para, i) => (
                <p key={i}>
                  {para}
                </p>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-2">
              <span className="font-tajawal text-[10px] font-bold text-accent uppercase tracking-widest">
                Inspired by Faith, Driven by Service
              </span>
            </div>
          </m.div>

          {/* Alternating Stories Rows */}
          <div className="space-y-24 md:space-y-32 relative z-10">
            {GALLERY_CONFIG.communityImpact.images.map((img, i) => {
              const isEven = i % 2 === 0;
              const isSolidarity = img.src.includes("solidarity_collage");
              const isRahul = img.src.includes("rahul_gandhi_visit");
              
              // Dynamic aspect ratio based on collage type
              const aspectClass = isSolidarity 
                ? "aspect-[2.61/1]" 
                : isRahul 
                  ? "aspect-[1.5/1]" 
                  : "aspect-[4/3]";

              return (
                <m.div
                  key={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
                >
                  {/* Image Column */}
                  <div 
                    onClick={() => openImage(img.src)}
                    className={`lg:col-span-7 cursor-pointer group relative rounded-2xl overflow-hidden border border-border bg-surface shadow-sm hover:shadow-xl transition-all duration-500 ${
                      isEven ? "lg:order-first" : "lg:order-last"
                    }`}
                  >
                    <div className={`relative w-full overflow-hidden ${aspectClass}`}>
                      <Image
                        src={getImageSrc(img.src)}
                        alt={img.title}
                        fill
                        sizes="(max-w-1024px) 100vw, 55vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      />
                    </div>
                  </div>

                  {/* Text Column */}
                  <div 
                    className={`lg:col-span-5 text-start space-y-4 flex flex-col justify-center ${
                      isEven ? "lg:order-last" : "lg:order-first"
                    }`}
                  >
                    <span className="font-tajawal text-xs font-bold text-accent uppercase tracking-widest block">
                      {img.category}
                    </span>
                    <h3 className="font-amiri text-2xl md:text-3xl font-bold text-textColor-primary leading-tight">
                      {img.title}
                    </h3>
                    <div className="h-[2px] w-12 bg-accent/40 rounded" />
                    <p className="font-inter text-xs md:text-sm text-textColor-secondary dark:text-textColor-muted leading-relaxed">
                      {img.description}
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => openImage(img.src)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-accent hover:underline"
                      >
                        View Full Story →
                      </button>
                    </div>
                  </div>
                </m.div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          LIGHTBOX INTERACTIVE COMPONENT
          ========================================================================= */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md p-4 md:p-8"
          >
            {/* Top Toolbar */}
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto z-10">
              <div className="flex flex-col items-start text-white/50 text-start">
                <span className="font-tajawal text-[10px] font-bold uppercase tracking-widest text-accent-light">
                  {STORY_IMAGES[lightboxIndex].category}
                </span>
                <span className="text-[10px] font-semibold tracking-wider font-inter">
                  Frame {lightboxIndex + 1} of {STORY_IMAGES.length}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/80 transition-all active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Stage: Prev, Image, Next */}
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto flex-1 my-4">
              
              {/* Prev Button */}
              <button
                onClick={showPrev}
                className="hidden sm:flex p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/80 transition-all active:scale-90 shrink-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Image Frame */}
              <div className="relative flex-1 h-[50vh] md:h-[60vh] max-w-4xl mx-auto flex items-center justify-center">
                <m.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={STORY_IMAGES[lightboxIndex].src}
                    alt={STORY_IMAGES[lightboxIndex].title}
                    fill
                    sizes="(max-w-1024px) 100vw, 80vw"
                    className="object-contain"
                    priority
                  />
                </m.div>
              </div>

              {/* Next Button */}
              <button
                onClick={showNext}
                className="hidden sm:flex p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/80 transition-all active:scale-90 shrink-0"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>

            {/* Bottom Caption and mobile navigation controls */}
            <div className="w-full max-w-3xl mx-auto text-center space-y-4 pb-4 z-10">
              <div className="space-y-2">
                <h3 className="font-amiri text-2xl md:text-3xl font-bold text-white">
                  {STORY_IMAGES[lightboxIndex].title}
                </h3>
                {STORY_IMAGES[lightboxIndex].caption && (
                  <p className="font-inter text-sm md:text-base text-accent-light italic max-w-xl mx-auto leading-relaxed antialiased">
                    "{STORY_IMAGES[lightboxIndex].caption.replace(/^["']|["']$/g, '')}"
                  </p>
                )}
                <p className="font-inter text-xs md:text-sm text-white/70 max-w-xl mx-auto leading-relaxed antialiased">
                  {STORY_IMAGES[lightboxIndex].description}
                </p>
              </div>

              {/* Mobile Arrows stack */}
              <div className="flex sm:hidden justify-center items-center gap-6 pt-2">
                <button
                  onClick={showPrev}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-white/80"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-white/40 text-xs font-bold tracking-wider font-inter">
                  {lightboxIndex + 1} / {STORY_IMAGES.length}
                </span>
                <button
                  onClick={showNext}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-white/80"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </m.div>
        )}
      </AnimatePresence>

    </div>
  );
}
