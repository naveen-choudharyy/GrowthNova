'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FileEdit, Save, Sparkles, CheckCircle2 } from 'lucide-react';
import { WebsiteContent } from '@/lib/types';

export default function AdminContentPage() {
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setSaving(true);
    setSuccessMsg(false);

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <h1 className="font-display font-bold text-2xl text-white">
              Website Content Management
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Update hero copy, agency vision statements, and project cost estimator pricing rules in real-time.
            </p>
          </div>

          {successMsg && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Content Saved Successfully</span>
            </div>
          )}
        </div>

        {loading || !content ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8 text-xs">
            {/* Hero Section Copy */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08] space-y-4">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lime-400" />
                <span>Home Page Hero Section</span>
              </h3>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Eyebrow Badge
                </label>
                <input
                  type="text"
                  value={content.hero.badge}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, badge: e.target.value },
                    })
                  }
                  className="glass-input w-full !text-xs !py-2.5"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Headline
                </label>
                <input
                  type="text"
                  value={content.hero.headline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, headline: e.target.value },
                    })
                  }
                  className="glass-input w-full !text-xs !py-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Subheadline / Narrative
                </label>
                <textarea
                  rows={3}
                  value={content.hero.subheadline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, subheadline: e.target.value },
                    })
                  }
                  className="glass-input w-full !text-xs !py-2.5 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Primary CTA Text
                  </label>
                  <input
                    type="text"
                    value={content.hero.primaryCtaText}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, primaryCtaText: e.target.value },
                      })
                    }
                    className="glass-input w-full !text-xs !py-2"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Secondary CTA Text
                  </label>
                  <input
                    type="text"
                    value={content.hero.secondaryCtaText}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, secondaryCtaText: e.target.value },
                      })
                    }
                    className="glass-input w-full !text-xs !py-2"
                  />
                </div>
              </div>
            </div>

            {/* About Section Narrative */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08] space-y-4">
              <h3 className="font-display font-bold text-base text-white">
                About Agency Narrative & Vision
              </h3>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Tagline
                </label>
                <input
                  type="text"
                  value={content.about.tagline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: { ...content.about, tagline: e.target.value },
                    })
                  }
                  className="glass-input w-full !text-xs !py-2.5"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Agency Story
                </label>
                <textarea
                  rows={3}
                  value={content.about.story}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: { ...content.about, story: e.target.value },
                    })
                  }
                  className="glass-input w-full !text-xs !py-2.5 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Agency Vision
                  </label>
                  <textarea
                    rows={3}
                    value={content.about.vision}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, vision: e.target.value },
                      })
                    }
                    className="glass-input w-full !text-xs !py-2.5 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Agency Mission
                  </label>
                  <textarea
                    rows={3}
                    value={content.about.mission}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, mission: e.target.value },
                      })
                    }
                    className="glass-input w-full !text-xs !py-2.5 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Rules for Cost Estimator */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08] space-y-4">
              <h3 className="font-display font-bold text-base text-white">
                Project Cost Estimator Calibration
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Base Service Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={content.pricingRules.baseRate}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        pricingRules: {
                          ...content.pricingRules,
                          baseRate: Number(e.target.value),
                        },
                      })
                    }
                    className="glass-input w-full !text-xs !py-2"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Per-Deliverable Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={content.pricingRules.featurePrice}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        pricingRules: {
                          ...content.pricingRules,
                          featurePrice: Number(e.target.value),
                        },
                      })
                    }
                    className="glass-input w-full !text-xs !py-2"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Currency
                  </label>
                  <input
                    type="text"
                    value={content.pricingRules.currency}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        pricingRules: {
                          ...content.pricingRules,
                          currency: e.target.value,
                        },
                      })
                    }
                    className="glass-input w-full !text-xs !py-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={saving}
                className="btn-lime text-xs uppercase tracking-wider !py-3 !px-8 flex items-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Publishing...' : 'Publish Content Updates'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
