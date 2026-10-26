"use client";

import { useState } from "react";
import {
  Crown,
  Sparkles,
  Zap,
  Eye,
  Shield,
  Heart,
  ArrowRight,
} from "lucide-react";

export default function PremiumBanner() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const perks = [
    {
      icon: Eye,
      title: "See Who Liked & Viewed You",
      desc: "Unlock immediate visibility into all admirers without waiting for a match.",
    },
    {
      icon: Zap,
      title: "10x Profile Boost",
      desc: "Get pushed to the front of discovery for users within 20km.",
    },
    {
      icon: Shield,
      title: "Incognito & Ghost Mode",
      desc: "Browse profiles and join live voice rooms completely unseen.",
    },
    {
      icon: Heart,
      title: "Unlimited Waves & Rewinds",
      desc: "Never lose a connection with infinite rewinds and daily super-waves.",
    },
  ];

  return (
    <section id="premium" className="relative py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-fuchsia-500/30 bg-gradient-to-br from-[#1b1130] via-[#141224] to-[#0d1424] p-6 shadow-2xl sm:p-10 lg:p-12">
          {/* Ambient Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-[100px]"
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/40 bg-fuchsia-500/15 px-3 py-1 text-xs font-bold text-fuchsia-300">
                <Crown size={14} className="text-amber-300" />
                <span>VYBRO VIP MEMBERSHIP</span>
              </div>

              <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-4xl">
                Supercharge Your Connection &{" "}
                <span className="bg-gradient-to-r from-fuchsia-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                  Stand Out.
                </span>
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                Support the safe LGBTQ+ community while unlocking premium powers,
                greater privacy control, and deeper connections.
              </p>

              {/* Billing Toggle */}
              <div className="mt-6 flex items-center gap-2">
                <div className="flex rounded-xl border border-white/10 bg-white/[0.04] p-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setBillingCycle("monthly")}
                    className={`rounded-lg px-4 py-2 transition ${
                      billingCycle === "monthly"
                        ? "bg-white/15 text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Monthly ($9.99/mo)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle("yearly")}
                    className={`flex items-center gap-1.5 rounded-lg px-4 py-2 transition ${
                      billingCycle === "yearly"
                        ? "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-sm"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <span>Annual ($5.99/mo)</span>
                    <span className="rounded bg-amber-400/90 px-1.5 py-0.2 text-[10px] font-black text-black">
                      SAVE 40%
                    </span>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-600 to-cyan-500 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-fuchsia-500/25 transition hover:brightness-110 active:scale-95"
                >
                  <Sparkles size={17} />
                  <span>
                    {isSubscribed ? "VIP Active ✓ (Manage)" : "Upgrade to VIP Now"}
                  </span>
                  <ArrowRight size={16} />
                </button>

                <span className="text-xs text-white/50">
                  Cancel anytime • 7-day money-back guarantee
                </span>
              </div>
            </div>

            {/* Right Perks Grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {perks.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={i}
                    className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition hover:border-fuchsia-400/40 hover:bg-white/[0.06]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 text-fuchsia-300">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-white">
                      {perk.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">
                      {perk.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
