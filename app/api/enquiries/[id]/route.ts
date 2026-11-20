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
  const index = db.enquiries.findIndex((e) => e.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
  }

  const existing = db.enquiries[index];
  if (status) existing.status = status;
  if (internalNotes !== undefined) existing.internalNotes = internalNotes;
  existing.updatedAt = new Date().toISOString();

  db.enquiries[index] = existing;
  writeDb(db);

  logActivity(
    'Enquiry Updated',
    'enquiry',
    user!.name,
    `Updated status to ${existing.status} for enquiry ${existing.name}`,
    existing.id
  );

  return NextResponse.json({ success: true, enquiry: existing });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, errorResponse } = requireAdmin(req);
  if (errorResponse) return errorResponse;

  const { id } = params;
  const db = readDb();
  const index = db.enquiries.findIndex((e) => e.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
  }

  const [removed] = db.enquiries.splice(index, 1);
  writeDb(db);

  logActivity(
    'Enquiry Deleted',
    'enquiry',
    user!.name,
    `Deleted enquiry from ${removed.name}`,
    removed.id
  );

  return NextResponse.json({ success: true, message: 'Enquiry deleted' });
}
