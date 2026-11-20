import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb, logActivity } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { MessageReply } from '@/lib/types';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, errorResponse } = requireAdmin(req);
  if (errorResponse) return errorResponse;

  const { id } = params;
  const body = await req.json();
  const { isRead, status, replyContent } = body;

  const db = readDb();
  const index = db.messages.findIndex((m) => m.id === id || m.conversationId === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Message conversation not found.' }, { status: 404 });
  }

  const conv = db.messages[index];

  if (typeof isRead === 'boolean') {
    conv.isRead = isRead;
    if (isRead && conv.status === 'unread') {
      conv.status = 'read';
    }
  }

  if (status) {
    conv.status = status;
    if (status === 'read' || status === 'replied') {
      conv.isRead = true;
    }
  }

  if (replyContent && replyContent.trim()) {
    const reply: MessageReply = {
      id: `rep-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      senderName: user!.name,
      senderRole: user!.role === 'founder' ? 'founder' : 'admin',
      content: replyContent.trim(),
      createdAt: new Date().toISOString(),
    };
    conv.replies.push(reply);
    conv.status = 'replied';
    conv.isRead = true;
    conv.updatedAt = new Date().toISOString();

    logActivity(
      'Founder Reply Sent',
      'message',
      user!.name,
      `Replied to visitor ${conv.visitorName}: "${reply.content.slice(0, 50)}..."`,
      conv.id
    );
  } else {
    conv.updatedAt = new Date().toISOString();
  }

  db.messages[index] = conv;
  writeDb(db);

  return NextResponse.json({ success: true, conversation: conv });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, errorResponse } = requireAdmin(req);
  if (errorResponse) return errorResponse;

  const { id } = params;
  const db = readDb();
  const index = db.messages.findIndex((m) => m.id === id || m.conversationId === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Message conversation not found.' }, { status: 404 });
  }

  const [removed] = db.messages.splice(index, 1);
  writeDb(db);

  logActivity(
    'Message Deleted',
    'message',
    user!.name,
    `Deleted message conversation with ${removed.visitorName}`,
    removed.id
  );

  return NextResponse.json({ success: true, message: 'Message conversation removed' });
}
