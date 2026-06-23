import React from "react";
import * as Icons from "lucide-react";
import { Program } from "@/lib/constants";
import IslamicPattern from "./IslamicPattern";
import { m } from "framer-motion";

interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  // Safe fallback for Lucide icons
  const LucideIcon = (Icons as any)[program.icon] || Icons.BookOpen;

  return (
    <m.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md group flex flex-col justify-between h-full transition-all duration-300 ${
        program.highlight
          ? "bg-primary text-white border border-accent/30"
          : "bg-surface border border-border text-textColor-primary hover:border-accent/30"
      }`}
    >
      {/* Premium top accent gold bar */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      
      {/* Structural Islamic Pattern watermark inside card */}
      <IslamicPattern opacity={program.highlight ? 0.03 : 0.015} className="z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Header row: Icon & Arabic title */}
          <div className="flex justify-between items-center mb-3">
            <div
              className={`p-2 rounded-lg transition-all duration-300 group-hover:scale-105 ${
                program.highlight 
                  ? "bg-accent/20 border border-accent/25 text-accent-light" 
                  : "bg-accent/10 border border-accent/20 text-accent"
              }`}
            >
              <LucideIcon className="w-5 h-5" />
            </div>
            <span 
              className={`font-tajawal text-xs font-bold tracking-wide ${
                program.highlight ? "text-accent-light" : "text-accent dark:text-accent-light"
              }`}
            >
              {program.arabicTitle}
            </span>
          </div>

          {/* Title */}
          <h3 
            className={`font-amiri text-xl md:text-2xl font-bold mb-2 tracking-wide leading-tight ${
              program.highlight ? "text-white" : "text-textColor-primary"
            }`}
          >
            {program.title}
          </h3>
          
          {/* Description */}
          <p 
            className={`text-xs md:text-[13px] leading-relaxed mb-4 font-inter font-normal antialiased text-start ${
              program.highlight ? "text-white/80" : "text-textColor-secondary"
            }`}
          >
            {program.description}
          </p>
        </div>

        {/* Student Type Badges */}
        {program.badges && program.badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {program.badges.map((badge, index) => (
              <span
                key={index}
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full border transition-colors duration-250 ${
                  program.highlight
                    ? "bg-white/10 border-white/20 text-accent-light"
                    : "bg-accent/5 border-accent/15 text-accent dark:bg-accent/10 dark:border-accent/10 dark:text-accent-light"
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </m.div>
  );
}
