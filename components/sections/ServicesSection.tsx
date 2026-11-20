'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Code, 
  Palette, 
  Film, 
  Search, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Clock, 
  Building2 
} from 'lucide-react';
import { ServiceItem } from '@/lib/types';

interface ServicesSectionProps {
  initialServices?: ServiceItem[];
  isStandalonePage?: boolean;
}

export default function ServicesSection({ initialServices, isStandalonePage = false }: ServicesSectionProps) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices || []);
  const [loading, setLoading] = useState(!initialServices || initialServices.length === 0);

  useEffect(() => {
    if (!initialServices || initialServices.length === 0) {
      fetch('/api/services')
        .then((res) => res.json())
        .then((data) => {
          if (data.services) setServices(data.services);
        })
        .catch((err) => console.error('Error fetching services:', err))
        .finally(() => setLoading(false));
    }
  }, [initialServices]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return TrendingUp;
      case 'Code':
        return Code;
      case 'Palette':
        return Palette;
      case 'Film':
        return Film;
      case 'Search':
        return Search;
      default:
        return Layers;
    }
  };

  return (
    <section id="services" className={`relative ${isStandalonePage ? 'pt-32 pb-24' : 'py-24'} border-t border-white/[0.08]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-lime-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Agency Solutions</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-5">
            Full-Spectrum Digital Services
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Every service is executed with strategic precision by our dedicated pods, focusing on tangible brand equity and measurable business growth.
          </p>
        </div>

        {/* Services List / Cards */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {services.map((service, index) => {
              const Icon = getIcon(service.iconName);
              const isEven = index % 2 === 1;

              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/[0.08] hover:border-lime-400/40 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Title, Pod, Description & Pricing */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-11 h-11 rounded-xl bg-lime-400/15 border border-lime-400/30 flex items-center justify-center text-lime-400">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[11px] font-mono uppercase tracking-wider text-lime-300 block">
                              {service.team}
                            </span>
                            <h3 className="font-display font-bold text-2xl text-white">
                              {service.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                          {service.fullDescription || service.shortDescription}
                        </p>

                        {/* Pricing Range Tag */}
                        <div className="p-4 rounded-2xl bg-white/[0.025] border border-white/[0.06] mb-6">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                            Indicative Investment Range
                          </span>
                          <div className="text-lg font-bold font-mono text-lime-300">
                            ₹{service.pricingRange.min.toLocaleString()} – ₹{service.pricingRange.max.toLocaleString()}{' '}
                            <span className="text-xs text-zinc-400 font-sans font-normal">
                              ({service.pricingRange.unit})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Link
                          href={`/contact?service=${encodeURIComponent(service.title)}`}
                          className="btn-lime text-xs uppercase tracking-wider !py-3 !px-5"
                        >
                          <span>Enquire for this Service</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/estimate?service=${encodeURIComponent(service.title)}`}
                          className="btn-secondary text-xs uppercase tracking-wider !py-3 !px-4"
                        >
                          Estimate Budget
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Key Benefits, Deliverables, Suitable For */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/[0.02] border border-white/[0.05] p-6 sm:p-8 rounded-2xl">
                      {/* Deliverables */}
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-lime-400 mb-3 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" />
                          <span>Core Deliverables</span>
                        </h4>
                        <ul className="space-y-2 text-xs text-zinc-300">
                          {service.deliverables.map((del, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-lime-400 mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed">{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Key Benefits */}
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-lime-400 mb-3 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Strategic Benefits</span>
                        </h4>
                        <ul className="space-y-2 text-xs text-zinc-300">
                          {service.benefits.map((ben, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-1.5 flex-shrink-0" />
                              <span className="leading-relaxed">{ben}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Suitable For */}
                      <div className="sm:col-span-2 pt-4 border-t border-white/[0.06]">
                        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                          <span>Recommended Business Profiles</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.suitableFor.map((suit, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[11px] px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.07] text-zinc-300"
                            >
                              {suit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
