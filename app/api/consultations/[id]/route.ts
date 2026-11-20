import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb, logActivity } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, errorResponse } = requireAdmin(req);
  if (errorResponse) return errorResponse;

  const { id } = params;
  const body = await req.json();
  const { status, internalNotes } = body;

  const db = readDb();
  const index = db.consultations.findIndex((c) => c.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Consultation request not found.' }, { status: 404 });
  }

  const existing = db.consultations[index];
  if (status) existing.status = status;
  if (internalNotes !== undefined) existing.internalNotes = internalNotes;
  existing.updatedAt = new Date().toISOString();

  db.consultations[index] = existing;
  writeDb(db);

  logActivity(
    'Consultation Status Updated',
    'consultation',
    user!.name,
    `Updated status to "${existing.status}" for consultation with ${existing.name}`,
    existing.id
  );

  return NextResponse.json({ success: true, consultation: existing });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, errorResponse } = requireAdmin(req);
  if (errorResponse) return errorResponse;

  const { id } = params;
  const db = readDb();
  const index = db.consultations.findIndex((c) => c.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Consultation not found' }, { status: 404 });
  }

  const [removed] = db.consultations.splice(index, 1);
  writeDb(db);

  logActivity(
    'Consultation Deleted',
    'consultation',
    user!.name,
    `Deleted consultation request from ${removed.name}`,
    removed.id
  );

  return NextResponse.json({ success: true, message: 'Consultation request removed' });
}
