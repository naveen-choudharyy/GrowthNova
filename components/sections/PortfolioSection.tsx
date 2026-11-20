'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ExternalLink, 
  Instagram, 
  Play, 
  ArrowUpRight, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  X,
  Layers
} from 'lucide-react';
import { PortfolioProject } from '@/lib/types';

const categories = [
  'All',
  'Websites',
  'Instagram',
  'Branding',
  'Video Editing',
  'Graphic Design',
  'Marketing Campaigns',
];

interface PortfolioSectionProps {
  initialProjects?: PortfolioProject[];
  isStandalonePage?: boolean;
}

export default function PortfolioSection({ initialProjects, isStandalonePage = false }: PortfolioSectionProps) {
  const [projects, setProjects] = useState<PortfolioProject[]>(initialProjects || []);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [loading, setLoading] = useState(!initialProjects || initialProjects.length === 0);

  useEffect(() => {
    if (!initialProjects || initialProjects.length === 0) {
      fetch('/api/portfolio')
        .then((res) => res.json())
        .then((data) => {
          if (data.projects) setProjects(data.projects);
        })
        .catch((err) => console.error('Error fetching portfolio:', err))
        .finally(() => setLoading(false));
    }
  }, [initialProjects]);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="portfolio" className={`relative ${isStandalonePage ? 'pt-32 pb-24' : 'py-24'} border-t border-white/[0.08]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-lime-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Agency Delivery</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-5">
            Featured Projects & Case Showcases
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-4">
            Explore recent digital executions across websites, social media management, brand identities, and viral short-form video production.
          </p>

          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400">
            * Demonstration and concept showcases are clearly marked until live client releases
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-lime-400 text-black font-semibold shadow-[0_0_15px_rgba(204,255,0,0.35)]'
                  : 'bg-white/[0.03] border border-white/[0.08] text-zinc-300 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="glass-panel text-center py-16 px-6 rounded-3xl max-w-md mx-auto text-zinc-400 text-sm">
            No projects found in this category yet. Check back soon or request a custom showcase.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="glass-panel group rounded-3xl overflow-hidden flex flex-col justify-between border border-white/[0.08] hover:border-lime-400/40 transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Media Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/[0.1] text-lime-300">
                      {project.category}
                    </span>
                    {project.isDemo && (
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-300">
                        Concept Showcase
                      </span>
                    )}
                  </div>

                  {/* Video Play Overlay */}
                  {project.videoUrl && (
                    <button
                      onClick={() => setActiveVideoModal(project.videoUrl!)}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-lime-400/90 text-black flex items-center justify-center shadow-[0_0_25px_rgba(204,255,0,0.5)] group-hover:scale-110 transition-transform"
                      aria-label="Play Video Preview"
                    >
                      <Play className="w-5 h-5 ml-0.5 fill-black" />
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-lime-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-zinc-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Row */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {project.externalUrl && (
                        <a
                          href={project.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-zinc-300 hover:text-lime-400 flex items-center gap-1 transition-colors"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.instagramUrl && (
                        <a
                          href={project.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-zinc-300 hover:text-pink-400 flex items-center gap-1 transition-colors"
                        >
                          <Instagram className="w-3.5 h-3.5 text-pink-400" />
                          <span>Instagram</span>
                        </a>
                      )}
                      {project.videoUrl && (
                        <button
                          onClick={() => setActiveVideoModal(project.videoUrl!)}
                          className="text-xs text-zinc-300 hover:text-lime-400 flex items-center gap-1 transition-colors"
                        >
                          <Play className="w-3.5 h-3.5 text-lime-400" />
                          <span>Watch Video</span>
                        </button>
                      )}
                    </div>

                    <Link
                      href={`/contact?project=${encodeURIComponent(project.title)}`}
                      className="text-xs font-semibold text-lime-400 hover:text-lime-300 flex items-center gap-1 group/btn"
                    >
                      <span>Similar Scope</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Preview Modal */}
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-3xl rounded-3xl bg-[#0c0e14] border border-white/[0.12] overflow-hidden shadow-2xl">
              <div className="p-4 flex items-center justify-between border-b border-white/[0.08]">
                <span className="text-xs font-mono text-lime-300">Video Preview</span>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-video bg-black">
                <video src={activeVideoModal} controls autoPlay className="w-full h-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
