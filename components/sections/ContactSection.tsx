"use client";

import React from "react";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import { m } from "framer-motion";
import { CONTACT_INFO } from "@/lib/constants";
import SectionHeader from "../ui/SectionHeader";
import IslamicPattern from "../ui/IslamicPattern";

export default function ContactSection() {
  const contactDetails = [
    {
      title: "Location",
      value: (
        <a 
          href={CONTACT_INFO.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary dark:hover:text-accent hover:underline transition-colors duration-200"
        >
          {CONTACT_INFO.address}
        </a>
      ),
      icon: MapPin,
      actionText: "Open in Maps",
      link: CONTACT_INFO.mapsLink,
    },
    {
      title: "Phone & Mobile",
      value: (
        <span className="block">
          <a 
            href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
            className="hover:text-primary dark:hover:text-accent hover:underline transition-colors duration-200"
          >
            Landline: {CONTACT_INFO.phone}
          </a>
          <br />
          <a 
            href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary dark:hover:text-accent hover:underline transition-colors duration-200"
          >
            Mobile: {CONTACT_INFO.mobile} (WhatsApp)
          </a>
        </span>
      ),
      icon: Phone,
      actionText: "Call Mobile",
      link: `tel:${CONTACT_INFO.mobile.replace(/\s+/g, "")}`,
    },
    {
      title: "Email Address",
      value: (
        <a 
          href={`mailto:${CONTACT_INFO.email}`}
          className="hover:text-primary dark:hover:text-accent hover:underline transition-colors duration-200"
        >
          {CONTACT_INFO.email}
        </a>
      ),
      icon: Mail,
      actionText: "Send Mail",
      link: `mailto:${CONTACT_INFO.email}`,
    },
    {
      title: "WhatsApp Chat",
      value: (
        <a 
          href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary dark:hover:text-accent hover:underline transition-colors duration-200"
        >
          {CONTACT_INFO.whatsapp}
        </a>
      ),
      icon: MessageSquare,
      actionText: "Open WhatsApp",
      link: `https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, "")}`,
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden bg-surface">
      {/* Background visual element */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <SectionHeader
          title="Contact Administration"
          arabicTitle="اتصل بنا"
          subtitle="Reach out to our administrative office for admission inquiries, school visits, donations, or general questions."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-6">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {contactDetails.map((detail, idx) => {
              const Icon = detail.icon;
              return (
                <div
                  key={idx}
                  className="relative overflow-hidden bg-surface-alt border border-border rounded-2xl p-5 hover:border-accent hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
                >
                  <IslamicPattern opacity={0.03} />

                  <div>
                    <div className="p-2.5 bg-primary-light/10 text-primary dark:text-primary-light rounded-xl w-fit mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-amiri text-body-lg font-bold text-textColor-primary mb-1">
                      {detail.title}
                    </h4>
                    <p className="text-body-sm text-textColor-secondary dark:text-textColor-muted leading-relaxed font-inter break-words">
                      {detail.value}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/40">
                    <a
                      href={detail.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-caption font-bold text-primary dark:text-accent hover:underline flex items-center gap-1.5"
                    >
                      {detail.actionText} →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Embedded Google Maps */}
          <m.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 w-full h-full min-h-[350px] relative overflow-hidden rounded-3xl border border-border bg-surface-alt shadow-sm"
          >
            {/* Real Interactive Map Iframe */}
            <iframe
              src={CONTACT_INFO.mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Badrulhuda Academy Panamaram Location Map"
              className="absolute inset-0 w-full h-full min-h-[350px]"
            />
          </m.div>
        </div>
      </div>
    </section>
  );
}
