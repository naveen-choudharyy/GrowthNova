'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Inbox, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  X, 
  Clock, 
  User, 
  Mail, 
  Building2, 
  FileText,
  DollarSign
} from 'lucide-react';
import { Enquiry } from '@/lib/types';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [updating, setUpdating] = useState(false);
  const [statusInput, setStatusInput] = useState<string>('');
  const [notesInput, setNotesInput] = useState<string>('');

  const fetchEnquiries = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== 'all') params.append('status', statusFilter);
    if (search.trim()) params.append('search', search.trim());

    fetch(`/api/enquiries?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.enquiries) setEnquiries(data.enquiries);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleOpenDetail = (item: Enquiry) => {
    setSelectedEnquiry(item);
    setStatusInput(item.status);
    setNotesInput(item.internalNotes || '');
  };

  const handleSaveUpdate = async () => {
    if (!selectedEnquiry) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: statusInput,
          internalNotes: notesInput,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setEnquiries((prev) =>
          prev.map((e) => (e.id === selectedEnquiry.id ? data.enquiry : e))
        );
        setSelectedEnquiry(data.enquiry);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <h1 className="font-display font-bold text-2xl text-white">
              Enquiry Management
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Review, filter, and track incoming project scopes, estimated budgets, and client notes.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-lime-400">
            {enquiries.length} Enquiries Logged
          </span>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, brand, or service..."
              className="glass-input w-full !pl-10 !text-xs !py-2.5"
            />
          </form>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-zinc-400 font-mono">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="glass-input !text-xs !py-2 bg-[#0e111a] cursor-pointer"
            >
              <option value="all">All Enquiries</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="in_discussion">In Discussion</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Enquiries Table / Card List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : enquiries.length === 0 ? (
          <div className="glass-panel text-center py-16 px-4 rounded-2xl text-zinc-400 text-xs">
            No enquiries match the selected filter.
          </div>
        ) : (
          <div className="glass-panel rounded-2xl overflow-hidden border border-white/[0.08]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.02] border-b border-white/[0.08] text-zinc-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-4">Client / Brand</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Budget Tier</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Submitted</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {enquiries.map((enq) => (
                    <tr
                      key={enq.id}
                      className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() => handleOpenDetail(enq)}
                    >
                      <td className="p-4">
                        <span className="font-semibold text-white block">{enq.name}</span>
                        {enq.organization && (
                          <span className="text-[11px] text-zinc-400 block">{enq.organization}</span>
                        )}
                        {enq.email && (
                          <span className="text-[10px] font-mono text-zinc-500 block">{enq.email}</span>
                        )}
                      </td>
                      <td className="p-4 text-zinc-300 font-medium">
                        {enq.service}
                      </td>
                      <td className="p-4 text-lime-300 font-mono text-xs">
                        {enq.budget}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                            enq.status === 'new'
                              ? 'bg-lime-400/20 text-lime-300 border border-lime-400/40'
                              : enq.status === 'contacted'
                              ? 'bg-sky-400/20 text-sky-300 border border-sky-400/40'
                              : enq.status === 'in_discussion'
                              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                              : enq.status === 'converted'
                              ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/40'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-400 font-mono text-[11px]">
                        {new Date(enq.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-4 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleOpenDetail(enq)}
                          className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white"
                          title="Open Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                          title="Delete Enquiry"
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

        {/* Enquiry Detail Modal / Drawer */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-white/[0.12] shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-lime-400">
                    Enquiry Reference ID: {selectedEnquiry.id}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white">
                    {selectedEnquiry.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 text-xs">
                {/* Meta details */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                  <div>
                    <span className="text-zinc-500 block">Organization:</span>
                    <span className="text-white font-medium">{selectedEnquiry.organization || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Email:</span>
                    <span className="text-white font-mono">{selectedEnquiry.email || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Service:</span>
                    <span className="text-lime-300 font-medium">{selectedEnquiry.service}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Budget:</span>
                    <span className="text-white font-mono">{selectedEnquiry.budget}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <span className="text-zinc-400 font-semibold block mb-1">Project Description:</span>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-zinc-200 leading-relaxed whitespace-pre-wrap">
                    {selectedEnquiry.description}
                  </div>
                </div>

                {/* Update Status & Notes */}
                <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                  <div>
                    <label className="text-zinc-300 font-semibold block mb-1">Update Status:</label>
                    <select
                      value={statusInput}
                      onChange={(e) => setStatusInput(e.target.value)}
                      className="glass-input w-full !text-xs !py-2.5 bg-[#0e111a]"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_discussion">In Discussion</option>
                      <option value="converted">Converted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-zinc-300 font-semibold block mb-1">Internal Founder Notes:</label>
                    <textarea
                      rows={3}
                      value={notesInput}
                      onChange={(e) => setNotesInput(e.target.value)}
                      placeholder="Add strategic notes, proposal links, or meeting notes..."
                      className="glass-input w-full !text-xs !py-2.5 resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="btn-secondary !py-2 !px-4 text-xs"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSaveUpdate}
                    disabled={updating}
                    className="btn-lime !py-2 !px-5 text-xs"
                  >
                    {updating ? 'Saving...' : 'Save Updates'}
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
