"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  MapPin,
  Camera,
  Edit3,
  EyeOff,
  Bell,
  Volume2,
  Lock,
  ChevronRight,
  X,
} from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("Jordan Alex");
  const [age, setAge] = useState(25);
  const [pronouns, setPronouns] = useState("they/them");
  const [bio, setBio] = useState("Living authentically in full color 🌈 Music lover, coffee nerd & plant parent.");
  const [vibe, setVibe] = useState("✨ Creative Soul");

  const [incognito, setIncognito] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [voiceNotes, setVoiceNotes] = useState(true);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditModalOpen(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] px-3 pt-4 pb-8">
      {/* Toast Alert */}
      {saveToast && (
        <div className="fixed top-16 inset-x-4 z-[120] mx-auto max-w-xs rounded-2xl bg-emerald-500/90 py-2 px-3 text-center text-xs font-bold text-white shadow-lg backdrop-blur-md animate-in fade-in duration-200">
          ✓ Profile updated successfully!
        </div>
      )}

      {/* Profile Card */}
      <div className="rounded-3xl border border-white/10 bg-[#141224] p-5 text-center">
        {/* Avatar with Camera badge */}
        <div className="relative mx-auto h-22 w-22">
          <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-fuchsia-500/50">
            <Image
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            title="Update photo"
            className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-md"
          >
            <Camera size={13} />
          </button>
        </div>

        {/* Name & Pronouns */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          <h1 className="text-lg font-black text-white">{name}, {age}</h1>
          <span title="Verified Safe Profile" className="text-cyan-400">
            <ShieldCheck size={16} />
          </span>
        </div>

        <div className="mt-1 flex items-center justify-center gap-2">
          <span className="rounded bg-fuchsia-500/20 px-2 py-0.5 text-[11px] font-semibold text-fuchsia-300">
            {pronouns}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/70">
            {vibe}
          </span>
        </div>

        {/* Bio */}
        <p className="mt-2.5 text-xs leading-relaxed text-white/70 px-2">
          {bio}
        </p>

        <div className="mt-2 flex items-center justify-center gap-1 text-[11px] text-white/45">
          <MapPin size={12} className="text-fuchsia-400" />
          <span>Downtown • LGBTQ+ Community Member</span>
        </div>

        {/* Edit Button */}
        <button
          type="button"
          onClick={() => setEditModalOpen(true)}
          className="mt-3.5 inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10"
        >
          <Edit3 size={13} />
          <span>Edit Profile</span>
        </button>

        {/* Stats Row */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/[0.08] pt-3.5 text-center">
          <div className="rounded-xl bg-white/[0.03] p-2">
            <span className="text-base font-black text-white">128</span>
            <p className="text-[10px] text-white/50">Waves</p>
          </div>
          <div className="rounded-xl bg-white/[0.03] p-2">
            <span className="text-base font-black text-fuchsia-300">42</span>
            <p className="text-[10px] text-white/50">Matches</p>
          </div>
          <div className="rounded-xl bg-white/[0.03] p-2">
            <span className="text-base font-black text-cyan-300">9</span>
            <p className="text-[10px] text-white/50">Rooms Hosted</p>
          </div>
        </div>
      </div>

      {/* App Settings & Privacy Controls */}
      <div className="mt-4 rounded-3xl border border-white/10 bg-[#141224] p-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-white/50 px-1">
          Privacy & App Preferences
        </h2>

        <div className="mt-3 flex flex-col gap-2.5">
          {/* Incognito Mode */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
                <EyeOff size={16} />
              </span>
              <div>
                <p className="text-xs font-bold text-white">Incognito Mode</p>
                <p className="text-[10px] text-white/45">Browse profiles invisibly</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIncognito(!incognito)}
              className={`h-5 w-9 rounded-full transition-colors relative ${
                incognito ? "bg-fuchsia-500" : "bg-white/20"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                  incognito ? "left-4.5" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-300">
                <Bell size={16} />
              </span>
              <div>
                <p className="text-xs font-bold text-white">Notifications</p>
                <p className="text-[10px] text-white/45">Alerts for waves & rooms</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setNotifications(!notifications)}
              className={`h-5 w-9 rounded-full transition-colors relative ${
                notifications ? "bg-fuchsia-500" : "bg-white/20"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                  notifications ? "left-4.5" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {/* Voice Notes */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/15 text-rose-300">
                <Volume2 size={16} />
              </span>
              <div>
                <p className="text-xs font-bold text-white">Audio Prompts</p>
                <p className="text-[10px] text-white/45">Auto-preview voice vibes</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setVoiceNotes(!voiceNotes)}
              className={`h-5 w-9 rounded-full transition-colors relative ${
                voiceNotes ? "bg-fuchsia-500" : "bg-white/20"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                  voiceNotes ? "left-4.5" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Safety & Support */}
      <div className="mt-3 rounded-2xl border border-emerald-500/20 bg-emerald-950/15 p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
            <Lock size={16} />
          </span>
          <div>
            <p className="text-xs font-bold text-white">Safety Center</p>
            <p className="text-[10px] text-white/50">Zero-harassment guidelines</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-white/40" />
      </div>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setEditModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl border border-white/15 bg-[#141224] p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-sm font-bold text-white">Edit Your Profile</h3>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="text-white/40 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-3 flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-medium text-white/70">Display Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-2 text-xs text-white outline-none focus:border-fuchsia-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-medium text-white/70">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value) || 25)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-2 text-xs text-white outline-none focus:border-fuchsia-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-white/70">Pronouns</label>
                  <select
                    value={pronouns}
                    onChange={(e) => setPronouns(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-[#161228] p-2 text-xs text-white outline-none focus:border-fuchsia-400"
                  >
                    <option value="they/them">they/them</option>
                    <option value="he/him">he/him</option>
                    <option value="she/her">she/her</option>
                    <option value="she/they">she/they</option>
                    <option value="he/they">he/they</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-white/70">Vibe Tag</label>
                <input
                  type="text"
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] p-2 text-xs text-white outline-none focus:border-fuchsia-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-white/70">About Me / Bio</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] p-2 text-xs text-white outline-none focus:border-fuchsia-400"
                />
              </div>

              <div className="mt-1 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] py-2 text-xs font-semibold text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 py-2 text-xs font-bold text-white shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
