"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  Image as ImageIcon,
  Send,
  MoreHorizontal,
  Smile,
  Plus,
  ShieldCheck,
  Flame,
  X,
} from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
}

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    pronouns: string;
    verified: boolean;
  };
  timeAgo: string;
  content: string;
  image?: string;
  likes: number;
  hasLiked: boolean;
  commentsCount: number;
  comments: Comment[];
  category: string;
}

const initialStories = [
  {
    id: "story-you",
    name: "Your Story",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    isYou: true,
  },
  {
    id: "story-1",
    name: "Leo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    hasNew: true,
    caption: "Pride festival prep underway! 🌈✨",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "story-2",
    name: "Kai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    hasNew: true,
    caption: "Late night synthesizer session in the studio 🎹",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "story-3",
    name: "Elena",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    hasNew: true,
    caption: "Sunny morning boulder session 🧗‍♀️",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "story-4",
    name: "Samira",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    hasNew: true,
    caption: "Found vintage queer cinema posters today! 📽️",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "story-5",
    name: "Marcus",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    hasNew: false,
    caption: "Fresh sourdough focaccia out of the oven 🥖",
  },
];

const initialPosts: Post[] = [
  {
    id: "p1",
    author: {
      name: "Kai Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      pronouns: "they/them",
      verified: true,
    },
    timeAgo: "25m ago",
    content:
      "Reminder for anyone who needs to hear it today: You don't owe anyone an explanation for who you are. Live in full color, honor your pace, and take up the space you deserve 🏳️‍🌈💜",
    category: "Affirmations",
    likes: 84,
    hasLiked: false,
    commentsCount: 12,
    comments: [
      {
        id: "c1",
        author: "Leo R.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        text: "Needed this reminder this morning! Thank you Kai 🙏",
        time: "15m ago",
      },
    ],
  },
  {
    id: "p2",
    author: {
      name: "Elena Vance",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      pronouns: "she/her",
      verified: true,
    },
    timeAgo: "1h ago",
    content:
      "Just finished putting together our monthly Queer Tech & Creatives meetup in the Arts District next Thursday at 7 PM! Free coffee, cozy chairs, and collaborative project brainstorming. Who is in?",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
    category: "Events",
    likes: 126,
    hasLiked: true,
    commentsCount: 28,
    comments: [
      {
        id: "c2",
        author: "Jordan Blake",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
        text: "Count me in! Bringing my camera to document it.",
        time: "45m ago",
      },
      {
        id: "c3",
        author: "Amari Davis",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
        text: "Excited! Will bring some local poetry zines too.",
        time: "30m ago",
      },
    ],
  },
  {
    id: "p3",
    author: {
      name: "Jordan Blake",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
      pronouns: "they/he",
      verified: true,
    },
    timeAgo: "3h ago",
    content:
      "Golden hour at the downtown park today was unreal. There’s something so healing about seeing our community outside, smiling, reading books, and living authentically.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
    category: "Vibes",
    likes: 215,
    hasLiked: false,
    commentsCount: 19,
    comments: [],
  },
];

export default function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [newPostText, setNewPostText] = useState("");
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [activeStory, setActiveStory] = useState<(typeof initialStories)[0] | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  const handleLikeToggle = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            hasLiked: !post.hasLiked,
            likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: Post = {
      id: `p-${Date.now()}`,
      author: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        pronouns: "they/them",
        verified: true,
      },
      timeAgo: "Just now",
      content: newPostText,
      category: "Community",
      likes: 1,
      hasLiked: true,
      commentsCount: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
  };

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleAddComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComm: Comment = {
            id: `c-${Date.now()}`,
            author: "You",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
            text: text.trim(),
            time: "Just now",
          };
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...p.comments, newComm],
          };
        }
        return p;
      })
    );

    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleShare = (postId: string) => {
    setCopiedPostId(postId);
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  return (
    <section id="feed" className="relative py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-500 text-white">
                <Sparkles size={16} />
              </span>
              <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Community Feed
              </h2>
            </div>
            <p className="mt-1 text-sm text-white/60">
              Moments, thoughts, and local hangouts shared by the community.
            </p>
          </div>
        </div>

        {/* Stories Bar */}
        <div className="mt-6 flex items-center gap-3 overflow-x-auto pb-3 scrollbar-none">
          {initialStories.map((story) => (
            <div
              key={story.id}
              onClick={() => !story.isYou && story.image && setActiveStory(story)}
              className="flex cursor-pointer flex-col items-center gap-1.5 shrink-0 transition-transform active:scale-95"
            >
              <div
                className={`relative flex h-16 w-16 items-center justify-center rounded-full p-0.5 ${
                  story.isYou
                    ? "border-2 border-dashed border-white/30"
                    : story.hasNew
                    ? "bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-amber-400 p-[2px]"
                    : "border-2 border-white/20"
                }`}
              >
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src={story.avatar}
                    alt={story.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {story.isYou && (
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-md">
                    <Plus size={13} strokeWidth={3} />
                  </span>
                )}
              </div>
              <span className="max-w-[70px] truncate text-[11px] font-medium text-white/80">
                {story.name}
              </span>
            </div>
          ))}
        </div>

        {/* Layout: Main Feed Column + Side Column for Tablet & Desktop */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Main Feed Column */}
          <div className="flex flex-col gap-5">
            {/* Create Post Card */}
            <div className="rounded-3xl border border-white/10 bg-[#141224] p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-fuchsia-500/40">
                  <Image
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                    alt="Your avatar"
                    fill
                    className="object-cover"
                  />
                </div>

                <form onSubmit={handleCreatePost} className="flex-1">
                  <textarea
                    rows={2}
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="Share what's on your mind with the community... 🌈"
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-fuchsia-400 focus:bg-white/[0.05]"
                  />

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-white/50">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/10 hover:text-fuchsia-300"
                      >
                        <ImageIcon size={18} />
                      </button>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/10 hover:text-amber-300"
                      >
                        <Smile size={18} />
                      </button>
                      <span className="text-xs text-white/40 hidden sm:inline">
                        Share safely with verified members
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={!newPostText.trim()}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-5 py-2 text-xs font-bold text-white shadow-md transition disabled:opacity-40 hover:brightness-110 active:scale-95"
                    >
                      <Send size={13} />
                      <span>Post</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Feed Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { id: "all", label: "🌟 All Posts" },
                { id: "Affirmations", label: "💜 Affirmations" },
                { id: "Events", label: "🎟️ Meetups & Events" },
                { id: "Vibes", label: "✨ Vibes & Photos" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-fuchsia-500/25 border border-fuchsia-400 text-fuchsia-200"
                      : "border border-white/10 bg-white/[0.03] text-white/60 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Posts List */}
            {posts
              .filter((p) => activeTab === "all" || p.category === activeTab)
              .map((post) => (
                <article
                  key={post.id}
                  className="rounded-3xl border border-white/10 bg-[#141224] p-5 transition hover:border-white/20"
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-fuchsia-500/30">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-white">
                            {post.author.name}
                          </h4>
                          {post.author.verified && (
                            <ShieldCheck size={14} className="text-cyan-400" />
                          )}
                          <span className="rounded bg-white/10 px-1.5 py-0.2 text-[10px] text-fuchsia-300">
                            {post.author.pronouns}
                          </span>
                        </div>
                        <span className="text-[11px] text-white/40">
                          {post.timeAgo} • {post.category}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="text-white/40 hover:text-white"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>

                  {/* Post Body Content */}
                  <p className="mt-3.5 text-sm leading-relaxed text-white/85">
                    {post.content}
                  </p>

                  {/* Optional Post Image */}
                  {post.image && (
                    <div className="relative mt-3.5 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-900">
                      <Image
                        src={post.image}
                        alt="Community post attachment"
                        fill
                        sizes="(max-width: 1024px) 100vw, 700px"
                        className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                      />
                    </div>
                  )}

                  {/* Post Actions Bar */}
                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs">
                    <div className="flex items-center gap-4">
                      {/* Like button */}
                      <button
                        type="button"
                        onClick={() => handleLikeToggle(post.id)}
                        className={`inline-flex items-center gap-1.5 transition ${
                          post.hasLiked
                            ? "text-rose-400 font-bold"
                            : "text-white/60 hover:text-rose-300"
                        }`}
                      >
                        <Heart
                          size={17}
                          className={post.hasLiked ? "fill-rose-500 text-rose-500" : ""}
                        />
                        <span>{post.likes}</span>
                      </button>

                      {/* Comments toggle */}
                      <button
                        type="button"
                        onClick={() => toggleComments(post.id)}
                        className="inline-flex items-center gap-1.5 text-white/60 transition hover:text-cyan-300"
                      >
                        <MessageCircle size={17} />
                        <span>{post.commentsCount}</span>
                      </button>

                      {/* Share */}
                      <button
                        type="button"
                        onClick={() => handleShare(post.id)}
                        className="inline-flex items-center gap-1.5 text-white/60 transition hover:text-fuchsia-300"
                      >
                        <Share2 size={16} />
                        <span>{copiedPostId === post.id ? "Copied!" : "Share"}</span>
                      </button>
                    </div>

                    <span className="text-[11px] text-white/40">
                      Safe Verified Post
                    </span>
                  </div>

                  {/* Collapsible Comments Section */}
                  {expandedComments[post.id] && (
                    <div className="mt-4 border-t border-white/[0.06] pt-3 flex flex-col gap-3">
                      {post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                          <div key={comment.id} className="flex items-start gap-2.5">
                            <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
                              <Image
                                src={comment.avatar}
                                alt={comment.author}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 rounded-2xl bg-white/[0.04] p-2.5 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-white/90">
                                  {comment.author}
                                </span>
                                <span className="text-[10px] text-white/40">
                                  {comment.time}
                                </span>
                              </div>
                              <p className="mt-1 text-white/80">{comment.text}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-white/40 italic">
                          Be the first to comment!
                        </p>
                      )}

                      {/* Add comment form */}
                      <form
                        onSubmit={(e) => handleAddComment(post.id, e)}
                        className="mt-1 flex items-center gap-2"
                      >
                        <input
                          type="text"
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({
                              ...prev,
                              [post.id]: e.target.value,
                            }))
                          }
                          placeholder="Write a supportive reply..."
                          className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white placeholder-white/40 outline-none focus:border-fuchsia-400"
                        />
                        <button
                          type="submit"
                          className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-500/20 text-fuchsia-300 transition hover:bg-fuchsia-500 hover:text-white"
                        >
                          <Send size={13} />
                        </button>
                      </form>
                    </div>
                  )}
                </article>
              ))}
          </div>

          {/* Side Column: Trending Topics & Safety Box for Tablet / Desktop */}
          <div className="flex flex-col gap-5">
            {/* Trending LGBTQ+ Topics */}
            <div className="rounded-3xl border border-white/10 bg-[#141224] p-5">
              <div className="flex items-center gap-2 text-white">
                <Flame size={18} className="text-amber-400" />
                <h3 className="text-base font-bold">Trending in Community</h3>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                {[
                  { tag: "#TransAwareness", count: "14.2k vibes", category: "Awareness" },
                  { tag: "#Pride2026", count: "9.8k vibes", category: "Celebration" },
                  { tag: "#QueerBookClub", count: "4.5k vibes", category: "Hobbies" },
                  { tag: "#ChosenFamily", count: "7.1k vibes", category: "Heartwarming" },
                ].map((item) => (
                  <div
                    key={item.tag}
                    className="flex cursor-pointer items-center justify-between rounded-xl p-2 transition hover:bg-white/[0.04]"
                  >
                    <div>
                      <p className="text-xs font-bold text-white/90">{item.tag}</p>
                      <span className="text-[10px] text-white/45">{item.category}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-fuchsia-300">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Safety & Mutual Respect Guidelines */}
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/15 p-5">
              <div className="flex items-center gap-2.5 text-emerald-300">
                <ShieldCheck size={20} />
                <h3 className="text-sm font-bold">Safe & Respectful Space</h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                VYBRO is strictly dedicated to queer inclusivity, consent, zero hate
                speech, and harassment-free connections. We verify profiles to keep you safe.
              </p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-white/45">Auto-moderated 24/7</span>
                <span className="font-semibold text-emerald-400">Zero Tolerance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story View Modal */}
      {activeStory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[160] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setActiveStory(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[550px] w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-white/20 bg-zinc-950 shadow-2xl"
          >
            {/* Top progress bar */}
            <div className="absolute left-3 right-3 top-3 z-30 h-1 overflow-hidden rounded-full bg-white/30">
              <div className="h-full w-full animate-[progress_5s_linear] bg-white" />
            </div>

            {/* Header */}
            <div className="absolute left-3 right-3 top-6 z-30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={activeStory.avatar}
                    alt={activeStory.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs font-bold text-white drop-shadow">
                  {activeStory.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveStory(null)}
                className="text-white drop-shadow"
              >
                <X size={20} />
              </button>
            </div>

            {/* Story Image */}
            {activeStory.image && (
              <Image
                src={activeStory.image}
                alt="Story"
                fill
                className="object-cover"
              />
            )}

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 z-20">
              <p className="text-sm font-semibold text-white drop-shadow">
                {activeStory.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
