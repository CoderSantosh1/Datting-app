"use client";

import { useState } from "react";
import {
  Compass,
  Radio,
  Search,
  Sparkles,
  ShieldCheck,
  Users,
  Heart,
  Smartphone,
  Laptop,
  Flame,
} from "lucide-react";

interface HeroSectionProps {
  onSearchChange?: (term: string) => void;
  onFilterTagSelect?: (tag: string) => void;
  selectedTag?: string;
}

const vibeTags = [
  "🌈 All Pride",
  "⚡ Live Voice Now",
  "☕ Coffee & Chill",
  "🏳️‍⚧️ Trans & Non-Binary",
  "🎵 Music & Beats",
  "🎨 Arts & Film",
  "🎮 Queer Gamers",
  "🌿 Outdoor & Hiking",
];

export default function HeroSection({
  onSearchChange,
  onFilterTagSelect,
  selectedTag = "🌈 All Pride",
}: HeroSectionProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange?.(searchInput);
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20">
      {/* Background Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-fuchsia-600/25 via-violet-600/20 to-cyan-500/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-1/3 -z-10 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/2 -z-10 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]"
      />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Top Floating Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-500/15 via-violet-500/15 to-cyan-500/15 px-3.5 py-1.5 text-xs font-semibold text-fuchsia-200 shadow-sm backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_8px_#d946ef] animate-pulse" />
            <span>Inclusive LGBTQ+ Community</span>
            <span className="text-white/40">•</span>
            <span className="text-cyan-300">Web • Tablet • Mobile App</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70 backdrop-blur-md">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Zero Hate • Safe Space</span>
          </div>
        </div>

        {/* Headline & Subhead */}
        <div className="mx-auto mt-6 max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Real People.{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Real Vibes.
            </span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base sm:leading-7 lg:text-lg">
            Connect authentically with the LGBTQ+ community nearby and worldwide.
            Drop into lively voice rooms, discover genuine friends and dates, and
            share your daily story seamlessly on any device.
          </p>

          {/* Device Badges indicator */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-white/50">
            <span className="inline-flex items-center gap-1.5">
              <Smartphone size={14} className="text-fuchsia-400" /> Mobile Ready
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Laptop size={14} className="text-cyan-400" /> Tablet & Desktop
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Flame size={14} className="text-amber-400" /> Realtime Vibes
            </span>
          </div>
        </div>

        {/* Quick Search & Explore Bar */}
        <div className="mx-auto mt-8 max-w-2xl">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-white/[0.05] p-2 shadow-2xl backdrop-blur-xl transition focus-within:border-fuchsia-500/60 sm:flex-row sm:items-center sm:rounded-full sm:p-2 sm:pl-5"
          >
            <div className="flex flex-1 items-center gap-3 px-2 sm:px-0">
              <Search size={19} className="text-white/40" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  onSearchChange?.(e.target.value);
                }}
                placeholder="Find people by vibe, pronouns, interests (e.g. coffee, queer, techno)..."
                className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl sm:rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 transition hover:brightness-110 active:scale-95"
              >
                <Compass size={17} />
                <span>Explore</span>
              </button>
            </div>
          </form>

          {/* Vibe Chips Carousel / Row */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {vibeTags.map((tag) => {
              const active = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onFilterTagSelect?.(tag)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "border border-fuchsia-400 bg-fuchsia-500/25 text-white shadow-sm shadow-fuchsia-500/20"
                      : "border border-white/10 bg-white/[0.04] text-white/70 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Stat Highlights */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="flex flex-col items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-center backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-500/15 text-fuchsia-300">
              <Users size={19} />
            </div>
            <span className="mt-2 text-xl font-black text-white sm:text-2xl">
              150k+
            </span>
            <span className="text-xs text-white/50">Verified Members</span>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-center backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
              <Radio size={19} />
            </div>
            <span className="mt-2 text-xl font-black text-white sm:text-2xl">
              4.2k
            </span>
            <span className="text-xs text-white/50">Live Rooms Weekly</span>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-center backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/15 text-rose-300">
              <Heart size={19} />
            </div>
            <span className="mt-2 text-xl font-black text-white sm:text-2xl">
              890k+
            </span>
            <span className="text-xs text-white/50">Genuine Matches</span>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-center backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
              <Sparkles size={19} />
            </div>
            <span className="mt-2 text-xl font-black text-white sm:text-2xl">
              99.8%
            </span>
            <span className="text-xs text-white/50">Safe & Monitored</span>
          </div>
        </div>
      </div>
    </section>
  );
}
