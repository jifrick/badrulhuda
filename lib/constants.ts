export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Facilities", href: "/facilities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Admissions", href: "/admissions" },
  { label: "Events", href: "/events" },
  { label: "Charity", href: "/charity" },
  { label: "Contact", href: "/contact" },
];

export interface Program {
  id: string;
  title: string;
  arabicTitle: string;
  description: string;
  icon: string;
  level: string;
  duration: string;
  highlight: boolean;
  type: "primary" | "additional";
  badges: string[];
}

export const PROGRAMS: Program[] = [
  {
    id: "hifz",
    title: "Hifz Department",
    arabicTitle: "قسم تحفيظ القرآن",
    description: "Quran Memorization Program with dedicated educators, strict Tajweed tracking, and individual mentoring guidelines.",
    icon: "BookOpen",
    level: "School Age & Residential",
    duration: "3 - 5 Years",
    highlight: true,
    type: "primary",
    badges: ["School Students", "Hostel Students"]
  },
  {
    id: "dars",
    title: "Dars Program",
    arabicTitle: "الدرس المسجدي",
    description: "Cornerstone of traditional Islamic scholarship, examining classical works in Fiqh, Aqeedah, Tafseer, and Hadith sciences.",
    icon: "Compass",
    level: "Residential Scholars",
    duration: "Ongoing",
    highlight: true,
    type: "primary",
    badges: ["Islamic Scholars", "Hostel Students"]
  },
  {
    id: "integrated-studies",
    title: "Integrated Islamic Studies",
    arabicTitle: "الدراسات الإسلامية المتكاملة",
    description: "Holistic academic pathway bridging sacred Islamic knowledge with modern high school and college degrees.",
    icon: "GraduationCap",
    level: "Secondary & College Level",
    duration: "2 - 5 Years",
    highlight: true,
    type: "primary",
    badges: ["Plus One / Plus Two", "Degree Students", "Hostel Students"]
  },
  {
    id: "arabic-language",
    title: "Arabic Language Department",
    arabicTitle: "قسم اللغة العربية",
    description: "Classical and modern standard Arabic language courses covering grammar, syntax, morphology, and text reading skills.",
    icon: "Languages",
    level: "All Academic Levels",
    duration: "1 - 3 Years",
    highlight: false,
    type: "primary",
    badges: ["School Students", "Degree Students", "Islamic Scholars"]
  },
  {
    id: "islamic-studies",
    title: "Islamic Studies Department",
    arabicTitle: "قسم الدراسات الإسلامية",
    description: "Structured curriculum covering core creed, jurisprudential practice, and character development for regular school students.",
    icon: "Layers",
    level: "School & Secondary",
    duration: "Ongoing",
    highlight: false,
    type: "additional",
    badges: ["School Students", "Plus One / Plus Two"]
  },
  {
    id: "community-ed",
    title: "Community Education Department",
    arabicTitle: "قسم التعليم المجتمعي",
    description: "Evening and weekend courses, public seminars, and spiritual retreats designed to share authentic knowledge with the general public.",
    icon: "Users",
    level: "Public & All Ages",
    duration: "Ongoing",
    highlight: false,
    type: "additional",
    badges: ["Hostel Students", "Islamic Scholars"]
  },
  {
    id: "dawah-leadership",
    title: "Da'wah & Leadership Development",
    arabicTitle: "تنمية القيادة والدعوة",
    description: "Training in public speaking, ethical leadership, and contemporary issues, empowering students to guide their community.",
    icon: "Sparkles",
    level: "Degree & Scholar level",
    duration: "Annual Modules",
    highlight: false,
    type: "additional",
    badges: ["Degree Students", "Islamic Scholars"]
  }
];

export interface Facility {
  title: string;
  description: string;
  image: string;
}

export const FACILITIES: Facility[] = [
  {
    title: "Residential Hostel",
    description: "A nurturing and disciplined boarding environment designed to foster brotherhood, study routines, and spiritual character.",
    image: "/images/facilities/bdrhstl.png",
  },
  {
    title: "Library & Research Centre",
    description: "Housing classical Islamic manuscripts, reference works, and digital archives for deep academic research.",
    image: "/images/facilities/library.png",
  },
  {
    title: "Central Mosque",
    description: "The spiritual heart of our campus hosting daily congregational prayers, spiritual retreats, and halaqas.",
    image: "/images/facilities/bdrmosque.png",
  },
  {
    title: "Smart Classrooms",
    description: "Technologically integrated spaces equipped with smart boards, high-speed connectivity, and modern teaching aids.",
    image: "/images/facilities/classrooms.png",
  },
  {
    title: "Conference Hall",
    description: "A premier facility hosting scholarly seminars, guest lectures, student leadership summits, and workshops.",
    image: "/images/facilities/bdrhall.png",
  },
  {
    title: "Creative Corner",
    description: "A dedicated hub for student collaboration, project planning, public speaking prep, and innovative ideas.",
    image: "/images/facilities/creative.png",
  },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 2004, suffix: "", label: "Established" },
  { value: 20, suffix: "+", label: "Years of Service" },
  { value: 500, suffix: "+", label: "Students Guided" },
  { value: 1000, suffix: "+", label: "Lives Impacted" },
];

export interface GalleryItem {
  id: string;
  category: "Campus" | "Events" | "Programs" | "Community";
  title: string;
  aspect: string; // e.g. 'aspect-square', 'aspect-[4/3]', 'aspect-[3/4]'
  image?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", category: "Campus", title: "Beautiful Archways of Badrulhuda", aspect: "aspect-[4/3]" },
  { id: "g2", category: "Programs", title: "Students in Quran Memorization Circles", aspect: "aspect-[3/4]" },
  { id: "g3", category: "Events", title: "Annual Recitation Competition Ceremony", aspect: "aspect-square" },
  { id: "g4", category: "Campus", title: "Serene Prayer Hall Interior", aspect: "aspect-[3/4]" },
  { id: "g5", category: "Community", title: "Weekly Public Lectures & Tajweed Circles", aspect: "aspect-[4/3]" },
  { id: "g6", category: "Events", title: "Youth Leadership Summit 2025", aspect: "aspect-square" },
  { id: "g7", category: "Programs", title: "Arabic Language Interactive Seminar", aspect: "aspect-[4/3]" },
  { id: "g8", category: "Community", title: "Ramadan Food Kit Distribution Drive", aspect: "aspect-[3/4]" },
  // New program images
  { id: "p0", category: "Programs", title: "Quran Memorization & Tajweed Circle", aspect: "aspect-[4/3]", image: "/images/programs/program-0.webp" },
  { id: "p1", category: "Programs", title: "Classroom Learning & Interactive Lectures", aspect: "aspect-[4/3]", image: "/images/programs/program-1.webp" },
  { id: "p2", category: "Programs", title: "Student Gathering & Scholar Assembly", aspect: "aspect-[4/3]", image: "/images/programs/program-2.webp" },
  { id: "p2-alt", category: "Programs", title: "Student Quran Recitation & Evaluation", aspect: "aspect-[4/3]", image: "/images/programs/program-2-alt.webp" },
  { id: "p3", category: "Programs", title: "Mentorship & Academic Guidance Sessions", aspect: "aspect-[4/3]", image: "/images/programs/program-3.webp" },
  { id: "p3-alt", category: "Programs", title: "Arabic Grammar & Language Seminar", aspect: "aspect-[4/3]", image: "/images/programs/program-3-alt.webp" },
  { id: "p4", category: "Programs", title: "Research & Scholarly Development", aspect: "aspect-[4/3]", image: "/images/programs/program-4.webp" },
  { id: "p4-alt", category: "Programs", title: "Islamic Jurisprudence (Fiqh) Workshop", aspect: "aspect-[4/3]", image: "/images/programs/program-4-alt.webp" },
  { id: "p5", category: "Programs", title: "Dars Traditional Learning Methodology", aspect: "aspect-[4/3]", image: "/images/programs/program-5.webp" },
  { id: "p5-alt", category: "Programs", title: "Traditional Text Reading & Hadith Study", aspect: "aspect-[4/3]", image: "/images/programs/program-5-alt.webp" },
  { id: "p6", category: "Programs", title: "Leadership & Community Outreach Training", aspect: "aspect-[4/3]", image: "/images/programs/program-6.webp" },
  { id: "p6-alt", category: "Programs", title: "Youth Spiritual Guidance Assembly", aspect: "aspect-[4/3]", image: "/images/programs/program-6-alt.webp" },
  { id: "p7", category: "Programs", title: "Tajweed Mastery & Quranic Studies", aspect: "aspect-[4/3]", image: "/images/programs/program-7.webp" },
  { id: "p8", category: "Programs", title: "Collaborative Student Peer Study Circles", aspect: "aspect-[4/3]", image: "/images/programs/program-8.webp" },
  { id: "p9", category: "Programs", title: "Islamic Art & Arabic Calligraphy Session", aspect: "aspect-[4/3]", image: "/images/programs/program-9.webp" },
  { id: "p10", category: "Programs", title: "Academic Excellence & Graduation Ceremony", aspect: "aspect-[4/3]", image: "/images/programs/program-10.webp" },
];

export interface AdmissionsStep {
  step: string;
  icon: string;
  title: string;
  description: string;
}

export const ADMISSIONS_STEPS: AdmissionsStep[] = [
  {
    step: "Inquiry",
    icon: "FileSearch",
    title: "Submit Inquiry",
    description: "Fill out the online interest form or visit our campus in Panamaram to speak with our admissions counselors.",
  },
  {
    step: "Application",
    icon: "FileEdit",
    title: "Complete Application",
    description: "Submit the official application form along with the candidate's academic history, references, and relevant documents.",
  },
  {
    step: "Enrollment",
    icon: "CheckCircle",
    title: "Final Interview & Enrollment",
    description: "Attend a friendly student evaluation and family interview. Upon acceptance, complete the registration to secure enrollment.",
  },
];

export interface EventItem {
  id: string;
  category: "Academic" | "Community" | "Religious" | "Open";
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
}

export const EVENTS: EventItem[] = [
  {
    id: "1",
    category: "Academic",
    date: "2025-03-15",
    title: "Annual Quran Recitation Competition",
    description: "A prestigious district-wide competition showcasing outstanding students reciting with precise Tajweed rules in front of a panel of scholars.",
  },
  {
    id: "2",
    category: "Community",
    date: "2025-04-10",
    title: "Panamaram Community Iftar",
    description: "Gathering Wayanad community members, leaders, and families for a spiritual evening of prayer, reflection, and breaking fast together.",
  },
  {
    id: "3",
    category: "Religious",
    date: "2025-05-20",
    title: "Night of spiritual reflection (Qiyam)",
    description: "An overnight spiritual retreat for young adults focusing on purification of the heart, supplementary prayers, and Quranic reflections.",
  },
  {
    id: "4",
    category: "Open",
    date: "2025-06-05",
    title: "Arabic Language Intensive Workshop",
    description: "A free introductory seminar open to the public covering foundational Arabic writing, basic vocabulary, and grammar rules.",
  },
  {
    id: "5",
    category: "Academic",
    date: "2025-07-12",
    title: "Badrulhuda Graduation Ceremony",
    description: "Honoring our newest Hifz and Islamic studies graduates as they receive their certifications (Ijazah) and prepare for community service.",
  },
  {
    id: "6",
    category: "Community",
    date: "2025-08-25",
    title: "Youth Leadership and Ethics Forum",
    description: "A interactive workshop series empowering Wayanad youth with leadership capabilities grounded in classical Islamic ethics.",
  },
];

export const CONTACT_INFO = {
  address: "Panamaram, Wayanad, Kerala, India — PIN 670721",
  phone: "04935 222340",
  mobile: "+91 94477 83313",
  email: "badrulhudawyd@gmail.com",
  whatsapp: "+91 94477 83313",
  mapsLink: "https://maps.app.goo.gl/mDA6ySYPckgd2DsF9",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.316903915642!2d76.0720285434567!3d11.7427156382103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5dfe5f115dde3%3A0x2fc890b244856e93!2sBADRULHUDA%20ACADEMY!5e0!3m2!1sen!2sin!4v1718234567890!5m2!1sen!2sin",
};
