'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  ShieldAlert, 
  User, 
  Mail, 
  Building2, 
  FileText,
  Lock,
  ArrowRight
} from 'lucide-react';
import FinalCtaSection from '@/components/sections/FinalCtaSection';

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    service: 'High-Performance Web Development',
    preferredDate: '',
    preferredTimeSlot: '11:00 AM - 12:00 PM IST',
    description: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.preferredDate || !formData.description.trim()) {
      setError('Please provide your name, preferred date, and a brief description.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit consultation request');
      }

      setSubmittedId(data.requestId);
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Executive Strategy Session</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Request a Strategy Consultation
          </h1>

          <p className="text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Schedule a focused 45-minute discovery session with our agency leads to explore your project roadmap, technology stack, and growth levers.
          </p>
        </div>

        {/* Success or Form */}
        {submittedId ? (
          <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto border-lime-400/40">
            <div className="w-16 h-16 rounded-full bg-lime-400/20 border border-lime-400/50 flex items-center justify-center text-lime-400 mx-auto mb-6 shadow-[0_0_25px_rgba(204,255,0,0.35)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="font-display font-bold text-2xl text-white mb-3">
              Consultation Request Received
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed mb-6 max-w-lg mx-auto">
              Your request for <strong className="text-white">{formData.service}</strong> on <strong className="text-lime-300">{formData.preferredDate}</strong> ({formData.preferredTimeSlot}) has been logged in our system.
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-400 text-left mb-8 space-y-2">
              <div className="flex items-center gap-2 text-amber-300">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span className="font-semibold">Confirmation Protocol:</span>
              </div>
              <p>
                Please note: Strategy consultation slots are reviewed and formally confirmed by GrowthNova administrators before final calendar booking. We will review your project brief and respond within 24 hours.
              </p>
              <div className="font-mono text-[11px] text-zinc-500 pt-1">
                Reference Request ID: <span className="text-lime-400">{submittedId}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmittedId(null);
                setFormData({
                  name: '',
                  organization: '',
                  email: '',
                  service: 'High-Performance Web Development',
                  preferredDate: '',
                  preferredTimeSlot: '11:00 AM - 12:00 PM IST',
                  description: '',
                });
              }}
              className="btn-secondary text-xs uppercase tracking-wider !py-3 !px-6"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/[0.08] relative">
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Full Name <span className="text-lime-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikram Mehta"
                      className="glass-input w-full !pl-10 !text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Business / Organization
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Apex Dynamics Ltd"
                      className="glass-input w-full !pl-10 !text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vikram@apexdynamics.example.com"
                      className="glass-input w-full !pl-10 !text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Service Area of Interest <span className="text-lime-400">*</span>
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="glass-input w-full !text-sm bg-[#11141e] cursor-pointer"
                  >
                    <option value="High-Performance Web Development">High-Performance Web Development</option>
                    <option value="Digital Marketing & Social Strategy">Digital Marketing & Social Strategy</option>
                    <option value="Brand Identity & Creative Design">Brand Identity & Creative Design</option>
                    <option value="Video Production & Short-Form Editing">Video Production & Short-Form Editing</option>
                    <option value="SEO & Organic Growth Optimization">SEO & Organic Growth Optimization</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Preferred Date <span className="text-lime-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="glass-input w-full !text-sm bg-[#11141e] text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.preferredTimeSlot}
                    onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                    className="glass-input w-full !text-sm bg-[#11141e] cursor-pointer"
                  >
                    <option value="10:00 AM - 11:00 AM IST">10:00 AM - 11:00 AM IST</option>
                    <option value="11:00 AM - 12:00 PM IST">11:00 AM - 12:00 PM IST</option>
                    <option value="02:00 PM - 03:00 PM IST">02:00 PM - 03:00 PM IST</option>
                    <option value="04:00 PM - 05:00 PM IST">04:00 PM - 05:00 PM IST</option>
                    <option value="06:00 PM - 07:00 PM IST (International)">06:00 PM - 07:00 PM IST (International)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                  Project Brief & Objectives <span className="text-lime-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Share a short summary of your current digital challenges, objectives, and any target deadlines..."
                  className="glass-input w-full !text-sm resize-none"
                />
              </div>

              {/* Protocol Note */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3 text-xs text-zinc-400">
                <ShieldAlert className="w-4 h-4 text-lime-400 flex-shrink-0 mt-0.5" />
                <span>
                  Consultations are confirmed following initial review by agency administrators. No founder phone numbers or unapproved contact vectors are required.
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-lime w-full text-xs uppercase tracking-wider !py-4 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(204,255,0,0.3)]"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Submit Consultation Request</span>
                    <Send className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>

      <FinalCtaSection />
    </div>
  );
}
