import React from 'react';
import type { Metadata } from 'next';
import ServicesSection from '@/components/sections/ServicesSection';
import FinalCtaSection from '@/components/sections/FinalCtaSection';
import { readDb } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Services — GrowthNova Digital Agency',
  description:
    'Explore GrowthNova’s specialized agency services spanning Web Development, Digital Marketing, Brand Design, Video Production, and SEO Growth.',
};

export default function ServicesPage() {
  const db = readDb();
  const services = (db.services || []).filter((s) => s.isActive);

  return (
    <div className="pt-10">
      <ServicesSection initialServices={services} isStandalonePage={true} />
      <FinalCtaSection />
    </div>
  );
}
