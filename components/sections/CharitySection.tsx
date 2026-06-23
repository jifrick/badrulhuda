"use client";

import React from "react";
import Image from "next/image";
import { m } from "framer-motion";
import DonationCard from "../ui/DonationCard";
import CopyButton from "../ui/CopyButton";
import IslamicPattern from "../ui/IslamicPattern";

export default function CharitySection() {
  return (
    <section id="charity" className="relative py-28 px-6 md:px-8 overflow-hidden bg-surface-alt border-t border-b border-border/40 dark:border-border/10">
      {/* Subtle Islamic geometric pattern background */}
      <IslamicPattern opacity={0.02} />

      {/* Elegant top section divider decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2 bg-surface-alt px-4 pointer-events-none">
        <span className="w-1 h-1 rotate-45 bg-accent/40" />
        <span className="w-2.5 h-2.5 rotate-45 border border-accent/40 bg-surface-alt" />
        <span className="w-1 h-1 rotate-45 bg-accent/40" />
      </div>

      {/* Elegant bottom section divider decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center gap-2 bg-surface-alt px-4 pointer-events-none">
        <span className="w-1 h-1 rotate-45 bg-accent/40" />
        <span className="w-2.5 h-2.5 rotate-45 border border-accent/40 bg-surface-alt" />
        <span className="w-1 h-1 rotate-45 bg-accent/40" />
      </div>

      <div className="max-w-5xl mx-auto z-10 relative">
        {/* Symmetric two-column donation cards layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-stretch justify-center">
          
          {/* Left Column: Bank Transfer Card */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <DonationCard />
          </m.div>

          {/* Right Column: QR Donation Card */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="relative flex flex-col h-full items-center justify-between bg-white dark:bg-surface border border-accent/15 dark:border-accent/10 rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_15px_45px_rgba(0,0,0,0.25)] transition-all duration-500 text-center gap-6 overflow-hidden">
              
              {/* Premium inset gold border frame with corner accents */}
              <div className="absolute inset-2.5 border border-accent/10 rounded-[20px] pointer-events-none">
                <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-accent/30" />
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-accent/30" />
                <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-accent/30" />
                <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-accent/30" />
              </div>

              {/* Heading */}
              <h3 className="font-amiri text-lg tracking-[0.2em] font-medium text-accent text-center uppercase mt-2 z-10 relative">
                Scan & Donate
              </h3>

              {/* Decorative ornament divider */}
              <div className="flex items-center justify-center gap-3 mt-3.5 mb-2 z-10 relative">
                <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-accent/30" />
                <span className="w-1.5 h-1.5 rotate-45 border border-accent/50 bg-transparent" />
                <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-accent/30" />
              </div>

              {/* QR Code premium framed container */}
              <div className="relative w-full max-w-[210px] bg-accent/5 p-2 rounded-[24px] border border-accent/10 mx-auto transition-all duration-300 group-hover:scale-[1.02] z-10">
                <div className="bg-white p-3 rounded-[18px] border border-accent/10 shadow-sm">
                  <Image
                    src="/images/qr-code-bdr.webp"
                    alt="Badrulhuda Academy UPI QR Code — badrulhuda@sbi"
                    width={410}
                    height={410}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Instructions and Copyable UPI ID */}
              <div className="flex flex-col items-center gap-3.5 z-10 relative">
                <p className="text-xs text-textColor-secondary dark:text-textColor-muted font-inter max-w-[240px] leading-relaxed tracking-wide">
                  Scan with any UPI app to donate instantly.
                </p>
                <div className="inline-flex items-center gap-2.5 bg-[#faf7f2]/50 dark:bg-stone-900/30 border border-accent/10 py-1.5 px-3 rounded-xl shadow-sm">
                  <span className="text-textColor-primary dark:text-textColor-primary font-mono text-xs font-bold tracking-wide">
                    badrulhuda@sbi
                  </span>
                  <CopyButton textToCopy="badrulhuda@sbi" ariaLabel="Copy UPI ID" />
                </div>
              </div>

              {/* Bottom instant & secure seal */}
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-accent uppercase tracking-[0.2em] bg-accent/5 px-4 py-2 rounded-full border border-accent/15 shadow-sm mt-1 z-10 relative">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Instant & Secure
              </span>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
}
