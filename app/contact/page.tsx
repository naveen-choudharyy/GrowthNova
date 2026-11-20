'use client';

import React, { Suspense } from 'react';
import SimpleConnect from '@/components/sections/SimpleConnect';
import FoundersInstagram from '@/components/sections/FoundersInstagram';

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Suspense fallback={
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <SimpleConnect />
        <FoundersInstagram />
      </Suspense>
    </div>
  );
}
