
import Link from "next/link";
import {
  ArrowUpRight,
  Heart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Discover People", href: "/discover" },
      { label: "Live Rooms", href: "/live" },
      { label: "Messages", href: "/messages" },
      { label: "Premium", href: "/premium" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "About VYBRO", href: "/about" },
      { label: "Community Guidelines", href: "/guidelines" },
      { label: "Safety Center", href: "/safety" },
      { label: "Help & Support", href: "/help" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Report a Problem", href: "/report" },
    ],
  },
];

export default function Footer() {
  return (
<footer className="relative hidden overflow-hidden border-t border-white/[0.08] bg-[#0B0B14] text-white md:block">      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 left-1/4 -z-10 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-0 -z-10 h-56 w-56 rounded-full bg-violet-600/10 blur-[100px]"
      />

      <div className="mx-auto w-full max-w-[1440px] px-4 pb-6 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-9 border-b border-white/[0.08] pb-9 sm:gap-10 sm:pb-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand section */}
          <div className="min-w-0 md:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="VYBRO home"
              className="inline-flex items-center gap-2"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-600 to-cyan-400 shadow-lg shadow-fuchsia-500/20">
                <span className="text-2xl font-black text-white">V</span>
              </span>

              <span className="text-2xl font-black tracking-tight">
                VY
                <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  BRO
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/55 sm:mt-5 sm:leading-7">
              A place to discover your community, share your interests, and
              connect through real conversations.
            </p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-300 sm:tracking-[0.22em]">
              Real people. Real vibes.
            </p>

            {/* Social links */}
            <div className="mt-5 flex items-center gap-3 sm:mt-6">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-fuchsia-500/40 hover:bg-fuchsia-500/10 hover:text-fuchsia-300"
              >
                <span className="text-base font-bold">ig</span>
              </a>

              <Link
                href="/help"
                aria-label="Contact support"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-fuchsia-500/40 hover:bg-fuchsia-500/10 hover:text-fuchsia-300"
              >
                <MessageCircle size={18} />
              </Link>
            </div>
          </div>

          {/* Link groups: 2 columns on mobile, 3 on tablet */}
          <div className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 md:col-span-2 md:grid-cols-3 lg:col-span-3 lg:gap-12">
            {footerGroups.map((group) => (
              <div key={group.title} className="min-w-0">
                <h3 className="mb-4 text-sm font-bold tracking-wide text-white sm:mb-5">
                  {group.title}
                </h3>

                <ul className="space-y-3 sm:space-y-3.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex max-w-full items-start gap-1 text-[13px] leading-5 text-white/55 transition hover:text-fuchsia-300 sm:text-sm"
                      >
                        <span className="min-w-0 break-words">
                          {link.label}
                        </span>

                        <ArrowUpRight
                          size={12}
                          className="mt-1 hidden shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 sm:block sm:opacity-0"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Community safety section */}
        <div className="flex flex-col gap-4 border-b border-white/[0.08] py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.07] text-emerald-300">
              <ShieldCheck size={20} />
            </span>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-white/85">
                Your safety matters
              </p>

              <p className="mt-1 max-w-md text-xs leading-5 text-white/45">
                Respect others, protect your privacy, and report behavior that
                violates our community guidelines.
              </p>
            </div>
          </div>

          <Link
            href="/safety"
            className="inline-flex w-fit shrink-0 items-center gap-2 pl-[52px] text-sm font-medium text-fuchsia-300 transition hover:text-fuchsia-200 sm:pl-0"
          >
            Safety Center
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Copyright and legal links */}
        <div className="flex flex-col gap-4 pt-5 text-xs text-white/45 sm:pt-6 md:flex-row md:items-center md:justify-between">
         <p className="leading-5">
            © 2026 VYBRO. All rights reserved.
            </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <Link
              href="/privacy"
              className="transition hover:text-white/80"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-white/80"
            >
              Terms
            </Link>

            <span className="inline-flex items-center gap-1.5">
              <Sparkles size={13} className="shrink-0 text-fuchsia-300" />
              Made for connection
            </span>

            <Heart size={14} className="shrink-0 text-fuchsia-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}
