"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";

interface CopyButtonProps {
  textToCopy: string;
  ariaLabel?: string;
}

export default function CopyButton({ textToCopy, ariaLabel = "Copy text" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleCopy}
        className="w-7 h-7 inline-flex items-center justify-center rounded-full border border-border/60 dark:border-border/10 text-textColor-muted hover:text-accent hover:border-accent/30 bg-transparent hover:bg-accent/5 transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        aria-label={ariaLabel}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <m.div
              key="check"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-emerald-500 dark:text-emerald-400"
            >
              <Check className="w-3 h-3" />
            </m.div>
          ) : (
            <m.div
              key="copy"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Copy className="w-3 h-3" />
            </m.div>
          )}
        </AnimatePresence>
      </button>

      {/* Copied confirmation tooltip */}
      <AnimatePresence>
        {copied && (
          <m.div
            initial={{ opacity: 0, y: 4, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: -32, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, x: "-50%" }}
            className="absolute left-1/2 z-30 bg-textColor-primary text-textColor-muted dark:bg-textColor-muted dark:text-textColor-primary text-[11px] font-medium py-1 px-2 rounded-md shadow-lg pointer-events-none whitespace-nowrap"
          >
            Copied!
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
