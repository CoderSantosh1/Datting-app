"use client";

import NearbyPeople from "@/app/components/home/NearbyPeople";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-12 bg-[var(--bg-app)] transition-colors duration-200">
      {/* Home page: ONLY People Nearby cards */}
      <NearbyPeople />
    </div>
  );
}
