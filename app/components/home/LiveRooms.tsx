"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Radio,
  Mic,
  MicOff,
  Headphones,
  Plus,
  X,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export interface LiveRoom {
  id: string;
  title: string;
  topic: string;
  category: "chill" | "deep" | "music" | "wellness" | "gaming";
  host: {
    name: string;
    avatar: string;
    pronouns: string;
  };
  speakers: number;
  listeners: number;
  isSpeaking: boolean;
  tags: string[];
  listenerAvatars: string[];
}

const mockRooms: LiveRoom[] = [
  {
    id: "room-1",
    title: "Late Night Queer Banter ☕",
    topic: "Chilling, meeting new friends & late night confessions",
    category: "chill",
    host: {
      name: "Sasha Thorne",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      pronouns: "they/she",
    },
    speakers: 4,
    listeners: 46,
    isSpeaking: true,
    tags: ["Friendly", "Open Mic", "Chill"],
    listenerAvatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
    ],
  },
  {
    id: "room-2",
    title: "Trans & Enby Joy & Mutual Support 🏳️‍⚧️",
    topic: "Affirmations, daily wins, fashion tips & mutual support",
    category: "wellness",
    host: {
      name: "Jamie Cruz",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      pronouns: "he/they",
    },
    speakers: 5,
    listeners: 82,
    isSpeaking: true,
    tags: ["Safe Space", "Affirming", "Trans Joy"],
    listenerAvatars: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    ],
  },
  {
    id: "room-3",
    title: "Drag Race Live Review & Tea Spill 👑",
    topic: "Runway critiques, favorite queens, all the drama!",
    category: "music",
    host: {
      name: "Matteo V",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      pronouns: "he/him",
    },
    speakers: 6,
    listeners: 114,
    isSpeaking: true,
    tags: ["Drag", "Pop Culture", "Fun"],
    listenerAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    ],
  },
  {
    id: "room-4",
    title: "Queer Gamers Lounge & Discord Hangout 🎮",
    topic: "Overwatch, Valorant, cozy indie games & voice chat",
    category: "gaming",
    host: {
      name: "Rin Takahashi",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      pronouns: "they/them",
    },
    speakers: 3,
    listeners: 39,
    isSpeaking: false,
    tags: ["Gaming", "Cozy", "LFG"],
    listenerAvatars: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
    ],
  },
];

export default function LiveRooms() {
  const [rooms, setRooms] = useState<LiveRoom[]>(mockRooms);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeRoom, setActiveRoom] = useState<LiveRoom | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTopic, setNewTopic] = useState("");

  const filteredRooms = rooms.filter((room) => {
    if (selectedCategory === "all") return true;
    return room.category === selectedCategory;
  });

  const handleJoinRoom = (room: LiveRoom) => {
    setActiveRoom(room);
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const created: LiveRoom = {
      id: `room-${Date.now()}`,
      title: newTitle,
      topic: newTopic || "Casual community hangout",
      category: "chill",
      host: {
        name: "You (Host)",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
        pronouns: "they/them",
      },
      speakers: 1,
      listeners: 1,
      isSpeaking: true,
      tags: ["Host", "Safe Space", "New"],
      listenerAvatars: [
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      ],
    };
    setRooms([created, ...rooms]);
    setActiveRoom(created);
    setCreateModalOpen(false);
    setNewTitle("");
    setNewTopic("");
  };

  return (
    <section id="live" className="relative pt-3 pb-8">
      <div className="w-full px-3">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
              </span>
              <h1 className="text-base font-black tracking-tight text-white">
                Live Voice Rooms
              </h1>
              <span className="rounded-full bg-rose-500/20 px-2 py-0.2 text-[10px] font-bold text-rose-300">
                {filteredRooms.length} Active
              </span>
            </div>
            <p className="mt-0.5 text-xs text-white/50">
              Real-time LGBTQ+ safe audio hangouts.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-fuchsia-500/20 transition hover:brightness-110 active:scale-95"
          >
            <Plus size={14} strokeWidth={3} />
            <span>Host</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: "all", label: "🔥 All" },
            { id: "chill", label: "☕ Chill" },
            { id: "wellness", label: "💜 Trans Joy" },
            { id: "music", label: "👑 Drag & Pop" },
            { id: "gaming", label: "🎮 Gamers" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition ${
                selectedCategory === cat.id
                  ? "bg-fuchsia-500 text-white shadow-sm"
                  : "border border-white/10 bg-[#141224] text-white/65 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Voice Room Cards Grid */}
        <div className="mt-3.5 grid grid-cols-1 gap-3">
          {filteredRooms.map((room) => {
            const isCurrent = activeRoom?.id === room.id;
            return (
              <div
                key={room.id}
                className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border p-5 transition-all duration-300 ${
                  isCurrent
                    ? "border-fuchsia-400 bg-fuchsia-950/25 shadow-xl shadow-fuchsia-500/15"
                    : "border-white/10 bg-[#141224] hover:border-white/20 hover:bg-[#18152e]"
                }`}
              >
                {/* Top Host & Soundwave Equalizer */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-fuchsia-500/50">
                          <Image
                            src={room.host.avatar}
                            alt={room.host.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#141224] bg-emerald-400" />
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-white">
                            {room.host.name}
                          </h4>
                          <span className="rounded bg-white/10 px-1.5 py-0.2 text-[10px] text-fuchsia-300">
                            {room.host.pronouns}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">Room Host</p>
                      </div>
                    </div>

                    {/* Equalizer animation */}
                    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">
                      <span className="h-2 w-0.5 animate-[pulse_0.4s_ease-in-out_infinite] bg-fuchsia-400" />
                      <span className="h-4 w-0.5 animate-[pulse_0.6s_ease-in-out_infinite] bg-cyan-400" />
                      <span className="h-3 w-0.5 animate-[pulse_0.5s_ease-in-out_infinite] bg-violet-400" />
                      <span className="ml-1 text-[11px] font-bold text-rose-300">
                        LIVE
                      </span>
                    </div>
                  </div>

                  {/* Room Title & Topic */}
                  <h3 className="mt-3.5 text-base font-bold text-white sm:text-lg">
                    {room.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/65">
                    {room.topic}
                  </p>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {room.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Listeners & Join Button */}
                <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-3.5">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      {room.listenerAvatars.map((av, idx) => (
                        <div
                          key={idx}
                          className="relative inline-block h-6 w-6 rounded-full ring-2 ring-[#141224]"
                        >
                          <Image
                            src={av}
                            alt="Listener"
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs text-white/60">
                      <Headphones size={13} className="text-fuchsia-400" />
                      {room.listeners} listening
                    </span>
                  </div>

                  {isCurrent ? (
                    <div className="flex items-center gap-2">
                      <span className="rounded-xl bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-300">
                        Connected ✓
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveRoom(null)}
                        className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-500/20"
                      >
                        Leave
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleJoinRoom(room)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-4 py-2 text-xs font-bold text-white shadow-md transition hover:brightness-110 active:scale-95"
                    >
                      <Mic size={13} />
                      <span>Join Room</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Active Room Mini Bar (Bottom Bar docked above mobile nav) */}
      {activeRoom && (
        <div className="fixed inset-x-2 bottom-[72px] z-[95] mx-auto max-w-md">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-fuchsia-500/40 bg-[#161228]/95 p-3.5 shadow-2xl shadow-black/80 backdrop-blur-xl sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-fuchsia-400">
                <Image
                  src={activeRoom.host.avatar}
                  alt={activeRoom.host.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-fuchsia-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fuchsia-400" />
                  Live in: {activeRoom.title}
                </p>
                <p className="truncate text-xs text-white/60">
                  Host: {activeRoom.host.name} • {activeRoom.listeners} in room
                </p>
              </div>
            </div>

            {/* Audio Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? "Unmute Mic" : "Mute Mic"}
                className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
                  isMuted
                    ? "border-rose-500/40 bg-rose-500/20 text-rose-300"
                    : "border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                }`}
              >
                {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
              </button>

              <button
                type="button"
                onClick={() => setActiveRoom(null)}
                title="Leave Room"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-white/70 transition hover:bg-rose-500/20 hover:text-rose-300"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Host Room Modal */}
      {createModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setCreateModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl border border-white/15 bg-[#141224] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-500/20 text-fuchsia-300">
                  <Radio size={18} />
                </span>
                <h3 className="text-lg font-black text-white">Start a Voice Room</h3>
              </div>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="text-white/40 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-2 text-xs text-white/60">
              Create an open audio room. Community guidelines apply to ensure respect & safety.
            </p>

            <form onSubmit={handleCreateRoom} className="mt-5 flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-white/80">Room Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Chill Music & Chat 🎧"
                  className="mt-1 w-full rounded-xl border border-white/15 bg-white/[0.04] p-3 text-sm text-white placeholder-white/40 outline-none focus:border-fuchsia-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/80">Topic / Description</label>
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="What are we talking about today?"
                  className="mt-1 w-full rounded-xl border border-white/15 bg-white/[0.04] p-3 text-sm text-white placeholder-white/40 outline-none focus:border-fuchsia-400"
                />
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] p-3 text-xs text-white/60">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                <span>Protected by VYBRO AI Auto-Moderation & Safety Center.</span>
              </div>

              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-semibold text-white/70 hover:bg-white/[0.08]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-fuchsia-500/25 hover:brightness-110"
                >
                  Go Live Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
