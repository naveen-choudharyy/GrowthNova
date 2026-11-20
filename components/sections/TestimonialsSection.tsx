'use client';

import React from 'react';
import { Star, Quote, Sparkles, Building2, ShieldCheck } from 'lucide-react';

const testimonials = [
  {
    quote:
      "GrowthNova's multi-team model proved dramatically superior to our previous experience with solo freelancers. Their Web Development team and Creative Design team collaborated synchronously, cutting our launch timeline by three weeks.",
    author: 'Commercial Partner',
    organization: 'Fintech Portal Showcase',
    category: 'Web Development & Design',
    rating: 5,
  },
  {
    quote:
      "Having a dedicated Video Production pod alongside our Instagram account management transformed our organic engagement. Our monthly reel impressions expanded from 15k to over 140k within sixty days.",
    author: 'D2C Brand Executive',
    organization: 'Luxury Living Showcase',
    category: 'Social Strategy & Video',
    rating: 5,
  },
  {
    quote:
      "Direct oversight from founders Anchal Swami and Komal Swami made all the difference. Strategic communication was transparent, disciplined, and focused strictly on measurable ROI.",
    author: 'Scaleup Founder',
    organization: 'SaaS Platform Showcase',
    category: 'End-to-End Agency Pod',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-lime-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Collaboration Standards</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-5">
            Client & Partner Endorsements
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-3">
            Real feedback reflecting our commitment to synchronized cross-functional teams, rapid delivery, and measurable digital growth.
          </p>

          <span className="text-[11px] font-mono text-zinc-400 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.07]">
            * Client names and identities generalized to honor non-disclosure and privacy agreements
          </span>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-8 flex flex-col justify-between border border-white/[0.08] hover:border-lime-400/40 transition-all duration-300 relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-lime-400">
                    {[...Array(item.rating)].map((_, r) => (
                      <Star key={r} className="w-4 h-4 fill-lime-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-zinc-600 group-hover:text-lime-400/40 transition-colors" />
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <span className="text-xs font-bold text-white block">
                  {item.author}
                </span>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  {item.organization}
                </span>
                <span className="text-[10px] font-mono text-lime-400/80 block mt-1">
                  Scope: {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
