'use client';

import React, { useState } from 'react';
import { Play, ExternalLink, Instagram, Sparkles, X, ArrowUpRight, Film } from 'lucide-react';

const showcaseProjects = [
  {
    id: 'proj-video-1',
    title: 'Instagram Creative Edit — Part 01',
    category: 'Video Editing',
    desc: 'Original short-form Instagram edit featuring dynamic pacing, viral audio synchronization, and high retention.',
    tags: ['Instagram Reel', 'Short-Form', 'Sound FX', 'Motion'],
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    videoUrl: '/videos/instagram/instagram-edit-01.mp4',
    isVideo: true,
  },
  {
    id: 'proj-video-2',
    title: 'Instagram Aesthetic Reel — Part 02',
    category: 'Instagram',
    desc: 'High-engagement social media reel crafted for audience growth and aesthetic visual appeal.',
    tags: ['Reels Growth', 'Social Strategy', 'Aesthetic Edit'],
    thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
    videoUrl: '/videos/instagram/instagram-edit-02.mp4',
    isVideo: true,
    instagramUrl: 'https://www.instagram.com/littleluxefinds.co19/',
  },
  {
    id: 'proj-video-3',
    title: 'Cinematic Video Editing Showcase',
    category: 'Video Editing',
    desc: 'Original cinematic promo edit demonstrating seamless cuts, color grading, and commercial storytelling.',
    tags: ['Cinematic Edit', 'Promo Video', 'Color Grading'],
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    videoUrl: '/videos/editing/video-editing.mp4',
    isVideo: true,
  },
  {
    id: 'proj-web-medii',
    title: 'MediiConnect — Doctor-Patient Video Conferencing Platform',
    category: 'Websites',
    desc: 'A seamless telemedicine video conferencing platform enabling secure real-time doctor-patient consultations from anywhere in the world.',
    tags: ['Telemedicine', 'Video Conferencing', 'Healthcare Tech', 'Real-Time'],
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    externalUrl: 'https://medii-connect.netlify.app/',
  },
  {
    id: 'proj-brand-1',
    title: 'Aura Botanicals Luxury Identity',
    category: 'Branding',
    desc: 'Minimalist brand identity system, custom vector logo typography, packaging, and digital collateral.',
    tags: ['Brand Identity', 'Logo Design', 'Luxury Packaging'],
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
  },
];

const categories = ['All', 'Video Editing', 'Instagram', 'Websites', 'Branding'];

export default function SimpleWork() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  const filtered = activeTab === 'All'
    ? showcaseProjects
    : showcaseProjects.filter((p) => p.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <section id="work" className="py-24 relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase</span>
          </div>

          <h2 className="font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Our Work & Video Edits
          </h2>

          <p className="text-sm sm:text-base text-zinc-300">
            Click on any video below to watch our actual edits, alongside custom websites and branding projects.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white font-semibold shadow-[0_0_20px_rgba(225,29,72,0.45)] scale-105'
                  : 'bg-white/[0.035] border border-white/[0.08] text-zinc-300 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="glass-panel group rounded-3xl overflow-hidden border border-white/[0.08] hover:border-rose-500/50 hover:shadow-[0_0_35px_rgba(225,29,72,0.3)] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Thumbnail / Video Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/70">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e070c] via-transparent to-transparent opacity-75" />

                <span className="absolute top-4 left-4 text-[11px] font-mono px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/[0.1] text-rose-300">
                  {item.category}
                </span>

                {item.videoUrl && (
                  <button
                    onClick={() => setActiveVideo({ url: item.videoUrl!, title: item.title })}
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(225,29,72,0.7)] group-hover:scale-110 transition-transform"
                    aria-label={`Play ${item.title}`}
                  >
                    <Play className="w-6 h-6 ml-1 fill-white" />
                  </button>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-white mb-2 group-hover:text-rose-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-zinc-400"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom link row */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {item.videoUrl && (
                      <button
                        onClick={() => setActiveVideo({ url: item.videoUrl!, title: item.title })}
                        className="text-rose-400 hover:text-rose-300 flex items-center gap-1.5 font-medium transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-rose-400" />
                        <span>Watch Video</span>
                      </button>
                    )}
                    {item.externalUrl && (
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-300 hover:text-rose-300 flex items-center gap-1 transition-colors"
                      >
                        <span>Live Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {item.instagramUrl && (
                      <a
                        href={item.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-300 hover:text-rose-300 flex items-center gap-1 transition-colors"
                      >
                        <Instagram className="w-3.5 h-3.5 text-rose-400" />
                        <span>Instagram</span>
                      </a>
                    )}
                  </div>

                  <a
                    href="#connect"
                    className="font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Request Similar</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal with Controls */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative w-full max-w-2xl rounded-3xl bg-[#0f070c] border border-rose-500/40 overflow-hidden shadow-2xl">
              <div className="p-4 px-6 flex items-center justify-between border-b border-white/[0.08] bg-black/40">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-semibold text-white">{activeVideo.title}</span>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                  aria-label="Close video player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-[9/16] sm:aspect-video bg-black flex items-center justify-center max-h-[70vh]">
                <video
                  src={activeVideo.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
