'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, Instagram, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SimpleConnect() {
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    service: 'Websites & Landing Pages',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.message.trim()) {
      setError('Please provide your name and message.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.emailOrPhone.trim(),
          service: formData.service,
          description: formData.message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSubmitted(true);

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e11d48', '#f43f5e', '#fb7185', '#ffffff'],
        });
      } catch (e) {}
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="connect" className="py-24 relative border-t border-white/[0.08] overflow-hidden">
      {/* Background cherry glow flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-rose-600/12 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Inquiries</span>
          </div>

          <h2 className="font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Let's Build Something Together
          </h2>

          <p className="text-sm sm:text-base text-zinc-300">
            Have a project in mind or want to collaborate? Send us a quick note and your enquiry will be sent directly to founder Anchal Swami.
          </p>
        </div>

        {submitted ? (
          <div className="glass-panel p-10 sm:p-14 rounded-3xl text-center border-rose-500/40 shadow-[0_0_50px_rgba(225,29,72,0.3)]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white mx-auto mb-6 shadow-[0_0_30px_rgba(225,29,72,0.6)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-bold text-2xl text-white mb-3">
              Message Sent to Founders!
            </h3>

            <p className="text-sm text-zinc-300 max-w-md mx-auto mb-6 leading-relaxed">
              Thank you, <strong className="text-white">{formData.name}</strong>. Your message and project details have been forwarded directly to founder Anchal Swami at:
            </p>

            <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-rose-300 mb-8">
              <Mail className="w-4 h-4 text-rose-400" />
              <span>swamianchal047@gmail.com</span>
            </div>

            <div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    emailOrPhone: '',
                    service: 'Websites & Landing Pages',
                    message: '',
                  });
                }}
                className="btn-glass text-xs uppercase tracking-wider !py-3 !px-6"
              >
                Send Another Message
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/[0.1] shadow-2xl relative">
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Sharma"
                    className="glass-input w-full !text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Email / Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={formData.emailOrPhone}
                    onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                    placeholder="maya@company.com or @maya_ig"
                    className="glass-input w-full !text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                  What are you looking to create?
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="glass-input w-full !text-sm bg-[#0e070c] cursor-pointer"
                >
                  <option value="Instagram Reels & Video Editing">Instagram Reels & Video Editing</option>
                  <option value="Instagram Account Growth & Management">Instagram Account Growth & Management</option>
                  <option value="Websites & Landing Pages">Websites & Landing Pages</option>
                  <option value="Brand Identity & Logo Design">Brand Identity & Logo Design</option>
                  <option value="Full Agency Creative Package">Full Agency Creative Package</option>
                  <option value="Other / Custom Inquiry">Other / Custom Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                  Your Message or Project Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you want to achieve, any deadline, or design references..."
                  className="glass-input w-full !text-sm resize-none"
                />
              </div>

              {/* Direct email forward notification badge */}
              <div className="p-3.5 rounded-2xl bg-white/[0.025] border border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>Forwarded directly to: <strong className="text-rose-300 font-mono">swamianchal047@gmail.com</strong></span>
                </span>
                <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">Instant Dispatch</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-gradient w-full text-xs uppercase tracking-wider !py-4 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(225,29,72,0.45)]"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Message to Founders</span>
                    <Send className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
