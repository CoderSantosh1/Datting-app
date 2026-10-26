"use client";

import LiveRooms from "@/app/components/home/LiveRooms";

export default function LivePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-app)] pb-24 md:pb-12 transition-colors duration-200">
      <LiveRooms />
    </div>
  );
}
