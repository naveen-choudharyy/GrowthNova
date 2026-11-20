'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Edit3, 
  Trash2, 
  X, 
  Search, 
  User, 
  Mail, 
  Building2 
} from 'lucide-react';
import { ConsultationRequest } from '@/lib/types';

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReq, setSelectedReq] = useState<ConsultationRequest | null>(null);
  const [statusInput, setStatusInput] = useState<string>('');
  const [notesInput, setNotesInput] = useState<string>('');
  const [updating, setUpdating] = useState(false);

  const fetchConsultations = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== 'All') params.append('status', statusFilter);

    fetch(`/api/consultations?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.consultations) setConsultations(data.consultations);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchConsultations();
  }, [statusFilter]);

  const handleOpenDetail = (c: ConsultationRequest) => {
    setSelectedReq(c);
    setStatusInput(c.status);
    setNotesInput(c.internalNotes || '');
  };

  const handleQuickStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/consultations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) fetchConsultations();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveModal = async () => {
    if (!selectedReq) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/consultations/${selectedReq.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: statusInput,
          internalNotes: notesInput,
        }),
      });
      if (res.ok) {
        setSelectedReq(null);
        fetchConsultations();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this consultation request?')) return;
    try {
      const res = await fetch(`/api/consultations/${id}`, { method: 'DELETE' });
      if (res.ok) fetchConsultations();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <h1 className="font-display font-bold text-2xl text-white">
              Consultation Requests
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Review and approve strategy discovery sessions. Note: Requests remain unconfirmed until approved by administrator.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-mono">Filter Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="glass-input !text-xs !py-2 bg-[#0e111a] cursor-pointer"
            >
              <option value="All">All Requests</option>
              <option value="New">New</option>
              <option value="Approved">Approved</option>
              <option value="Contacted">Contacted</option>
              <option value="In Discussion">In Discussion</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Requests Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : consultations.length === 0 ? (
          <div className="glass-panel text-center py-16 text-zinc-500 text-xs rounded-2xl">
            No consultation requests found for this filter.
          </div>
        ) : (
          <div className="glass-panel rounded-2xl overflow-hidden border border-white/[0.08]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.02] border-b border-white/[0.08] text-zinc-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-4">Visitor / Company</th>
                    <th className="p-4">Requested Service</th>
                    <th className="p-4">Preferred Slot</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Approval Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {consultations.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() => handleOpenDetail(c)}
                    >
                      <td className="p-4">
                        <span className="font-semibold text-white block">{c.name}</span>
                        {c.organization && (
                          <span className="text-[11px] text-zinc-400 block">{c.organization}</span>
                        )}
                        {c.email && (
                          <span className="text-[10px] font-mono text-zinc-500 block">{c.email}</span>
                        )}
                      </td>
                      <td className="p-4 text-zinc-300 font-medium">
                        {c.service}
                      </td>
                      <td className="p-4 text-zinc-300 font-mono text-[11px]">
                        <div>{c.preferredDate}</div>
                        <div className="text-[10px] text-zinc-500">{c.preferredTimeSlot}</div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                            c.status === 'New'
                              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                              : c.status === 'Approved'
                              ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/40'
                              : c.status === 'Cancelled'
                              ? 'bg-red-400/20 text-red-400 border border-red-400/40'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                        {c.status !== 'Approved' && (
                          <button
                            onClick={() => handleQuickStatus(c.id, 'Approved')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-semibold"
                            title="Approve Consultation"
                          >
                            Approve
                          </button>
                        )}
                        {c.status !== 'Cancelled' && (
                          <button
                            onClick={() => handleQuickStatus(c.id, 'Cancelled')}
                            className="px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-[10px]"
                            title="Reject / Cancel"
                          >
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenDetail(c)}
                          className="p-1.5 rounded-lg bg-white/[0.04] text-zinc-300 hover:text-white"
                          title="View Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400"
                          title="Delete Request"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        {selectedReq && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-white/[0.12] shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-lime-400">
                    Request ID: {selectedReq.id}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white">
                    {selectedReq.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedReq(null)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                  <div>
                    <span className="text-zinc-500">Service:</span>{' '}
                    <strong className="text-white">{selectedReq.service}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500">Requested Slot:</span>{' '}
                    <span className="text-lime-300 font-mono">{selectedReq.preferredDate} ({selectedReq.preferredTimeSlot})</span>
                  </div>
                  {selectedReq.email && (
                    <div>
                      <span className="text-zinc-500">Email:</span>{' '}
                      <span className="text-zinc-300 font-mono">{selectedReq.email}</span>
                    </div>
                  )}
                  {selectedReq.organization && (
                    <div>
                      <span className="text-zinc-500">Organization:</span>{' '}
                      <span className="text-zinc-300">{selectedReq.organization}</span>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-zinc-400 font-semibold block mb-1">Brief Description:</span>
                  <p className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-zinc-200 leading-relaxed whitespace-pre-wrap">
                    {selectedReq.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-zinc-300 font-semibold block mb-1">Status:</label>
                    <select
                      value={statusInput}
                      onChange={(e) => setStatusInput(e.target.value)}
                      className="glass-input w-full !text-xs !py-2.5 bg-[#0e111a]"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Approved">Approved</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-zinc-300 font-semibold block mb-1">Internal Founder Notes:</label>
                    <textarea
                      rows={2}
                      value={notesInput}
                      onChange={(e) => setNotesInput(e.target.value)}
                      placeholder="Add meeting link, calendar invite notes, or prep items..."
                      className="glass-input w-full !text-xs !py-2 resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                  <button
                    onClick={() => setSelectedReq(null)}
                    className="btn-secondary !py-2 !px-4 text-xs"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSaveModal}
                    disabled={updating}
                    className="btn-lime !py-2 !px-5 text-xs"
                  >
                    {updating ? 'Saving...' : 'Save Status'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
