"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PROGRAMS, EVENTS, CONTACT_INFO, Program, EventItem } from "@/lib/constants";
import { GALLERY_CONFIG, GallerySectionConfig, GalleryImage } from "@/lib/gallery-config";

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

const defaultAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Hifz Batch Admissions Open 2026",
    date: "2026-06-20",
    category: "Admission",
    content: "Applications are invited for the new batch of the Quran Memorization program. Residential and scholar pathways are available.",
    active: true,
  },
  {
    id: "2",
    title: "Distinguished Scholar Seminar",
    date: "2026-07-15",
    category: "Event",
    content: "A public scholarly assembly discussing classical text reading and modern challenges at the main Badrulhuda Conference Hall.",
    active: true,
  },
];

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

const defaultOrphanBeneficiaries: OrphanBeneficiary[] = [
  { id: "1", childName: "Muhammad Ameen", guardianName: "Khadija", address: "Panamaram, Wayanad", phone: "9447712345", supportStatus: "Active", notes: "Sponsored since 2024" },
  { id: "2", childName: "Fathima Najiya", guardianName: "Rahmath", address: "Kaniyambetta, Wayanad", phone: "9847254321", supportStatus: "Active", notes: "Receives monthly scholarship" },
  { id: "3", childName: "Zainul Abid", guardianName: "Aboobacker", address: "Mananthavady, Wayanad", phone: "9562385412", supportStatus: "Active", notes: "Emergency medical support provided" },
];

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

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const getStored = (key: string, fallback: any) => {
        const item = localStorage.getItem(`bdr_cms_${key}`);
        return item ? JSON.parse(item) : fallback;
      };

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
    } catch (e) {
      console.error("Error reading localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save setters helper
  const saveItem = (key: string, value: any) => {
    try {
      localStorage.setItem(`bdr_cms_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error("Error writing to localStorage:", e);
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

  const resetAllToDefault = () => {
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
        
        alert("Reset successful. Content restored.");
      } catch (e) {
        console.error(e);
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
      {isLoaded && children}
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
