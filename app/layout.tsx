import type { Metadata } from "next";
import "./globals.css";
import { SiteDataProvider } from "@/lib/context/SiteDataContext";
import MotionProvider from "@/components/providers/MotionProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementModal from "@/components/ui/AnnouncementModal";
import { siteMetadata } from "@/lib/metadata";

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
      className="scroll-smooth"
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
