'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export default function FoundersSection() {
  return (
    <section className="relative py-24 border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-lime-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Executive Leadership</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-5">
            Agency Leadership & Vision
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            GrowthNova is spearheaded by its founding leadership team, dedicated to bridging creative excellence with rigorous technical execution.
          </p>
        </div>

        {/* Text-based Editorial Founder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Anchal Swami */}
          <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/[0.08] hover:border-lime-400/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-lime-400 font-semibold px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/20">
                  Co-Founder & Agency Director
                </span>
                <span className="text-xs font-mono text-zinc-400">GrowthNova</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2 tracking-tight">
                Anchal Swami
              </h3>

              <p className="text-xs font-medium text-zinc-400 mb-6 uppercase tracking-wider">
                Creative Strategy & Brand Positioning
              </p>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-6">
                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  "Our mission at GrowthNova is to ensure that brands do not merely exist online, but establish undeniable market authority through compelling visual narratives and strategic creative execution."
                </p>
              </div>

              <div className="space-y-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  <span>Creative direction & campaign architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  <span>Cross-team quality oversight & client governance</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[11px] text-zinc-400 font-mono">
                Direct Founder Involvement
              </span>
              <Link
                href="/contact"
                className="text-xs font-semibold text-lime-400 hover:text-lime-300 flex items-center gap-1"
              >
                <span>Message Founder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Komal Swami */}
          <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/[0.08] hover:border-lime-400/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-lime-400 font-semibold px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/20">
                  Co-Founder & Operations Lead
                </span>
                <span className="text-xs font-mono text-zinc-400">GrowthNova</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2 tracking-tight">
                Komal Swami
              </h3>

              <p className="text-xs font-medium text-zinc-400 mb-6 uppercase tracking-wider">
                Digital Operations & Growth Systems
              </p>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-6">
                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  "Sustainable business growth requires the seamless coordination of technical performance, systematic digital marketing, and agile project delivery."
                </p>
              </div>

              <div className="space-y-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  <span>Technical delivery & agile sprint management</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  <span>Strategic organic growth & conversion funnels</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[11px] text-zinc-400 font-mono">
                Direct Founder Involvement
              </span>
              <Link
                href="/contact"
                className="text-xs font-semibold text-lime-400 hover:text-lime-300 flex items-center gap-1"
              >
                <span>Message Founder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Agency Leadership Manifesto Card */}
        <div className="max-w-4xl mx-auto mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-semibold text-white block">
                Executive Leadership Guarantee
              </span>
              <span className="text-[11px] text-zinc-400">
                Every project is personally reviewed by Anchal Swami & Komal Swami.
              </span>
            </div>
          </div>

          <Link
            href="/about"
            className="btn-secondary text-xs !py-2 !px-4 whitespace-nowrap"
          >
            Read Our Agency Story
          </Link>
        </div>
      </div>
    </section>
  );
}
