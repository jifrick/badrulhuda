"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info, ShieldCheck, Heart, Eye, CheckCircle, MessageSquare, CreditCard, ArrowRight, DollarSign } from "lucide-react";
import IslamicPattern from "./IslamicPattern";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PURPOSES = [
  "Orphan Home Care",
  "Student Sponsorship",
  "General Donation",
  "Sadaqah",
  "Zakat",
  "Building Development"
];

const PRESET_AMOUNTS_ROW1 = [101, 313, 786];
const PRESET_AMOUNTS_ROW2 = [1001, 2000, 5000];

const getPrefilledPaymentLink = (method: string, amount: string | number, purpose: string) => {
  const upiId = "badrulhuda@sbi";
  const name = "Badrulhuda Academy";
  const note = `Donation for ${purpose}`;
  
  const baseUpi = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
  
  if (typeof window === "undefined") return baseUpi;
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isAndroid = /android/.test(userAgent);
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  
  if (method === "gpay") {
    if (isAndroid) {
      return `intent://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;S.browser_fallback_url=${encodeURIComponent(baseUpi)};end`;
    } else if (isIOS) {
      return `gpay://upi/pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    }
  } else if (method === "phonepe") {
    if (isAndroid) {
      return `intent://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}#Intent;scheme=upi;package=com.phonepe.app;S.browser_fallback_url=${encodeURIComponent(baseUpi)};end`;
    } else if (isIOS) {
      return `phonepe://upi/pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    }
  } else if (method === "paytm") {
    if (isAndroid) {
      return `intent://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}#Intent;scheme=upi;package=net.one97.paytm;S.browser_fallback_url=${encodeURIComponent(baseUpi)};end`;
    } else if (isIOS) {
      return `paytmmp://upi/pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    }
  } else if (method === "bhim") {
    if (isAndroid) {
      return `intent://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}#Intent;scheme=upi;package=in.org.npci.upiapp;S.browser_fallback_url=${encodeURIComponent(baseUpi)};end`;
    } else if (isIOS) {
      return `bhim://upi/pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    }
  }
  
  return baseUpi;
};

const getWhatsAppLink = (amount: string | number, purpose: string) => {
  const text = `Assalamu Alaikum,

I would like to support Badrulhuda Academy through the ${purpose} Program.

Donation Amount: ₹${amount}

Please guide me with the donation process.`;

  return `https://wa.me/+919447783313?text=${encodeURIComponent(text)}`;
};

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState("Orphan Home Care");
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(2000);
  const [customAmount, setCustomAmount] = useState("");
  const [isAnimatingChildHighlight, setIsAnimatingChildHighlight] = useState(false);
  const paymentsGridRef = useRef<HTMLDivElement>(null);

  // Responsive Layout detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle ESC key close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const activeAmountValue = selectedAmount === "custom" ? Number(customAmount) || 0 : selectedAmount;

  const handleSponsorClick = () => {
    setSelectedPurpose("Orphan Home Care");
    setSelectedAmount(2000);
    setIsAnimatingChildHighlight(true);
    setTimeout(() => setIsAnimatingChildHighlight(false), 1500);

    // Scroll payment section into view inside modal scroll wrapper
    setTimeout(() => {
      paymentsGridRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  };

  const handleBankTransferClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    // Scroll to charity section bank details
    setTimeout(() => {
      const bankCard = document.getElementById("charity");
      if (bankCard) {
        bankCard.scrollIntoView({ behavior: "smooth" });
      }
    }, 350);
  };

  // Variants for animations
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const sheetVariants = {
    hidden: { y: "100%", opacity: 1 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 220 } },
    exit: { y: "100%", opacity: 1, transition: { duration: 0.25, ease: "easeInOut" } }
  };

  const modalVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 0.25, ease: "easeIn" } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop Blur Overlay */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal / Bottom Sheet Container */}
          <motion.div
            variants={isMobile ? sheetVariants : modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`bg-white dark:bg-surface border border-accent/25 dark:border-accent/15 shadow-2xl flex flex-col z-10 relative overflow-hidden transition-colors duration-300 w-full ${
              isMobile
                ? "fixed bottom-0 left-0 right-0 rounded-t-[32px] max-h-[85vh]"
                : "max-w-[700px] rounded-[32px] max-h-[90vh] my-auto mx-4"
            }`}
          >
            {/* Islamic Subtle Background Pattern Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.015]">
              <IslamicPattern opacity={1} />
            </div>

            {/* Premium Gold Frame Accent */}
            <div className="absolute inset-2 border border-accent/10 rounded-[24px] pointer-events-none z-0">
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-accent/30" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-accent/30" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-accent/30" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-accent/30" />
            </div>

            {/* Header */}
            <div className="relative z-10 flex justify-between items-start pt-6 px-6 sm:pt-8 sm:px-8 pb-4 border-b border-border/10 dark:border-border/5">
              <div className="text-left">
                <h3 className="font-amiri text-xl sm:text-2xl font-bold text-textColor-primary flex items-center gap-2">
                  <Heart className="w-5 h-5 text-accent animate-pulse" />
                  Support Badrulhuda Academy
                </h3>
                <p className="text-xs sm:text-sm text-textColor-secondary dark:text-textColor-muted font-inter mt-1.5">
                  Choose an amount and your preferred payment method.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-textColor-muted hover:text-textColor-primary transition-colors focus:outline-none border border-border/10 dark:border-border/5"
                aria-label="Close Donation Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Scroll Wrapper */}
            <div className="relative z-10 flex-1 overflow-y-auto px-6 py-5 sm:px-8 sm:py-6 space-y-6 max-h-[calc(85vh-90px)] sm:max-h-[calc(90vh-100px)] text-left">
              
              {/* 1. Purpose Selector */}
              <div className="space-y-3">
                <h4 className="font-amiri text-base font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rotate-45 border border-accent bg-transparent shrink-0" />
                  1. Donation Purpose
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PURPOSES.map((purpose) => {
                    const isSelected = selectedPurpose === purpose;
                    return (
                      <button
                        key={purpose}
                        onClick={() => setSelectedPurpose(purpose)}
                        className={`text-center py-2.5 px-3 rounded-xl text-[11px] sm:text-xs font-inter font-bold tracking-wide transition-all duration-300 border uppercase ${
                          isSelected
                            ? "bg-accent/15 border-accent text-accent shadow-[0_0_12px_rgba(212,163,89,0.15)] dark:bg-accent/20"
                            : "bg-[#faf7f2]/50 dark:bg-stone-900/30 hover:bg-[#faf7f2] dark:hover:bg-stone-900/50 border-neutral-200 dark:border-neutral-800 text-textColor-secondary dark:text-textColor-muted"
                        }`}
                      >
                        {purpose}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Featured Orphan Home Care Campaign Card */}
              <div className="bg-[#faf7f2] dark:bg-stone-900/40 border border-accent/25 rounded-2xl p-5 relative overflow-hidden shadow-sm">
                {/* Decorative Pattern Grid background */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none">
                  <IslamicPattern opacity={1} />
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                  <div className="space-y-1.5 max-w-md">
                    <div className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-accent uppercase tracking-wider">
                      <Heart className="w-3 h-3" />
                      Featured Sponsorship
                    </div>
                    <h5 className="font-amiri text-lg font-bold text-textColor-primary">
                      Orphan Home Care
                    </h5>
                    <p className="text-[11px] sm:text-xs text-textColor-secondary dark:text-textColor-muted font-inter leading-relaxed">
                      Support fatherless children under 14 with monthly financial assistance delivered directly to their families.
                    </p>
                    <div className="text-[11px] sm:text-xs font-bold text-accent font-inter flex items-center gap-1 mt-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>₹2,000 supports one child for one month.</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSponsorClick}
                    className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-primary-dark font-bold py-2.5 px-5 rounded-xl text-xs font-inter uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 border border-accent/20 shrink-0"
                  >
                    <span>Sponsor a Child</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3. Amount Selection */}
              <div className="space-y-4">
                <h4 className="font-amiri text-base font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rotate-45 border border-accent bg-transparent shrink-0" />
                  2. Donation Amount
                </h4>
                
                {/* Visual Featured Donation Highlight Card */}
                {selectedAmount === 2000 && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-accent/5 border border-accent/20 rounded-xl p-3.5 flex items-start gap-3"
                  >
                    <div className="p-1.5 bg-accent/10 rounded-full border border-accent/20 text-accent shrink-0">
                      <Heart className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-textColor-primary">
                        ₹2,000 — Support a Child
                      </p>
                      <p className="text-[10px] sm:text-xs text-textColor-secondary dark:text-textColor-muted mt-0.5 leading-relaxed">
                        Provides monthly support for one child through the Orphan Home Care Program. Thank you for your generosity!
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Amount Chips Grid */}
                <div className="space-y-2.5">
                  {/* Row 1 */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {PRESET_AMOUNTS_ROW1.map((amt) => {
                      const isSelected = selectedAmount === amt;
                      return (
                        <button
                          key={amt}
                          onClick={() => setSelectedAmount(amt)}
                          className={`text-center py-3 px-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-300 border ${
                            isSelected
                              ? "bg-accent/15 border-accent text-accent shadow-[0_0_12px_rgba(212,163,89,0.15)] dark:bg-accent/20"
                              : "bg-[#faf7f2]/50 dark:bg-stone-900/30 hover:bg-[#faf7f2] dark:hover:bg-stone-900/50 border-neutral-200 dark:border-neutral-800 text-textColor-secondary dark:text-textColor-muted"
                          }`}
                        >
                          ₹{amt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {PRESET_AMOUNTS_ROW2.map((amt) => {
                      const isSelected = selectedAmount === amt;
                      const isSponsorAmount = amt === 2000;
                      return (
                        <motion.button
                          key={amt}
                          onClick={() => setSelectedAmount(amt)}
                          animate={isSponsorAmount && isAnimatingChildHighlight ? { scale: [1, 1.06, 1] } : {}}
                          transition={{ repeat: 2, duration: 0.5 }}
                          className={`text-center py-3 px-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-300 border relative overflow-hidden ${
                            isSelected
                              ? "bg-accent/15 border-accent text-accent shadow-[0_0_15px_rgba(212,163,89,0.2)] dark:bg-accent/20"
                              : isSponsorAmount
                              ? "border-accent/40 bg-accent/5 dark:bg-accent/5 hover:bg-accent/10 text-accent"
                              : "bg-[#faf7f2]/50 dark:bg-stone-900/30 hover:bg-[#faf7f2] dark:hover:bg-stone-900/50 border-neutral-200 dark:border-neutral-800 text-textColor-secondary dark:text-textColor-muted"
                          }`}
                        >
                          {isSponsorAmount && (
                            <span className="absolute top-0 right-0 bg-accent text-primary-dark font-inter font-bold text-[7px] uppercase tracking-wider py-0.5 px-1.5 rounded-bl">
                              Child Care
                            </span>
                          )}
                          ₹{amt}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Row 3 - Custom Amount Button */}
                  <div>
                    <button
                      onClick={() => setSelectedAmount("custom")}
                      className={`w-full text-center py-3 rounded-xl text-xs font-inter font-bold uppercase tracking-wider transition-all duration-300 border ${
                        selectedAmount === "custom"
                          ? "bg-accent/15 border-accent text-accent shadow-[0_0_12px_rgba(212,163,89,0.15)] dark:bg-accent/20"
                          : "bg-[#faf7f2]/50 dark:bg-stone-900/30 hover:bg-[#faf7f2] dark:hover:bg-stone-900/50 border-neutral-200 dark:border-neutral-800 text-textColor-secondary dark:text-textColor-muted"
                      }`}
                    >
                      Custom Amount
                    </button>
                  </div>
                </div>

                {/* Custom Amount Input Field */}
                <AnimatePresence>
                  {selectedAmount === "custom" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-1.5"
                    >
                      <label className="text-[10px] font-bold text-textColor-secondary dark:text-textColor-muted uppercase tracking-wider block font-inter">
                        Enter Custom Amount (INR)
                      </label>
                      <div className="relative flex items-center border-b-2 border-accent/30 focus-within:border-accent transition-colors py-1.5">
                        <span className="text-xl font-bold text-accent mr-2 font-mono">₹</span>
                        <input
                          type="number"
                          placeholder="Minimum 10"
                          min="10"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full bg-transparent font-mono text-lg font-bold text-textColor-primary placeholder-textColor-muted focus:outline-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 4. Payment Methods Selector */}
              <div ref={paymentsGridRef} className="space-y-4">
                <h4 className="font-amiri text-base font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rotate-45 border border-accent bg-transparent shrink-0" />
                  3. Select Payment Method
                </h4>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Google Pay */}
                  <a
                    href={getPrefilledPaymentLink("gpay", activeAmountValue, selectedPurpose)}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-surface border border-neutral-200 dark:border-neutral-800 hover:border-accent hover:shadow-[0_8px_25px_rgba(212,163,89,0.1)] transition-all duration-300 active:scale-95 group relative text-center"
                  >
                    <svg className="w-7 h-7 bg-white rounded-full p-0.5 shadow-sm group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span className="text-xs font-bold text-textColor-primary font-inter mt-2">Google Pay</span>
                  </a>

                  {/* PhonePe */}
                  <a
                    href={getPrefilledPaymentLink("phonepe", activeAmountValue, selectedPurpose)}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-surface border border-neutral-200 dark:border-neutral-800 hover:border-accent hover:shadow-[0_8px_25px_rgba(212,163,89,0.1)] transition-all duration-300 active:scale-95 group text-center"
                  >
                    <div className="w-7 h-7 bg-[#5f259f] rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform text-white font-black text-[9px] font-sans">
                      Pe
                    </div>
                    <span className="text-xs font-bold text-textColor-primary font-inter mt-2">PhonePe</span>
                  </a>

                  {/* Paytm */}
                  <a
                    href={getPrefilledPaymentLink("paytm", activeAmountValue, selectedPurpose)}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-surface border border-neutral-200 dark:border-neutral-800 hover:border-accent hover:shadow-[0_8px_25px_rgba(212,163,89,0.1)] transition-all duration-300 active:scale-95 group text-center"
                  >
                    <div className="h-7 px-2 bg-[#00baf2]/10 rounded flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <span className="text-[10px] font-black text-[#002970] font-sans uppercase">paytm</span>
                    </div>
                    <span className="text-xs font-bold text-textColor-primary font-inter mt-2">Paytm</span>
                  </a>

                  {/* BHIM UPI */}
                  <a
                    href={getPrefilledPaymentLink("bhim", activeAmountValue, selectedPurpose)}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-surface border border-neutral-200 dark:border-neutral-800 hover:border-accent hover:shadow-[0_8px_25px_rgba(212,163,89,0.1)] transition-all duration-300 active:scale-95 group text-center"
                  >
                    <div className="h-7 px-2.5 bg-neutral-50 dark:bg-stone-900 rounded flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform border border-border/10">
                      <span className="text-[10px] font-bold tracking-wider font-mono italic text-textColor-primary">BHIM <span className="text-accent font-bold">UPI</span></span>
                    </div>
                    <span className="text-xs font-bold text-textColor-primary font-inter mt-2">BHIM UPI</span>
                  </a>

                  {/* Bank Transfer */}
                  <button
                    onClick={handleBankTransferClick}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-surface border border-neutral-200 dark:border-neutral-800 hover:border-accent hover:shadow-[0_8px_25px_rgba(212,163,89,0.1)] transition-all duration-300 active:scale-95 group text-center"
                  >
                    <div className="w-7 h-7 bg-accent/15 border border-accent/20 rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform text-accent">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-textColor-primary font-inter mt-2">Bank Transfer</span>
                  </button>

                  {/* WhatsApp Support */}
                  <a
                    href={getWhatsAppLink(activeAmountValue, selectedPurpose)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-surface border border-neutral-200 dark:border-neutral-800 hover:border-accent hover:shadow-[0_8px_25px_rgba(212,163,89,0.1)] transition-all duration-300 active:scale-95 group text-center"
                  >
                    <div className="w-7 h-7 bg-[#25D366] rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform text-white">
                      <MessageSquare className="w-4 h-4 fill-current" />
                    </div>
                    <span className="text-xs font-bold text-textColor-primary font-inter mt-2">WhatsApp Support</span>
                  </a>

                </div>
              </div>

              {/* 5. Trust Section */}
              <div className="pt-4 border-t border-border/10 dark:border-border/5">
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="flex items-center gap-2 bg-[#faf7f2]/40 dark:bg-stone-900/10 p-2.5 rounded-xl border border-accent/5">
                    <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-[10px] font-bold text-textColor-secondary dark:text-textColor-muted font-inter">Secure UPI Payments</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#faf7f2]/40 dark:bg-stone-900/10 p-2.5 rounded-xl border border-accent/5">
                    <Heart className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-[10px] font-bold text-textColor-secondary dark:text-textColor-muted font-inter">Direct Community Impact</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#faf7f2]/40 dark:bg-stone-900/10 p-2.5 rounded-xl border border-accent/5">
                    <Eye className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-[10px] font-bold text-textColor-secondary dark:text-textColor-muted font-inter">Transparent Donation Process</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#faf7f2]/40 dark:bg-stone-900/10 p-2.5 rounded-xl border border-accent/5">
                    <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-[10px] font-bold text-textColor-secondary dark:text-textColor-muted font-inter">Official Initiative</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
