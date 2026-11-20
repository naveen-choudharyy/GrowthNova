import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Sparkles, 
  Target, 
  Compass, 
  Award, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Users
} from 'lucide-react';
import FoundersSection from '@/components/sections/FoundersSection';
import FinalCtaSection from '@/components/sections/FinalCtaSection';

export const metadata: Metadata = {
  title: 'About GrowthNova — Collaborative Digital Agency & Specialized Teams',
  description:
    'Learn how GrowthNova brings together specialized creative and technical teams under the leadership of Anchal Swami and Komal Swami to engineer measurable business growth.',
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Agency Overview & Heritage</span>
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight mb-6 max-w-4xl mx-auto">
          Built on Strategic Synergy,{' '}
          <span className="bg-gradient-to-r from-white via-lime-200 to-lime-400 bg-clip-text text-transparent">
            Not Freelance Isolation.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
          "GrowthNova brings together specialised creative and technical teams to deliver complete digital solutions. Every project is approached with strategy, creativity, and a focus on measurable growth."
        </p>
      </div>

      {/* Story & Philosophy Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Our Story */}
          <div className="glass-panel rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-lime-400 font-semibold mb-3 block">
                01. Our Genesis & Story
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
                The Rejection of the Solo Generalist
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                In an era where modern businesses require deep, specialized competencies—from micro-interaction web engineering to algorithmic short-form video pacing—the traditional single-freelancer model fundamentally breaks down. A single individual cannot reasonably master enterprise Next.js architectures, cinematic motion color-grading, and high-conversion paid social funnels simultaneously.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                GrowthNova was founded to bridge this structural gap. We built a synchronized multi-pod agency structure where dedicated domain specialists work as an integrated unit, overseen directly by founders Anchal Swami and Komal Swami to ensure uncompromising delivery standards.
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-lime-400">
                <CheckCircle2 className="w-4 h-4" /> 5 Dedicated Pods
              </span>
              <span>•</span>
              <span>Zero Outsourcing</span>
            </div>
          </div>

          {/* Working Philosophy */}
          <div className="glass-panel rounded-3xl p-8 sm:p-10 flex flex-col justify-between border-lime-400/25">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-lime-400 font-semibold mb-3 block">
                02. Working Philosophy
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
                Strategy Precedes Pixels & Code
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                We believe that aesthetic brilliance without commercial alignment is merely art. At GrowthNova, every digital engagement begins with an exhaustive inquiry into your audience psychographics, competitive landscape, and revenue mechanics.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Whether deploying a sub-second web portal, curating an Instagram grid, or scripting viral Reels, our decisions are governed by one principle: creating lasting brand equity that compounds into measurable commercial growth.
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">ROI-Centric Agency Framework</span>
              <Link href="/services" className="text-xs font-semibold text-lime-400 hover:text-lime-300 flex items-center gap-1">
                <span>View Disciplines</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400 mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-3">Our Vision</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              To be recognized as the premier collaborative digital agency for ambitious brands worldwide—setting the benchmark for seamless cross-disciplinary execution, client discretion, and compounding digital ROI.
            </p>
          </div>

          {/* Mission */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-3">Our Mission</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              To empower startups, local businesses, and corporate organizations by translating their strategic vision into high-performance web platforms, compelling visual identities, and algorithmic organic growth funnels.
            </p>
          </div>
        </div>
      </div>

      {/* 4-Stage Delivery Framework (Our Approach) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-lime-400 font-semibold mb-2 block">
            Systematic Methodology
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Our 4-Stage Delivery Framework
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Discovery & Strategy',
              desc: 'Deep audit of brand positioning, customer intent, technical architecture, and defined KPIs.',
            },
            {
              step: '02',
              title: 'Design & Prototyping',
              desc: 'Cross-pod wireframing, high-fidelity glass UI design, and moodboards aligned with commercial intent.',
            },
            {
              step: '03',
              title: 'Agile Pod Execution',
              desc: 'Clean Next.js engineering, video motion editing, and social calendar scripting in synchronized sprints.',
            },
            {
              step: '04',
              title: 'Launch & Scale',
              desc: 'Quality assurance audits, performance measurement, search engine indexing, and compounding scaling loops.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-6 relative hover:border-lime-400/40 transition-all duration-300"
            >
              <span className="text-3xl font-extrabold font-mono text-lime-400/30 block mb-3">
                {item.step}
              </span>
              <h3 className="font-display font-bold text-lg text-white mb-2">{item.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Founders Section (Text-based profiles) */}
      <FoundersSection />

      {/* Final Call to Action */}
      <FinalCtaSection />
    </div>
  );
}
