"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, Search, Send, ArrowLeft, Heart } from "lucide-react";

interface MessageItem {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  pronouns: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
  history: MessageItem[];
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Leo Rivera",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    pronouns: "he/him",
    lastMessage: "Hey! Loved your profile vibe. Up for coffee?",
    time: "10m ago",
    unread: 1,
    isOnline: true,
    history: [
      { id: "m1", sender: "them", text: "Hey there! Loved your profile vibe 🌈", time: "10:14 AM" },
      { id: "m2", sender: "me", text: "Thank you Leo! How is your day going?", time: "10:16 AM" },
      { id: "m3", sender: "them", text: "Pretty good! Exploring new coffee spots downtown. Up for a cup?", time: "10:18 AM" },
    ],
  },
  {
    id: "2",
    name: "Kai Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    pronouns: "they/them",
    lastMessage: "See you at the queer book club tomorrow! 📚",
    time: "2h ago",
    unread: 0,
    isOnline: true,
    history: [
      { id: "k1", sender: "them", text: "Hey! Are you coming to the Arts District meetup?", time: "Yesterday" },
      { id: "k2", sender: "me", text: "Yes! Bringing some books too.", time: "Yesterday" },
      { id: "k3", sender: "them", text: "See you at the queer book club tomorrow! 📚", time: "2h ago" },
    ],
  },
  {
    id: "3",
    name: "Elena Vance",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    pronouns: "she/her",
    lastMessage: "👋 Waved to you!",
    time: "Yesterday",
    unread: 0,
    isOnline: false,
    history: [
      { id: "e1", sender: "them", text: "👋 Waved to you!", time: "Yesterday" },
    ],
  },
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeChat, setActiveChat] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChat) return;

    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      sender: "me",
      text: inputText.trim(),
      time: "Just now",
    };

    const updated = {
      ...activeChat,
      lastMessage: inputText.trim(),
      time: "Just now",
      history: [...activeChat.history, newMsg],
    };

    setActiveChat(updated);
    setConversations((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    setInputText("");

    // Instant simulated reply after 1.5s
    setTimeout(() => {
      const replyMsg: MessageItem = {
        id: `reply-${Date.now()}`,
        sender: "them",
        text: "That sounds awesome! Let’s definitely connect soon ✨",
        time: "Just now",
      };
      setActiveChat((current) =>
        current && current.id === updated.id
          ? {
              ...current,
              lastMessage: replyMsg.text,
              history: [...current.history, replyMsg],
            }
          : current
      );
    }, 1500);
  };

  const filtered = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--bg-app)] px-3 pt-3 pb-8 transition-colors duration-200">
      {/* Active 1-on-1 Chat Conversation Fullscreen View */}
      {activeChat ? (
        <div className="flex flex-col h-[calc(100vh-140px)]">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setActiveChat(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--badge-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <ArrowLeft size={16} />
              </button>

              <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-fuchsia-500/50">
                <Image src={activeChat.avatar} alt={activeChat.name} fill className="object-cover" />
                {activeChat.isOnline && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-[var(--bg-app)] bg-emerald-400" />
                )}
              </div>

              <div>
                <h2 className="text-xs font-bold text-[var(--text-primary)]">{activeChat.name}</h2>
                <p className="text-[10px] text-fuchsia-400 font-medium">{activeChat.pronouns} • Active now</p>
              </div>
            </div>

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--badge-bg)] text-fuchsia-400">
              <Heart size={14} className="fill-fuchsia-400" />
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto py-3 flex flex-col gap-2.5 scrollbar-none">
            {activeChat.history.map((msg) => {
              const isMe = msg.sender === "me";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[80%] ${isMe ? "self-end items-end" : "self-start items-start"}`}
                >
                  <div
                    className={`rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                      isMe
                        ? "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white rounded-br-xs shadow-sm"
                        : "border border-[var(--border-subtle)] bg-[var(--badge-bg)] text-[var(--text-primary)] rounded-bl-xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="mt-0.5 px-1 text-[9px] text-[var(--text-muted)]">{msg.time}</span>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="pt-2 border-t border-[var(--border-subtle)] flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeChat.name}...`}
              className="flex-1 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-input)] py-2.5 px-3.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-fuchsia-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-md disabled:opacity-40 active:scale-95"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      ) : (
        /* Conversations List View */
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                <MessageCircle size={15} />
              </span>
              <h1 className="text-base font-black text-[var(--text-primary)]">Messages & Chats</h1>
            </div>
            <span className="rounded-full bg-fuchsia-500/20 px-2 py-0.2 text-[10px] font-bold text-fuchsia-400">
              {conversations.length} Active
            </span>
          </div>

          {/* Matches / Active Online Row */}
          <div className="mt-2.5 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {conversations.map((c) => (
              <div
                key={c.id}
                onClick={() => setActiveChat(c)}
                className="flex flex-col items-center gap-1 shrink-0 cursor-pointer"
              >
                <div className="relative h-13 w-13 rounded-full p-0.5 bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-amber-400">
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image src={c.avatar} alt={c.name} fill className="object-cover" />
                  </div>
                  {c.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[var(--bg-app)] bg-emerald-400" />
                  )}
                </div>
                <span className="text-[10px] font-medium text-[var(--text-secondary)] max-w-[55px] truncate">
                  {c.name.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>

          {/* Search Chats */}
          <div className="relative mt-2">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-input)] py-2 pl-8 pr-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-fuchsia-400"
            />
          </div>

          {/* Conversation list */}
          <div className="mt-3 flex flex-col gap-2">
            {filtered.map((c) => (
              <div
                key={c.id}
                onClick={() => setActiveChat(c)}
                className="flex cursor-pointer items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-3 shadow-[var(--shadow-card)] transition hover:border-fuchsia-400/40 hover:bg-[var(--bg-surface)] active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-fuchsia-500/40">
                    <Image src={c.avatar} alt={c.name} fill className="object-cover" />
                    {c.isOnline && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-[var(--bg-card)] bg-emerald-400" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold text-[var(--text-primary)] truncate">{c.name}</h3>
                      <span className="rounded bg-[var(--badge-bg)] px-1 py-0.1 text-[9px] text-fuchsia-400 font-semibold">
                        {c.pronouns}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-[var(--text-muted)]">{c.lastMessage}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[9px] text-[var(--text-muted)]">{c.time}</span>
                  {c.unread > 0 && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-500 text-[9px] font-bold text-white">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
