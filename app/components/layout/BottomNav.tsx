"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Radio,
  Plus,
  MessageCircle,
  UserRound,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Live", href: "/live", icon: Radio },
  { label: "Create", href: "/create", icon: Plus },
  { label: "Chat", href: "/messages", icon: MessageCircle },
  { label: "Profile", href: "/profile", icon: UserRound },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile app navigation"
      className="fixed inset-x-0 bottom-0 z-[100] mx-auto w-full max-w-md border-t border-white/10 bg-[#0B0B14]/95 text-white shadow-[0_-8px_30px_rgba(0,0,0,0.55)] backdrop-blur-xl"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="grid h-[64px] grid-cols-5 items-center px-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/" && pathname.startsWith(href));

          if (label === "Create") {
            return (
              <Link
                key={label}
                href={href}
                aria-label="Create"
                className="flex h-full flex-col items-center justify-center gap-0.5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-violet-600 to-cyan-400 text-white shadow-[0_0_20px_rgba(217,70,239,0.45)] transition-transform active:scale-95">
                  <Plus size={26} strokeWidth={2.5} />
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className="relative flex h-full flex-col items-center justify-center gap-1 transition-colors"
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                className={active ? "text-fuchsia-400" : "text-white/60"}
              />

              <span
                className={`text-[10px] leading-tight ${
                  active
                    ? "font-bold text-fuchsia-300"
                    : "font-medium text-white/65"
                }`}
              >
                {label}
              </span>

              {active && (
                <span className="absolute top-0 h-[2.5px] w-6 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.8)]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
