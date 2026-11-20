'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users2, 
  Target, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

const pillars = [
  {
    icon: Users2,
    title: 'Specialised Pods vs Solo Freelancers',
    description:
      'Solo freelancers are forced to be generalists. GrowthNova deploys dedicated specialists for code, design, social, video, and SEO who collaborate seamlessly.',
  },
  {
    icon: Target,
    title: 'Strategy Precedes Execution',
    description:
      'We do not blindly create assets. Every project is anchored in deep competitor analysis, market positioning, and a defined roadmap toward compounding ROI.',
  },
  {
    icon: Zap,
    title: 'Agile Velocity & Direct Oversight',
    description:
      'Founders Anchal Swami and Komal Swami maintain direct executive oversight over project roadmaps, ensuring premium standards and punctual delivery.',
  },
  {
    icon: BarChart3,
    title: 'Focus on Measurable Growth',
    description:
      'Whether optimizing page load times for higher conversion, scaling organic impressions, or lowering acquisition costs, we measure what truly moves the needle.',
  },
  {
    icon: ShieldCheck,
    title: 'Client Discretion & Secure Channels',
    description:
      'We respect client confidentiality. Communication is handled through our secure, private website messaging and official channels with zero data compromise.',
  },
];

export default function WhyChooseSection() {
  return (
    <section className="relative py-24 border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Agency Advantage</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-6 leading-tight">
              Why Businesses Choose{' '}
              <span className="text-lime-400">GrowthNova.</span>
            </h2>

            <p className="text-base text-zinc-400 leading-relaxed mb-6">
              GrowthNova brings together specialised creative and technical teams to deliver complete digital solutions. Every project is approached with strategy, creativity, and a focus on measurable growth.
            </p>

            <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] mb-8">
              <p className="text-xs text-zinc-300 italic leading-relaxed mb-3">
                "Our vision is to provide businesses with the specialized talent of a tier-one agency combined with the agility, transparency, and personal commitment of dedicated partners."
              </p>
              <span className="text-[11px] font-mono font-semibold text-lime-400 block">
                — Anchal Swami & Komal Swami, Founders
              </span>
            </div>

            <Link
              href="/contact"
              className="btn-lime text-xs uppercase tracking-wider !py-3.5 !px-6"
            >
              <span>Partner With Our Agency</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Right Column: Key Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-6 flex items-start gap-5 hover:border-lime-400/40 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/25 flex items-center justify-center text-lime-400 flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white mb-1.5">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
