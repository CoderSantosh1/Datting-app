import type { Metadata, Viewport } from "next";
import MobileHeader from "@/app/components/layout/MobileHeader";
import BottomNav from "@/app/components/layout/BottomNav";

import "./globals.css";

export const metadata: Metadata = {
  title: "VYBRO — LGBTQ+ Community App",
  description:
    "Discover people nearby, join live voice rooms, and connect with your community on VYBRO.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VYBRO",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0B0B14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#040408] text-white antialiased flex justify-center selection:bg-fuchsia-500/30">
        {/* Strictly Mobile App Container (Centers on desktop/tablet, 100% full-width on mobile) */}
        <div className="w-full max-w-md min-h-screen bg-[#0B0B14] flex flex-col relative shadow-[0_0_60px_rgba(0,0,0,0.85)] border-x border-white/[0.06]">
          <MobileHeader />
          <main className="flex-1 pb-20">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
