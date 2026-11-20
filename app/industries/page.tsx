import React from 'react';
import type { Metadata } from 'next';
import IndustriesSection from '@/components/sections/IndustriesSection';
import FinalCtaSection from '@/components/sections/FinalCtaSection';

export const metadata: Metadata = {
  title: 'Industries We Serve — GrowthNova Digital Agency',
  description:
    'GrowthNova delivers specialized digital solutions for Startups, Local Businesses, E-commerce, Healthcare, Hospitality, Real Estate, and Corporate Organizations.',
};

export default function IndustriesPage() {
  return (
    <div className="pt-24 pb-10">
      <IndustriesSection />
      <FinalCtaSection />
    </div>
  );
}
