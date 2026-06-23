import { Client } from "pg";
import { PROGRAMS, EVENTS, CONTACT_INFO } from "../lib/constants";
import { GALLERY_CONFIG } from "../lib/gallery-config";

const defaultHomepageHero = {
  title: "Rooted in Faith. Rising Through Knowledge.",
  subtitle: "Guided by the Qur'an and Prophetic tradition, Badrulhuda Academy nurtures knowledgeable, compassionate, and responsible individuals prepared to serve their communities and uphold Islamic values.",
};

const defaultAnnouncements = [
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

const defaultDonationDetails = {
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

const defaultOrphanBeneficiaries = [
  { id: "1", childName: "Muhammad Ameen", guardianName: "Khadija", address: "Panamaram, Wayanad", phone: "9447712345", supportStatus: "Active", notes: "Sponsored since 2024" },
  { id: "2", childName: "Fathima Najiya", guardianName: "Rahmath", address: "Kaniyambetta, Wayanad", phone: "9847254321", supportStatus: "Active", notes: "Receives monthly scholarship" },
  { id: "3", childName: "Zainul Abid", guardianName: "Aboobacker", address: "Mananthavady, Wayanad", phone: "9562385412", supportStatus: "Active", notes: "Emergency medical support provided" },
];

const defaultSettings = {
  seoTitle: "Badrulhuda Academy | Islamic Scholars & Integrated Education",
  seoDescription: "Bridging sacred Islamic knowledge with modern educational excellence at Panamaram, Wayanad, Kerala.",
  seoKeywords: "Badrulhuda Academy, Wayanad Dars, Hifz Wayanad, Islamic Integrated Education Kerala, Panamaram Academy",
  facebookUrl: "https://facebook.com/badrulhuda",
  instagramUrl: "https://instagram.com/badrulhuda",
  youtubeUrl: "https://youtube.com/badrulhuda",
  twitterUrl: "https://twitter.com/badrulhuda",
};

const connectionString = "postgresql://postgres.ckuenomlzftmvcbiorjf:Usmanmoulavi%40bdr@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres";

async function main() {
  console.log("Connecting to Supabase Postgres database...");
  const client = new Client({ connectionString });
  await client.connect();
  console.log("Connected successfully!");

  try {
    console.log("Creating 'site_content' table if not exists...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        key TEXT PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `);
    console.log("Table check completed.");

    const seedData = [
      { key: "homepageHero", value: defaultHomepageHero },
      { key: "programs", value: PROGRAMS },
      { key: "galleryConfig", value: GALLERY_CONFIG },
      { key: "events", value: EVENTS },
      { key: "admissionsApplications", value: [] },
      { key: "orphanBeneficiaries", value: defaultOrphanBeneficiaries },
      { key: "announcements", value: defaultAnnouncements },
      { key: "donationDetails", value: defaultDonationDetails },
      { key: "contactInfo", value: CONTACT_INFO },
      { key: "settings", value: defaultSettings },
    ];

    console.log("Seeding initial data into 'site_content' table...");
    for (const item of seedData) {
      console.log(`Upserting key: ${item.key}...`);
      await client.query(
        `INSERT INTO site_content (key, value, updated_at) 
         VALUES ($1, $2, now()) 
         ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = now()`,
        [item.key, JSON.stringify(item.value)]
      );
    }
    console.log("Seeding completed successfully! Supabase is fully configured.");
  } catch (error) {
    console.error("Database operation failed:", error);
  } finally {
    await client.end();
  }
}

main().catch(console.error);
