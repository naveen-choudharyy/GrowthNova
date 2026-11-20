import React from 'react';
import SimpleHero from '@/components/sections/SimpleHero';
import SimpleWork from '@/components/sections/SimpleWork';
import SimpleServices from '@/components/sections/SimpleServices';
import FoundersInstagram from '@/components/sections/FoundersInstagram';
import SimpleConnect from '@/components/sections/SimpleConnect';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Punchy Creative Hero */}
      <SimpleHero />

      {/* 2. Visual Work Showcase */}
      <SimpleWork />

      {/* 3. What We Do */}
      <SimpleServices />

      {/* 4. Founders (Anchal Swami & Komal Swami) & Instagram */}
      <FoundersInstagram />

      {/* 5. Simple Connect Form (Forwarded to swamianchal047@gmail.com) */}
      <SimpleConnect />
    </div>
  );
}
