'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Instagram, 
  ArrowUpRight, 
  Mail, 
  Lock, 
  Sparkles,
  ShieldCheck 
} from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin') && pathname !== '/admin/login') {
    return null;
  }

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#060305] pt-16 pb-12 overflow-hidden">
      {/* Top subtle glow bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
      <div className="absolute top-0 left-1/3 w-64 h-32 bg-rose-500/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 p-[1px]">
                <div className="w-full h-full bg-[#0d070b] rounded-[11px] flex items-center justify-center font-bold text-xs text-white">
                  GN
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Growth<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-400">Nova</span>
              </span>
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
              Your Vision. Our Strategy. Your Growth.
              <br />
              We build high-converting websites, craft viral Instagram content, and engineer memorable brand identities.
            </p>
          </div>

          {/* Founders & Instagram */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold block">
              Founders & Leadership
            </span>
            <p className="text-xs text-zinc-300">
              <strong>Anchal Swami</strong> & <strong>Komal Swami</strong>
            </p>

            <div className="pt-2">
              <span className="text-[11px] text-zinc-400 block mb-1.5">Official Direct Contact:</span>
              <a
                href="https://www.instagram.com/littleluxefinds.co19/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-zinc-200 hover:text-rose-400 hover:border-rose-500/40 transition-all"
              >
                <Instagram className="w-4 h-4 text-rose-400" />
                <span className="font-mono">@littleluxefinds.co19</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
            </div>
          </div>

          {/* Inquiries Forwarding */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold block">
              Enquiry Forwarding
            </span>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All website messages and client briefs are directly routed to the founders at:
            </p>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-rose-300 w-fit">
              <Mail className="w-3.5 h-3.5 text-rose-400" />
              <span>swamianchal047@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <span>© {new Date().getFullYear()} GrowthNova. All rights reserved.</span>

          <div className="flex items-center gap-4">
            <span>Founders: Anchal Swami & Komal Swami</span>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-rose-400 transition-colors">
              Founder Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
