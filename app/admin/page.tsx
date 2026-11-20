'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Inbox, 
  MessageSquare, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldCheck,
  Activity,
  Layers
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setStats(data);
      })
      .catch((err) => console.error('Failed to load dashboard metrics:', err))
      .finally(() => setLoading(false));
  }, []);

  const metrics = stats?.metrics || {
    totalEnquiries: 0,
    newEnquiries: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalProjects: 0,
    activeProjects: 0,
    totalConsultations: 0,
    newConsultations: 0,
  };

  const activity = stats?.recentActivity || [];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Executive Agency Overview
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Welcome back, {stats?.currentUser?.name || 'Administrator'}. Monitor real-time inbound enquiries, founder messages, and active pods.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/inbox"
              className="btn-lime text-xs uppercase tracking-wider !py-2.5 !px-4 flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Founder Inbox ({metrics.unreadMessages} New)</span>
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Enquiries Card */}
          <Link
            href="/admin/enquiries"
            className="glass-panel p-6 rounded-2xl border border-white/[0.08] hover:border-lime-400/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase text-zinc-400">Total Enquiries</span>
              <div className="w-9 h-9 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 group-hover:scale-110 transition-transform">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold font-mono text-white mb-2">
              {metrics.totalEnquiries}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-lime-400 font-mono font-semibold">
                {metrics.newEnquiries} New Inquiries
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-lime-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          {/* Private Messages Card */}
          <Link
            href="/admin/inbox"
            className="glass-panel p-6 rounded-2xl border border-white/[0.08] hover:border-lime-400/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase text-zinc-400">Founder Messages</span>
              <div className="w-9 h-9 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold font-mono text-white mb-2">
              {metrics.totalMessages}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-lime-400 font-mono font-semibold">
                {metrics.unreadMessages} Unread / Actionable
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-lime-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          {/* Consultation Requests Card */}
          <Link
            href="/admin/consultations"
            className="glass-panel p-6 rounded-2xl border border-white/[0.08] hover:border-lime-400/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase text-zinc-400">Consultations</span>
              <div className="w-9 h-9 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 group-hover:scale-110 transition-transform">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold font-mono text-white mb-2">
              {metrics.totalConsultations}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-lime-400 font-mono font-semibold">
                {metrics.newConsultations} Pending Review
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-lime-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          {/* Portfolio Projects Card */}
          <Link
            href="/admin/portfolio"
            className="glass-panel p-6 rounded-2xl border border-white/[0.08] hover:border-lime-400/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase text-zinc-400">Portfolio Items</span>
              <div className="w-9 h-9 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 group-hover:scale-110 transition-transform">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold font-mono text-white mb-2">
              {metrics.totalProjects}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-mono">
                {metrics.activeProjects} Featured Showcases
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-lime-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>

        {/* Quick Management Modules & Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Quick Shortcuts & Pod Health */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
              <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lime-400" />
                <span>Executive Management Modules</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/admin/enquiries"
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                >
                  <Inbox className="w-5 h-5 text-lime-400 mb-2" />
                  <span className="text-xs font-semibold text-white">Review Enquiries</span>
                  <span className="text-[10px] text-zinc-400">Update status & client notes</span>
                </Link>

                <Link
                  href="/admin/inbox"
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                >
                  <MessageSquare className="w-5 h-5 text-lime-400 mb-2" />
                  <span className="text-xs font-semibold text-white">Private Founder Inbox</span>
                  <span className="text-[10px] text-zinc-400">Read & reply to visitors</span>
                </Link>

                <Link
                  href="/admin/portfolio"
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                >
                  <Briefcase className="w-5 h-5 text-lime-400 mb-2" />
                  <span className="text-xs font-semibold text-white">Portfolio Manager</span>
                  <span className="text-[10px] text-zinc-400">Add, edit, upload media</span>
                </Link>

                <Link
                  href="/admin/services"
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                >
                  <Layers className="w-5 h-5 text-lime-400 mb-2" />
                  <span className="text-xs font-semibold text-white">Services & Pricing</span>
                  <span className="text-[10px] text-zinc-400">Modify tiers & deliverables</span>
                </Link>

                <Link
                  href="/admin/consultations"
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                >
                  <Calendar className="w-5 h-5 text-lime-400 mb-2" />
                  <span className="text-xs font-semibold text-white">Consultations</span>
                  <span className="text-[10px] text-zinc-400">Approve & update slots</span>
                </Link>

                <Link
                  href="/admin/content"
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                >
                  <TrendingUp className="w-5 h-5 text-lime-400 mb-2" />
                  <span className="text-xs font-semibold text-white">Website Content</span>
                  <span className="text-[10px] text-zinc-400">Edit hero & agency copy</span>
                </Link>
              </div>
            </div>

            {/* Privacy Compliance Banner */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-lime-400" />
                <div>
                  <span className="text-xs font-semibold text-white block">
                    Privacy Governance Active
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    Founder contact numbers are shielded. Public channel restricted to verified Instagram.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log Feed */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-white/[0.08]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-lime-400" />
                <span>Recent Agency Activity</span>
              </h3>
              <span className="text-[10px] font-mono text-zinc-500">Real-time Stream</span>
            </div>

            {activity.length === 0 ? (
              <p className="text-xs text-zinc-500 py-6 text-center">No recent activity logs.</p>
            ) : (
              <div className="space-y-3 max-h-[440px] overflow-y-auto pr-2">
                {activity.map((act: any) => (
                  <div
                    key={act.id}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-lime-400 mt-1.5 flex-shrink-0" />
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-white truncate">
                          {act.action}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 whitespace-nowrap">
                          {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">
                        {act.details}
                      </p>
                      <span className="text-[10px] font-mono text-lime-400/80 block mt-1">
                        Actor: {act.actor}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
