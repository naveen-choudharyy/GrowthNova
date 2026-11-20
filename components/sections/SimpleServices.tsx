'use client';

import React from 'react';
import { Code, Film, Palette, Instagram, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Film,
    title: 'Reels & Video Editing',
    desc: 'Viral Instagram Reels, YouTube Shorts, and brand promo edits with high retention, trend audio sync, and motion graphics.',
    color: 'from-rose-600 to-red-500',
  },
  {
    icon: Instagram,
    title: 'Instagram Account Growth',
    desc: 'Aesthetic grid curation, content strategy, captions, hashtags, and organic follower growth that elevates brand credibility.',
    color: 'from-red-600 to-rose-400',
  },
  {
    icon: Code,
    title: 'Websites & Landing Pages',
    desc: 'Sub-second speed, dark glassmorphism business websites engineered with Next.js and React that convert visitors into buyers.',
    color: 'from-rose-500 to-red-600',
  },
  {
    icon: Palette,
    title: 'Brand Identity & Design',
    desc: 'Distinctive vector logos, aesthetic color palettes, typography systems, and promotional social media graphics.',
    color: 'from-red-500 to-rose-400',
  },
  {
    icon: TrendingUp,
    title: 'SEO & Search Traffic',
    desc: 'High-intent keyword rankings and on-page optimization so your business ranks organically at the top of Google search.',
    color: 'from-rose-700 to-red-500',
  },
];

export default function SimpleServices() {
  return (
    <section id="services" className="py-24 relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Capabilities</span>
          </div>

          <h2 className="font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            What We Do
          </h2>

          <p className="text-sm sm:text-base text-zinc-300">
            From viral video editing and social growth to custom websites and branding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-8 rounded-3xl border border-white/[0.08] hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(225,29,72,0.25)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} p-[1px] mb-6 shadow-[0_0_20px_rgba(225,29,72,0.3)]`}>
                    <div className="w-full h-full bg-[#0d070b] rounded-[15px] flex items-center justify-center text-white">
                      <Icon className="w-6 h-6 text-rose-400" />
                    </div>
                  </div>

                  <h3 className="font-bold text-xl text-white mb-3 group-hover:text-rose-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <a
                  href="#connect"
                  className="pt-4 border-t border-white/[0.06] text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>Get Started With This</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}

          {/* Quick Connect Tile */}
          <div className="glass-panel p-8 rounded-3xl border border-rose-500/35 bg-gradient-to-br from-rose-950/30 via-[#10080e] to-black flex flex-col justify-between shadow-[0_0_35px_rgba(225,29,72,0.15)]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white mb-6 shadow-[0_0_20px_rgba(225,29,72,0.4)]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-white mb-3">
                Need a Custom Package?
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Whether you need a full website, monthly reels editing, or complete Instagram management, we'll tailor a plan that fits your exact goals.
              </p>
            </div>

            <div className="pt-6">
              <a
                href="#connect"
                className="btn-gradient w-full text-center text-xs uppercase tracking-wider py-3"
              >
                Let's Discuss Your Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
