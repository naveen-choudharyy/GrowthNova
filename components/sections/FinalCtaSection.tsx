'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Instagram, 
  MessageSquare, 
  Sparkles, 
  Calendar,
  Lock,
  ArrowUpRight
} from 'lucide-react';

export default function FinalCtaSection() {
  return (
    <section className="relative py-28 border-t border-white/[0.08] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-lime-400/[0.08] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="glass-panel rounded-3xl p-8 sm:p-14 border border-lime-400/30 shadow-[0_0_50px_rgba(204,255,0,0.15)] relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for Measurable Expansion</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-5 leading-tight">
            Ready to Build Your Next{' '}
            <span className="bg-gradient-to-r from-white via-lime-200 to-lime-400 bg-clip-text text-transparent">
              Digital Milestone?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            GrowthNova — Your Vision. Our Strategy. Your Growth.
            <br />
            Connect with our dedicated teams today to establish your digital dominance.
          </p>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/contact"
              className="btn-lime w-full sm:w-auto text-sm uppercase tracking-wider !py-4 !px-8 shadow-[0_0_25px_rgba(204,255,0,0.35)]"
            >
              <span>Let's Work Together</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/consultation"
              className="btn-secondary w-full sm:w-auto text-sm uppercase tracking-wider !py-4 !px-8 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-lime-400" />
              <span>Book Strategy Session</span>
            </Link>
          </div>

          {/* Public Official Channels & Private Messenger */}
          <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-zinc-400">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/littleluxefinds.co19/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Official Instagram: <strong className="text-zinc-200">@littleluxefinds.co19</strong></span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>

            <span className="hidden sm:inline text-zinc-700">•</span>

            {/* Private website message */}
            <Link
              href="/contact"
              className="flex items-center gap-2 hover:text-lime-400 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-lime-400" />
              <span>Private Website Messaging Active</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
