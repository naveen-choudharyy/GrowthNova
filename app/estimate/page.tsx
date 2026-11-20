import React from 'react';
import type { Metadata } from 'next';
import CostEstimatorSection from '@/components/sections/CostEstimatorSection';
import FinalCtaSection from '@/components/sections/FinalCtaSection';

export const metadata: Metadata = {
  title: 'Project Cost Estimator — GrowthNova Digital Agency',
  description:
    'Calculate an indicative investment range for your custom web development, digital marketing, or branding project with GrowthNova’s interactive estimator.',
};

export default function EstimatePage({
  searchParams,
}: {
  searchParams?: { service?: string };
}) {
  const initialService = searchParams?.service || 'High-Performance Web Development';

  return (
    <div className="pt-10">
      <CostEstimatorSection initialService={initialService} isStandalonePage={true} />
      <FinalCtaSection />
    </div>
  );
}
