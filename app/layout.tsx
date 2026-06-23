import type { Metadata } from "next";
import { Amiri, Inter, Scheherazade_New, Cairo, Noto_Kufi_Arabic, Aref_Ruqaa, El_Messiri, Tajawal } from "next/font/google";
import "./globals.css";
import { SiteDataProvider } from "@/lib/context/SiteDataContext";
import MotionProvider from "@/components/providers/MotionProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementModal from "@/components/ui/AnnouncementModal";
import { siteMetadata } from "@/lib/metadata";

// Load typography system faces from Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-scheherazade",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-cairo",
  display: "swap",
});

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-noto-kufi",
  display: "swap",
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-aref-ruqaa",
  display: "swap",
});

const elMessiri = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-el-messiri",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

// Configure Next.js Metadata for SEO
export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  robots: siteMetadata.robots,
  alternates: {
    canonical: siteMetadata.canonical,
  },
  openGraph: {
    type: "website",
    locale: siteMetadata.openGraph.locale,
    url: siteMetadata.openGraph.url,
    title: siteMetadata.openGraph.title,
    description: siteMetadata.openGraph.description,
    siteName: siteMetadata.openGraph.siteName,
    images: siteMetadata.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.twitter.title,
    description: siteMetadata.twitter.description,
    images: siteMetadata.twitter.images,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${amiri.variable} ${scheherazade.variable} ${cairo.variable} ${notoKufi.variable} ${arefRuqaa.variable} ${elMessiri.variable} ${tajawal.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="antialiased bg-surface text-textColor-primary selection:bg-accent/30">
        <SiteDataProvider>
          <MotionProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <AnnouncementModal />
          </MotionProvider>
        </SiteDataProvider>
      </body>
    </html>
  );
}
