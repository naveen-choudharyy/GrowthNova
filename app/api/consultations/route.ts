import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb, logActivity } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { ConsultationRequest } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { user, errorResponse } = requireAdmin(req);
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');

  const db = readDb();
  let list = db.consultations || [];

  if (status && status !== 'All') {
    list = list.filter((c) => c.status.toLowerCase() === status.toLowerCase());
  }

  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({ consultations: list });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, organization, email, service, preferredDate, preferredTimeSlot, description } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!service || !service.trim()) {
      return NextResponse.json({ error: 'Please choose a service' }, { status: 400 });
    }
    if (!preferredDate) {
      return NextResponse.json({ error: 'Please select a preferred date' }, { status: 400 });
    }
    if (!description || !description.trim()) {
      return NextResponse.json({ error: 'Please share a brief summary of your project requirements' }, { status: 400 });
    }

    const uniqueId = `cst-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newConsultation: ConsultationRequest = {
      id: uniqueId,
      name: name.trim(),
      organization: organization?.trim() || undefined,
      email: email?.trim() || undefined,
      service: service.trim(),
      preferredDate,
      preferredTimeSlot: preferredTimeSlot || 'Flexible / Morning IST',
      description: description.trim(),
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const db = readDb();
    db.consultations.unshift(newConsultation);
    writeDb(db);

    logActivity(
      'Consultation Requested',
      'consultation',
      newConsultation.name,
      `Consultation request for ${newConsultation.service} on ${newConsultation.preferredDate} by ${newConsultation.name}.`,
      newConsultation.id
    );

    return NextResponse.json({
      success: true,
      requestId: uniqueId,
      message:
        'Your strategy consultation request has been submitted. Note that all sessions are reviewed and confirmed by GrowthNova administrators prior to calendar lock.',
    });
  } catch (error) {
    console.error('Consultation error:', error);
    return NextResponse.json({ error: 'Failed to submit consultation request.' }, { status: 500 });
  }
}
