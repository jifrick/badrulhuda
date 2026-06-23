"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import IslamicPattern from "../ui/IslamicPattern";

type LanguageKey = "en" | "ml" | "ar";

const langLabels = {
  en: "English",
  ml: "മലയാളം",
  ar: "العربية",
};

const founderMessages = {
  en: {
    dir: "ltr" as const,
    align: "text-start",
    fontClass: "font-inter text-[15px] md:text-[16px] leading-[1.7]",
    quoteClass: "font-amiri text-xl md:text-2xl leading-[1.6]",
    title: "A Message from Our Founder",
    subtitle: "كلمة المؤسس",
    quote: "“A day will come when our Creator will ask each of us how we spent our health and our time. On that day, we must be able to answer with confidence and sincerity.”",
    paragraphs: [
      "Serving society to the best of our ability is the responsibility of every individual. Among the greatest forms of service is empowering deserving people through knowledge and nourishment, enabling them to become valuable contributors to their communities and the nation.",
      "With this noble vision, Badrulhuda Academy was established in 2004 in Panamaram, Wayanad. By the grace of Allah and the generous support of many well-wishers, Badrulhuda has continued to progress commendably along its mission and goals.",
      "Many individuals have stood with us as pillars of strength throughout this journey. We remember their contributions with deep gratitude. We humbly request all those who are able to continue supporting and accompanying us in this noble mission."
    ],
    closing: "May Allah bless and reward everyone abundantly.",
    signature: "Usman Moulavi",
    role: "Founder, Badrulhuda Academy",
    location: "Panamaram, Wayanad",
    closingFontClass: "font-amiri italic text-base md:text-lg",
    signatureCardFontClass: "font-amiri text-2xl md:text-3xl italic font-bold",
    signatureProfileFontClass: "font-amiri text-2xl font-bold"
  },
  ml: {
    dir: "ltr" as const,
    align: "text-start",
    fontClass: "font-inter text-[14px] md:text-[15px] leading-[1.8]",
    quoteClass: "font-inter text-[17px] md:text-[19px] leading-[1.7] italic",
    title: "ഫൗണ്ടറുടെ സന്ദേശം",
    subtitle: "كلمة المؤسس",
    quote: "“നമ്മുടെ ആരോഗ്യവും സമയവും എന്തിന് വേണ്ടി ചിലവഴിച്ചു എന്ന് സൃഷ്ടാവായ റബ്ബ് ഓരോരുത്തരോടും ചോദിക്കുന്ന ദിനം വരും. അന്ന് അതിന് ഉത്തരം നൽകാൻ നമുക്ക് കഴിയണം.”",
    paragraphs: [
      "സമൂഹത്തിൽ നമ്മളാൽ കഴിയുന്ന സേവനങ്ങൾ ചെയ്യുക എന്നത് ഓരോ മനുഷ്യന്റെയും ഉത്തരവാദിത്തമാണ്. അതിൽ ഏറ്റവും മഹത്തായ സേവനം അർഹരായവർക്ക് അറിവും അന്നവും നൽകി അവരെ നാട്ടിനും സമൂഹത്തിനും ഉപകാരപ്പെടുന്നവരായി വളർത്തിയെടുക്കുക എന്നതാണ്.",
      "ഈ മഹത്തായ ലക്ഷ്യം സാക്ഷാത്കരിക്കുന്നതിനായി 2004-ൽ വയനാട് ജില്ലയിലെ പനമരം കേന്ദ്രമാക്കി ആരംഭിച്ച സംരംഭമാണ് ബദ്റുൽഹുദ അക്കാദമി. അല്ലാഹുവിന്റെ അനുഗ്രഹത്താലും സുമനസ്സുകളുടെ പിന്തുണയാലും ബദ്റുൽഹുദ തന്റെ ലക്ഷ്യപാതയിൽ സ്തുത്യർഹമായി മുന്നേറിക്കൊണ്ടിരിക്കുന്നു.",
      "ഈ മുന്നേറ്റത്തിന് നിരവധിയാളുകൾ താങ്ങും തണലുമായി നിന്നിട്ടുണ്ട്. അവരുടെ സേവനങ്ങൾ നന്ദിയോടെ സ്മരിക്കുന്നു. ഇനിയും ഈ ദൗത്യയാത്രയിൽ കഴിയുന്നവരൊക്കെ ഞങ്ങളോടൊപ്പം ഉണ്ടാകണമെന്ന് സ്നേഹപൂർവ്വം അഭ്യർഥിക്കുന്നു."
    ],
    closing: "അല്ലാഹു എല്ലാവരെയും അനുഗ്രഹിക്കട്ടെ.",
    signature: "ഉസ്മാൻ മൗലവി",
    role: "സ്ഥാപകൻ, ബദ്റുൽഹുദ അക്കാദമി",
    location: "പനമരം, വയനാട്",
    closingFontClass: "font-inter text-[14px] md:text-[15px] leading-relaxed",
    signatureCardFontClass: "font-inter text-xl md:text-2xl font-bold",
    signatureProfileFontClass: "font-inter text-xl md:text-2xl font-bold"
  },
  ar: {
    dir: "rtl" as const,
    align: "text-start",
    fontClass: "font-tajawal text-[15px] md:text-[16px] leading-[1.8] font-normal",
    quoteClass: "font-tajawal text-[18px] md:text-[20px] leading-[1.6] font-bold",
    title: "كلمة المؤسس",
    subtitle: "رسالة من الشيخ عثمان المولوي",
    quote: "«سيأتي يومٌ يسألنا فيه ربُّنا الخالق: كيف أنفقنا صحتنا وأوقاتنا؟ وفي ذلك اليوم ينبغي أن نكون قادرين على تقديم الجواب.»",
    paragraphs: [
      "إن خدمة المجتمع بما نستطيع هي مسؤولية تقع على عاتق كل إنسان. ومن أعظم صور الخدمة أن نمنح المستحقين العلم والغذاء، ونُعِدَّهم ليكونوا أفرادًا نافعين لوطنهم ومجتمعهم.",
      "ومن أجل تحقيق هذا الهدف النبيل، أُسِّست أكاديمية بدر الهدى عام 2004م في بانامارام بمنطقة واياناد. وبفضل الله تعالى، ثم بدعم المخلصين وأهل الخير، تواصل أكاديمية بدر الهدى مسيرتها المباركة بخطى ثابتة نحو تحقيق رسالتها وأهدافها.",
      "لقد كان لكثير من الناس دورٌ كبير في دعم هذه المسيرة ومساندتها، ونحن نذكر جهودهم بكل امتنان وتقدير. كما نرجو من كل من يستطيع أن يواصل الوقوف معنا والمشاركة في هذه الرسالة النبيلة."
    ],
    closing: "نسأل الله تعالى أن يبارك الجميع ويجزيهم خير الجزاء.",
    signature: "عثمان المولوي",
    role: "المؤسس، أكاديمية بدر الهدى",
    location: "بانامارام، واياناد",
    closingFontClass: "font-tajawal text-[15px] md:text-[16px] font-medium leading-relaxed",
    signatureCardFontClass: "font-tajawal text-xl md:text-2xl font-bold",
    signatureProfileFontClass: "font-tajawal text-xl md:text-2xl font-bold"
  }
};

export default function FounderSection() {
  const [currentLang, setCurrentLang] = useState<LanguageKey>("en");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentMsg = founderMessages[currentLang];

  // Animation variants with 0.8s duration
  const photoVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="founder"
      className="relative flex items-center min-h-screen py-6 px-6 md:px-12 overflow-hidden bg-surface-alt transition-colors duration-300"
    >
      {/* Dynamic custom thin scrollbar injected for the founder scrollable container */}
      <style dangerouslySetInnerHTML={{ __html: `
        .founder-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .founder-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .founder-scroll::-webkit-scrollbar-thumb {
          background: rgba(201, 168, 76, 0.3);
          border-radius: 4px;
        }
        .founder-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(201, 168, 76, 0.6);
        }
      `}} />

      {/* Subtle background gold radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* 4% opacity soft gold Islamic tessellation background pattern (Reduced visual noise) */}
      <IslamicPattern opacity={0.04} className="z-0 animate-pattern-float text-accent/20" />

      {/* Large faint Arabic Calligraphy Watermark behind content */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-tajawal text-[26vw] md:text-[20vw] text-accent opacity-[0.015] dark:opacity-[0.01] leading-none whitespace-nowrap font-black">
          العلم نور
        </span>
      </div>

      <div className="max-w-6xl mx-auto z-10 relative w-full">
        {/* Subtle unified backing board to visually tie the elements together as a single component */}
        <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 rounded-3xl opacity-30 dark:opacity-15 blur-sm pointer-events-none border border-accent/5 hidden lg:block" />

        {/* Reduced horizontal spacing (gap-6 lg:gap-10) and vertically centered on desktop for balanced framing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 lg:items-center items-start relative z-10">
          
          {/* LEFT COLUMN: Founder Portrait */}
          <m.div
            variants={photoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end w-full"
          >
            {/* Wrapper to keep portrait and identity block perfectly centered relative to each other (slightly reduced max-width for better balance) */}
            <div className="flex flex-col items-center w-full max-w-[285px]">
              {/* Single Elegant Frame around the Portrait with subtle inner golden hairline border */}
              <div className="relative w-full aspect-[4/4.5] p-2.5 rounded-2xl bg-white dark:bg-surface border border-accent/15 shadow-xl dark:shadow-black/45 hover:border-accent/35 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500">
                
                {/* Elegant internal hairline frame for depth */}
                <div className="absolute inset-2.5 border border-accent/10 rounded-xl pointer-events-none z-10" />

                {/* Image Wrapper */}
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-surface-alt">
                  <Image
                    src="/images/founder img.png"
                    alt="Usman Moulavi"
                    fill
                    sizes="(max-w-768px) 100vw, 285px"
                    priority
                    className="object-cover object-[center_35%] grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>

              {/* Premium Founder Identity Block directly below the portrait */}
              <div className="text-center mt-4 w-full space-y-1">
                {/* Subtle Gold Divider */}
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent mb-3" />
                
                <h3 className={`text-textColor-primary tracking-wide transition-all duration-300 ${currentMsg.signatureProfileFontClass}`}>
                  {currentMsg.signature}
                </h3>
                <div className="text-[11px] font-bold uppercase tracking-widest text-accent dark:text-accent-light font-inter mt-1.5 transition-all duration-300">
                  {currentMsg.role}
                </div>
                <div className="text-[10px] text-textColor-muted font-inter transition-all duration-300">
                  {currentMsg.location}
                </div>
              </div>
            </div>
          </m.div>

          {/* RIGHT COLUMN: Headings and Letter Message wrapped in a card */}
          <m.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col justify-start w-full z-10"
          >
            {/* Premium Founder's Message Card with viewport-aware height so it fits the screen */}
            <div className="relative w-full h-[calc(100vh-220px)] max-h-[600px] min-h-[420px] p-6 md:p-9 lg:p-10 rounded-2xl bg-white dark:bg-surface border border-accent/15 shadow-xl dark:shadow-black/45 overflow-hidden flex flex-col hover:border-accent/35 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500">
              
              {/* Elegant internal hairline frame for depth, matching the portrait card */}
              <div className="absolute inset-2.5 border border-accent/10 rounded-xl pointer-events-none z-10" />

              {/* Subtle background Islamic Pattern inside the card */}
              <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01] pointer-events-none z-0">
                <IslamicPattern opacity={1} className="text-accent/40" />
              </div>
              
              {/* Gold gradient radial glow inside the card */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/5 blur-3xl rounded-full pointer-events-none z-0" />

              {/* Minimal Premium Language Switcher (using logical placement: end-4 md:end-6) */}
              <div className="absolute top-4 md:top-6 end-4 md:end-6 z-30" ref={dropdownRef}>
                <div className="relative inline-block">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/15 bg-surface-alt hover:bg-accent/10 hover:border-accent/30 text-textColor-primary hover:text-accent transition-all duration-300 text-xs font-semibold shadow-sm focus:outline-none"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    <Globe className="w-3.5 h-3.5 text-accent transition-transform duration-500 group-hover:rotate-45" />
                    <span className="font-inter">{langLabels[currentLang]}</span>
                    <ChevronDown className={`w-3 h-3 text-textColor-muted transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <m.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute end-0 mt-2 w-32 rounded-xl bg-white dark:bg-surface-alt border border-accent/20 dark:border-accent/10 shadow-xl py-1 z-50 overflow-hidden"
                      >
                        {(["en", "ml", "ar"] as const).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => {
                              setCurrentLang(lang);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-start px-4 py-2 text-xs font-semibold transition-colors duration-200 ${
                              currentLang === lang
                                ? "bg-accent/15 text-accent dark:bg-accent/10 dark:text-accent-light"
                                : "text-textColor-secondary hover:bg-accent/5 hover:text-accent dark:hover:text-accent-light"
                            }`}
                          >
                            {langLabels[lang]}
                          </button>
                        ))}
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Headings - fixed height container prevents visual jumping */}
              <div className="h-20 flex flex-col justify-center mb-5 pe-14 shrink-0">
                <span className="font-tajawal text-2xl md:text-3xl text-accent dark:text-accent-light tracking-wide leading-none font-bold block">
                  {currentMsg.title}
                </span>
                <span className="font-tajawal text-[14px] md:text-[16px] text-textColor-primary font-semibold tracking-wide block opacity-90 truncate mt-1">
                  {currentMsg.subtitle}
                </span>
                {/* Thin Gold Gradient Divider (matches LTR/RTL text direction automatically) */}
                <div className="w-16 h-[1px] bg-gradient-to-r rtl:bg-gradient-to-l from-accent/5 to-transparent mt-2 shrink-0" />
              </div>

              {/* Scrollable Message Content Container - Animates on language switch */}
              <div className="relative z-10 flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <m.div
                    key={currentLang}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    dir={currentMsg.dir}
                    className={`h-full overflow-y-auto founder-scroll pr-1 rtl:pl-1 rtl:pr-0 ${currentMsg.align}`}
                  >
                    <div className="space-y-6 pb-4">
                      {/* Elegant Bismillah line centered with custom letter spacing */}
                      <div className="font-tajawal text-[10px] md:text-xs text-accent dark:text-accent-light tracking-[0.2em] font-bold uppercase pt-1 text-center opacity-85">
                        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
                      </div>

                      {/* Inspirational Founder Quote styled as an institutional quote block */}
                      <div className={`relative border-s-2 border-accent/30 ps-4 py-2.5 my-5 text-textColor-primary text-start font-medium bg-accent/[0.02] rounded-e-xl pe-3 ${currentMsg.quoteClass}`}>
                        {currentMsg.quote}
                      </div>

                      {/* Editorial Message Layout (Remaining paragraphs with logical border) */}
                      <div className="border-s border-accent/15 ps-5 md:ps-6 space-y-4">
                        <div className={`text-textColor-primary font-normal antialiased ${currentMsg.fontClass}`}>
                          {currentMsg.paragraphs.map((paragraph, index) => (
                            <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
                          ))}
                        </div>
                      </div>

                      {/* Premium Signature Area */}
                      <div className="pt-4 space-y-4">
                        <p className={`text-textColor-secondary ${currentMsg.closingFontClass}`}>
                          {currentMsg.closing}
                        </p>
                        
                        <div className="pt-2">
                          <span className={`text-accent dark:text-accent-light block tracking-wide ${currentMsg.signatureCardFontClass}`}>
                            {currentMsg.signature}
                          </span>
                          <span className="text-[11px] font-bold uppercase tracking-widest text-textColor-muted font-inter mt-1.5 block">
                            {currentMsg.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  </m.div>
                </AnimatePresence>
              </div>

            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
}
