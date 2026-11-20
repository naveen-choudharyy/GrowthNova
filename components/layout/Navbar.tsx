'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  Sparkles, 
  Instagram, 
  Briefcase, 
  Layers, 
  Send,
  Users
} from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin') && pathname !== '/admin/login') {
    return null;
  }

  const navLinks = [
    { name: 'Our Work', href: '/#work' },
    { name: 'What We Do', href: '/#services' },
    { name: 'Founders', href: '/#founders' },
    { name: 'Connect', href: '/#connect' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0508]/85 backdrop-blur-2xl border-b border-white/[0.08] py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-red-600 to-rose-400 p-[1px] shadow-[0_0_20px_rgba(225,29,72,0.4)] group-hover:shadow-[0_0_25px_rgba(244,63,94,0.6)] transition-all duration-300">
              <div className="w-full h-full bg-[#0d070b] rounded-[11px] flex items-center justify-center font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-200">
                GN
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-rose-300 transition-colors">
                Growth<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-400">Nova</span>
              </span>
              <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-medium -mt-1">
                Studio & Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.035] backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/[0.08]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action: Instagram & Connect */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.instagram.com/littleluxefinds.co19/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Official Instagram"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-zinc-300 hover:text-rose-400 hover:border-rose-500/40 hover:bg-white/[0.08] transition-all group"
            >
              <Instagram className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
              <span className="font-mono text-[11px]">@littleluxefinds.co19</span>
            </a>

            <a
              href="#connect"
              className="btn-gradient text-xs uppercase tracking-wider !py-2.5 !px-5"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://www.instagram.com/littleluxefinds.co19/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/[0.05] text-rose-400 border border-white/[0.1]"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-zinc-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4 p-5 rounded-2xl bg-[#0e070c]/95 backdrop-blur-2xl border border-white/[0.12] shadow-2xl space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:bg-white/[0.05] hover:text-white"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
            <a
              href="#connect"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-gradient text-center text-xs uppercase tracking-wider py-3"
            >
              Let's Talk
            </a>
            <a
              href="https://www.instagram.com/littleluxefinds.co19/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass text-center text-xs py-2.5 flex items-center justify-center gap-2"
            >
              <Instagram className="w-4 h-4 text-rose-400" />
              <span>Instagram: @littleluxefinds.co19</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
