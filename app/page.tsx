import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import FounderSection from "@/components/sections/FounderSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import CampusHighlights from "@/components/sections/CampusHighlights";
import OrphanCareSection from "@/components/sections/OrphanCareSection";
import AdmissionsCTA from "@/components/sections/AdmissionsCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Hero banner panel */}
      <HeroSection />

      {/* Founder Message Section */}
      <FounderSection />

      {/* Academic Pathways */}
      <ProgramsSection isHome={true} />

      {/* Campus Highlights */}
      <CampusHighlights />

      {/* Orphan Home Care Program Section */}
      <OrphanCareSection />

      {/* Admissions CTA */}
      <AdmissionsCTA />
    </div>
  );
}
export const dynamic = "force-static";
export const revalidate = false;
