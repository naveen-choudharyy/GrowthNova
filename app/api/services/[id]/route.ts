import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb, logActivity } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, errorResponse } = requireAdmin(req);
  if (errorResponse) return errorResponse;

  const { id } = params;
  const body = await req.json();

  const db = readDb();
  const index = db.services.findIndex((s) => s.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }

  const existing = db.services[index];
  const updated = {
    ...existing,
    ...body,
  };

  db.services[index] = updated;
  writeDb(db);

  logActivity('Service Updated', 'service', user!.name, `Updated service "${updated.title}"`, updated.id);

  return NextResponse.json({ success: true, service: updated });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, errorResponse } = requireAdmin(req);
  if (errorResponse) return errorResponse;

  const { id } = params;
  const db = readDb();
  const index = db.services.findIndex((s) => s.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }

  const [removed] = db.services.splice(index, 1);
  writeDb(db);

  logActivity('Service Deleted', 'service', user!.name, `Deleted service "${removed.title}"`, removed.id);

  return NextResponse.json({ success: true, message: 'Service removed' });
}
