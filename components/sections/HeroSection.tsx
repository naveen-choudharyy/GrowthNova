'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Sparkles, 
  Code, 
  TrendingUp, 
  Palette, 
  Film, 
  Search, 
  ShieldCheck, 
  CheckCircle2,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background ambient glowing spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-lime-400/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-emerald-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md shadow-[0_0_20px_rgba(204,255,0,0.12)] mb-8 animate-fade-in">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400"></span>
            </span>
            <span className="text-xs uppercase tracking-widest font-semibold text-zinc-300">
              Professional Digital Agency • 5 Specialised Teams
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1] mb-6">
            We Turn Your Vision Into{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-white via-lime-200 to-lime-400 bg-clip-text text-transparent">
                Digital Growth.
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-lime-400 to-transparent rounded-full" />
            </span>
          </h1>

          {/* Supporting text */}
          <p className="text-base sm:text-xl text-zinc-400 leading-relaxed max-w-2xl mb-10 font-normal">
            From powerful websites to creative marketing strategies, GrowthNova brings specialised teams together to help businesses build, grow, and succeed in the digital world.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
            <Link
              href="/contact"
              className="btn-lime w-full sm:w-auto text-sm uppercase tracking-wider !px-8 !py-4 shadow-[0_0_30px_rgba(204,255,0,0.35)]"
            >
              <span>Let's Work Together</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/portfolio"
              className="btn-secondary w-full sm:w-auto text-sm uppercase tracking-wider !px-8 !py-4"
            >
              <span>Explore Our Work</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Specialised Teams Pill Banner */}
          <div className="w-full pt-8 border-t border-white/[0.08]">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-6">
              Coordinated Agency Execution Across 5 Dedicated Teams
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { name: 'Web Development', icon: Code, href: '/teams#web-development' },
                { name: 'Digital Marketing', icon: TrendingUp, href: '/teams#digital-marketing' },
                { name: 'Creative Design', icon: Palette, href: '/teams#creative-design' },
                { name: 'Video Production', icon: Film, href: '/teams#video-production' },
                { name: 'SEO & Growth', icon: Search, href: '/teams#seo-growth' },
              ].map((team, idx) => {
                const Icon = team.icon;
                return (
                  <Link
                    key={idx}
                    href={team.href}
                    className="glass-card group p-3.5 rounded-2xl flex flex-col items-center gap-2 hover:border-lime-400/40 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-xl bg-lime-400/10 border border-lime-400/20 group-hover:border-lime-400/60 flex items-center justify-center text-lime-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-200 group-hover:text-white">
                      {team.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">Specialised Pod</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
