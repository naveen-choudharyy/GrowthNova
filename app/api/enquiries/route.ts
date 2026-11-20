import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb, logActivity } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { Enquiry } from '@/lib/types';
import { sendFounderNotificationEmail } from '@/lib/mailer';

export async function GET(req: NextRequest) {
  const { user, errorResponse } = requireAdmin(req);
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search')?.toLowerCase();

  const db = readDb();
  let items = db.enquiries || [];

  if (status && status !== 'all') {
    items = items.filter((e) => e.status === status);
  }

  if (search) {
    items = items.filter(
      (e) =>
        e.name.toLowerCase().includes(search) ||
        e.organization?.toLowerCase().includes(search) ||
        e.service.toLowerCase().includes(search) ||
        e.description.toLowerCase().includes(search)
    );
  }

  // Sort latest first
  items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({ enquiries: items });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, organization, email, preferredContact, service, budget, description, estimatorDetails } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!description || !description.trim()) {
      return NextResponse.json({ error: 'Please enter a message or project details' }, { status: 400 });
    }

    const db = readDb();
    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      organization: organization?.trim() || undefined,
      email: email?.trim() || undefined,
      preferredContact: preferredContact || 'email',
      service: service?.trim() || 'General Enquiry',
      budget: budget?.trim() || 'Custom',
      description: description.trim(),
      status: 'new',
      estimatorDetails: estimatorDetails || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.enquiries.unshift(newEnquiry);
    writeDb(db);

    logActivity(
      'New Enquiry Received',
      'enquiry',
      newEnquiry.name,
      `New project enquiry for "${newEnquiry.service}" from ${newEnquiry.name}. Forwarded to swamianchal047@gmail.com`,
      newEnquiry.id
    );

    // Forward immediately to founder email: swamianchal047@gmail.com
    await sendFounderNotificationEmail({
      type: 'Enquiry',
      senderName: newEnquiry.name,
      senderContact: newEnquiry.email || newEnquiry.organization || 'Via Website',
      service: newEnquiry.service,
      budget: newEnquiry.budget,
      message: newEnquiry.description,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your details and enquiry have been sent directly to founder Anchal Swami.',
      enquiryId: newEnquiry.id,
      forwardedTo: 'swamianchal047@gmail.com',
    });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    return NextResponse.json({ error: 'Failed to submit enquiry. Please try again.' }, { status: 500 });
  }
}
