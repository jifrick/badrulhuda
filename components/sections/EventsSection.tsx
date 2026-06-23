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

        {/* Vertical grid on mobile, 2-col on tablet, 3-col on desktop */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
        >
          {events.map((event) => (
            <m.div 
              key={event.id} 
              variants={fadeInUp}
            >
              <EventCard event={event} />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
