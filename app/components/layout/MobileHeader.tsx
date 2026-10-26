"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

export default function MobileHeader() {
  const { theme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const mockNotifications = [
    { id: "1", title: "New Wave 👋", desc: "Leo Rivera waved to your profile.", time: "5m ago" },
    { id: "2", title: "Live Room Started 🎙️", desc: "Sasha is live in 'Late Night Banter'.", time: "20m ago" },
    { id: "3", title: "Profile Verified ✓", desc: "Your identity badge is active.", time: "1d ago" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--header-bg)] backdrop-blur-xl transition-colors duration-200">
      <div className="flex h-14 items-center justify-between px-3.5">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-600 to-cyan-400 shadow-md shadow-fuchsia-500/25">
            <span className="text-base font-black text-white">V</span>
          </span>
          <span className="text-lg font-black tracking-tight text-[var(--text-primary)]">
            VY<span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">BRO</span>
          </span>
        </Link>

        {/* Top App Actions */}
        <div className="flex items-center gap-1">
          {/* Theme Toggle (Light / Dark) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
            title={theme === "dark" ? "Switch to Light mode" : "Switch to Dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-secondary)] transition hover:bg-[var(--badge-bg)] hover:text-[var(--text-primary)] active:scale-95"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-amber-300 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon size={18} className="text-violet-600 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Search Toggle */}
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-secondary)] transition hover:bg-[var(--badge-bg)] hover:text-[var(--text-primary)] active:scale-95"
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              aria-label="Notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-secondary)] transition hover:bg-[var(--badge-bg)] hover:text-[var(--text-primary)] active:scale-95"
            >
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-fuchsia-500 animate-pulse" />
            </button>

            {/* Notifications Flyout Drawer */}
            {notificationsOpen && (
              <div className="absolute right-0 top-11 z-[80] w-72 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                  <span className="text-xs font-bold text-[var(--text-primary)]">Notifications</span>
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="mt-2 flex flex-col gap-2">
                  {mockNotifications.map((n) => (
                    <div
                      key={n.id}
                      className="rounded-xl bg-[var(--badge-bg)] p-2 text-left transition hover:bg-[var(--border-subtle)]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[var(--text-primary)]">{n.title}</span>
                        <span className="text-[10px] text-[var(--text-muted)]">{n.time}</span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-[var(--text-secondary)]">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Search Input */}
      {searchOpen && (
        <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-app)] px-3.5 py-2.5 transition-colors">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search people by vibe, pronouns, interests..."
              className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] py-2 pl-9 pr-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-fuchsia-400"
            />
          </div>
        </div>
      )}
    </header>
  );
}
