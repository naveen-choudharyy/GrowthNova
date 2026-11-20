import React from 'react';
import type { Metadata } from 'next';
import TeamsSection from '@/components/sections/TeamsSection';
import FinalCtaSection from '@/components/sections/FinalCtaSection';
import { Users, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Specialised Teams — GrowthNova Digital Agency',
  description:
    'Discover the five dedicated specialized pods behind GrowthNova: Web Development, Digital Marketing, Creative Design, Video Production, and SEO & Growth.',
};

export default function TeamsPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Intro Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Users className="w-3.5 h-3.5" />
          <span>Agency Structure & Disciplines</span>
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight mb-6 max-w-4xl mx-auto">
          Five Specialised Pods.{' '}
          <span className="bg-gradient-to-r from-white via-lime-200 to-lime-400 bg-clip-text text-transparent">
            One Cohesive Agency.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          GrowthNova is organized into cross-functional teams that execute in unison. No lone generalists. No disconnected freelancers.
        </p>
      </div>

      {/* Main Teams Grid */}
      <TeamsSection />

      {/* Cross-Team Synergy Explainer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/[0.08] relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-lime-400 font-mono text-sm font-bold block mb-2">01 / Unified Quality</span>
              <h3 className="font-display font-bold text-lg text-white mb-2">Executive Alignment</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Founders Anchal Swami and Komal Swami lead overall sprint planning and cross-team alignment, guaranteeing consistent brand standards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-lime-400 font-mono text-sm font-bold block mb-2">02 / Zero Handoff Friction</span>
              <h3 className="font-display font-bold text-lg text-white mb-2">Integrated Pipelines</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Designers build directly in sync with Web Developers, and Video Editors coordinate immediately with Social Marketers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-lime-400 font-mono text-sm font-bold block mb-2">03 / Rapid Turnaround</span>
              <h3 className="font-display font-bold text-lg text-white mb-2">Dedicated Focus</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Each pod operates strictly in their zone of genius, preventing burnout, delays, and context switching.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FinalCtaSection />
    </div>
  );
}
