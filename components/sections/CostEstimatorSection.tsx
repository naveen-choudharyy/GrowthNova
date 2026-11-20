'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Sliders, 
  HelpCircle,
  Zap,
  Send
} from 'lucide-react';

interface EstimatorProps {
  initialService?: string;
  isStandalonePage?: boolean;
}

export default function CostEstimatorSection({ initialService = 'High-Performance Web Development', isStandalonePage = false }: EstimatorProps) {
  const router = useRouter();

  const [service, setService] = useState(initialService);
  const [complexity, setComplexity] = useState('standard');
  const [scale, setScale] = useState('startup');
  const [featuresCount, setFeaturesCount] = useState(4);

  const [estimatedMin, setEstimatedMin] = useState<number>(35000);
  const [estimatedMax, setEstimatedMax] = useState<number>(55000);
  const [currency, setCurrency] = useState('INR');
  const [calculating, setCalculating] = useState(false);

  // Recalculate whenever inputs change
  useEffect(() => {
    let active = true;
    setCalculating(true);

    const timer = setTimeout(() => {
      fetch('/api/estimator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service,
          complexity,
          scale,
          featuresCount,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (active && data.estimatedMin) {
            setEstimatedMin(data.estimatedMin);
            setEstimatedMax(data.estimatedMax);
            if (data.currency) setCurrency(data.currency);
          }
        })
        .catch((err) => console.error('Estimator calculation error:', err))
        .finally(() => {
          if (active) setCalculating(false);
        });
    }, 200);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [service, complexity, scale, featuresCount]);

  const handleProceedToEnquiry = () => {
    const params = new URLSearchParams({
      service,
      budget: `₹${estimatedMin.toLocaleString()} - ₹${estimatedMax.toLocaleString()}`,
      complexity,
      scale,
      features: featuresCount.toString(),
    });
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <section id="estimator" className={`relative ${isStandalonePage ? 'pt-32 pb-24' : 'py-24'} border-t border-white/[0.08] overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Project Estimator</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-5">
            Estimate Your Project Investment
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Configure your technical and creative specifications to receive an instant, data-backed indicative investment estimate for your project.
          </p>
        </div>

        {/* Estimator Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            {/* Step 1: Service */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-lime-400 mb-2">
                1. Select Core Service
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="glass-input w-full !text-sm !py-3.5 cursor-pointer bg-[#11141e]"
              >
                <option value="High-Performance Web Development">High-Performance Web Development</option>
                <option value="Digital Marketing & Social Strategy">Digital Marketing & Social Strategy</option>
                <option value="Brand Identity & Creative Design">Brand Identity & Creative Design</option>
                <option value="Video Production & Short-Form Editing">Video Production & Short-Form Editing</option>
                <option value="SEO & Organic Growth Optimization">SEO & Organic Growth Optimization</option>
              </select>
            </div>

            {/* Step 2: Complexity */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-lime-400 mb-2">
                2. Project Complexity
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'standard', label: 'Standard', desc: 'Core specifications' },
                  { id: 'advanced', label: 'Advanced', desc: 'Custom workflows & API' },
                  { id: 'enterprise', label: 'Enterprise', desc: 'Full custom architecture' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setComplexity(item.id)}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      complexity === item.id
                        ? 'bg-lime-400/15 border-lime-400 text-white shadow-[0_0_15px_rgba(204,255,0,0.2)]'
                        : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:border-white/[0.2]'
                    }`}
                  >
                    <span className="text-xs font-semibold block text-white">{item.label}</span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Scale */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-lime-400 mb-2">
                3. Business Scale
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'startup', label: 'Startup / Local', desc: 'Emerging brand' },
                  { id: 'growing', label: 'Growing Brand', desc: 'Expanding market' },
                  { id: 'established', label: 'Established', desc: 'National / Global' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setScale(item.id)}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      scale === item.id
                        ? 'bg-lime-400/15 border-lime-400 text-white shadow-[0_0_15px_rgba(204,255,0,0.2)]'
                        : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:border-white/[0.2]'
                    }`}
                  >
                    <span className="text-xs font-semibold block text-white">{item.label}</span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Number of Core Features / Deliverables */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-lime-400">
                  4. Deliverables & Feature Scope
                </label>
                <span className="text-xs font-mono font-bold text-lime-300">
                  {featuresCount} {featuresCount === 1 ? 'Feature / Deliverable' : 'Features / Deliverables'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={featuresCount}
                onChange={(e) => setFeaturesCount(parseInt(e.target.value))}
                className="w-full accent-lime-400 cursor-pointer h-2 bg-white/[0.1] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                <span>Minimal (1)</span>
                <span>Moderate (5)</span>
                <span>Comprehensive (10+)</span>
              </div>
            </div>
          </div>

          {/* Result & Summary Column */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-lime-400/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Estimated Investment
                </span>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-lime-400/15 text-lime-300 border border-lime-400/30">
                  Live Calculation
                </span>
              </div>

              {/* Estimate Display */}
              <div className="py-4 border-y border-white/[0.08] mb-6">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                  ₹{estimatedMin.toLocaleString()} – ₹{estimatedMax.toLocaleString()}
                </div>
                <span className="text-xs text-zinc-400 font-mono block mt-1">
                  Indicative Range ({currency})
                </span>
              </div>

              {/* Scope Breakdown */}
              <div className="space-y-2.5 text-xs text-zinc-300 mb-6">
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-zinc-400">Service:</span>
                  <span className="font-medium text-right text-white max-w-[200px] truncate">{service}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-zinc-400">Complexity:</span>
                  <span className="font-medium capitalize text-white">{complexity}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-zinc-400">Scale Tier:</span>
                  <span className="font-medium capitalize text-white">{scale}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-400">Estimated Deliverables:</span>
                  <span className="font-medium text-white">{featuresCount} Custom Pod Modules</span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5 text-[11px] text-zinc-400 mb-6">
                <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  Indicative estimate only. Actual scope and binding commercials are refined during our initial strategy discovery session.
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleProceedToEnquiry}
              className="btn-lime w-full text-xs uppercase tracking-wider !py-3.5 flex items-center justify-center gap-2"
            >
              <span>Submit this Estimate as an Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
