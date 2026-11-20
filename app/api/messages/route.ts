import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb, logActivity } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { ConversationMessage } from '@/lib/types';
import { sendFounderNotificationEmail } from '@/lib/mailer';

export async function GET(req: NextRequest) {
  const { user, errorResponse } = requireAdmin(req);
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search')?.toLowerCase();

  const db = readDb();
  let list = db.messages || [];

  if (status && status !== 'all') {
    list = list.filter((m) => m.status === status);
  }

  if (search) {
    list = list.filter(
      (m) =>
        m.visitorName.toLowerCase().includes(search) ||
        m.visitorEmail?.toLowerCase().includes(search) ||
        m.initialMessage.toLowerCase().includes(search)
    );
  }

  // Latest first
  list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const unreadCount = db.messages.filter((m) => !m.isRead).length;

  return NextResponse.json({
    messages: list,
    unreadCount,
    totalCount: db.messages.length,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { visitorName, visitorEmail, message } = body;

    if (!visitorName || !visitorName.trim()) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Please enter your message.' }, { status: 400 });
    }

    const uniqueId = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const conversationId = `conv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const newConversation: ConversationMessage = {
      id: uniqueId,
      conversationId,
      visitorName: visitorName.trim(),
      visitorEmail: visitorEmail?.trim() || undefined,
      initialMessage: message.trim(),
      isRead: false,
      status: 'unread',
      replies: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const db = readDb();
    db.messages.unshift(newConversation);
    writeDb(db);

    logActivity(
      'New Website Message',
      'message',
      newConversation.visitorName,
      `Direct message from ${newConversation.visitorName}. Forwarded to swamianchal047@gmail.com`,
      newConversation.id
    );

    // Forward immediately to founder email: swamianchal047@gmail.com
    await sendFounderNotificationEmail({
      type: 'Direct Message',
      senderName: newConversation.visitorName,
      senderContact: newConversation.visitorEmail || 'Via Website Messenger',
      message: newConversation.initialMessage,
    });

    return NextResponse.json({
      success: true,
      messageId: uniqueId,
      conversationId,
      message: 'Your message has been delivered and forwarded to founder Anchal Swami (swamianchal047@gmail.com). We will get back to you shortly!',
      forwardedTo: 'swamianchal047@gmail.com',
    });
  } catch (error) {
    console.error('Message submission error:', error);
    return NextResponse.json({ error: 'Failed to deliver message. Please try again.' }, { status: 500 });
  }
}
