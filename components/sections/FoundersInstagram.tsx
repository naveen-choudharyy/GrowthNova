'use client';

import React from 'react';
import { Instagram, ArrowUpRight, Mail, Sparkles, Heart } from 'lucide-react';

export default function FoundersInstagram() {
  return (
    <section id="founders" className="py-24 relative border-t border-white/[0.08] overflow-hidden">
      {/* Background cherry glow flares */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-rose-600/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-red-700/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Heart className="w-3.5 h-3.5" />
            <span>Meet The Team</span>
          </div>

          <h2 className="font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            The Founders Behind GrowthNova
          </h2>

          <p className="text-sm sm:text-base text-zinc-300">
            Led directly by Anchal Swami and Komal Swami with personal creative and operational commitment to your brand.
          </p>
        </div>

        {/* Founders Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Anchal Swami */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/[0.08] hover:border-rose-500/50 hover:shadow-[0_0_35px_rgba(225,29,72,0.3)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-rose-400 font-semibold px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/25">
                  Co-Founder & Creative Lead
                </span>
                <span className="text-xs font-mono text-zinc-400">GrowthNova</span>
              </div>

              <h3 className="font-extrabold text-2xl sm:text-3xl text-white mb-2">
                Anchal Swami
              </h3>

              <p className="text-xs text-rose-400 font-medium tracking-wide uppercase mb-4">
                Creative Direction & Brand Strategy
              </p>

              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                Passionate about turning bold ideas into striking digital aesthetics, viral video content, and high-converting websites that build lasting brand authority.
              </p>

              <div className="space-y-2 text-xs text-zinc-400 pt-2 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>Direct creative direction & campaign design</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>Viral short-form and Reels pacing strategy</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/[0.06] flex items-center justify-between">
              <a
                href="mailto:swamianchal047@gmail.com"
                className="text-xs font-mono text-rose-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-rose-400" />
                <span>swamianchal047@gmail.com</span>
              </a>
              <a
                href="https://www.instagram.com/littleluxefinds.co19/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Komal Swami */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/[0.08] hover:border-rose-500/50 hover:shadow-[0_0_35px_rgba(225,29,72,0.3)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-rose-400 font-semibold px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/25">
                  Co-Founder & Operations Lead
                </span>
                <span className="text-xs font-mono text-zinc-400">GrowthNova</span>
              </div>

              <h3 className="font-extrabold text-2xl sm:text-3xl text-white mb-2">
                Komal Swami
              </h3>

              <p className="text-xs text-rose-400 font-medium tracking-wide uppercase mb-4">
                Digital Operations & Growth Systems
              </p>

              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                Dedicated to fast, seamless digital project execution, organic social media acceleration, and client communication from initial discovery to launch.
              </p>

              <div className="space-y-2 text-xs text-zinc-400 pt-2 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>Sprint planning & responsive delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>Audience growth & engagement mechanics</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                Punctual & Dedicated Delivery
              </span>
              <a
                href="https://www.instagram.com/littleluxefinds.co19/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Featured Instagram Banner Card */}
        <div className="glass-panel p-8 rounded-3xl border border-rose-500/35 bg-gradient-to-r from-rose-950/40 via-[#12080f] to-black flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_45px_rgba(225,29,72,0.2)]">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-red-600 to-rose-400 p-[1px] flex-shrink-0 shadow-[0_0_20px_rgba(225,29,72,0.5)]">
              <div className="w-full h-full bg-[#0d070b] rounded-[15px] flex items-center justify-center text-white">
                <Instagram className="w-7 h-7 text-rose-400" />
              </div>
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold block mb-0.5">
                Official Instagram Channel
              </span>
              <h4 className="text-xl font-bold text-white">
                @littleluxefinds.co19
              </h4>
              <p className="text-xs text-zinc-300 mt-1">
                Follow our daily work, creative design drops, and send us a direct message anytime.
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/littleluxefinds.co19/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient text-xs uppercase tracking-wider !py-3.5 !px-6 whitespace-nowrap flex items-center gap-2 shadow-[0_0_25px_rgba(225,29,72,0.4)]"
          >
            <Instagram className="w-4 h-4" />
            <span>Connect on Instagram</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
