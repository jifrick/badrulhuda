import React from "react";
import { Star } from "lucide-react";
import { m } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  arabicTitle?: string;
  subtitle?: string;
  centered?: boolean;
  inverse?: boolean; // For display on primary background colors
}

export default function SectionHeader({
  title,
  arabicTitle,
  subtitle,
  centered = true,
  inverse = false,
}: SectionHeaderProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col mb-12 ${
        centered ? "items-center text-center justify-center" : "items-start text-left"
      }`}
    >
      {arabicTitle && (
        <span className="font-tajawal text-display-md text-accent mb-1 tracking-wide font-bold block animate-fade-in">
          {arabicTitle}
        </span>
      )}
      
      <h2 
        className={`font-amiri text-display-lg font-bold tracking-tight md:text-5xl ${
          inverse ? "text-white" : "text-textColor-primary"
        }`}
      >
        {title}
      </h2>
      
      {/* Decorative separator line */}
      <div 
        className={`flex items-center gap-3 my-4 w-full max-w-[240px] ${
          centered ? "justify-center" : "justify-start"
        }`}
      >
        <span className={`h-[1px] flex-grow ${inverse ? "bg-white/20" : "bg-primary-light/20"}`} />
        <Star className={`w-3.5 h-3.5 rotate-45 fill-current ${inverse ? "text-accent-light" : "text-accent"}`} />
        <span className={`h-[1px] flex-grow ${inverse ? "bg-white/20" : "bg-primary-light/20"}`} />
      </div>

      {subtitle && (
        <p 
          className={`text-body-md max-w-2xl font-inter leading-relaxed ${
            inverse ? "text-white/80" : "text-textColor-secondary"
          }`}
        >
          {subtitle}
        </p>
      )}
    </m.div>
  );
}
