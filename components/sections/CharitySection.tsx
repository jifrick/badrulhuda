"use client";

import React from "react";
import Image from "next/image";
import { m } from "framer-motion";
import DonationCard from "../ui/DonationCard";
import CopyButton from "../ui/CopyButton";
import IslamicPattern from "../ui/IslamicPattern";

const getPaymentLink = (app: "gpay" | "whatsapp") => {
  const upiId = "badrulhuda@sbi";
  const name = "Badrulhuda Academy";
  const note = "Donation to Badrulhuda";
  
  const baseUpi = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&cu=INR&tn=${encodeURIComponent(note)}`;
  
  if (typeof window === "undefined") return baseUpi;
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isAndroid = /android/.test(userAgent);
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  
  if (app === "gpay") {
    if (isAndroid) {
      return `intent://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&cu=INR&tn=${encodeURIComponent(note)}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;S.browser_fallback_url=${encodeURIComponent(baseUpi)};end`;
    } else if (isIOS) {
      return `gpay://upi/pay?pa=${upiId}&pn=${encodeURIComponent(name)}&cu=INR&tn=${encodeURIComponent(note)}`;
    }
  } else if (app === "whatsapp") {
    if (isAndroid) {
      return `intent://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&cu=INR&tn=${encodeURIComponent(note)}#Intent;scheme=upi;package=com.whatsapp;S.browser_fallback_url=${encodeURIComponent(baseUpi)};end`;
    }
  }
  
  return baseUpi;
};

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

                {/* Direct Payment App Choices */}
                <div className="mt-1 flex flex-col items-center gap-1.5 w-full">
                  <div className="flex flex-col gap-2.5 w-full items-center">
                    {/* Google Pay Button */}
                    <a
                      href={getPaymentLink("gpay")}
                      className="w-full max-w-[210px] inline-flex items-center justify-center gap-2.5 bg-[#1A1A1A] hover:bg-black text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all duration-300 active:scale-95 text-xs font-inter uppercase tracking-wider border border-neutral-800"
                    >
                      <svg className="w-4 h-4 bg-white rounded-full p-0.5 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Google Pay</span>
                    </a>

                    {/* WhatsApp Pay Button */}
                    <a
                      href={getPaymentLink("whatsapp")}
                      className="w-full max-w-[210px] inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all duration-300 active:scale-95 text-xs font-inter uppercase tracking-wider"
                    >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.982L2 22l5.202-1.362a9.92 9.92 0 004.808 1.258h.005c5.507 0 9.99-4.478 9.99-9.984A9.97 9.97 0 0012.012 2zm5.727 14.129c-.314.882-1.8 1.637-2.484 1.72-.683.085-1.503.12-3.155-.544-2.186-.879-3.6-3.109-3.71-3.256-.109-.147-.893-1.189-.893-2.28 0-1.092.573-1.63.791-1.854.218-.224.492-.28.656-.28s.328.003.465.01c.148.007.348-.053.546.425.2.487.683 1.666.737 1.775.055.11.093.238.019.387-.074.15-.11.238-.22.367-.11.13-.23.29-.33.39-.11.1-.22.21-.09.43.13.22.58.96.1.7 1.25 1.115 1.543.513.791.758.855.246.064.397-.08.15-.367.43-.518.577-.15.15-.31.3-.518.15-.208-.15-1.312-.487-2.385-1.442-.832-.74-1.393-1.656-1.557-1.937-.164-.28-.018-.432.12-.57.126-.124.28-.328.42-.492.14-.164.186-.28.28-.465.093-.186.046-.347-.023-.492-.07-.146-.656-1.583-.9-2.176-.237-.573-.48-.495-.656-.504-.17-.008-.367-.01-.564-.01-.197 0-.518.073-.787.367-.27.293-1.03.998-1.03 2.434 0 1.436 1.045 2.822 1.192 3.018.147.195 2.054 3.137 4.975 4.394.695.3 1.238.478 1.662.613.698.223 1.334.192 1.838.117.562-.083 1.728-.707 1.974-1.391.246-.683.246-1.27.172-1.391-.073-.12-.27-.186-.565-.333z"/>
                      </svg>
                      <span>WhatsApp Pay</span>
                    </a>
                  </div>
                  <span className="text-[9px] text-textColor-muted italic">
                    *Launches directly into selected payment app on mobile devices
                  </span>
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
