import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb, logActivity } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  const db = readDb();
  return NextResponse.json({ content: db.content });
}

export async function PUT(req: NextRequest) {
  const { user, errorResponse } = requireAdmin(req);
  if (errorResponse) return errorResponse;

  try {
    const body = await req.json();
    const db = readDb();

    db.content = {
      ...db.content,
      ...body,
    };

    writeDb(db);
    logActivity('Website Content Updated', 'content', user!.name, 'Updated dynamic website copy and configuration');

    return NextResponse.json({ success: true, content: db.content });
  } catch (error) {
    console.error('Content update error:', error);
    return NextResponse.json({ error: 'Failed to update website content' }, { status: 500 });
  }
}
