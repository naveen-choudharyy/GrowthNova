import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb, logActivity } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { ServiceItem } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get('all') === 'true';

  const db = readDb();
  let list = db.services || [];

  if (!all) {
    list = list.filter((s) => s.isActive);
  }

  list.sort((a, b) => a.order - b.order);

  return NextResponse.json({ services: list });
}

export async function POST(req: NextRequest) {
  const { user, errorResponse } = requireAdmin(req);
  if (errorResponse) return errorResponse;

  try {
    const body = await req.json();
    const {
      title,
      team,
      shortDescription,
      fullDescription,
      benefits,
      deliverables,
      suitableFor,
      pricingRange,
      iconName,
      isActive,
      order,
    } = body;

    if (!title || !team) {
      return NextResponse.json({ error: 'Title and Team are required' }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const db = readDb();
    const newService: ServiceItem = {
      id: `srv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      slug,
      title: title.trim(),
      team: team.trim(),
      shortDescription: shortDescription?.trim() || '',
      fullDescription: fullDescription?.trim() || shortDescription?.trim() || '',
      benefits: Array.isArray(benefits) ? benefits : [],
      deliverables: Array.isArray(deliverables) ? deliverables : [],
      suitableFor: Array.isArray(suitableFor) ? suitableFor : [],
      pricingRange: pricingRange || { min: 20000, max: 60000, currency: 'INR', unit: 'per project' },
      iconName: iconName || 'Code',
      isActive: isActive !== undefined ? !!isActive : true,
      order: Number(order) || (db.services.length + 1),
    };

    db.services.push(newService);
    writeDb(db);

    logActivity('Service Added', 'service', user!.name, `Added service "${newService.title}"`, newService.id);

    return NextResponse.json({ success: true, service: newService });
  } catch (error) {
    console.error('Service create error:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
