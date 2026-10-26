"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Compass,
  Heart,
  Menu,
  MessageCircle,
  Radio,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

const navLinks = [
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "Live", href: "/live", icon: Radio },
  { label: "Messages", href: "/messages", icon: MessageCircle },
];

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0B0B14]/95 text-white backdrop-blur-xl">
      {/* Main navbar */}
      <div className="mx-auto flex h-[60px] max-w-[1440px] items-center gap-2 px-3 sm:h-[68px] sm:gap-4 sm:px-6 lg:h-[72px] lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          aria-label="VYBRO home"
          className="group flex shrink-0 items-center gap-1.5 sm:gap-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-fuchsia-500 via-violet-600 to-cyan-400 shadow-md shadow-fuchsia-500/20 transition-transform group-hover:scale-105 sm:h-10 sm:w-10 sm:rounded-xl">
            <span className="text-lg font-black text-white sm:text-xl">
              V
            </span>
          </span>

          <span className="text-[17px] font-black tracking-tight sm:text-[23px]">
            VY
            <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              BRO
            </span>
          </span>
        </Link>

        {/* Desktop search */}
        <div className="relative ml-3 hidden max-w-sm flex-1 md:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
          />

          <input
            type="search"
            placeholder="Search people, rooms..."
            aria-label="Search people and rooms"
            className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-fuchsia-500/60 focus:ring-2 focus:ring-fuchsia-500/10"
          />
        </div>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="ml-auto hidden items-center gap-1 lg:flex"
        >
          {navLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white/65 transition hover:bg-white/[0.06] hover:text-white"
            >
              <Icon size={17} />
              {label}

              {label === "Live" && (
                <span className="h-2 w-2 rounded-full bg-fuchsia-500 shadow-[0_0_10px_#d946ef]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right-side actions */}
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 lg:ml-3">
          {/* Search toggle */}
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/65 transition hover:bg-white/10 hover:text-white sm:h-10 sm:w-10"
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-white/65 transition hover:bg-white/10 hover:text-white sm:h-10 sm:w-10"
          >
            <Bell size={18} />

            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-fuchsia-400 sm:right-2 sm:top-2" />
          </button>

          {/* Profile menu: desktop only */}
          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-fuchsia-400/25 bg-gradient-to-br from-fuchsia-500/20 to-violet-600/30 transition hover:border-fuchsia-400/60"
            >
              <UserRound size={19} className="text-fuchsia-200" />
              <ChevronDown
                size={11}
                className="ml-0.5 text-white/50"
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-12 z-[60] w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#151020] p-2 shadow-2xl shadow-black/50">
                <Link
                  href="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/80 hover:bg-white/[0.07]"
                >
                  <UserRound size={17} />
                  My Profile
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/80 hover:bg-white/[0.07]"
                >
                  <Settings size={17} />
                  Settings
                </Link>

                <Link
                  href="/safety"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/80 hover:bg-white/[0.07]"
                >
                  <ShieldCheck size={17} />
                  Safety & Privacy
                </Link>
              </div>
            )}
          </div>

          {/* Premium: desktop/tablet */}
          <Link
            href="/premium"
            className="ml-1 hidden items-center gap-2 rounded-full border border-fuchsia-400/25 bg-gradient-to-r from-fuchsia-500/15 to-violet-500/15 px-4 py-2.5 text-sm font-semibold text-fuchsia-200 transition hover:border-fuchsia-400/50 sm:flex"
          >
            <Heart size={16} />
            <span className="hidden xl:inline">Premium</span>
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Expandable mobile search */}
      {searchOpen && (
        <div className="border-t border-white/[0.08] px-3 py-3 md:hidden">
          <form action="/discover" className="relative mx-auto max-w-lg">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
            />

            <input
              type="search"
              name="q"
              autoFocus
              placeholder="Search people and rooms..."
              aria-label="Search people and rooms"
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-fuchsia-500/60"
            />
          </form>
        </div>
      )}

      {/* Mobile menu: no duplicate bottom navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile menu"
          className="border-t border-white/[0.08] px-3 py-3 lg:hidden"
        >
          <div className="mx-auto grid max-w-lg gap-1">
            {navLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/75 transition hover:bg-white/[0.06] hover:text-white"
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}

            <Link
              href="/premium"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-fuchsia-200 transition hover:bg-fuchsia-500/10"
            >
              <Heart size={18} />
              VYBRO Premium
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
