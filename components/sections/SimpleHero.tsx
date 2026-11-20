'use client';

import React from 'react';
import { ArrowRight, Instagram, Sparkles, ArrowUpRight } from 'lucide-react';

export default function SimpleHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background cherry glow flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-rose-600/[0.14] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-red-700/[0.12] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md shadow-[0_0_20px_rgba(225,29,72,0.25)] mb-8 animate-float-slow">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span className="text-xs uppercase tracking-widest font-semibold text-zinc-200">
            Digital Studio • Websites & Creative Media
          </span>
        </div>

        {/* Punchy, visual headline */}
        <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1] mb-6">
          We Craft Websites & Content That{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-red-500 to-rose-300">
            Get Brands Noticed.
          </span>
        </h1>

        {/* Short, direct supporting text */}
        <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          From modern, high-converting websites to viral Instagram reels and distinctive brand design. Simple, stunning, and built for growth.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href="#work"
            className="btn-gradient w-full sm:w-auto text-xs uppercase tracking-wider !px-8 !py-4 shadow-[0_0_30px_rgba(225,29,72,0.45)]"
          >
            <span>See Our Work</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <a
            href="#connect"
            className="btn-glass w-full sm:w-auto text-xs uppercase tracking-wider !px-8 !py-4"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-4 h-4 ml-1 text-rose-400" />
          </a>
        </div>

        {/* Instagram Direct Hook Chip */}
        <div className="inline-flex items-center gap-3 p-2.5 sm:px-5 rounded-2xl bg-white/[0.035] border border-white/[0.08] backdrop-blur-xl">
          <a
            href="https://www.instagram.com/littleluxefinds.co19/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-xs text-zinc-300 hover:text-rose-400 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-600 via-red-600 to-rose-400 flex items-center justify-center text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]">
              <Instagram className="w-4 h-4" />
            </div>
            <span className="font-mono font-medium">@littleluxefinds.co19</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Follow Us
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
