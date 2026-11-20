'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Store, 
  Rocket, 
  ShoppingBag, 
  Activity, 
  GraduationCap, 
  UtensilsCrossed, 
  Building, 
  UserCheck, 
  Briefcase, 
  Globe2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const industries = [
  {
    title: 'Local Businesses',
    description: 'Geo-targeted organic SEO, Google Business profile supremacy, and local brand presence.',
    icon: Store,
    pod: 'Marketing & SEO',
  },
  {
    title: 'Startups & Scaleups',
    description: 'High-impact landing pages, pitch deck identity assets, and accelerated organic growth loops.',
    icon: Rocket,
    pod: 'Web & Growth',
  },
  {
    title: 'E-commerce Brands',
    description: 'Custom Shopify/Next.js storefronts, conversion funnels, and viral social media marketing.',
    icon: ShoppingBag,
    pod: 'Web & Marketing',
  },
  {
    title: 'Healthcare Organisations',
    description: 'Accessible, HIPAA/tele-health compliant web platforms and trustworthy educational content.',
    icon: Activity,
    pod: 'Web Development',
  },
  {
    title: 'Educational Institutions',
    description: 'Curriculum showcases, admission intake funnels, and student engagement video assets.',
    icon: GraduationCap,
    pod: 'Design & Media',
  },
  {
    title: 'Restaurants & Hospitality',
    description: 'Mouth-watering short-form reels, aesthetic Instagram curation, and mobile reservation flows.',
    icon: UtensilsCrossed,
    pod: 'Video & Social',
  },
  {
    title: 'Real Estate Businesses',
    description: 'Cinematic property walkthrough video editing, lead capture systems, and luxury branding.',
    icon: Building,
    pod: 'Video & Web',
  },
  {
    title: 'Personal Brands & Creators',
    description: 'Signature visual identity systems, viral Reels scripting/editing, and audience monetisation.',
    icon: UserCheck,
    pod: 'Creative & Video',
  },
  {
    title: 'Corporate Organisations',
    description: 'Enterprise-grade portal development, brand governance systems, and executive positioning.',
    icon: Briefcase,
    pod: 'Engineering & Brand',
  },
  {
    title: 'National & International Clients',
    description: 'Remote-first collaboration, multi-currency architectures, and global timezone alignment.',
    icon: Globe2,
    pod: 'Cross-Disciplinary Pods',
  },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="relative py-24 border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-lime-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Versatile Commercial Impact</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-5">
            Industries We Serve
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Our specialised teams bring deep domain awareness to diverse sectors, tailoring strategy and execution to your exact market dynamics.
          </p>
        </div>

        {/* 10 Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-lime-400/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-lime-400/10 border border-lime-400/20 group-hover:border-lime-400/60 flex items-center justify-center text-lime-400 mb-4 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-lime-400/80 block mb-1">
                    {ind.pod}
                  </span>

                  <h3 className="font-display font-bold text-base text-white mb-2 group-hover:text-lime-300 transition-colors">
                    {ind.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {ind.description}
                  </p>
                </div>

                <Link
                  href={`/contact?industry=${encodeURIComponent(ind.title)}`}
                  className="pt-3 border-t border-white/[0.05] text-[11px] font-semibold text-zinc-400 hover:text-lime-400 flex items-center gap-1 transition-colors"
                >
                  <span>Discuss Project</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
