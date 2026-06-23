import React from "react";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">
      <AboutSection />
      <StatsSection />
    </div>
  );
}
