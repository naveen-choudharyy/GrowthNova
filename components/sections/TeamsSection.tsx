'use client';

import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Code, 
  Palette, 
  Film, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles,
  Zap
} from 'lucide-react';

export const agencyTeams = [
  {
    id: 'digital-marketing',
    name: 'Digital Marketing Team',
    headline: 'Social Authority & High-Velocity Audience Scaling',
    icon: TrendingUp,
    badge: 'Marketing Pod',
    description:
      'Engineers data-driven social media growth, bespoke Instagram account curation, and multi-channel campaigns that convert passive viewers into loyal advocates.',
    capabilities: [
      'Social media strategy & roadmap',
      'Instagram account management',
      'Organic social media growth',
      'Content planning & aesthetic grids',
      'Brand positioning & voice',
      'Full campaign management',
    ],
    serviceSlug: 'digital-marketing',
  },
  {
    id: 'web-development',
    name: 'Web Development Team',
    headline: 'High-Performance, Modern Digital Flagships',
    icon: Code,
    badge: 'Engineering Pod',
    description:
      'Architects blazingly fast, accessible, and responsive web platforms utilizing modern frameworks like Next.js, React, and robust API backends.',
    capabilities: [
      'High-impact business websites',
      'Bespoke portfolio websites',
      'E-commerce platforms & funnels',
      'High-converting landing pages',
      'Custom web applications',
      'Proactive website maintenance',
    ],
    serviceSlug: 'web-development',
  },
  {
    id: 'creative-design',
    name: 'Creative Design Team',
    headline: 'Visual Authority & Distinct Brand Systems',
    icon: Palette,
    badge: 'Creative Pod',
    description:
      'Translates commercial aspirations into memorable visual identities, premium vector logo systems, and high-converting marketing graphics.',
    capabilities: [
      'Comprehensive brand identity',
      'Vector logo design & guidelines',
      'High-converting social creatives',
      'Posters, banners & signage',
      'Marketing graphics & collateral',
      'Promotional digital designs',
    ],
    serviceSlug: 'creative-design',
  },
  {
    id: 'video-production',
    name: 'Video Production & Editing Team',
    headline: 'High-Retention Short-Form & Cinematic Storytelling',
    icon: Film,
    badge: 'Media Pod',
    description:
      'Produces viral-ready Instagram Reels, YouTube Shorts, commercial advertisements, and corporate video stories engineered for maximum audience retention.',
    capabilities: [
      'Instagram Reels & Shorts editing',
      'High-impact promotional videos',
      'Cinematic brand videos',
      'Dynamic short-form content',
      'Video advertisements & hooks',
      'Social media video production',
    ],
    serviceSlug: 'video-production',
  },
  {
    id: 'seo-growth',
    name: 'SEO & Growth Team',
    headline: 'Search Dominance & Organic Inbound Acquisition',
    icon: Search,
    badge: 'Growth Pod',
    description:
      'Secures top-tier organic search engine placements through technical audits, high-intent keyword clustering, and sustainable ranking architectures.',
    capabilities: [
      'Search engine optimisation (SEO)',
      'Technical website optimisation',
      'Competitor & keyword research',
      'High-intent content strategy',
      'Organic growth planning',
      'Deep performance & ROI analysis',
    ],
    serviceSlug: 'seo-growth',
  },
];

export default function TeamsSection() {
  return (
    <section id="teams" className="relative py-24 border-t border-white/[0.08] overflow-hidden">
      {/* Decorative ambient light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-lime-400/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Collaborative Agency Structure</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-5">
            Our Specialised Teams
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            GrowthNova is not a solo freelancer. We operate as an integrated agency powered by 5 dedicated, cross-disciplinary teams that collaborate to deliver complete, compounding digital success.
          </p>
        </div>

        {/* 5 Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agencyTeams.map((team, idx) => {
            const Icon = team.icon;
            const isFeatured = idx === 0 || idx === 1;

            return (
              <div
                key={team.id}
                id={team.id}
                className={`glass-panel rounded-3xl p-8 flex flex-col justify-between group hover:border-lime-400/50 transition-all duration-300 relative overflow-hidden ${
                  idx === 0 ? 'lg:col-span-1' : ''
                }`}
              >
                {/* Subtle card glow on hover */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-lime-400/10 rounded-full blur-3xl group-hover:bg-lime-400/20 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Icon & Pod Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lime-400/20 via-white/[0.03] to-transparent border border-lime-400/30 group-hover:border-lime-400 flex items-center justify-center text-lime-400 shadow-[0_0_15px_rgba(204,255,0,0.15)] transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono tracking-wider px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 group-hover:text-lime-300 transition-colors">
                      {team.badge}
                    </span>
                  </div>

                  {/* Titles */}
                  <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-lime-300 transition-colors">
                    {team.name}
                  </h3>
                  <p className="text-xs font-medium text-lime-400/80 mb-4 tracking-wide">
                    {team.headline}
                  </p>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {team.description}
                  </p>

                  {/* Capabilities List */}
                  <div className="pt-4 border-t border-white/[0.06] mb-8">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block mb-3">
                      Core Specialisations
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                      {team.capabilities.map((cap, cIdx) => (
                        <li key={cIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 flex-shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] text-zinc-400 font-mono">
                    Zero Outsourcing • Dedicated Pod
                  </span>

                  <Link
                    href={`/services#${team.serviceSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-lime-400 hover:text-lime-300 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Cross-Team Synergy & Guarantee */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between bg-gradient-to-br from-lime-400/[0.06] via-transparent to-black border-lime-400/25 relative overflow-hidden">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-lime-400/20 border border-lime-400/40 flex items-center justify-center text-lime-400 mb-6 shadow-[0_0_20px_rgba(204,255,0,0.2)]">
                <Sparkles className="w-6 h-6" />
              </div>

              <span className="text-[11px] font-mono tracking-wider px-3 py-1 rounded-full bg-lime-400/15 border border-lime-400/30 text-lime-300 inline-block mb-3">
                Unified Ecosystem
              </span>

              <h3 className="font-display font-bold text-xl text-white mb-3">
                Cross-Functional Pod Synergy
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                Unlike fragmented single freelancers who juggle code, design, and marketing alone, GrowthNova assigns dedicated domain specialists who work in synchronized sprints.
              </p>

              <div className="space-y-2.5 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  <span>Single account director oversight</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  <span>Cross-disciplinary alignment on ROI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  <span>Consistent brand aesthetics across platforms</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/contact"
                className="btn-lime w-full text-xs uppercase tracking-wider !py-3"
              >
                Assemble Your Agency Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
