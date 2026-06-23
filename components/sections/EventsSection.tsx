"use client";

import React from "react";
import { m } from "framer-motion";
import { useSiteData } from "@/lib/context/SiteDataContext";
import EventCard from "../ui/EventCard";
import SectionHeader from "../ui/SectionHeader";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function EventsSection() {
  const { events } = useSiteData();
  return (
    <section id="events" className="relative py-24 px-6 overflow-hidden bg-surface">
      {/* Visual background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-accent/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <SectionHeader
          title="Upcoming Events"
          arabicTitle="الفعاليات القادمة"
          subtitle="Join us for our upcoming academic seminars, community outreach activities, and spiritual events in Wayanad."
        />

        {/* Responsive horizontal scroll container on mobile, standard grid on desktop */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex overflow-x-auto pb-4 gap-6 snap-x-mandatory scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0 mt-6"
        >
          {events.map((event) => (
            <m.div 
              key={event.id} 
              variants={fadeInUp}
              className="min-w-[290px] sm:min-w-[340px] md:min-w-0 flex-shrink-0 snap-start"
            >
              <EventCard event={event} />
            </m.div>
          ))}
        </m.div>

        {/* Mobile Swipe Indicators */}
        <p className="text-center text-[11px] text-textColor-muted mt-4 md:hidden font-inter animate-pulse">
          ← Swipe left/right to view more events →
        </p>
      </div>
    </section>
  );
}
