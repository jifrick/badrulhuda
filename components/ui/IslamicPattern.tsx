import React from "react";

interface IslamicPatternProps {
  className?: string;
  opacity?: number;
}

export default function IslamicPattern({ className = "", opacity = 0.08 }: IslamicPatternProps) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} 
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-current"
      >
        <defs>
          <pattern
            id="islamic-star-grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Primary overlapping diagonals and crosses */}
            <path
              d="M 40 0 L 51.72 28.28 L 80 40 L 51.72 51.72 L 40 80 L 28.28 51.72 L 0 40 L 28.28 28.28 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />
            {/* Secondary lines connecting points */}
            <path
              d="M 0 0 L 80 80 M 80 0 L 0 80 M 40 0 L 40 80 M 0 40 L 80 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
            {/* Interlocking squares that form secondary stars */}
            <path
              d="M 20 20 L 60 20 L 60 60 L 20 60 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M 40 12 L 68 40 L 40 68 L 12 40 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            {/* Small nodes at intersections */}
            <circle cx="40" cy="40" r="3" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="0" cy="0" r="3" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="80" cy="0" r="3" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="0" cy="80" r="3" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="80" cy="80" r="3" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-star-grid)" />
      </svg>
    </div>
  );
}
