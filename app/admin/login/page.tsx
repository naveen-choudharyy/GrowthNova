'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login authentication failed');
      }

      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  const fillQuickLogin = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('GrowthNova2025!');
  };

  return (
    <div className="min-h-screen bg-[#07090e] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-lime-400/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lime-400/20 via-zinc-900 to-black border border-lime-400/30 flex items-center justify-center text-lime-400 font-display font-black text-xl shadow-[0_0_20px_rgba(204,255,0,0.2)]">
              GN
            </div>
          </Link>
          <h1 className="font-display font-extrabold text-2xl text-white tracking-tight">
            GrowthNova Executive Portal
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Authorized Founder & Administrator Access
          </p>
        </div>

        {/* Login Box */}
        <div className="glass-panel rounded-3xl p-8 border border-white/[0.1] shadow-2xl">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="anchal@growthnova.com"
                  className="glass-input w-full !pl-10 !text-xs !py-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="glass-input w-full !pl-10 !text-xs !py-3"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-lime w-full text-xs uppercase tracking-wider !py-3.5 flex items-center justify-center gap-2 mt-2 shadow-[0_0_20px_rgba(204,255,0,0.35)]"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate & Enter Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Pre-configured Login Chips */}
          <div className="mt-8 pt-6 border-t border-white/[0.08]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-3">
              One-Click Founder Credentials:
            </span>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => fillQuickLogin('anchal@growthnova.com')}
                className="w-full text-left p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-lime-400/40 text-xs text-zinc-300 hover:text-white transition-all flex items-center justify-between"
              >
                <span>Anchal Swami (Founder)</span>
                <span className="font-mono text-[10px] text-lime-400">anchal@growthnova.com</span>
              </button>
              <button
                type="button"
                onClick={() => fillQuickLogin('komal@growthnova.com')}
                className="w-full text-left p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-lime-400/40 text-xs text-zinc-300 hover:text-white transition-all flex items-center justify-between"
              >
                <span>Komal Swami (Founder)</span>
                <span className="font-mono text-[10px] text-lime-400">komal@growthnova.com</span>
              </button>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 text-center mt-3">
              Default password: <span className="text-zinc-300">GrowthNova2025!</span>
            </div>
          </div>
        </div>

        {/* Return to Public Website */}
        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-zinc-500 hover:text-lime-400 transition-colors">
            ← Return to GrowthNova Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
