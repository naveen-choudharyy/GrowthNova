import React from 'react';
import type { Metadata } from 'next';
import PortfolioSection from '@/components/sections/PortfolioSection';
import FinalCtaSection from '@/components/sections/FinalCtaSection';
import { readDb } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Portfolio & Showcases — GrowthNova Digital Agency',
  description:
    'Explore featured project showcases across websites, Instagram management, branding, short-form video editing, and growth campaigns by GrowthNova.',
};

export default function PortfolioPage() {
  const db = readDb();
  const projects = db.portfolioProjects || [];

  return (
    <div className="pt-10">
      <PortfolioSection initialProjects={projects} isStandalonePage={true} />
      <FinalCtaSection />
    </div>
  );
}
