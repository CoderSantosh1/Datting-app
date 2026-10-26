import type { Metadata, Viewport } from "next";
import MobileHeader from "@/app/components/layout/MobileHeader";
import BottomNav from "@/app/components/layout/BottomNav";
import { ThemeProvider } from "@/app/context/ThemeContext";

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
    <html
      lang="en"
      data-theme="dark"
      className="dark"
      suppressHydrationWarning
    >
      <head>
        {/* Instant theme resolver: Default is DARK, or previously stored user preference */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('vybro_theme');
                var theme = (stored === 'light' || stored === 'dark') ? stored : 'dark';
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.style.colorScheme = theme;
                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-outer)] text-[var(--text-primary)] antialiased flex justify-center selection:bg-fuchsia-500/30">
        <ThemeProvider>
          {/* Strictly Mobile App Container (Centers on desktop/tablet, 100% full-width on mobile) */}
          <div className="w-full max-w-md min-h-screen bg-[var(--bg-app)] flex flex-col relative shadow-[var(--shadow-app)] border-x border-[var(--border-subtle)] transition-colors duration-200">
            <MobileHeader />
            <main className="flex-1 pb-20">{children}</main>
            <BottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
