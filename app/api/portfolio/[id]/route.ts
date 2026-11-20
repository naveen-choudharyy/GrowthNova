import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb, logActivity } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, errorResponse } = requireAdmin(req);
  if (errorResponse) return errorResponse;

  const { id } = params;
  const body = await req.json();

  const db = readDb();
  const index = db.portfolioProjects.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const existing = db.portfolioProjects[index];
  const updated = {
    ...existing,
    ...body,
    tags: Array.isArray(body.tags)
      ? body.tags
      : typeof body.tags === 'string'
      ? body.tags.split(',').map((t: string) => t.trim())
      : existing.tags,
  };

  db.portfolioProjects[index] = updated;
  writeDb(db);

  logActivity(
    'Portfolio Project Updated',
    'portfolio',
    user!.name,
    `Updated project details for "${updated.title}"`,
    updated.id
  );

  return NextResponse.json({ success: true, project: updated });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, errorResponse } = requireAdmin(req);
  if (errorResponse) return errorResponse;

  const { id } = params;
  const db = readDb();
  const index = db.portfolioProjects.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const [removed] = db.portfolioProjects.splice(index, 1);
  writeDb(db);

  logActivity(
    'Portfolio Project Deleted',
    'portfolio',
    user!.name,
    `Deleted project "${removed.title}"`,
    removed.id
  );

  return NextResponse.json({ success: true, message: 'Project removed' });
}
