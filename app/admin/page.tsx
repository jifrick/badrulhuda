"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSiteData } from "@/lib/context/SiteDataContext";
import * as Icons from "lucide-react";
import Image from "next/image";
import { isSupabaseConfigured } from "@/lib/supabase";

const convertToWebP = (file: File, quality: number = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get 2D canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        const webpDataUrl = canvas.toDataURL("image/webp", quality);
        resolve(webpDataUrl);
      };
      img.onerror = () => {
        reject(new Error("Failed to load image element"));
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error("Failed to read image file"));
    };
    reader.readAsDataURL(file);
  });
};

type Tab = 
  | "overview" 
  | "hero" 
  | "programs" 
  | "gallery" 
  | "events" 
  | "admissions" 
  | "welfare" 
  | "donations" 
  | "announcements" 
  | "settings";

export default function AdminPage() {
  // Auth state
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  // Tab State
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  // Context Data
  const {
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
    updateAdmissionApplicationStatus,
    deleteAdmissionApplication,
    updateOrphanBeneficiaries,
    updateAnnouncements,
    updateDonationDetails,
    updateContactInfo,
    updateSettings,
    resetAllToDefault,
  } = useSiteData();

  // Load Auth state from sessionStorage on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem("bdr_admin_auth") === "true";
    setIsAuthenticated(isAuth);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "12345678bdr";
    if (passcode === adminPasscode) {
      sessionStorage.setItem("bdr_admin_auth", "true");
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect passcode. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("bdr_admin_auth");
    setIsAuthenticated(false);
    setPasscode("");
  };

  // --- TAB SUB-STATE / FORM HANDLERS ---

  // Hero form state
  const [heroForm, setHeroForm] = useState({ title: "", subtitle: "" });
  useEffect(() => {
    if (homepageHero) {
      setHeroForm({ title: homepageHero.title, subtitle: homepageHero.subtitle });
    }
  }, [homepageHero]);

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepageHero(heroForm);
    alert("Homepage hero text successfully updated!");
  };

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    facebookUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    twitterUrl: "",
  });
  useEffect(() => {
    if (settings) {
      setSettingsForm({ ...settings });
    }
  }, [settings]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    alert("Settings and SEO configurations saved!");
  };

  // Donation form state
  const [donationForm, setDonationForm] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branch: "",
    upiId: "",
  });
  const [campaignsList, setCampaignsList] = useState<typeof donationDetails.campaigns>([]);
  const [newCampaign, setNewCampaign] = useState({ name: "", target: "", raised: "0" });

  useEffect(() => {
    if (donationDetails) {
      setDonationForm({
        bankName: donationDetails.bankName,
        accountNumber: donationDetails.accountNumber,
        ifscCode: donationDetails.ifscCode,
        branch: donationDetails.branch,
        upiId: donationDetails.upiId,
      });
      setCampaignsList(donationDetails.campaigns || []);
    }
  }, [donationDetails]);

  const handleSaveDonations = (e: React.FormEvent) => {
    e.preventDefault();
    updateDonationDetails({
      ...donationForm,
      campaigns: campaignsList,
    });
    alert("Donation and campaign details updated!");
  };

  const handleAddCampaign = () => {
    if (!newCampaign.name.trim() || !newCampaign.target.trim()) {
      alert("Please provide a name and target for the campaign.");
      return;
    }
    const updated = [
      ...campaignsList,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: newCampaign.name,
        target: newCampaign.target,
        raised: newCampaign.raised,
      },
    ];
    setCampaignsList(updated);
    updateDonationDetails({
      ...donationForm,
      campaigns: updated,
    });
    setNewCampaign({ name: "", target: "", raised: "0" });
  };

  const handleDeleteCampaign = (id: string) => {
    if (confirm("Delete this donation campaign?")) {
      const updated = campaignsList.filter(c => c.id !== id);
      setCampaignsList(updated);
      updateDonationDetails({
        ...donationForm,
        campaigns: updated,
      });
    }
  };

  // Gallery Uploader & List state
  const [photoCategory, setPhotoCategory] = useState("Academic Life");
  const [photoSlot, setPhotoSlot] = useState("");
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoDesc, setPhotoDesc] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");
  const [photoSpan, setPhotoSpan] = useState<"normal" | "wide" | "tall">("normal");
  const [photoSrc, setPhotoSrc] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set default slots when categories change
  useEffect(() => {
    if (photoCategory === "Campus Life") {
      setPhotoSlot("hostel");
    } else if (photoCategory === "Events & Conferences") {
      setPhotoSlot("featuredOne");
    } else {
      setPhotoSlot("");
    }
  }, [photoCategory]);

  const handlePhotoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const webpDataUrl = await convertToWebP(file, 0.82);
      setPhotoSrc(webpDataUrl);
    } catch (err) {
      console.error("Failed to convert image to WebP:", err);
      alert("Error processing image file. Please try uploading again.");
    }
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoSrc) {
      alert("Please select an image file to upload.");
      return;
    }
    if (!photoTitle.trim() || !photoDesc.trim()) {
      alert("Please fill out the image title and description.");
      return;
    }

    const newImage = {
      src: photoSrc,
      category: photoCategory,
      title: photoTitle,
      description: photoDesc,
      caption: photoCaption || undefined,
      span: photoSpan,
    };

    const newConfig = { ...galleryConfig };

    // Push or replace based on selected category
    if (photoCategory === "Academic Life") {
      newConfig.academicLife.supporting = [...newConfig.academicLife.supporting, newImage];
    } else if (photoCategory === "Scholar Moments") {
      newConfig.scholarMoments = [...newConfig.scholarMoments, newImage];
    } else if (photoCategory === "Legacy") {
      newConfig.legacyArchive.photos = [...newConfig.legacyArchive.photos, newImage];
    } else if (photoCategory === "Community Impact") {
      newConfig.communityImpact.images = [...newConfig.communityImpact.images, newImage];
    } else if (photoCategory === "Campus Life") {
      const slot = photoSlot || "hostel";
      (newConfig.campusLife as any)[slot] = newImage;
    } else if (photoCategory === "Events & Conferences") {
      const slot = photoSlot || "featuredOne";
      (newConfig.eventsConferences as any)[slot] = newImage;
    } else {
      // Default to legacy photos array
      newConfig.legacyArchive.photos = [...newConfig.legacyArchive.photos, newImage];
    }

    updateGalleryConfig(newConfig);

    // Reset Form
    setPhotoTitle("");
    setPhotoDesc("");
    setPhotoCaption("");
    setPhotoSrc("");
    setPhotoSpan("normal");
    if (fileInputRef.current) fileInputRef.current.value = "";
    alert("New photo added successfully to the gallery!");
  };

  const handleDeletePhoto = (category: string, index: number) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;

    const newConfig = { ...galleryConfig };
    if (category === "Academic Life") {
      newConfig.academicLife.supporting = newConfig.academicLife.supporting.filter((_, i) => i !== index);
    } else if (category === "Scholar Moments") {
      newConfig.scholarMoments = newConfig.scholarMoments.filter((_, i) => i !== index);
    } else if (category === "Legacy") {
      newConfig.legacyArchive.photos = newConfig.legacyArchive.photos.filter((_, i) => i !== index);
    } else if (category === "Community Impact") {
      newConfig.communityImpact.images = newConfig.communityImpact.images.filter((_, i) => i !== index);
    }

    updateGalleryConfig(newConfig);
    alert("Photo deleted successfully.");
  };

  // Events state
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    category: "Academic" as any,
  });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title.trim() || !newEvent.date || !newEvent.description.trim()) {
      alert("Title, Date, and Description are required.");
      return;
    }
    const updated = [
      ...events,
      {
        id: Math.random().toString(36).substr(2, 9),
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
        category: newEvent.category,
      },
    ];
    updateEvents(updated);
    setNewEvent({ title: "", description: "", date: "", category: "Academic" });
    alert("New event scheduled successfully!");
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm("Delete this event schedule?")) {
      const updated = events.filter(e => e.id !== id);
      updateEvents(updated);
    }
  };

  // Admissions State
  const [admissionsFilter, setAdmissionsFilter] = useState<"All" | "Pending" | "Accepted" | "Rejected">("All");

  const filteredAdmissions = admissionsApplications.filter(app => {
    if (admissionsFilter === "All") return true;
    return app.status === admissionsFilter;
  });

  const handleExportCSV = () => {
    if (admissionsApplications.length === 0) {
      alert("No applications to export.");
      return;
    }
    const headers = "ID,Student Name,Parent/Guardian,Phone,Place,DOB,Prior Education,Program,Status,Date Applied\n";
    const rows = admissionsApplications.map(app => 
      `"${app.id}","${app.studentName}","${app.parentName}","${app.phone}","${app.place}","${app.dob}","${app.education}","${app.program}","${app.status}","${app.dateApplied}"`
    ).join("\n");

    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + rows);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `badrulhuda_admissions_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Orphan Welfare state
  const [newOrphan, setNewOrphan] = useState({
    childName: "",
    guardianName: "",
    address: "",
    phone: "",
    supportStatus: "Active" as any,
    notes: "",
  });

  const handleAddOrphan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrphan.childName.trim() || !newOrphan.guardianName.trim() || !newOrphan.phone.trim()) {
      alert("Child Name, Guardian, and Phone are required.");
      return;
    }
    const updated = [
      ...orphanBeneficiaries,
      {
        ...newOrphan,
        id: Math.random().toString(36).substr(2, 9),
      },
    ];
    updateOrphanBeneficiaries(updated);
    setNewOrphan({ childName: "", guardianName: "", address: "", phone: "", supportStatus: "Active", notes: "" });
    alert("New orphan beneficiary registered successfully!");
  };

  const handleDeleteOrphan = (id: string) => {
    if (confirm("Remove this orphan beneficiary from the registry?")) {
      const updated = orphanBeneficiaries.filter(o => o.id !== id);
      updateOrphanBeneficiaries(updated);
    }
  };

  // Announcements state
  const [newNotice, setNewNotice] = useState({
    title: "",
    category: "Notice" as any,
    content: "",
    active: true,
  });

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title.trim() || !newNotice.content.trim()) {
      alert("Title and content are required.");
      return;
    }
    const updated = [
      {
        ...newNotice,
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString().split("T")[0],
      },
      ...announcements,
    ];
    updateAnnouncements(updated);
    setNewNotice({ title: "", category: "Notice", content: "", active: true });
    alert("New announcement published successfully!");
  };

  const toggleNoticeActive = (id: string) => {
    const updated = announcements.map(n => 
      n.id === id ? { ...n, active: !n.active } : n
    );
    updateAnnouncements(updated);
  };

  const handleDeleteNotice = (id: string) => {
    if (confirm("Delete this notice permanently?")) {
      const updated = announcements.filter(n => n.id !== id);
      updateAnnouncements(updated);
    }
  };

  // Programs state
  const [selectedProgramIdx, setSelectedProgramIdx] = useState<number | null>(null);
  const [programEditForm, setProgramEditForm] = useState({
    title: "",
    arabicTitle: "",
    description: "",
    level: "",
    duration: "",
  });

  const handleEditProgram = (index: number) => {
    setSelectedProgramIdx(index);
    setProgramEditForm({
      title: programs[index].title,
      arabicTitle: programs[index].arabicTitle || "",
      description: programs[index].description,
      level: programs[index].level || "",
      duration: programs[index].duration || "",
    });
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProgramIdx === null) return;
    const updated = [...programs];
    updated[selectedProgramIdx] = {
      ...updated[selectedProgramIdx],
      ...programEditForm,
    };
    updatePrograms(updated);
    setSelectedProgramIdx(null);
    alert("Program curriculum details saved!");
  };

  // --- PASSCODE GATE INTERFACE ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-[#0a0d12] via-[#111827] to-[#0d1520] flex items-center justify-center p-6 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.06)_0,transparent_60%)] pointer-events-none" />
        
        <div className="bg-[#1f2937]/45 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 max-w-md w-full text-center space-y-6 relative overflow-hidden">
          {/* Subtle inside gold border frame */}
          <div className="absolute inset-1.5 border border-accent/15 rounded-2xl pointer-events-none" />
          
          <div className="space-y-2">
            <h1 className="font-tajawal text-3xl font-bold text-accent tracking-wide">
              بدر الهدى
            </h1>
            <p className="font-tajawal text-xs uppercase tracking-widest text-textColor-muted">
              Badrulhuda Academy CMS Portal
            </p>
          </div>

          <div className="h-[1px] w-20 bg-accent/20 mx-auto" />

          <p className="font-inter text-xs text-textColor-secondary dark:text-textColor-muted leading-relaxed">
            Enter the administrator passcode to access content controls, student registries, and settings.
          </p>

          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl flex items-center justify-center gap-2">
              <Icons.AlertCircle className="w-4 h-4" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="w-full bg-[#111827]/80 border border-white/15 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl px-4 py-3.5 pl-10 text-center text-sm font-semibold tracking-widest outline-none transition-all placeholder:text-stone-600 placeholder:tracking-normal"
              />
              <Icons.Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            </div>

            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent-light text-[#0c0f14] font-extrabold text-sm py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-95 duration-200"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-inter flex flex-col md:flex-row">
      {/* =========================================================================
          LEFT SIDEBAR: NAVIGATION
          ========================================================================= */}
      <aside className="w-full md:w-64 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 shrink-0 flex flex-col justify-between">
        <div>
          {/* Logo Brand Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="text-start">
              <span className="font-tajawal text-xl font-bold text-accent block">بدر الهدى</span>
              <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase block mt-0.5">Admin Console</span>
            </div>
            <div className="p-1 rounded bg-slate-900 border border-slate-800">
              <Icons.LayoutDashboard className="w-4 h-4 text-accent" />
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1">
            {[
              { id: "overview", label: "Overview", icon: Icons.LayoutDashboard },
              { id: "hero", label: "Homepage Hero", icon: Icons.Globe },
              { id: "programs", label: "Program Curriculum", icon: Icons.GraduationCap },
              { id: "gallery", label: "Gallery Management", icon: Icons.Image },
              { id: "events", label: "Upcoming Events", icon: Icons.Calendar },
              { id: "admissions", label: "Admissions Applications", icon: Icons.FileText, count: admissionsApplications.filter(a => a.status === "Pending").length },
              { id: "welfare", label: "Orphan & Welfare", icon: Icons.Heart },
              { id: "donations", label: "Donation Channels", icon: Icons.Coins },
              { id: "announcements", label: "Announcements Board", icon: Icons.Megaphone },
              { id: "settings", label: "SEO & Socials", icon: Icons.Settings },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    activeTab === item.id 
                      ? "bg-accent/15 text-accent border border-accent/20" 
                      : "text-slate-400 hover:bg-slate-900 hover:text-white border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${activeTab === item.id ? "text-accent" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="bg-amber-500 text-slate-950 font-extrabold text-[9px] px-1.5 py-0.5 rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Operations */}
        <div className="p-4 border-t border-slate-800 space-y-2">

          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-slate-400 hover:bg-slate-900 hover:text-white rounded-xl transition-all"
          >
            <Icons.LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          RIGHT MAIN PANEL
          ========================================================================= */}
      <main className="flex-1 bg-slate-900 min-h-screen p-6 md:p-8 flex flex-col justify-start overflow-y-auto">
        
        {/* Top welcome bar */}
        <header className="flex justify-between items-center pb-6 border-b border-slate-800 mb-8">
          <div>
            <h2 className="text-xl font-bold font-amiri tracking-wider text-accent capitalize">{activeTab} Controls</h2>
            <p className="text-[11px] font-semibold text-slate-500 tracking-wider font-inter">Badrulhuda Academy CMS Panel</p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline-block">
              {new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            {isSupabaseConfigured ? (
              <>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-extrabold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  Supabase Connected
                </span>
              </>
            ) : (
              <>
                <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[10px] font-extrabold tracking-widest text-rose-400 uppercase bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-full">
                  Offline Mode (Local Only)
                </span>
              </>
            )}
          </div>
        </header>

        {/* RENDER CONTENT PANELS */}
        <div className="flex-1 space-y-6">

          {/* ==================== 1. OVERVIEW TAB ==================== */}
          {activeTab === "overview" && (
            <div className="space-y-8 text-start">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Total Applications", value: admissionsApplications.length, subtitle: `${admissionsApplications.filter(a => a.status === "Pending").length} Pending approval`, icon: Icons.FileText, color: "text-amber-400" },
                  { label: "Gallery Assets", value: [
                    galleryConfig.hero,
                    galleryConfig.academicLife.featured,
                    ...galleryConfig.academicLife.supporting,
                    ...galleryConfig.scholarMoments,
                    galleryConfig.campusLife.hostel,
                    galleryConfig.campusLife.peerStudy,
                    galleryConfig.campusLife.library,
                    galleryConfig.campusLife.creative,
                    galleryConfig.eventsConferences.featuredOne,
                    galleryConfig.eventsConferences.featuredTwo,
                    galleryConfig.eventsConferences.supportingOne,
                    galleryConfig.eventsConferences.supportingTwo,
                    galleryConfig.legacyArchive.featuredPanorama,
                    ...galleryConfig.legacyArchive.photos,
                    ...galleryConfig.communityImpact.images
                  ].length, subtitle: "Dynamic images", icon: Icons.Image, color: "text-blue-400" },
                  { label: "Events Scheduled", value: events.length, subtitle: "Calendar entries", icon: Icons.Calendar, color: "text-emerald-400" },
                  { label: "Orphan Registry", value: orphanBeneficiaries.length, subtitle: `${orphanBeneficiaries.filter(o => o.supportStatus === "Active").length} Active beneficiaries`, icon: Icons.Heart, color: "text-pink-400" },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="p-5 bg-slate-950 border border-slate-800/80 rounded-2xl flex items-center justify-between shadow-md">
                      <div className="space-y-1.5">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">{stat.label}</span>
                        <span className="block text-3xl font-extrabold tracking-tight">{stat.value}</span>
                        <span className="block text-[10px] text-slate-400 font-medium">{stat.subtitle}</span>
                      </div>
                      <div className={`p-3 rounded-xl bg-slate-900 border border-slate-800 ${stat.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Graphic Activity */}
              <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider text-accent">Registration & Activity Trend</h3>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">Website actions and visitor registrations (Last 7 days)</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded">Weekly View</span>
                </div>
                
                {/* SVG Graph */}
                <div className="h-44 w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 700 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 130 C 50 110, 100 120, 150 90 C 200 60, 250 85, 300 45 C 350 5, 400 30, 450 70 C 500 110, 550 50, 600 30 C 650 10, 700 20, 700 20 L 700 150 L 0 150 Z"
                      fill="url(#gradient)"
                    />
                    <path
                      d="M0 130 C 50 110, 100 120, 150 90 C 200 60, 250 85, 300 45 C 350 5, 400 30, 450 70 C 500 110, 550 50, 600 30 C 650 10, 700 20, 700 20"
                      fill="none"
                      stroke="#C9A84C"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 pt-3 border-t border-slate-800">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                <h3 className="font-bold text-sm uppercase tracking-wider text-accent mb-4">Quick Shortcuts</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button onClick={() => setActiveTab("admissions")} className="p-4 bg-slate-900 border border-slate-800 hover:border-accent/40 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all group">
                    <Icons.FileText className="w-5 h-5 text-amber-400 group-hover:scale-105 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Review Admissions</span>
                  </button>
                  <button onClick={() => setActiveTab("gallery")} className="p-4 bg-slate-900 border border-slate-800 hover:border-accent/40 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all group">
                    <Icons.Plus className="w-5 h-5 text-blue-400 group-hover:scale-105 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Upload Photos</span>
                  </button>
                  <button onClick={() => setActiveTab("events")} className="p-4 bg-slate-900 border border-slate-800 hover:border-accent/40 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all group">
                    <Icons.Calendar className="w-5 h-5 text-emerald-400 group-hover:scale-105 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Schedule Event</span>
                  </button>
                  <button onClick={() => setActiveTab("announcements")} className="p-4 bg-slate-900 border border-slate-800 hover:border-accent/40 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all group">
                    <Icons.Megaphone className="w-5 h-5 text-pink-400 group-hover:scale-105 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Post Notice</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 2. HOMEPAGE HERO TAB ==================== */}
          {activeTab === "hero" && (
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl max-w-2xl text-start">
              <h3 className="font-bold text-sm uppercase tracking-wider text-accent mb-4">Edit Hero Showcase Banner</h3>
              <form onSubmit={handleSaveHero} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Main Heading Headline</label>
                  <input
                    type="text"
                    required
                    value={heroForm.title}
                    onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  />
                  <span className="text-[9px] text-slate-500 font-medium block mt-1.5">Note: The second half of words will automatically be highlighted in gold on the website homepage!</span>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Sub-banner Description Paragraph</label>
                  <textarea
                    required
                    rows={4}
                    value={heroForm.subtitle}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-slate-950 font-extrabold text-xs py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 duration-200"
                  >
                    <Icons.Check className="w-4 h-4" />
                    <span>Save Homepage Hero Text</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ==================== 3. PROGRAMS TAB ==================== */}
          {activeTab === "programs" && (
            <div className="space-y-6 text-start">
              {/* Program list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programs.map((program, i) => (
                  <div key={i} className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-accent bg-accent/10 border border-accent/15 px-2 py-0.5 rounded">
                        {program.duration || "Multi-Year"} Course
                      </span>
                      <h4 className="font-amiri text-xl font-bold">{program.title}</h4>
                      <p className="text-xs text-slate-400 font-inter leading-relaxed line-clamp-3">
                        {program.description}
                      </p>
                      {program.level && (
                        <div className="text-[11px] font-medium text-slate-500 font-inter">
                          <span className="font-bold text-slate-400 block mb-0.5">Education Level:</span>
                          {program.level}
                        </div>
                      )}
                    </div>
                    <div className="pt-4 border-t border-slate-900 flex justify-end">
                      <button
                        onClick={() => handleEditProgram(i)}
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-accent hover:text-accent-light"
                      >
                        <Icons.Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Course Details</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Program Edit Modal/Form */}
              {selectedProgramIdx !== null && (
                <div className="p-6 bg-slate-950 border border-accent/25 rounded-2xl max-w-xl">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-900">
                    <h4 className="font-amiri text-lg font-bold text-accent">Edit Course: {programs[selectedProgramIdx].title}</h4>
                    <button onClick={() => setSelectedProgramIdx(null)} className="text-slate-500 hover:text-white">
                      <Icons.X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleSaveProgram} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Course Title</label>
                        <input
                          type="text"
                          required
                          value={programEditForm.title}
                          onChange={(e) => setProgramEditForm({ ...programEditForm, title: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Arabic Title</label>
                        <input
                          type="text"
                          required
                          value={programEditForm.arabicTitle}
                          onChange={(e) => setProgramEditForm({ ...programEditForm, arabicTitle: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Duration</label>
                        <input
                          type="text"
                          required
                          value={programEditForm.duration}
                          onChange={(e) => setProgramEditForm({ ...programEditForm, duration: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Education Level / Age Limit</label>
                        <input
                          type="text"
                          required
                          value={programEditForm.level}
                          onChange={(e) => setProgramEditForm({ ...programEditForm, level: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Description</label>
                      <textarea
                        required
                        rows={4}
                        value={programEditForm.description}
                        onChange={(e) => setProgramEditForm({ ...programEditForm, description: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white leading-relaxed"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProgramIdx(null)}
                        className="bg-slate-900 border border-slate-800 text-slate-400 hover:text-white font-bold text-xs py-2 px-4 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-accent hover:bg-accent-light text-slate-950 font-bold text-xs py-2 px-5 rounded-xl transition-all"
                      >
                        Save Course
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ==================== 4. GALLERY TAB ==================== */}
          {activeTab === "gallery" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-start">
              {/* Left Column: Photo Uploader */}
              <div className="lg:col-span-4 bg-slate-950 border border-slate-800 p-6 rounded-2xl h-fit space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-accent pb-3 border-b border-slate-900">Upload New Photo</h3>
                
                <form onSubmit={handleAddPhoto} className="space-y-4">
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Gallery Section/Category</label>
                    <select
                      value={photoCategory}
                      onChange={(e) => setPhotoCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none cursor-pointer"
                    >
                      <option value="Academic Life">Academic Life & Classroom</option>
                      <option value="Scholar Moments">Scholar Moments & Assemblies</option>
                      <option value="Campus Life">Campus Life & Student Living</option>
                      <option value="Events & Conferences">Events & Scholarly Conferences</option>
                      <option value="Legacy">Legacy in Pictures (Timeline/Archive)</option>
                      <option value="Community Impact">Community Impact & Welfare</option>
                    </select>
                  </div>

                  {photoCategory === "Campus Life" && (
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Select Layout Position / Slot</label>
                      <select
                        value={photoSlot}
                        onChange={(e) => setPhotoSlot(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="hostel">Hostel Life</option>
                        <option value="peerStudy">Peer Study</option>
                        <option value="library">Library & Research</option>
                        <option value="creative">Creative Corner</option>
                      </select>
                    </div>
                  )}

                  {photoCategory === "Events & Conferences" && (
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Select Layout Position / Slot</label>
                      <select
                        value={photoSlot}
                        onChange={(e) => setPhotoSlot(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="featuredOne">Featured Event 1 (Top Spotlight)</option>
                        <option value="featuredTwo">Featured Event 2 (Flipped Layout)</option>
                        <option value="supportingOne">Supporting Event 1 (Left Grid)</option>
                        <option value="supportingTwo">Supporting Event 2 (Right Grid)</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Select Image File</label>
                    <input
                      type="file"
                      required
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handlePhotoFileChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs file:bg-accent/20 file:border-0 file:text-accent file:px-3 file:py-1 file:rounded file:text-[10px] file:font-bold file:cursor-pointer"
                    />
                    {photoSrc && (
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mt-3 border border-slate-800">
                        <img src={photoSrc} alt="Preview" className="object-cover w-full h-full" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Photo Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Graduation Ceremony 2026"
                      value={photoTitle}
                      onChange={(e) => setPhotoTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Brief Description *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell the story or background context of the photo..."
                      value={photoDesc}
                      onChange={(e) => setPhotoDesc(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Quote / Caption (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. A memorable gathering of faith..."
                      value={photoCaption}
                      onChange={(e) => setPhotoCaption(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Masonry Grid Span</label>
                    <select
                      value={photoSpan}
                      onChange={(e) => setPhotoSpan(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none cursor-pointer"
                    >
                      <option value="normal">Normal aspect</option>
                      <option value="wide">Wide aspect (2 columns)</option>
                      <option value="tall">Tall aspect (2 rows)</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent-light text-slate-950 font-extrabold text-xs py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 duration-200"
                    >
                      Publish to Gallery
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Manage Current Photos */}
              <div className="lg:col-span-8 bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-6">
                <h3 className="font-bold text-sm uppercase tracking-wider text-accent pb-3 border-b border-slate-900">Current Gallery Assets</h3>
                
                {[
                  { label: "Academic Life Supporting Photos", category: "Academic Life", list: galleryConfig.academicLife.supporting },
                  { label: "Scholar Moments Photos", category: "Scholar Moments", list: galleryConfig.scholarMoments },
                  { label: "Campus Life Layout Slots", category: "Campus Life", list: [
                    { ...galleryConfig.campusLife.hostel, title: `Hostel: ${galleryConfig.campusLife.hostel.title}`, isFixed: true },
                    { ...galleryConfig.campusLife.peerStudy, title: `Peer Study: ${galleryConfig.campusLife.peerStudy.title}`, isFixed: true },
                    { ...galleryConfig.campusLife.library, title: `Library: ${galleryConfig.campusLife.library.title}`, isFixed: true },
                    { ...galleryConfig.campusLife.creative, title: `Creative: ${galleryConfig.campusLife.creative.title}`, isFixed: true }
                  ] },
                  { label: "Events & Conferences Layout Slots", category: "Events & Conferences", list: [
                    { ...galleryConfig.eventsConferences.featuredOne, title: `Featured 1: ${galleryConfig.eventsConferences.featuredOne.title}`, isFixed: true },
                    { ...galleryConfig.eventsConferences.featuredTwo, title: `Featured 2: ${galleryConfig.eventsConferences.featuredTwo.title}`, isFixed: true },
                    { ...galleryConfig.eventsConferences.supportingOne, title: `Supporting 1: ${galleryConfig.eventsConferences.supportingOne.title}`, isFixed: true },
                    { ...galleryConfig.eventsConferences.supportingTwo, title: `Supporting 2: ${galleryConfig.eventsConferences.supportingTwo.title}`, isFixed: true }
                  ] },
                  { label: "Legacy Archive Photos", category: "Legacy", list: galleryConfig.legacyArchive.photos },
                  { label: "Community Impact Images", category: "Community Impact", list: galleryConfig.communityImpact.images },
                ].map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 border-l-2 border-accent pl-2.5 py-0.5">{sec.label} ({sec.list.length})</h4>
                    
                    {sec.list.length === 0 ? (
                      <p className="text-[11px] text-slate-500 italic pl-3">No dynamic photos uploaded in this category.</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[220px] overflow-y-auto pr-2">
                        {sec.list.map((photo, pIdx) => (
                          <div key={pIdx} className="relative aspect-video rounded-lg overflow-hidden border border-slate-800 group">
                            {photo.src ? (
                              <img src={photo.src} alt={photo.title} className="object-cover w-full h-full" />
                            ) : (
                              <div className="bg-slate-900 w-full h-full flex items-center justify-center text-[10px] text-slate-600">No Image</div>
                            )}
                            <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 text-[10px]">
                              <div>
                                <span className="block font-bold truncate">{photo.title}</span>
                                <span className="block text-[8px] text-slate-400 truncate">{photo.description}</span>
                              </div>
                              {(photo as any).isFixed ? (
                                <span className="mt-1 w-full text-center bg-slate-800 text-slate-400 font-bold py-1 rounded text-[7px] block">
                                  Layout Slot
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleDeletePhoto(sec.category, pIdx)}
                                  className="mt-1 w-full bg-red-600 hover:bg-red-500 text-white font-bold py-1 rounded text-[8px] flex items-center justify-center gap-1"
                                >
                                  <Icons.Trash2 className="w-2.5 h-2.5" />
                                  <span>Delete</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== 5. EVENTS TAB ==================== */}
          {activeTab === "events" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-start">
              {/* Schedule form */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl h-fit">
                <h3 className="font-bold text-sm uppercase tracking-wider text-accent mb-4">Schedule Calendar Event</h3>
                <form onSubmit={handleAddEvent} className="space-y-4 font-inter text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Event Name/Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Annual Convocation Assembly"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Date *</label>
                      <input
                        type="date"
                        required
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Category</label>
                      <select
                        value={newEvent.category}
                        onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as any })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white cursor-pointer"
                      >
                        <option value="Academic">Academic</option>
                        <option value="Spiritual">Spiritual</option>
                        <option value="Community">Community</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Event Description *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Enter short details about the event..."
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent-light text-slate-950 font-extrabold text-xs py-3 px-4 rounded-xl shadow-md active:scale-95 duration-200"
                    >
                      Schedule Event
                    </button>
                  </div>
                </form>
              </div>

              {/* Current calendar list */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                <h3 className="font-bold text-sm uppercase tracking-wider text-accent mb-4 pb-3 border-b border-slate-900">Scheduled Calendar ({events.length})</h3>
                
                {events.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 italic text-xs">No upcoming events are scheduled. Use the form to schedule one.</div>
                ) : (
                  <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
                    {events.map((event, idx) => (
                      <div key={idx} className="p-4 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between gap-4 font-inter text-xs">
                        <div className="text-start space-y-1">
                          <span className="inline-block text-[8px] font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/15 px-1.5 py-0.5 rounded">
                            {event.category}
                          </span>
                          <h4 className="font-bold text-sm text-white">{event.title}</h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-slate-400 font-medium">
                            <span className="flex items-center gap-1"><Icons.Calendar className="w-3 h-3 text-accent" /> {event.date}</span>
                            <span className="text-[10px] text-slate-500 line-clamp-1">{event.description}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-2 bg-red-950/20 hover:bg-red-950/60 text-red-400 hover:text-red-300 border border-red-500/10 rounded-lg transition-all"
                        >
                          <Icons.Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== 6. ADMISSIONS TAB ==================== */}
          {activeTab === "admissions" && (
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl text-start space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-900">
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider text-accent">Student Registrations Registry</h3>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">Filter, approve, and export submitted admissions applications.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  {/* CSV Export */}
                  <button
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-accent/40 px-3 py-2 rounded-xl text-xs font-semibold text-accent transition-all"
                  >
                    <Icons.Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>

                  {/* Filter select */}
                  <div className="flex rounded-lg overflow-hidden border border-slate-800 text-[10px] font-bold">
                    {["All", "Pending", "Accepted", "Rejected"].map(filter => (
                      <button
                        key={filter}
                        onClick={() => setAdmissionsFilter(filter as any)}
                        className={`px-3 py-2 transition-all ${
                          admissionsFilter === filter 
                            ? "bg-accent text-slate-950" 
                            : "bg-slate-900 text-slate-400 hover:text-white"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Admissions table / list */}
              {filteredAdmissions.length === 0 ? (
                <div className="text-center py-12 text-slate-500 italic text-xs">
                  No {admissionsFilter !== "All" ? admissionsFilter.toLowerCase() : ""} admissions applications found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-400 border-collapse">
                    <thead>
                      <tr className="border-b border-slate-900 font-bold uppercase tracking-wider text-[9px] text-slate-500">
                        <th className="py-3 px-2">Date Applied</th>
                        <th className="py-3 px-2">Student Name</th>
                        <th className="py-3 px-2">Parent / Phone</th>
                        <th className="py-3 px-2">Place & DOB</th>
                        <th className="py-3 px-2">Program</th>
                        <th className="py-3 px-2 text-center">Status</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900">
                      {filteredAdmissions.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-900/40">
                          <td className="py-4 px-2 whitespace-nowrap font-medium text-slate-500">{app.dateApplied}</td>
                          <td className="py-4 px-2 whitespace-nowrap font-bold text-white">
                            <span className="block">{app.studentName}</span>
                            <span className="block text-[9px] font-normal text-slate-500">Edu: {app.education}</span>
                          </td>
                          <td className="py-4 px-2 whitespace-nowrap">
                            <span className="block font-medium text-slate-300">{app.parentName}</span>
                            <span className="block text-[10px] text-slate-500">{app.phone}</span>
                          </td>
                          <td className="py-4 px-2 whitespace-nowrap">
                            <span className="block text-slate-300">{app.place}</span>
                            <span className="block text-[9px] text-slate-500">DOB: {app.dob}</span>
                          </td>
                          <td className="py-4 px-2 whitespace-nowrap">
                            <span className="text-[10px] font-bold text-accent bg-accent/5 border border-accent/15 px-2 py-0.5 rounded">
                              {app.program}
                            </span>
                          </td>
                          <td className="py-4 px-2 text-center whitespace-nowrap">
                            <span className={`inline-block text-[9px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full ${
                              app.status === "Accepted" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                              app.status === "Rejected" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                                                          "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse"
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="py-4 px-2 text-right whitespace-nowrap">
                            <div className="flex justify-end gap-1.5">
                              {app.status === "Pending" && (
                                <>
                                  <button
                                    onClick={() => updateAdmissionApplicationStatus(app.id, "Accepted")}
                                    className="p-1 bg-emerald-950/20 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/10 hover:border-transparent rounded transition-all"
                                    title="Accept Student"
                                  >
                                    <Icons.Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => updateAdmissionApplicationStatus(app.id, "Rejected")}
                                    className="p-1 bg-red-950/20 hover:bg-red-500 text-red-400 hover:text-slate-950 border border-red-500/10 hover:border-transparent rounded transition-all"
                                    title="Reject Student"
                                  >
                                    <Icons.X className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => deleteAdmissionApplication(app.id)}
                                className="p-1 bg-slate-900 hover:bg-red-650 text-slate-500 hover:text-white border border-slate-800 rounded transition-all"
                                title="Delete Record"
                              >
                                <Icons.Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ==================== 7. WELFARE TAB ==================== */}
          {activeTab === "welfare" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-start">
              {/* Add orphan form */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl h-fit">
                <h3 className="font-bold text-sm uppercase tracking-wider text-accent mb-4">Register Welfare Beneficiary</h3>
                <form onSubmit={handleAddOrphan} className="space-y-4 font-inter text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Child Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Ameen"
                      value={newOrphan.childName}
                      onChange={(e) => setNewOrphan({ ...newOrphan, childName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Guardian / Mother Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Khadija"
                      value={newOrphan.guardianName}
                      onChange={(e) => setNewOrphan({ ...newOrphan, guardianName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Mobile number"
                        value={newOrphan.phone}
                        onChange={(e) => setNewOrphan({ ...newOrphan, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Support Status</label>
                      <select
                        value={newOrphan.supportStatus}
                        onChange={(e) => setNewOrphan({ ...newOrphan, supportStatus: e.target.value as any })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white cursor-pointer"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Address / Region</label>
                    <input
                      type="text"
                      placeholder="e.g. Panamaram, Wayanad"
                      value={newOrphan.address}
                      onChange={(e) => setNewOrphan({ ...newOrphan, address: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Administrative Notes</label>
                    <input
                      type="text"
                      placeholder="e.g. Sponsored since June 2024"
                      value={newOrphan.notes}
                      onChange={(e) => setNewOrphan({ ...newOrphan, notes: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent-light text-slate-950 font-extrabold text-xs py-3 px-4 rounded-xl shadow-md active:scale-95 duration-200"
                    >
                      Register Beneficiary
                    </button>
                  </div>
                </form>
              </div>

              {/* Beneficiary List */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                <h3 className="font-bold text-sm uppercase tracking-wider text-accent mb-4 pb-3 border-b border-slate-900">Registered Beneficiaries ({orphanBeneficiaries.length})</h3>
                
                {orphanBeneficiaries.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 italic text-xs">No beneficiaries found. Register one using the form.</div>
                ) : (
                  <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
                    {orphanBeneficiaries.map((child, idx) => (
                      <div key={idx} className="p-4 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between gap-4 font-inter text-xs">
                        <div className="text-start space-y-1">
                          <span className={`inline-block text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            child.supportStatus === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                            child.supportStatus === "Pending" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                                                                "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}>
                            {child.supportStatus} Stipend
                          </span>
                          <h4 className="font-bold text-sm text-white">{child.childName}</h4>
                          <p className="text-[10px] text-slate-400 font-medium">Guardian: {child.guardianName} | Contact: {child.phone}</p>
                          {child.address && <p className="text-[9px] text-slate-500">Address: {child.address}</p>}
                          {child.notes && <p className="text-[9px] text-accent italic">Note: {child.notes}</p>}
                        </div>
                        <button
                          onClick={() => handleDeleteOrphan(child.id)}
                          className="p-2 bg-red-950/20 hover:bg-red-950/60 text-red-400 hover:text-red-300 border border-red-500/10 rounded-lg transition-all"
                        >
                          <Icons.Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== 8. DONATIONS TAB ==================== */}
          {activeTab === "donations" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-start font-inter text-xs">
              {/* Account settings */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl h-fit">
                <h3 className="font-bold text-sm uppercase tracking-wider text-accent mb-4 pb-2 border-b border-slate-900">Banking & UPI Configurations</h3>
                
                <form onSubmit={handleSaveDonations} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Bank Name</label>
                    <input
                      type="text"
                      required
                      value={donationForm.bankName}
                      onChange={(e) => setDonationForm({ ...donationForm, bankName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Account Number</label>
                      <input
                        type="text"
                        required
                        value={donationForm.accountNumber}
                        onChange={(e) => setDonationForm({ ...donationForm, accountNumber: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">IFSC Code</label>
                      <input
                        type="text"
                        required
                        value={donationForm.ifscCode}
                        onChange={(e) => setDonationForm({ ...donationForm, ifscCode: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Branch</label>
                    <input
                      type="text"
                      required
                      value={donationForm.branch}
                      onChange={(e) => setDonationForm({ ...donationForm, branch: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">UPI ID (Google Pay / PhonePe QR)</label>
                    <input
                      type="text"
                      required
                      value={donationForm.upiId}
                      onChange={(e) => setDonationForm({ ...donationForm, upiId: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent-light text-slate-950 font-extrabold text-xs py-3 px-4 rounded-xl shadow-md active:scale-95 duration-200"
                    >
                      Save Financial Info
                    </button>
                  </div>
                </form>
              </div>

              {/* Campaigns list */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-6">
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider text-accent mb-4 pb-2 border-b border-slate-900">Active Donation Campaigns</h3>
                  
                  {/* Campaign add subform */}
                  <div className="p-4 bg-slate-900 border border-slate-850 rounded-2xl mb-4 space-y-3">
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">Launch Donation Campaign</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Campaign Title"
                        value={newCampaign.name}
                        onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white sm:col-span-2"
                      />
                      <input
                        type="text"
                        placeholder="Target Amount (₹)"
                        value={newCampaign.target}
                        onChange={(e) => setNewCampaign({ ...newCampaign, target: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleAddCampaign}
                        className="inline-flex items-center gap-1 bg-accent hover:bg-accent-light text-slate-950 font-bold px-4 py-1.5 rounded-lg text-[10px]"
                      >
                        <Icons.Plus className="w-3.5 h-3.5" />
                        <span>Add Drive</span>
                      </button>
                    </div>
                  </div>

                  {/* List */}
                  {campaignsList.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 italic text-xs">No active donation campaign drives currently.</div>
                  ) : (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                      {campaignsList.map((campaign) => (
                        <div key={campaign.id} className="p-4 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between gap-4">
                          <div className="text-start space-y-1.5 flex-1">
                            <h4 className="font-bold text-sm text-white">{campaign.name}</h4>
                            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-accent h-full rounded-full" 
                                style={{ width: `${Math.min(100, (parseFloat(campaign.raised.replace(/,/g, '')) / parseFloat(campaign.target.replace(/,/g, ''))) * 100)}%` }} 
                              />
                            </div>
                            <div className="flex justify-between text-[9px] text-slate-400 font-semibold uppercase">
                              <span>Raised: ₹{campaign.raised}</span>
                              <span>Target: ₹{campaign.target}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteCampaign(campaign.id)}
                            className="p-2 bg-red-950/20 hover:bg-red-950/60 text-red-400 hover:text-red-300 border border-red-500/10 rounded-lg transition-all shrink-0"
                          >
                            <Icons.Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ==================== 9. ANNOUNCEMENTS TAB ==================== */}
          {activeTab === "announcements" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-start font-inter text-xs">
              {/* Form */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl h-fit">
                <h3 className="font-bold text-sm uppercase tracking-wider text-accent mb-4">Post Notice Announcement</h3>
                
                <form onSubmit={handleAddNotice} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Announcement Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hifz Program Admissions Open"
                      value={newNotice.title}
                      onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Notice Category</label>
                    <select
                      value={newNotice.category}
                      onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white cursor-pointer"
                    >
                      <option value="Notice">Notice</option>
                      <option value="Admission">Admission</option>
                      <option value="Event">Event</option>
                      <option value="News">News</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Details / Content Body *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Type details that will appear on notice boards..."
                      value={newNotice.content}
                      onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent-light text-slate-950 font-extrabold text-xs py-3 px-4 rounded-xl shadow-md active:scale-95 duration-200"
                    >
                      Publish Announcement
                    </button>
                  </div>
                </form>
              </div>

              {/* List */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                <h3 className="font-bold text-sm uppercase tracking-wider text-accent mb-4 pb-3 border-b border-slate-900">Published Bulletins ({announcements.length})</h3>
                
                {announcements.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 italic">No notices are currently published. Use the form to write one.</div>
                ) : (
                  <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
                    {announcements.map((notice, idx) => (
                      <div key={idx} className="p-4 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between gap-4">
                        <div className="text-start space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] font-extrabold tracking-wider uppercase text-accent bg-accent/10 border border-accent/15 px-1.5 py-0.5 rounded">
                              {notice.category}
                            </span>
                            <span className="text-[9px] text-slate-500 font-semibold">{notice.date}</span>
                          </div>
                          <h4 className="font-bold text-sm text-white">{notice.title}</h4>
                          <p className="text-xs text-slate-400 font-normal leading-relaxed">{notice.content}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Active Toggle */}
                          <button
                            onClick={() => toggleNoticeActive(notice.id)}
                            className={`p-2 rounded-lg border text-[10px] font-bold uppercase transition-all ${
                              notice.active 
                                ? "bg-emerald-950/20 text-emerald-400 border-emerald-500/20" 
                                : "bg-slate-950 text-slate-500 border-slate-850"
                            }`}
                          >
                            {notice.active ? "Active" : "Inactive"}
                          </button>
                          <button
                            onClick={() => handleDeleteNotice(notice.id)}
                            className="p-2 bg-red-950/20 hover:bg-red-950/60 text-red-400 hover:text-red-300 border border-red-500/10 rounded-lg transition-all"
                          >
                            <Icons.Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== 10. SEO & SOCIALS TAB ==================== */}
          {activeTab === "settings" && (
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl max-w-2xl text-start font-inter text-xs">
              <h3 className="font-bold text-sm uppercase tracking-wider text-accent mb-6 pb-2 border-b border-slate-900">SEO & Social Channel Settings</h3>
              
              <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* SEO Sub-section */}
                <div className="space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 border-l-2 border-accent pl-2.5 py-0.5">Search Engine Optimization (SEO)</h4>
                  
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Meta Browser Title</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.seoTitle}
                      onChange={(e) => setSettingsForm({ ...settingsForm, seoTitle: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Meta Search Description</label>
                    <textarea
                      required
                      rows={3}
                      value={settingsForm.seoDescription}
                      onChange={(e) => setSettingsForm({ ...settingsForm, seoDescription: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Meta Search Keywords (comma-separated)</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.seoKeywords}
                      onChange={(e) => setSettingsForm({ ...settingsForm, seoKeywords: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>
                </div>

                {/* Social Links Sub-section */}
                <div className="space-y-4 pt-4 border-t border-slate-900">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 border-l-2 border-accent pl-2.5 py-0.5">Official Social Medias</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Facebook Page URL</label>
                      <input
                        type="url"
                        value={settingsForm.facebookUrl}
                        onChange={(e) => setSettingsForm({ ...settingsForm, facebookUrl: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Instagram Handle URL</label>
                      <input
                        type="url"
                        value={settingsForm.instagramUrl}
                        onChange={(e) => setSettingsForm({ ...settingsForm, instagramUrl: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">YouTube Channel URL</label>
                      <input
                        type="url"
                        value={settingsForm.youtubeUrl}
                        onChange={(e) => setSettingsForm({ ...settingsForm, youtubeUrl: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Twitter / X URL</label>
                      <input
                        type="url"
                        value={settingsForm.twitterUrl}
                        onChange={(e) => setSettingsForm({ ...settingsForm, twitterUrl: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-slate-950 font-extrabold text-xs py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 duration-200"
                  >
                    <Icons.Check className="w-4 h-4" />
                    <span>Save Config Parameters</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
