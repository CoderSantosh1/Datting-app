"use client";

import { useState } from "react";
import Link from "next/link";
import { Radio, Plus, ArrowRight, ShieldCheck, Image as ImageIcon, Sparkles, Check } from "lucide-react";

export default function CreatePage() {
  const [tab, setTab] = useState<"room" | "post">("room");
  const [roomTitle, setRoomTitle] = useState("");
  const [roomTopic, setRoomTopic] = useState("");
  const [postCaption, setPostCaption] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomTitle.trim()) return;
    setSuccessMsg(`Voice room "${roomTitle}" launched!`);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postCaption.trim()) return;
    setSuccessMsg("Community vibe posted successfully!");
    setPostCaption("");
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] px-3 pt-3 pb-8">
      {/* Top Creation Tabs */}
      <div className="flex rounded-2xl border border-white/10 bg-[#141224] p-1 text-xs font-bold">
        <button
          type="button"
          onClick={() => {
            setTab("room");
            setSuccessMsg(null);
          }}
          className={`flex-1 py-2 rounded-xl transition ${
            tab === "room"
              ? "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-md"
              : "text-white/60 hover:text-white"
          }`}
        >
          🎙️ Host Live Room
        </button>
        <button
          type="button"
          onClick={() => {
            setTab("post");
            setSuccessMsg(null);
          }}
          className={`flex-1 py-2 rounded-xl transition ${
            tab === "post"
              ? "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-md"
              : "text-white/60 hover:text-white"
          }`}
        >
          📸 Share Vibe & Story
        </button>
      </div>

      {/* Success Feedback */}
      {successMsg && (
        <div className="mt-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 p-4 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check size={20} />
          </div>
          <h3 className="mt-2 text-sm font-bold text-white">{successMsg}</h3>
          <Link
            href={tab === "room" ? "/live" : "/"}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:underline"
          >
            <span>{tab === "room" ? "Go to Live Voice Rooms" : "Go to People Nearby"}</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      )}

      {/* Room Creation Form */}
      {tab === "room" && !successMsg && (
        <div className="mt-3.5 rounded-3xl border border-white/10 bg-[#141224] p-4.5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400">
              <Radio size={16} />
            </span>
            <h2 className="text-sm font-bold text-white">Host a Live Voice Room</h2>
          </div>

          <form onSubmit={handleCreateRoom} className="mt-4 flex flex-col gap-3">
            <div>
              <label className="text-[11px] font-semibold text-white/80">Room Title</label>
              <input
                type="text"
                required
                value={roomTitle}
                onChange={(e) => setRoomTitle(e.target.value)}
                placeholder="e.g. Chill Coffee & Banter ☕"
                className="mt-1 w-full rounded-xl border border-white/15 bg-white/[0.04] p-2.5 text-xs text-white placeholder-white/40 outline-none focus:border-fuchsia-400"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-white/80">Topic / Category</label>
              <input
                type="text"
                value={roomTopic}
                onChange={(e) => setRoomTopic(e.target.value)}
                placeholder="e.g. Friendly queer hangouts, music & advice"
                className="mt-1 w-full rounded-xl border border-white/15 bg-white/[0.04] p-2.5 text-xs text-white placeholder-white/40 outline-none focus:border-fuchsia-400"
              />
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] p-2.5 text-[11px] text-white/60">
              <ShieldCheck size={14} className="shrink-0 text-emerald-400" />
              <span>Safe space: consent and zero hate speech required.</span>
            </div>

            <button
              type="submit"
              className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-600 to-cyan-500 py-2.5 text-xs font-bold text-white shadow-md hover:brightness-110 active:scale-95"
            >
              <Radio size={14} />
              <span>Go Live Now</span>
            </button>
          </form>
        </div>
      )}

      {/* Story / Post Creation Form */}
      {tab === "post" && !successMsg && (
        <div className="mt-3.5 rounded-3xl border border-white/10 bg-[#141224] p-4.5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-500/20 text-fuchsia-400">
              <Sparkles size={16} />
            </span>
            <h2 className="text-sm font-bold text-white">Share a Community Story</h2>
          </div>

          <form onSubmit={handleCreatePost} className="mt-4 flex flex-col gap-3">
            <div>
              <label className="text-[11px] font-semibold text-white/80">What is on your mind? 🌈</label>
              <textarea
                rows={3}
                required
                value={postCaption}
                onChange={(e) => setPostCaption(e.target.value)}
                placeholder="Share a thought, pride affirmation, or local hangout tip..."
                className="mt-1 w-full resize-none rounded-xl border border-white/15 bg-white/[0.04] p-2.5 text-xs text-white placeholder-white/40 outline-none focus:border-fuchsia-400"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-dashed border-white/20 bg-white/[0.02] p-3 text-center cursor-pointer hover:border-fuchsia-400">
              <div className="mx-auto flex items-center gap-2 text-xs text-white/60">
                <ImageIcon size={16} className="text-cyan-400" />
                <span>Tap to attach a photo or pride moment</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-600 to-cyan-500 py-2.5 text-xs font-bold text-white shadow-md hover:brightness-110 active:scale-95"
            >
              <Plus size={14} />
              <span>Post to Community</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
