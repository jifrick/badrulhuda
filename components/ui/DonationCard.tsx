import React from "react";
import CopyButton from "./CopyButton";
import { Info } from "lucide-react";

const getPaymentLink = () => {
  const upiId = "badrulhuda@sbi";
  const name = "Badrulhuda Academy";
  const note = "Donation to Badrulhuda";
  
  const baseUpi = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&cu=INR&tn=${encodeURIComponent(note)}`;
  
  if (typeof window === "undefined") return baseUpi;
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isAndroid = /android/.test(userAgent);
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  
  if (isAndroid) {
    return `intent://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&cu=INR&tn=${encodeURIComponent(note)}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;S.browser_fallback_url=${encodeURIComponent(baseUpi)};end`;
  } else if (isIOS) {
    return `gpay://upi/pay?pa=${upiId}&pn=${encodeURIComponent(name)}&cu=INR&tn=${encodeURIComponent(note)}`;
  }
  
  return baseUpi;
};

export default function DonationCard() {
  const bankDetails = {
    bank: "State Bank of India",
    branch: "Kalpetta",
    ifsc: "SBIN0070192",
    account: "57068195307",
    upi: "badrulhuda@sbi",
  };

  return (
    <div className="bg-white dark:bg-surface border border-accent/15 dark:border-accent/10 rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_15px_45px_rgba(0,0,0,0.25)] transition-all duration-500 w-full relative overflow-hidden">
      
      {/* Premium inset gold border frame with corner accents */}
      <div className="absolute inset-2.5 border border-accent/10 rounded-[20px] pointer-events-none">
        <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-accent/30" />
        <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-accent/30" />
        <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-accent/30" />
        <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-accent/30" />
      </div>

      {/* Heading */}
      <h3 className="font-amiri text-lg tracking-[0.2em] font-medium text-accent text-center uppercase mt-2">
        Bank Transfer
      </h3>

      {/* Decorative ornament divider */}
      <div className="flex items-center justify-center gap-3 mt-3.5 mb-6">
        <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-accent/30" />
        <span className="w-1.5 h-1.5 rotate-45 border border-accent/50 bg-transparent" />
        <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-accent/30" />
      </div>

      <div className="space-y-1 text-body-md font-inter z-10 relative">
        <div className="flex justify-between items-center py-5 border-b border-border/30 dark:border-border/10">
          <span className="text-textColor-secondary dark:text-textColor-muted font-semibold text-[10px] sm:text-xs uppercase tracking-[0.15em]">Bank</span>
          <span className="text-textColor-primary font-bold text-sm sm:text-base text-right">{bankDetails.bank}</span>
        </div>
        
        <div className="flex justify-between items-center py-5 border-b border-border/30 dark:border-border/10">
          <span className="text-textColor-secondary dark:text-textColor-muted font-semibold text-[10px] sm:text-xs uppercase tracking-[0.15em]">Branch</span>
          <span className="text-textColor-primary font-bold text-sm sm:text-base text-right">{bankDetails.branch}</span>
        </div>

        <div className="flex justify-between items-center py-5 border-b border-border/30 dark:border-border/10">
          <span className="text-textColor-secondary dark:text-textColor-muted font-semibold text-[10px] sm:text-xs uppercase tracking-[0.15em]">IFSC Code</span>
          <div className="flex items-center gap-3">
            <span className="text-textColor-primary font-mono font-bold tracking-wider text-sm sm:text-base">{bankDetails.ifsc}</span>
            <CopyButton textToCopy={bankDetails.ifsc} ariaLabel="Copy IFSC Code" />
          </div>
        </div>

        <div className="flex justify-between items-center py-5 border-b border-border/30 dark:border-border/10">
          <span className="text-textColor-secondary dark:text-textColor-muted font-semibold text-[10px] sm:text-xs uppercase tracking-[0.15em]">Account</span>
          <div className="flex items-center gap-3">
            <span className="text-textColor-primary font-mono font-bold tracking-wider text-base sm:text-lg">{bankDetails.account}</span>
            <CopyButton textToCopy={bankDetails.account} ariaLabel="Copy Bank Account Number" />
          </div>
        </div>

        <div className="flex justify-between items-center py-5">
          <span className="text-textColor-secondary dark:text-textColor-muted font-semibold text-[10px] sm:text-xs uppercase tracking-[0.15em]">UPI ID</span>
          <div className="flex items-center gap-3">
            <span className="text-textColor-primary font-mono font-bold text-sm sm:text-base">{bankDetails.upi}</span>
            <CopyButton textToCopy={bankDetails.upi} ariaLabel="Copy UPI ID" />
          </div>
        </div>
      </div>

      {/* Pay with GPay / UPI Button */}
      <div className="mt-6 flex flex-col items-center justify-center gap-2 z-10 relative">
        <a
          href={getPaymentLink()}
          className="w-full max-w-[240px] inline-flex items-center justify-center gap-2.5 bg-[#1A1A1A] hover:bg-black text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all duration-300 active:scale-95 text-xs font-inter uppercase tracking-wider border border-neutral-800"
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
          <span>Pay with GPay / UPI</span>
        </a>
      </div>

      {/* Redesigned Premium Acknowledgement Box */}
      <div className="mt-8 bg-[#faf7f2]/60 dark:bg-stone-900/30 border border-accent/10 rounded-2xl p-4 flex gap-3.5 items-start text-left z-10 relative">
        <div className="p-1.5 bg-accent/10 rounded-full border border-accent/20 text-accent shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <p className="text-[11px] leading-relaxed text-textColor-secondary dark:text-textColor-muted font-inter font-medium tracking-wide">
          Please notify the office or share a receipt screenshot to generate an official donation acknowledgement.
        </p>
      </div>
    </div>
  );
}
