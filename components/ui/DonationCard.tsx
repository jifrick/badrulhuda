import React from "react";
import CopyButton from "./CopyButton";
import { Info } from "lucide-react";

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
