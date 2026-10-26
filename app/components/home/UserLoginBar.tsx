"use client";

import { useState } from "react";
import Image from "next/image";
import {
  UserRound,
  LogIn,
  LogOut,
  ShieldCheck,
  MapPin,
  Search,
  X,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

export interface CurrentUser {
  id: string;
  name: string;
  age: number;
  pronouns: string;
  avatar: string;
  bio: string;
  vibe: string;
  isOnline: boolean;
  isVerified: boolean;
  location: string;
}

const defaultUser: CurrentUser = {
  id: "user-me",
  name: "Jordan Alex",
  age: 25,
  pronouns: "they/them",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
  bio: "Living authentically in full color 🌈 Music lover, coffee nerd & plant parent.",
  vibe: "✨ Creative Soul",
  isOnline: true,
  isVerified: true,
  location: "Downtown • 0 km",
};

interface UserLoginBarProps {
  currentUser: CurrentUser | null;
  onLogin: (user: CurrentUser) => void;
  onLogout: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  activeFilter: string;
  onFilterChange: (val: string) => void;
}

export default function UserLoginBar({
  currentUser,
  onLogin,
  onLogout,
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: UserLoginBarProps) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [pronounsInput, setPronounsInput] = useState("they/them");

  const demoProfiles: CurrentUser[] = [
    {
      id: "user-1",
      name: "Jordan Alex",
      age: 25,
      pronouns: "they/them",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      bio: "Queer creator, techno vibes & art lover 🏳️‍🌈",
      vibe: "✨ Creative Soul",
      isOnline: true,
      isVerified: true,
      location: "Downtown",
    },
    {
      id: "user-2",
      name: "Taylor Moon",
      age: 24,
      pronouns: "she/they",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      bio: "Trans activist & indie coffee brewer ☕💜",
      vibe: "💜 Trans Joy",
      isOnline: true,
      isVerified: true,
      location: "West End",
    },
    {
      id: "user-3",
      name: "Sammy Vance",
      age: 27,
      pronouns: "he/him",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      bio: "Gay designer & vinyl hunter 🎧",
      vibe: "🎧 Music & Beats",
      isOnline: true,
      isVerified: true,
      location: "Arts District",
    },
  ];

  const handleCustomAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: CurrentUser = {
      id: `user-${Date.now()}`,
      name: nameInput.trim() || (isRegisterMode ? "New User" : "Community Member"),
      age: 24,
      pronouns: pronounsInput,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      bio: "Excited to meet awesome folks in the community! 🌈",
      vibe: "✨ Friendly",
      isOnline: true,
      isVerified: true,
      location: "Nearby",
    };
    onLogin(newUser);
    setLoginModalOpen(false);
  };

  const handleSelectDemo = (p: CurrentUser) => {
    onLogin(p);
    setLoginModalOpen(false);
  };

  return (
    <div className="relative pt-3 pb-2 sm:pt-5 sm:pb-3">
      <div className="mx-auto max-w-[1440px] px-3 sm:px-6 lg:px-8">
        {/* App Top User Profile & Status Bar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#141224] p-3 shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-4">
          {/* User profile snapshot or login prompt */}
          {currentUser ? (
            <div
              onClick={() => setProfileModalOpen(true)}
              className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-90"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-fuchsia-500">
                <Image
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#141224] bg-emerald-500" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="truncate text-sm font-bold text-white sm:text-base">
                    {currentUser.name}, {currentUser.age}
                  </h3>
                  {currentUser.isVerified && (
                    <ShieldCheck size={14} className="text-cyan-400 shrink-0" />
                  )}
                  <span className="rounded bg-fuchsia-500/20 px-1.5 py-0.2 text-[10px] font-semibold text-fuchsia-300">
                    {currentUser.pronouns}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span className="text-emerald-400 font-medium">● Online</span>
                  <span>•</span>
                  <span className="truncate">{currentUser.vibe}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/60">
                <UserRound size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Welcome to VYBRO</h3>
                <p className="text-xs text-white/50">
                  Log in to join live voice rooms, chat & connect.
                </p>
              </div>
            </div>
          )}

          {/* Action buttons (Login, Switch, Filter pills) */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {currentUser ? (
              <>
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(true)}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  My Profile
                </button>
                <button
                  type="button"
                  onClick={() => setLoginModalOpen(true)}
                  title="Switch or re-login"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/15 px-3 py-1.5 text-xs font-bold text-fuchsia-300 transition hover:bg-fuchsia-500/25"
                >
                  <UserRound size={13} />
                  <span>Switch</span>
                </button>
                <button
                  type="button"
                  onClick={onLogout}
                  title="Sign out"
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition hover:bg-rose-500/20 hover:text-rose-300"
                >
                  <LogOut size={14} />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setLoginModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-fuchsia-500/20 transition hover:brightness-110 active:scale-95"
              >
                <LogIn size={14} />
                <span>Log In / Sign Up</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick App Search & Vibe Filter Row (Compact & Native app style) */}
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search profiles by name, vibe, interests..."
              className="w-full rounded-xl border border-white/10 bg-[#131122] py-2.5 pl-9 pr-4 text-xs text-white placeholder-white/40 outline-none transition focus:border-fuchsia-500/60"
            />
          </div>

          {/* Quick filter buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: "all", label: "All Nearby" },
              { id: "online", label: "● Online" },
              { id: "voice", label: "🎙️ Voice Ready" },
              { id: "new", label: "✨ New" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => onFilterChange(f.id)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                  activeFilter === f.id
                    ? "bg-fuchsia-500 text-white shadow-sm"
                    : "border border-white/10 bg-[#131122] text-white/60 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LOGIN & SIGN UP MODAL */}
      {loginModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[160] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setLoginModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl border border-white/15 bg-[#141224] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white">
                  {isRegisterMode ? "Create Your Account" : "Log In to VYBRO"}
                </h3>
                <p className="mt-0.5 text-xs text-white/50">
                  Instant access to live voice rooms & nearby profiles.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLoginModalOpen(false)}
                className="text-white/40 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick 1-Click Demo Profiles */}
            <div className="mt-4 rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/[0.05] p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-fuchsia-300">
                ⚡ Instant 1-Click Demo Login
              </span>
              <div className="mt-2.5 flex flex-col gap-2">
                {demoProfiles.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectDemo(p)}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-2 text-left transition hover:border-fuchsia-400/50 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full">
                        <Image
                          src={p.avatar}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{p.name}</p>
                        <p className="text-[10px] text-white/50">
                          {p.pronouns} • {p.vibe}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-lg bg-fuchsia-500/20 px-2.5 py-1 text-[11px] font-semibold text-fuchsia-300">
                      Login →
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Standard Email Form */}
            <form onSubmit={handleCustomAuth} className="mt-4 flex flex-col gap-3">
              {isRegisterMode && (
                <>
                  <div>
                    <label className="text-xs font-medium text-white/70">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="e.g. Sasha Rivera"
                      className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white placeholder-white/40 outline-none focus:border-fuchsia-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-white/70">
                      Pronouns
                    </label>
                    <select
                      value={pronounsInput}
                      onChange={(e) => setPronounsInput(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-[#1a172e] p-2.5 text-xs text-white outline-none focus:border-fuchsia-400"
                    >
                      <option value="they/them">they/them</option>
                      <option value="he/him">he/him</option>
                      <option value="she/her">she/her</option>
                      <option value="she/they">she/they</option>
                      <option value="he/they">he/they</option>
                      <option value="any pronouns">any pronouns</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="text-xs font-medium text-white/70">
                  Email Address
                </label>
                <div className="relative mt-1">
                  <Mail
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-8 pr-3 text-xs text-white placeholder-white/40 outline-none focus:border-fuchsia-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-white/70">Password</label>
                <div className="relative mt-1">
                  <Lock
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-8 pr-3 text-xs text-white placeholder-white/40 outline-none focus:border-fuchsia-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 py-2.5 text-xs font-bold text-white shadow-md shadow-fuchsia-500/25 transition hover:brightness-110 active:scale-95"
              >
                <span>{isRegisterMode ? "Sign Up" : "Log In"}</span>
                <ArrowRight size={14} />
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="text-xs text-fuchsia-300 hover:underline"
              >
                {isRegisterMode
                  ? "Already have an account? Log In"
                  : "Don't have an account? Create one"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* USER PROFILE MODAL */}
      {profileModalOpen && currentUser && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[160] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setProfileModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl border border-white/15 bg-[#141224] p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Your Profile</h3>
              <button
                type="button"
                onClick={() => setProfileModalOpen(false)}
                className="text-white/40 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 flex flex-col items-center text-center">
              <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-fuchsia-500/40">
                <Image
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-3 flex items-center gap-1.5">
                <h4 className="text-lg font-bold text-white">
                  {currentUser.name}, {currentUser.age}
                </h4>
                <ShieldCheck size={16} className="text-cyan-400" />
              </div>

              <span className="mt-1 rounded-md bg-white/10 px-2.5 py-0.5 text-xs text-fuchsia-300">
                {currentUser.pronouns}
              </span>

              <p className="mt-3 text-xs leading-relaxed text-white/70">
                {currentUser.bio}
              </p>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-white/50">
                <MapPin size={12} className="text-fuchsia-400" />
                <span>{currentUser.location}</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setProfileModalOpen(false);
                  setLoginModalOpen(true);
                }}
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
              >
                Switch User
              </button>
              <button
                type="button"
                onClick={() => setProfileModalOpen(false)}
                className="flex-1 rounded-xl bg-fuchsia-500 py-2 text-xs font-bold text-white shadow-md hover:bg-fuchsia-600"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export { defaultUser };
