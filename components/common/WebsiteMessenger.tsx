'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  MessageSquare, 
  X, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Minimize2,
  Lock,
  User,
  Mail,
  Instagram
} from 'lucide-react';

export default function WebsiteMessenger() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [visitorContact, setVisitorContact] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (pathname?.startsWith('/admin') && pathname !== '/admin/login') {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!visitorName.trim() || !message.trim()) {
      setError('Please provide your name and message.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorName: visitorName.trim(),
          visitorEmail: visitorContact.trim() || undefined,
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to deliver message.');
      }

      setSuccess(true);
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setVisitorName('');
    setVisitorContact('');
    setMessage('');
    setError('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Cherry Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#0d070b]/90 backdrop-blur-2xl border border-rose-500/40 hover:border-rose-400 text-white shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:shadow-[0_0_35px_rgba(244,63,94,0.6)] transition-all duration-300 active:scale-95"
          aria-label="Open Founder Messenger"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-md">
            <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-400"></span>
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-white tracking-wide">
              Quick Connect
            </span>
            <span className="text-[10px] text-rose-300 font-mono">
              Message Anchal & Komal
            </span>
          </div>
        </button>
      )}

      {/* Glassmorphism Messenger Window */}
      {isOpen && (
        <div className="w-[350px] sm:w-[390px] rounded-3xl bg-[#0e070c]/95 backdrop-blur-2xl border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 flex flex-col">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-rose-950/70 via-[#13070d] to-black border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                GN
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  Message GrowthNova Founders
                </h3>
                <p className="text-[10px] text-zinc-400">
                  Forwarded to swamianchal047@gmail.com
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08]"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <div className="p-5">
            {success ? (
              <div className="py-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(225,29,72,0.5)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">Delivered & Forwarded</h4>
                <p className="text-xs text-zinc-300 leading-relaxed max-w-xs">
                  Your message was saved and forwarded directly to founder Anchal Swami (<span className="text-rose-300 font-mono">swamianchal047@gmail.com</span>).
                </p>
                <button
                  onClick={handleReset}
                  className="mt-3 btn-glass text-xs !py-2 !px-4"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {error && (
                  <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="e.g. Liam Parker"
                    className="glass-input w-full !text-xs !py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1">
                    Email or Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={visitorContact}
                    onChange={(e) => setVisitorContact(e.target.value)}
                    placeholder="liam@gmail.com or @liam_studio"
                    className="glass-input w-full !text-xs !py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What project or service do you have in mind?"
                    className="glass-input w-full !text-xs !py-2.5 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gradient w-full text-xs uppercase tracking-wider !py-3 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.45)] mt-1"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send to Founders</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer note with Instagram */}
          <div className="px-5 py-2.5 bg-black/60 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-zinc-400">
            <span>Direct Founder Channel</span>
            <a
              href="https://www.instagram.com/littleluxefinds.co19/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <Instagram className="w-3 h-3" />
              <span>@littleluxefinds.co19</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
