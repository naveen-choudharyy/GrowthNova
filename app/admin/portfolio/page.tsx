'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Briefcase, 
  Plus, 
  Edit3, 
  Trash2, 
  Upload, 
  ExternalLink, 
  Instagram, 
  Play, 
  X, 
  Check, 
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { PortfolioProject } from '@/lib/types';

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Websites' as PortfolioProject['category'],
    description: '',
    tags: '',
    thumbnailUrl: '',
    externalUrl: '',
    instagramUrl: '',
    videoUrl: '',
    isFeatured: true,
    isDemo: true,
    order: 1,
  });

  const [uploading, setUploading] = useState(false);

  const fetchProjects = () => {
    setLoading(true);
    fetch('/api/portfolio')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.projects) setProjects(data.projects);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'Websites',
      description: '',
      tags: 'Next.js, Tailwind, Web App',
      thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      externalUrl: '',
      instagramUrl: '',
      videoUrl: '',
      isFeatured: true,
      isDemo: true,
      order: projects.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: PortfolioProject) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      category: p.category,
      description: p.description,
      tags: p.tags.join(', '),
      thumbnailUrl: p.thumbnailUrl,
      externalUrl: p.externalUrl || '',
      instagramUrl: p.instagramUrl || '',
      videoUrl: p.videoUrl || '',
      isFeatured: p.isFeatured,
      isDemo: p.isDemo,
      order: p.order,
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body,
      });
      const data = await res.json();
      if (data?.url) {
        setFormData((prev) => ({ ...prev, thumbnailUrl: data.url }));
      }
    } catch (err) {
      console.error('File upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingProject) {
        // Update
        const res = await fetch(`/api/portfolio/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setIsModalOpen(false);
          fetchProjects();
        }
      } else {
        // Create
        const res = await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setIsModalOpen(false);
          fetchProjects();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this project?')) return;
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Title & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <h1 className="font-display font-bold text-2xl text-white">
              Portfolio Management
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Add, update, or reorganize completed showcases across all 6 agency categories.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="btn-lime text-xs uppercase tracking-wider !py-2.5 !px-4 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="glass-panel text-center py-16 text-zinc-500 text-xs rounded-2xl">
            No portfolio projects added yet. Click "Add New Project" above to create your first showcase.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="glass-panel rounded-2xl overflow-hidden border border-white/[0.08] flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden">
                  <img
                    src={proj.thumbnailUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/70 text-lime-300">
                      {proj.category}
                    </span>
                    {proj.isDemo && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                        Concept Showcase
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-white mb-1.5">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 mb-3">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {proj.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono text-zinc-500 bg-white/[0.03] px-2 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      {proj.externalUrl && <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />}
                      {proj.instagramUrl && <Instagram className="w-3.5 h-3.5 text-pink-400" />}
                      {proj.videoUrl && <Play className="w-3.5 h-3.5 text-lime-400" />}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white"
                        title="Edit Project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create / Edit Project Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-white/[0.12] shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <h3 className="font-display font-bold text-xl text-white">
                  {editingProject ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
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
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Apex Nova Financial Portal"
                      className="glass-input w-full !text-xs !py-2.5"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as PortfolioProject['category'],
                        })
                      }
                      className="glass-input w-full !text-xs !py-2.5 bg-[#0e111a]"
                    >
                      <option value="Websites">Websites</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Branding">Branding</option>
                      <option value="Video Editing">Video Editing</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Marketing Campaigns">Marketing Campaigns</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the challenge, tech stack, and deliverable outcome..."
                    className="glass-input w-full !text-xs !py-2.5 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="Next.js, Fintech, Dark UI, Tailwind"
                    className="glass-input w-full !text-xs !py-2.5"
                  />
                </div>

                {/* Media Image URL + File Upload */}
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Project Thumbnail Image URL or Upload
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={formData.thumbnailUrl}
                      onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="glass-input flex-1 !text-xs !py-2.5"
                    />
                    <label className="btn-secondary text-xs !py-2 !px-3 cursor-pointer flex items-center gap-1.5 whitespace-nowrap">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {formData.thumbnailUrl && (
                    <div className="w-24 h-14 rounded-lg overflow-hidden border border-white/[0.1] bg-black">
                      <img src={formData.thumbnailUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                      External Web URL
                    </label>
                    <input
                      type="url"
                      value={formData.externalUrl}
                      onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                      placeholder="https://..."
                      className="glass-input w-full !text-xs !py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                      Instagram Link
                    </label>
                    <input
                      type="url"
                      value={formData.instagramUrl}
                      onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                      placeholder="https://instagram.com/..."
                      className="glass-input w-full !text-xs !py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                      Video Sample Link
                    </label>
                    <input
                      type="url"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="https://..."
                      className="glass-input w-full !text-xs !py-2"
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="accent-lime-400 rounded"
                    />
                    <span className="text-zinc-300">Featured Showcase</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isDemo}
                      onChange={(e) => setFormData({ ...formData, isDemo: e.target.checked })}
                      className="accent-lime-400 rounded"
                    />
                    <span className="text-zinc-300">Mark as Concept/Demo Showcase</span>
                  </label>
                </div>

                {/* Buttons */}
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
                    {editingProject ? 'Save Changes' : 'Create Project'}
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
