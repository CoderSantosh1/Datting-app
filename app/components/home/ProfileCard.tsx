"use client";

import { useRef } from "react";
import Image from "next/image";

export interface Profile {
  id: string;
  name: string;
  age: number;
  pronouns: string;
  distance: string;
  location: string;
  bio: string;
  avatar: string;
  isOnline: boolean;
  isVerified: boolean;
  isNew?: boolean;
  tags: string[];
  vibe: string;
  voiceNoteDuration?: string;
}

interface ProfileCardProps {
  profile: Profile;
  onOpenModal?: (profile: Profile) => void;
}

export default function ProfileCard({ profile, onOpenModal }: ProfileCardProps) {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTouchTimeRef = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (e.touches.length > 0) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = Math.abs(touch.clientX - touchStartRef.current.x);
    const dy = Math.abs(touch.clientY - touchStartRef.current.y);
    const dt = Date.now() - touchStartRef.current.time;
    touchStartRef.current = null;

    // Movement under 12px and under 500ms = legitimate tap (not a scroll)
    if (dx < 12 && dy < 12 && dt < 500) {
      lastTouchTimeRef.current = Date.now();
      e.stopPropagation();
      onOpenModal?.(profile);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Prevent duplicate firing if already handled by touchEnd within 500ms
    if (Date.now() - lastTouchTimeRef.current < 500) {
      return;
    }
    onOpenModal?.(profile);
  };

  return (
    <button
      type="button"
      aria-label={`View ${profile.name}'s profile details`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#131122] p-0 text-left transition-opacity duration-150 active:opacity-75 hover:border-fuchsia-500/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50 touch-manipulation block select-none"
    >
      {/* Profile Photo */}
      <Image
        src={profile.avatar}
        alt={profile.name}
        fill
        sizes="(max-width: 640px) 25vw, 150px"
        className="pointer-events-none object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Dark gradient overlay for text readability */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

      {/* Online indicator dot on top right */}
      {profile.isOnline && (
        <span className="pointer-events-none absolute top-1.5 right-1.5 h-2 w-2 rounded-full border border-black bg-emerald-400 shadow-sm" />
      )}

      {/* Verified check dot top left */}
      {profile.isVerified && (
        <span className="pointer-events-none absolute top-1.5 left-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-sm" />
      )}

      {/* User Name & Distance (e.g. Leo • 150m) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-1 px-1 text-center">
        <p className="truncate text-[11px] font-bold text-white drop-shadow-md leading-tight">
          {profile.name.split(" ")[0]}
        </p>
        <p className="truncate text-[9px] font-semibold text-fuchsia-300/90 leading-tight">
          {profile.distance}
        </p>
      </div>
    </button>
  );
}
