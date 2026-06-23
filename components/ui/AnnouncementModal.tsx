"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Calendar, Bell, ArrowRight } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { useSiteData } from "@/lib/context/SiteDataContext";

export default function AnnouncementModal() {
  const { announcements } = useSiteData();
  const [isOpen, setIsOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState<any>(null);

  useEffect(() => {
    if (announcements && announcements.length > 0) {
      // Find the latest active announcement
      const activeAnnouncements = announcements.filter((a) => a.active);
      const latest = activeAnnouncements[activeAnnouncements.length - 1];

      if (latest) {
        const dismissed = localStorage.getItem(`dismissed_announcement_${latest.id}`);
        if (!dismissed) {
          setCurrentAnnouncement(latest);
          setIsOpen(true);
        }
      }
    }
  }, [announcements]);

  const handleClose = () => {
    setIsOpen(false);
    if (currentAnnouncement) {
      localStorage.setItem(`dismissed_announcement_${currentAnnouncement.id}`, "true");
    }
  };

  if (!currentAnnouncement) return null;

  // Map category to a nice color badge
  const categoryColors: Record<string, string> = {
    Admission: "bg-accent/20 text-accent border-accent/30 dark:text-accent-light",
    Event: "bg-primary-light/20 text-primary-light border-primary-light/30",
    Notice: "bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/20",
    News: "bg-green-500/10 text-green-500 dark:text-green-400 border-green-500/20",
  };

  const getCategoryColor = (cat: string) => {
    return categoryColors[cat] || "bg-white/10 text-white/95 border-white/20";
  };

  // Determine CTA destination
  const getCtaLink = (cat: string) => {
    if (cat === "Admission") return "/admissions";
    if (cat === "Event") return "/events";
    return null;
  };

  const ctaLink = getCtaLink(currentAnnouncement.category);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
          {/* Dark overlay with blur */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <m.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative bg-white dark:bg-surface border border-accent/20 dark:border-accent/15 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Top Header Banner */}
            <div className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-dark text-white p-6 pb-8">
              {/* Islamic Decorative glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-2xl rounded-full pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/20 hover:bg-black/35 text-white/80 hover:text-white transition-colors active:scale-95 z-20"
                aria-label="Close Announcement"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <Image
                  src="/images/badr-logo.webp"
                  alt="Badrulhuda Academy Logo"
                  width={34}
                  height={34}
                  className="w-8.5 h-8.5 object-contain"
                />
                <div className="flex flex-col">
                  <span className="font-tajawal text-md font-bold leading-none">بدر الهدى</span>
                  <span className="text-[7.5px] font-bold tracking-widest text-white/60 uppercase mt-0.5">
                    Badrulhuda Academy
                  </span>
                </div>
              </div>

              {/* Tag / Category Badge */}
              <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider mb-3 ${getCategoryColor(currentAnnouncement.category)}`}>
                {currentAnnouncement.category}
              </span>

              {/* Title */}
              <h3 className="font-amiri text-2xl font-bold leading-tight text-white mt-1">
                {currentAnnouncement.title}
              </h3>
            </div>

            {/* Announcement Details & Content */}
            <div className="p-6 flex-1 flex flex-col bg-surface dark:bg-surface">
              {/* Date */}
              <div className="flex items-center gap-2 text-textColor-muted text-xs font-semibold mb-4">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <span>Published on {currentAnnouncement.date}</span>
              </div>

              {/* Content Paragraph */}
              <p className="font-inter text-textColor-secondary text-body-sm leading-relaxed whitespace-pre-wrap flex-1 min-h-[80px]">
                {currentAnnouncement.content}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="p-6 pt-0 flex gap-3 bg-surface dark:bg-surface">
              {ctaLink ? (
                <>
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-surface-alt hover:bg-surface border border-border text-textColor-secondary font-bold py-3 px-4 rounded-xl transition-all duration-200 text-center text-body-sm active:scale-95 shadow-sm"
                  >
                    Dismiss
                  </button>
                  <Link
                    href={ctaLink}
                    onClick={handleClose}
                    className="flex-1 bg-accent hover:bg-accent-light text-primary-dark font-bold py-3 px-4 rounded-xl transition-all duration-200 text-center text-body-sm active:scale-95 shadow-sm flex items-center justify-center gap-1.5"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleClose}
                  className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 text-center text-body-sm active:scale-95 shadow-sm"
                >
                  Close & Acknowledge
                </button>
              )}
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
