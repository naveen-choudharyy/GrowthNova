'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Layers, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  DollarSign, 
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { ServiceItem } from '@/lib/types';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    team: 'Web Development Team',
    shortDescription: '',
    fullDescription: '',
    benefits: '',
    deliverables: '',
    suitableFor: '',
    minPrice: 25000,
    maxPrice: 80000,
    unit: 'per project',
    iconName: 'Code',
    isActive: true,
    order: 1,
  });

  const fetchServices = () => {
    setLoading(true);
    fetch('/api/services?all=true')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.services) setServices(data.services);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      title: '',
      team: 'Web Development Team',
      shortDescription: '',
      fullDescription: '',
      benefits: 'High conversion rate\nOptimized speed and Core Web Vitals\nResponsive UX across devices',
      deliverables: 'Custom UI design\nNext.js codebase\nDomain setup & SSL\n30-day post-launch support',
      suitableFor: 'Startups, E-commerce, Local Businesses',
      minPrice: 30000,
      maxPrice: 100000,
      unit: 'per project',
      iconName: 'Code',
      isActive: true,
      order: services.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: ServiceItem) => {
    setEditingService(s);
    setFormData({
      title: s.title,
      team: s.team,
      shortDescription: s.shortDescription,
      fullDescription: s.fullDescription,
      benefits: s.benefits.join('\n'),
      deliverables: s.deliverables.join('\n'),
      suitableFor: s.suitableFor.join(', '),
      minPrice: s.pricingRange.min,
      maxPrice: s.pricingRange.max,
      unit: s.pricingRange.unit,
      iconName: s.iconName,
      isActive: s.isActive,
      order: s.order,
    });
    setIsModalOpen(true);
  };

  const handleToggleActive = async (s: ServiceItem) => {
    try {
      const res = await fetch(`/api/services/${s.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !s.isActive }),
      });
      if (res.ok) fetchServices();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      team: formData.team,
      shortDescription: formData.shortDescription,
      fullDescription: formData.fullDescription || formData.shortDescription,
      benefits: formData.benefits.split('\n').map((b) => b.trim()).filter(Boolean),
      deliverables: formData.deliverables.split('\n').map((d) => d.trim()).filter(Boolean),
      suitableFor: formData.suitableFor.split(',').map((s) => s.trim()).filter(Boolean),
      pricingRange: {
        min: Number(formData.minPrice),
        max: Number(formData.maxPrice),
        currency: 'INR',
        unit: formData.unit,
      },
      iconName: formData.iconName,
      isActive: formData.isActive,
      order: Number(formData.order),
    };

    try {
      if (editingService) {
        const res = await fetch(`/api/services/${editingService.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setIsModalOpen(false);
          fetchServices();
        }
      } else {
        const res = await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setIsModalOpen(false);
          fetchServices();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this service?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <h1 className="font-display font-bold text-2xl text-white">
              Services & Pricing Management
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Configure agency service offerings, specialized team assignments, and investment estimates.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="btn-lime text-xs uppercase tracking-wider !py-2.5 !px-4 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>

        {/* Services Table / Cards */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="glass-panel p-6 rounded-2xl border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display font-bold text-lg text-white">
                      {srv.title}
                    </h3>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-300">
                      {srv.team}
                    </span>
                    <button
                      onClick={() => handleToggleActive(srv)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer ${
                        srv.isActive
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {srv.isActive ? 'Active (Live)' : 'Disabled'}
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400 max-w-2xl">
                    {srv.shortDescription}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 pt-1">
                    <span>
                      Indicative: ₹{srv.pricingRange.min.toLocaleString()} – ₹{srv.pricingRange.max.toLocaleString()} ({srv.pricingRange.unit})
                    </span>
                    <span>•</span>
                    <span>{srv.deliverables.length} Deliverables</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(srv)}
                    className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white"
                    title="Edit Service"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(srv.id)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-white/[0.12] shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <h3 className="font-display font-bold text-xl text-white">
                  {editingService ? 'Edit Agency Service' : 'Add Agency Service'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Service Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. High-Performance Web Development"
                      className="glass-input w-full !text-xs !py-2.5"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Assigned Specialised Team *
                    </label>
                    <select
                      value={formData.team}
                      onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                      className="glass-input w-full !text-xs !py-2.5 bg-[#0e111a]"
                    >
                      <option value="Web Development Team">Web Development Team</option>
                      <option value="Digital Marketing Team">Digital Marketing Team</option>
                      <option value="Creative Design Team">Creative Design Team</option>
                      <option value="Video Production & Editing Team">Video Production & Editing Team</option>
                      <option value="SEO & Growth Team">SEO & Growth Team</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Short Summary (Hero / Card) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Brief 1-sentence synopsis of this service capability..."
                    className="glass-input w-full !text-xs !py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Full Description (Service Detail Page)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    placeholder="In-depth narrative of methodology, tools, and technical delivery..."
                    className="glass-input w-full !text-xs !py-2.5 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Core Deliverables (One per line)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.deliverables}
                      onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                      placeholder="Deliverable item 1&#10;Deliverable item 2"
                      className="glass-input w-full !text-xs !py-2 font-mono resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Key Benefits (One per line)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.benefits}
                      onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                      placeholder="Benefit 1&#10;Benefit 2"
                      className="glass-input w-full !text-xs !py-2 font-mono resize-none"
                    />
                  </div>
                </div>

                {/* Pricing Range */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                      Min Price (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.minPrice}
                      onChange={(e) => setFormData({ ...formData, minPrice: Number(e.target.value) })}
                      className="glass-input w-full !text-xs !py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                      Max Price (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.maxPrice}
                      onChange={(e) => setFormData({ ...formData, maxPrice: Number(e.target.value) })}
                      className="glass-input w-full !text-xs !py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                      Billing Unit
                    </label>
                    <input
                      type="text"
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      placeholder="per project / per month"
                      className="glass-input w-full !text-xs !py-2"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="accent-lime-400 rounded"
                    />
                    <span className="text-zinc-300">Service Active on Public Site</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-secondary !py-2 !px-4 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-lime !py-2 !px-6 text-xs"
                  >
                    {editingService ? 'Save Service' : 'Create Service'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
