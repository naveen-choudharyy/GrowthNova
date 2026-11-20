import { NextRequest, NextResponse } from 'next/server';
import { readDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { service, complexity = 'standard', scale = 'startup', featuresCount = 3 } = await req.json();

    const db = readDb();
    const rules = db.content.pricingRules || {
      baseRate: 25000,
      complexityMultiplier: { standard: 1.0, advanced: 1.6, enterprise: 2.5 },
      scaleMultiplier: { startup: 1.0, growing: 1.4, established: 2.2 },
      featurePrice: 4000,
      currency: 'INR',
    };

    // Find service baseline if service is matched
    const matchedService = db.services.find(
      (s) => s.title.toLowerCase() === service?.toLowerCase() || s.slug === service
    );

    const basePrice = matchedService ? matchedService.pricingRange.min : rules.baseRate;
    const compMult = rules.complexityMultiplier[complexity.toLowerCase()] || 1.0;
    const scaleMult = rules.scaleMultiplier[scale.toLowerCase()] || 1.0;
    const featuresCost = Math.max(0, Number(featuresCount)) * rules.featurePrice;

    const calculatedBase = (basePrice + featuresCost) * compMult * scaleMult;
    const estimatedMin = Math.round(calculatedBase * 0.9 / 500) * 500;
    const estimatedMax = Math.round((calculatedBase * 1.35) / 500) * 500;

    return NextResponse.json({
      currency: rules.currency,
      estimatedMin,
      estimatedMax,
      breakdown: {
        basePrice,
        featuresCost,
        complexityMultiplier: compMult,
        scaleMultiplier: scaleMult,
      },
      disclaimer: 'Indicative estimate only. Actual project scope and final quotation will be tailored during strategy discovery.',
    });
  } catch (error) {
    console.error('Estimator error:', error);
    return NextResponse.json({ error: 'Calculation failed' }, { status: 500 });
  }
}
