"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { PROGRAMS, EVENTS, CONTACT_INFO, Program, EventItem } from "@/lib/constants";
import { GALLERY_CONFIG, GallerySectionConfig, GalleryImage } from "@/lib/gallery-config";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

// --- INTERFACES ---

export interface AdmissionApplication {
  id: string;
  studentName: string;
  parentName: string;
  phone: string;
  place: string;
  dob: string;
  education: string;
  program: string;
  status: "Pending" | "Accepted" | "Rejected";
  dateApplied: string;
}

export interface OrphanBeneficiary {
  id: string;
  childName: string;
  guardianName: string;
  address: string;
  phone: string;
  supportStatus: "Active" | "Pending" | "Suspended";
  notes?: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: "News" | "Notice" | "Admission" | "Event";
  content: string;
  active: boolean;
}

export interface DonationDetails {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
  upiId: string;
  campaigns: { id: string; name: string; target: string; raised: string }[];
}

export interface HomepageHero {
  title: string;
  subtitle: string;
}

export interface SiteSettings {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  twitterUrl: string;
}

export interface SiteDataContextType {
  homepageHero: HomepageHero;
  programs: Program[];
  galleryConfig: GallerySectionConfig;
  events: EventItem[];
  admissionsApplications: AdmissionApplication[];
  orphanBeneficiaries: OrphanBeneficiary[];
  announcements: Announcement[];
  donationDetails: DonationDetails;
  contactInfo: typeof CONTACT_INFO;
  settings: SiteSettings;
  isLoaded: boolean;
  
  // Setters
  updateHomepageHero: (hero: HomepageHero) => void;
  updatePrograms: (programs: Program[]) => void;
  updateGalleryConfig: (config: GallerySectionConfig) => void;
  updateEvents: (events: EventItem[]) => void;
  addAdmissionApplication: (app: Omit<AdmissionApplication, "id" | "dateApplied" | "status">) => void;
  updateAdmissionApplicationStatus: (id: string, status: "Pending" | "Accepted" | "Rejected") => void;
  deleteAdmissionApplication: (id: string) => void;
  updateOrphanBeneficiaries: (beneficiaries: OrphanBeneficiary[]) => void;
  updateAnnouncements: (announcements: Announcement[]) => void;
  updateDonationDetails: (details: DonationDetails) => void;
  updateContactInfo: (info: typeof CONTACT_INFO) => void;
  updateSettings: (settings: SiteSettings) => void;
  resetAllToDefault: () => void;
}

// --- DEFAULTS ---

const defaultHomepageHero: HomepageHero = {
  title: "Rooted in Faith. Rising Through Knowledge.",
  subtitle: "Guided by the Qur'an and Prophetic tradition, Badrulhuda Academy nurtures knowledgeable, compassionate, and responsible individuals prepared to serve their communities and uphold Islamic values.",
};

const defaultAnnouncements: Announcement[] = [];

const defaultDonationDetails: DonationDetails = {
  bankName: "Federal Bank",
  accountNumber: "15240200008542",
  ifscCode: "FDRL0001524",
  branch: "Panamaram Branch",
  upiId: "badrulhudawyd@federal",
  campaigns: [
    { id: "1", name: "Orphan Home Care support", target: "50,000", raised: "32,500" },
    { id: "2", name: "Mosque & Campus Expansion", target: "1,50,000", raised: "95,000" },
    { id: "3", name: "Student Scholarship Fund", target: "80,000", raised: "42,000" },
  ],
};

const defaultOrphanBeneficiaries: OrphanBeneficiary[] = [];

const defaultSettings: SiteSettings = {
  seoTitle: "Badrulhuda Academy | Islamic Scholars & Integrated Education",
  seoDescription: "Bridging sacred Islamic knowledge with modern educational excellence at Panamaram, Wayanad, Kerala.",
  seoKeywords: "Badrulhuda Academy, Wayanad Dars, Hifz Wayanad, Islamic Integrated Education Kerala, Panamaram Academy",
  facebookUrl: "https://facebook.com/badrulhuda",
  instagramUrl: "https://instagram.com/badrulhuda",
  youtubeUrl: "https://youtube.com/badrulhuda",
  twitterUrl: "https://twitter.com/badrulhuda",
};

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [homepageHero, setHomepageHero] = useState<HomepageHero>(defaultHomepageHero);
  const [programs, setPrograms] = useState<Program[]>(PROGRAMS);
  const [galleryConfig, setGalleryConfig] = useState<GallerySectionConfig>(GALLERY_CONFIG);
  const [events, setEvents] = useState<EventItem[]>(EVENTS);
  const [admissionsApplications, setAdmissionsApplications] = useState<AdmissionApplication[]>([]);
  const [orphanBeneficiaries, setOrphanBeneficiaries] = useState<OrphanBeneficiary[]>(defaultOrphanBeneficiaries);
  const [announcements, setAnnouncements] = useState<Announcement[]>(defaultAnnouncements);
  const [donationDetails, setDonationDetails] = useState<DonationDetails>(defaultDonationDetails);
  const [contactInfo, setContactInfo] = useState<typeof CONTACT_INFO>(CONTACT_INFO);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  const pathname = usePathname();
  const lastFetchTimeRef = useRef<number>(0);

  const loadData = async (force: boolean = false) => {
    const now = Date.now();
    // Throttle fetches on navigation to once every 60 seconds
    if (!force && now - lastFetchTimeRef.current < 60000) {
      return;
    }
    lastFetchTimeRef.current = now;

    // First populate with local storage / defaults immediately (fast response) if not loaded yet
    const getStored = (key: string, fallback: any) => {
      try {
        const item = typeof window !== "undefined" ? localStorage.getItem(`bdr_cms_${key}`) : null;
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        return fallback;
      }
    };

    if (!isLoaded) {
      setHomepageHero(getStored("homepageHero", defaultHomepageHero));
      setPrograms(getStored("programs", PROGRAMS));
      setGalleryConfig(getStored("galleryConfig", GALLERY_CONFIG));
      setEvents(getStored("events", EVENTS));
      setAdmissionsApplications(getStored("admissionsApplications", []));
      setOrphanBeneficiaries(getStored("orphanBeneficiaries", defaultOrphanBeneficiaries));
      setAnnouncements(getStored("announcements", defaultAnnouncements));
      setDonationDetails(getStored("donationDetails", defaultDonationDetails));
      setContactInfo(getStored("contactInfo", CONTACT_INFO));
      setSettings(getStored("settings", defaultSettings));
    }

    // Then query Supabase to overwrite with latest server-side database truth (only if configured)
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("site_content").select("*");
        if (error) {
          console.warn("Supabase content table not accessible. Falling back to local data. Setup SQL tables if this is a fresh setup.", error);
        } else if (data && data.length > 0) {
          data.forEach((row) => {
            switch (row.key) {
              case "homepageHero": setHomepageHero(row.value); break;
              case "programs": setPrograms(row.value); break;
              case "galleryConfig": setGalleryConfig(row.value); break;
              case "events": setEvents(row.value); break;
              case "admissionsApplications": setAdmissionsApplications(row.value); break;
              case "orphanBeneficiaries": setOrphanBeneficiaries(row.value); break;
              case "announcements": setAnnouncements(row.value); break;
              case "donationDetails": setDonationDetails(row.value); break;
              case "contactInfo": setContactInfo(row.value); break;
              case "settings": setSettings(row.value); break;
            }
          });
        }
      } catch (e) {
        console.warn("Unhandled exception loading data from Supabase:", e);
      } finally {
        setIsLoaded(true);
      }
    } else {
      setIsLoaded(true);
    }
  };

  // Load from Supabase (with localStorage/constants fallback for resiliency)
  useEffect(() => {
    loadData(true);
  }, []);

  // Re-fetch on pathname changes (navigation) if throttled limit has passed
  useEffect(() => {
    // Don't re-fetch on admin pages to avoid unnecessary database queries while editing
    if (pathname && !pathname.startsWith("/admin")) {
      loadData(false);
    }
  }, [pathname]);

  // Save to both Supabase database and browser localStorage for resilience
  const saveItem = async (key: string, value: any) => {
    lastFetchTimeRef.current = 0; // Clear throttle so navigation immediately re-fetches updated data
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(`bdr_cms_${key}`, JSON.stringify(value));
      }
    } catch (e) {
      console.error("Error writing to localStorage:", e);
    }

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from("site_content").upsert({
          key,
          value,
          updated_at: new Date().toISOString()
        });
        if (error) {
          console.error(`Supabase save error for key "${key}":`, error);
        }
      } catch (e) {
        console.error(`Exception during Supabase upsert for "${key}":`, e);
      }
    }
  };

  const updateHomepageHero = (hero: HomepageHero) => {
    setHomepageHero(hero);
    saveItem("homepageHero", hero);
  };

  const updatePrograms = (newPrograms: Program[]) => {
    setPrograms(newPrograms);
    saveItem("programs", newPrograms);
  };

  const updateGalleryConfig = (newConfig: GallerySectionConfig) => {
    setGalleryConfig(newConfig);
    saveItem("galleryConfig", newConfig);
  };

  const updateEvents = (newEvents: EventItem[]) => {
    setEvents(newEvents);
    saveItem("events", newEvents);
  };

  const addAdmissionApplication = (app: Omit<AdmissionApplication, "id" | "dateApplied" | "status">) => {
    const newApp: AdmissionApplication = {
      ...app,
      id: Math.random().toString(36).substr(2, 9),
      dateApplied: new Date().toISOString().split("T")[0],
      status: "Pending",
    };
    const updated = [newApp, ...admissionsApplications];
    setAdmissionsApplications(updated);
    saveItem("admissionsApplications", updated);
  };

  const updateAdmissionApplicationStatus = (id: string, status: "Pending" | "Accepted" | "Rejected") => {
    const updated = admissionsApplications.map(app => 
      app.id === id ? { ...app, status } : app
    );
    setAdmissionsApplications(updated);
    saveItem("admissionsApplications", updated);
  };

  const deleteAdmissionApplication = (id: string) => {
    const updated = admissionsApplications.filter(app => app.id !== id);
    setAdmissionsApplications(updated);
    saveItem("admissionsApplications", updated);
  };

  const updateOrphanBeneficiaries = (newBeneficiaries: OrphanBeneficiary[]) => {
    setOrphanBeneficiaries(newBeneficiaries);
    saveItem("orphanBeneficiaries", newBeneficiaries);
  };

  const updateAnnouncements = (newAnnouncements: Announcement[]) => {
    setAnnouncements(newAnnouncements);
    saveItem("announcements", newAnnouncements);
  };

  const updateDonationDetails = (newDetails: DonationDetails) => {
    setDonationDetails(newDetails);
    saveItem("donationDetails", newDetails);
  };

  const updateContactInfo = (newInfo: typeof CONTACT_INFO) => {
    setContactInfo(newInfo);
    saveItem("contactInfo", newInfo);
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    saveItem("settings", newSettings);
  };

  const resetAllToDefault = async () => {
    if (confirm("Are you sure you want to reset all content modifications back to their factory defaults?")) {
      try {
        localStorage.removeItem("bdr_cms_homepageHero");
        localStorage.removeItem("bdr_cms_programs");
        localStorage.removeItem("bdr_cms_galleryConfig");
        localStorage.removeItem("bdr_cms_events");
        localStorage.removeItem("bdr_cms_admissionsApplications");
        localStorage.removeItem("bdr_cms_orphanBeneficiaries");
        localStorage.removeItem("bdr_cms_announcements");
        localStorage.removeItem("bdr_cms_donationDetails");
        localStorage.removeItem("bdr_cms_contactInfo");
        localStorage.removeItem("bdr_cms_settings");
        
        setHomepageHero(defaultHomepageHero);
        setPrograms(PROGRAMS);
        setGalleryConfig(GALLERY_CONFIG);
        setEvents(EVENTS);
        setAdmissionsApplications([]);
        setOrphanBeneficiaries(defaultOrphanBeneficiaries);
        setAnnouncements(defaultAnnouncements);
        setDonationDetails(defaultDonationDetails);
        setContactInfo(CONTACT_INFO);
        setSettings(defaultSettings);
        
        // Save default overrides back to database
        await saveItem("homepageHero", defaultHomepageHero);
        await saveItem("programs", PROGRAMS);
        await saveItem("galleryConfig", GALLERY_CONFIG);
        await saveItem("events", EVENTS);
        await saveItem("admissionsApplications", []);
        await saveItem("orphanBeneficiaries", defaultOrphanBeneficiaries);
        await saveItem("announcements", defaultAnnouncements);
        await saveItem("donationDetails", defaultDonationDetails);
        await saveItem("contactInfo", CONTACT_INFO);
        await saveItem("settings", defaultSettings);
        
        alert("Reset successful. Content restored both locally and in database.");
      } catch (e) {
        console.error("Error resetting defaults:", e);
      }
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
        homepageHero,
        programs,
        galleryConfig,
        events,
        admissionsApplications,
        orphanBeneficiaries,
        announcements,
        donationDetails,
        contactInfo,
        settings,
        isLoaded,
        
        updateHomepageHero,
        updatePrograms,
        updateGalleryConfig,
        updateEvents,
        addAdmissionApplication,
        updateAdmissionApplicationStatus,
        deleteAdmissionApplication,
        updateOrphanBeneficiaries,
        updateAnnouncements,
        updateDonationDetails,
        updateContactInfo,
        updateSettings,
        resetAllToDefault,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
}
