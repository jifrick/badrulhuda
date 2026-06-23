"use client";

import React from "react";
import { m } from "framer-motion";
import { STATS } from "@/lib/constants";
import AnimatedCounter from "../ui/AnimatedCounter";
import IslamicPattern from "../ui/IslamicPattern";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function StatsSection() {
  return (
    <section className="relative bg-primary text-white py-16 px-6 overflow-hidden shadow-inner">
      {/* 10% Opacity Pattern overlay */}
      <IslamicPattern opacity={0.1} />

      <div className="max-w-7xl mx-auto z-10 relative">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center"
        >
          {STATS.map((stat, index) => (
            <m.div 
              key={index} 
              variants={fadeInUp}
              className="flex flex-col items-center justify-center space-y-1.5 p-4 border border-white/5 rounded-2xl bg-white/[0.02] backdrop-blur-[1px]"
            >
              {/* Large Animated Counter Number */}
              <div className="font-amiri text-5xl md:text-6xl font-extrabold text-accent flex items-baseline justify-center">
                <AnimatedCounter value={stat.value} suffix="" duration={2} />
                <span className="text-3xl font-bold ml-0.5 text-accent-light">
                  {stat.suffix}
                </span>
              </div>

              {/* Muted label description */}
              <span className="text-body-sm font-semibold tracking-wider text-white/90 uppercase font-inter">
                {stat.label}
              </span>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
