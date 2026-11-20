'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { ShieldCheck, Lock, User, Key, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AdminSettingsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setCurrentUser(data.user);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="pb-4 border-b border-white/[0.08]">
          <h1 className="font-display font-bold text-2xl text-white">
            Security & Authorized Accounts
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Role-based authorization governance, encryption standards, and founder credentials.
          </p>
        </div>

        {/* Current Active Session */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lime-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Active Authenticated Session</span>
          </div>

          {currentUser ? (
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="font-bold text-base text-white block">{currentUser.name}</span>
                <span className="text-xs font-mono text-zinc-400">{currentUser.email}</span>
              </div>
              <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-300 font-semibold">
                Role: {currentUser.role}
              </span>
            </div>
          ) : (
            <div className="text-xs text-zinc-500">Loading session...</div>
          )}
        </div>

        {/* Authorized Executive Accounts */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08] space-y-4">
          <h3 className="font-display font-bold text-base text-white">
            Configured Executive Administrator Accounts
          </h3>

          <div className="space-y-3">
            {[
              {
                name: 'Anchal Swami',
                role: 'Co-Founder & Agency Director',
                email: 'anchal@growthnova.com',
                access: 'Full Founder Privileges (Inbox, Enquiries, Portfolio, Content)',
              },
              {
                name: 'Komal Swami',
                role: 'Co-Founder & Operations Lead',
                email: 'komal@growthnova.com',
                access: 'Full Founder Privileges (Inbox, Consultations, Services, Content)',
              },
              {
                name: 'GrowthNova SuperAdmin',
                role: 'System SuperAdministrator',
                email: 'admin@growthnova.com',
                access: 'Master System Privileges (User Management, Activity Logs)',
              },
            ].map((usr, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-semibold text-white block">{usr.name}</span>
                  <span className="text-[11px] text-zinc-400">{usr.role}</span>
                  <span className="text-[10px] font-mono text-lime-400/80 block mt-0.5">{usr.email}</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400 sm:text-right">
                  {usr.access}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Privacy Protocols */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08] space-y-3 text-xs text-zinc-400 leading-relaxed">
          <h3 className="font-display font-bold text-base text-white mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-lime-400" />
            <span>Privacy & Zero-Leakage Protocols</span>
          </h3>

          <p>
            1. <strong>Founder Privacy Shield:</strong> GrowthNova's architecture is engineered such that no personal phone numbers, WhatsApp numbers, or private emails of Anchal Swami or Komal Swami are ever exposed to the client-side JavaScript bundle, public HTML, or open API endpoints.
          </p>
          <p>
            2. <strong>Public Inbound Channel:</strong> The only publicly displayed direct contact channel is GrowthNova's verified Instagram profile: <span className="text-lime-300 font-mono">https://www.instagram.com/littleluxefinds.co19/</span>.
          </p>
          <p>
            3. <strong>Database Encryption & Sessions:</strong> All administrative passwords are hashed using industry-standard bcrypt salt routines. Administrative sessions are governed via encrypted JWT tokens in HttpOnly, SameSite cookies.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
